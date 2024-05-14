---
author: roberto_alfaro
layout: post
title: Estrategias para Descubrimiento de Activos Web con Wordlist Customizado
date: 2024-05-13
categories: [Ciberseguridad, Offensive Security, Reconocimiento]
---

En el proceso de pentesting, el primer paso es comenzar con un reconocimiento, utilizando herramientas externas pasivas o activas.

En el reconocimiento es importante conocer la estructura que tiene el objetivo, este corresponde a la búsqueda de paths válidos dentro de un sitio web, utilizando herramientas tipo crawlers, que exploran el sitio web por ti y van ingresando a los enlaces que aparecen en el código, o con herramientas manuales para explorar con listas de palabras como gobuster, wfuzz o dirsearch (Aunque este último también es crawler). Este procedimiento también se utiliza para buscar sub-dominios válidos de un objetivo.

En algunos contextos, puede llegar a ser muy difícil tener una lista de paths o palabras validas, especialmente cuando tu objetivo está en otro idioma que no sea inglés o tiene una estructura de sitio web customizada con o sin palabras compuestas, invalidando la mayoría de los diccionarios diseñados con las palabras más comunes... en ingles.

Para solucionar esta problemática, utilizaremos una herramienta y un script para generar una wordlist diseñada para el objetivo.

## CeWL

