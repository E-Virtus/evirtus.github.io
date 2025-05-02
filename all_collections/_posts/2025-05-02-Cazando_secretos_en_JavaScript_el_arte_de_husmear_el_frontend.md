---
author: johann_loor
layout: post
title: Cazando secretos en JavaScript - el arte de husmear el frontend
date: 2025-05-02
categories: [Ciberseguridad, Offensive Security, Ethical Hacking]
---

# Cazando secretos en JavaScript: el arte de husmear el frontend
> “Si el navegador puede verlo, tú también puedes explotarlo” —
> cualquier hacker con olfato

**Introducción**

En el vasto universo de la **seguridad** **cibernética**, hay un campo
donde el **hacker** puede sentirse como un cazador en su territorio.
Este terreno es el **frontend**, específicamente el archivo
**JavaScript**. Mientras los desarrolladores confían en su código,
nosotros, los **artistas** **del** **caos** **digital**, aprovechamos
esos **errores** **triviales** y **descuidados** que dejan a nuestras
preciadas **credenciales** expuestas como un campo de **trampas**
**llenas** **de** **oro**.

¿Quieres aprender cómo espiar, rastrear y **desenterrar** **secretos**
en el frontend como un verdadero **ninja** **cibernético**? Bienvenido a
este

manual, donde te mostraremos cómo, con un poco de **magia** **regex** y
el toque correcto de **ingenio** **hacker**, puedes descubrir esos
secretos que deberían estar encriptados… pero no lo están.

**¿Por** **qué** **JavaScript** **sigue** **siendo** **un** **punto**
**débil?**

**La** **cruda** **verdad**

¿Quién puede decir que **JavaScript** **no** **es** **un** **agujero**
**negro** **de** **secretos**? En cada script cargado por tu navegador
hay **tokens,** **claves,** **credenciales** **y** **secretos**
esperando ser **cazados** por los que sepan dónde mirar. Es una
vulnerabilidad abierta que los desarrolladores de frontend **siguen**
**ignorando**, y nosotros **aprovechamos** cada segundo de esa
negligencia.

> "Si el código corre en el navegador, el atacante también puede
> ejecutarlo".
>
> — Mi abuelita, la hacker legendaria, siempre sabia.

**Fase** **1:** **Recolección** **de** **archivos** **JavaScript**
**públicos**

**La** **caza** **comienza**

**¿Cómo** **encontramos** **esos** **archivos** **JS**? Simple:
**recolectamos** todos los archivos que podamos de la web. **Wayback**
**Machine**,

**Google** **Dorking**, y **OSINT** **tools** son nuestros mejores
amigos. Usamos **nuestras** **herramientas** **favoritas** para
**rastrear** **el** **historial** **de** **un** **dominio** y descargar
archivos JS que **el** **desarrollador** **olvidó** **esconder**.

¿Tienes curiosidad? Aquí tienes los comandos básicos para comenzar tu
caza:

> 1 echo "target.com" \| waybackurls \| grep "\\js\$" \| tee js_urls.txt
> 2 wget -i js_urls.txt -P js/

Esto te da **acceso** **instantáneo** a esos archivos JS **viejos** o
**olvidados** que ni siquiera los desarrolladores recordaban que
existían. ¡Bingo!

**Herramientas** **útiles:**