![Crew_1](https://e-virtus.s3.us-east-2.amazonaws.com/624b46a6-be24-408b-b89c-599410a6caaf.png)

CEWL es una herramienta programada en ruby que genera una lista de palabras con base en cuantas veces se repiten dentro de un sitio objetivo, esta herramienta tiene varias opciones a destacar, primero para la **gestión de palabras** existen alternativas como:

- -m & -x >> Estas opciones sirven para configurar el tamaño mínimo y máximo de las palabras a considerar, respectivamente.
- --lowercase >> Estandariza todo el output a minúsculas.
- --with-numbers >> Acepta palabras con números en la lista.

Un detalle muy bueno de este programa, es la posibilidad de Configurar las Peticiones Web, en palabras más simples, configurar el cómo deseas que explore el sitio, lo que agrega más versatilidad a la hora de obtener una lista de palabras. Además, cabe destacar que CeWL automáticamente ejecuta spidering, que consiste en explorar las rutas del mismo sitio con el fin de obtener más palabras.

- -d >> Puedes determinar con un valor numérico que tantos enlaces consecutivos puede explorar, el por defecto es 2.
- -o >> Le permite al "spider" explorar sitios ajenos al objetivo.
- --exclude >> Un archivo que contiene la lista de rutas a excluir, también puedes utilizar su contraparte --allowed que permite agregar rutas que sigan un patrón en REGEX.
- -u o --ua >> Configurar el "UserAgent" que deseas utilizar en la consulta, perfecto para evadir WAFs u otros IDSs.
- -H >> Permite agregar Headers y se puede utilizar múltiples veces, principalmente utilizado para Cookies.
- --proxy_host & --proxy_port >> Host y puerto del proxy a utilizar a la hora de ejecutar la consulta, si requiere autenticación puedes utilizar --proxy_username y --proxy_password

Y como siempre, vamos a necesitar guardar en un archivo lo obtenido.

- -w >> Guarda el output en un archivo.
- -n >> No muestra palabras a la hora de ejecutar el archivo.

Si te sientes curioso puedes agregar argumentos como:

- -c >> Muestra la cantidad de veces que una palabra se repite.
- -v >> Verbose, te permite ver con detalle que está haciendo el programa.
- --debug >> Información adicional para cazar errores.

Además, tiene opciones para autenticación. Aunque siempre puedes utilizar -h para obtener más información. También existen alternativas como CeWLeR

### Nuestro Objetivo

Para presentar la utilidad de esta herramienta, tenemos un sitio web en español sobre una tienda de una comunidad sostenible, muy comprometida con el medio ambiente, que vende varios tipos de productos en diferentes categorías.
![Comunidad_Sostenible](https://e-virtus.s3.us-east-2.amazonaws.com/f3ef46a1-22f5-44cb-80f9-b4d4308d1935.png)
Como primera instancia podemos ver que venden 4 tipos de productos y tienen un portal de pagos.
![Productos_Verdes](https://e-virtus.s3.us-east-2.amazonaws.com/2f299f99-ac95-4860-8470-0f2435f8dccf.png)
Al explorar, podemos notar que utiliza palabras compuestas en su estructura, esto va a dificultar el uso de diccionarios comunes, por lo tanto, vamos a utilizar las herramientas anteriores para generar una lista de palabras relacionada al sitio.

### Generar Wordlist

Primero para obtener una lista de palabras, vamos a utilizar **Cewl.**

```py
cewl -m 5 -d 3 -w wordlist.txt --lowercase "http://localhost:3333/"
```

Con un mínimo de 5 caracteres por palabra (-m), un spidering de profundidad 3 (-d) y el output será todo en minúscula (--lowercase) dentro del archivo wordlist.txt (-w)

![WordList](https://e-virtus.s3.us-east-2.amazonaws.com/db4b862f-2d35-43f7-8600-af0a01298298.png)

Obteniendo una lista de 90 palabras.

### Mezclar Wordlist

Como hemos notado que el sitio web tiene palabras compuestas en su estructura, usaremos un script de Python generar una lista nueva acorde a la estructura del sitio, ya que existe la posibilidad de encontrar partes antiguos y/o interesantes sitios web.

Primero vamos a copiar la lista de palabras y crear un mini diccionario de delimitantes.

```py
cp wordlist.txt mordlist.txt
vi delimiter.txt
python3 /opt/github/combiner.py -W wordlist.txt -M wordlist.txt -d delimiter.txt
```

Contenido delimiter.txt:

```py
.
\-
\_
```

Contenido Combiner.py:

```py
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-W', '--wordlist', type=str, required=True, help='First wordlist file to combine')
parser.add_argument('-M', '--mordlist', type=str, required=True, help='Second wordlist file to combine')
parser.add_argument('-d', '--delimiter', type=str, required=True, help='Text file with delimiters to combine')

args = parser.parse_args()
wordlist1 = open(args.wordlist, "r")
list1 = []

for word1 in wordlist1:
    list1.append(word1.strip())

wordlist2 = open(args.mordlist, "r")
list2 = []

for word2 in wordlist2:
    list2.append(word2.strip())

delimiter = open(args.delimiter, "r")
listlimit = []

for limit in delimiter:
    listlimit.append(limit.strip())

newlist = []

for word1 in list1:
    for word2 in list2:
        for limit in listlimit:
            word1 = word1.strip()
            word2 = word2.strip()
            limit = limit.strip()
            newword = word1 + limit + word2
            print(newword)
            newlist.append(newword)

with open(r'output.txt', 'w') as fp:
    for items in newlist:
        fp.write("%s\n" % items)
```

### Fuzzing

Una vez que ya tenemos todo preparado, vamos a ejecutar **Wfuzz** en este caso, para buscar algún **path** antiguo que sea interesante.

```py
wfuzz --hc=404 -t 200 -c -w /tmp/output.txt <http://localhost:3333/FUZZ.html>

\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
- Wfuzz 3.1.0 - The Web Fuzzer \*
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

Target: <http://localhost:3333/FUZZ.html>
Total requests: 24300

\=====================================================================

ID Response Lines Word Chars Payload

\=====================================================================

000008744: 200 101 L 435 W 5194 Ch "productos-anticontaminantes"
000008894: 200 101 L 437 W 5196 Ch "productos-celeste"
000009560: 200 101 L 431 W 5160 Ch "portal-pagos"
000009974: 200 101 L 435 W 5190 Ch "pagos-celeste"
```

Con wfuzz encontramos algo interesante, un "pagos-celeste.html" que no fue encontrado por el crawler.
![Portal_pagos](https://e-virtus.s3.us-east-2.amazonaws.com/f017d431-b5d8-4298-b72f-34f60e3fa4fc.png)
Excelente, al parecer el sitio web funcionaba con un portal de pagos por cada tipo de productos, una forma ineficiente de funcionar y probablemente vulnerable.