> **Wayback** **Machine**: [Wayback Machine](https://archive.org/web/)
>
> **Google** **Dorking**: Utiliza site:target.com filetype:js en Google
> para encontrar JS expuestos.
>
> **OSINT** **tools**: Usa
> [**waybackurls**](https://github.com/tomnomnom/waybackurls) para
> automatizar la recolección de URLs y otros scripts antiguos.

**Fase** **2:** **La** **magia** **de** **los** **Regex,** **el**
**arma** **secreta**

**¿Cómo** **encontramos** **las** **claves** **con** **precisión**
**de** **cirujano?**

Aquí es donde entramos en el **territorio** **hacker** **épico**. Cuando
ves un archivo JS cargado con variables y objetos de **API** **Keys** o
**tokens**, no puedes simplemente mirar. Tienes que **olvidarte** **de**
**la** **luz** **y** **la** **lógica**. Necesitas **regex** para
desenterrar estos secretos de las entrañas del código.

Así que, si estás buscando una **API** **Key** o **JWTs** olvidados en
la jungla de tu archivo JS, usa **estos** **patrones** **ninja**:

> 1 grep -E -i
> '(apikey\|token\|auth\|client_secret\|access_key\|secret\|password)\['"\]?\s\*\[:=\]\s\*\['"\]\[A-Za-z0-9\_\\\]{8,}'
> js

**Regex** **épico**: El regex puede ser tu espada afilada, y con unos
pocos caracteres, puedes cortar el código y hacerle hablar. Si tu
expresión regular contiene **\[A-Za-z0-9\_-\]{8,}**, es casi **seguro**
que has encontrado un **token** o **API** **Key**.

> **Hacker's** **Tip**: Si encuentras **JWTs** y los puedes decodificar
> sin un **algoritmo** **secreto**, has conseguido la **clave** de
> acceso a toda
>
> una aplicación. ¡Tú decides cómo explotarlo!

**Herramientas** **útiles:**

> [**Regex101**:](https://regex101.com/) Prueba y optimiza tus
> expresiones regulares para encontrar patrones exactos.
>
> **jq**: Analiza y filtra JSON en archivos JS.

**Fase** **3:** **Análisis** **manual** **&** **contexto** **hacker**

**La** **búsqueda** **no** **termina** **con** **el** **regex**

Ya has encontrado **el** **oro**, pero **el** **verdadero** **hacker**
sabe que la **validación** **es** **clave**. Si has encontrado algo que
parece una **API** **Key** o un **token** **JWT**, no te lances de
inmediato a la fiesta. ¡Espera! **Es** **hora** **de** **validarlo**.

Para validar lo que has encontrado, no te limites a adivinar. Hazlo como
un **hacker** **legendario**:

> 1\. **¿Está** **activa?**
>
> Testea las **API** **Keys** con **tools** **automáticas** como
> firebase-tools para **validar** **acceso** a bases de datos o
> funcionalidades críticas.
>
> 2\. **¿Pertenece** **a** **producción?**
>
> No te olvides de verificar si esa **clave** está vinculada a
> **entornos** **de** **producción**. Si lo está, ya sabes lo que puedes
> hacer.
>
> 3\. **¿Cuánto** **poder** **tiene?**
>
> Examina los **permisos** asociados a esa clave. ¿Tiene acceso
> **root**? ¿Solo lectura? ¿Puede ejecutar **acciones** **críticas** en
> la base de datos? Aquí es donde empieza el **juego** **real**.
>
> **¡Pro** **Tip** **de** **Hacker!** Si la clave es de **AWS** o
> **Firebase**, ¡ve directamente al grano y **juega** con los recursos!
> Accede a **S3**, manipula
>
> **Cloud** **Functions** o hackea **Firestore**. Si no lo haces, ¿quién
> lo hará?

**Herramientas** **útiles:**

> [**firebase-tools**:](https://www.npmjs.com/package/firebase-tools)
> Herramienta para interactuar con Firebase.
>
> [**Postman**:](https://www.postman.com/) Realiza pruebas de API y
> valídalas fácilmente.

**Casos** **reales:** **¡Los** **secretos** **encontrados!**

**1.** **Firebase** **expuesto**

> 1 const firebaseConfig = { apiKey: "AIzaSyC-iD6tRANDOMKEY",
> authDomain: "appname.firebaseapp.com", projectId:

**Resultado**: Acceso completo a Firestore sin autenticación. **¡Fácil**
**acceso** **a** **todos** **los** **datos!**

Un buen hacker no solo ve esto como un **golpe** **de** **suerte**, sino
como una **oportunidad** **épica** para hacer **movidas** **de**
**alto** **nivel**. **Recuerda**, ¡una vez que tengas acceso a
Firestore, **puedes** **robar,** **modificar** **o** **eliminar**
**datos**!

**2.** **Claves** **AWS** **en** **JS**

> 1 AWS.config.update({ accessKeyId: "AKIAIOSFODNN7EXAMPLE",
> secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAM

**Resultado**: Acceso completo a **S3** y **Lambda** **Functions**.
¡Puedes cargar y descargar archivos a tu antojo!

> ¡Adiós a la **nube** segura y bien configurada! **Haz** **tu**
> **magia** y disfruta de las recompensas.

**Consejos** **para** **desarrolladores** **y** **empresas**

Ahora, para esos desarrolladores que siguen poniendo **todos** **sus**
**secretos** **en** **JS** (sí, tú), aquí te dejo algunos consejos para
que no

termines en el **banco** **de** **los** **culpables**:

> 1\. **Nunca** **pongas** **secretos** **en** **tu** **código** **JS.**
>
> Nunca. En serio. Usa variables de entorno y guarda esas **API**
> **Keys** en el backend.
>
> 2\. **Limita** **el** **acceso** a tus claves con **restricciones** de
> IP y **alcances** **de** **permisos**. Un token no debería ser
> **todopoderoso**.
>
> 3\. **Haz** **auditorías**:
>
> Usa herramientas como
> [**gitleaks**](https://github.com/zricethezav/gitleaks) y
> [**detect-secrets**](https://github.com/Yelp/detect-secrets) para
> escanear tus repositorios. Usa
> [**truffleHog**](https://github.com/dxa4481/truffleHog) para escanear
> tu **historial** **de** **Git** y busca secretos olvidados que los
> **bots** puedan haber dejado atrás.

**Conclusión**

Aquí está la verdad: si **el** **código** **JS** **está** **en** **tu**
**frontend,** **cualquier** **hacker** **puede** **verlo**. Pero no te
preocupes, **en** **e-virtus** somos los cazadores de estos secretos y,
con nuestra experiencia en la exploración digital, podemos desenterrar
las credenciales más escondidas.

Nos gusta **romper** **las** **reglas**, hacer **auditorías** **con**
**estilo**, y sobre todo, asegurarnos de que ningún **secreto**
**quede** **sin** **descubrir**. Si eres un desarrollador y no quieres
que te cazamos, es mejor que **cuides** **esos** **secretos** antes de
que un hacker como nosotros lo haga por ti.

¡En e-virtus, somos los **Reyes** **de** **la** **Caza** **de**
**Secretos** y, si tienes algo oculto, no descansaremos hasta
encontrarlo!