---
author: roberto_alfaro
layout: post
title: Hackfinity Battle OSINT
date: 2025-04-25
categories: [Ciberseguridad, Offensive Security, Ethical Hacking, Osint, Tryhackme]
---

# Hackfinity Battle OSINT
En esta entrada, compartiré mi experiencia con la sección **OSINT** (Open-Source Intelligence) del reto Hackaffinity en TryHackMe. A diferencia de otros desafíos más técnicos, aquí nos enfrentamos a pruebas de **investigación**, **recolección de datos** y **correlación de información** para hallar ubicaciones, nombres y pistas en fotografías.

El nivel de dificultad de la seccion de OSINT de Hackaffinity esta infocado a estudiantes, por lo tanto, no es necesario utilizar herramientas tecnicas, sitios en la dark web, o servicios adicionales..

# ¿Qué es OSINT?

OSINT (Open-Source Intelligence) consiste en recopilar y analizar información publicada en fuentes abiertas (internet, redes sociales, imágenes públicas, etc.) para llegar a conclusiones útiles. En el entorno del hacking ético, se aprovechan herramientas como **Google Maps**, búsquedas avanzadas y hasta el reconocimiento de pequeñas pistas en fotos.

En Hackaffinity, la trama gira alrededor de varios personajes (Cipher, Phicer, etc.) y lugares sospechosos, donde tu misión es descubrir la localización exacta o nombres de establecimientos a partir de pistas mínimas.
![E-Virtus osint1.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-1.png)


> Informacion inicial de la primera maquina de OSINT

La primera misión: identificar el **nombre del restaurante de hamburguesas** donde se fotografió a “Phicer”. En la **imagen “Beco-OSINT...”** vemos un lugar lleno de grafitis y una calle con nombres parcialmente visibles.

### Análisis de la Fotografía
- **Pista clave**: Se aprecia un letrero de la calle que dice “Beco do Batman” (muy famoso en São Paulo, Brasil) y algo que alude a “Harm...”.
- **Hipótesis**: Podría tratarse de la intersección entre “Beco do Batman” y “R. Harmonia” (o algo parecido).
![E-Virtus osint2.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-2.png)
> Documento compartido por THM

### 2.2. Búsqueda en Google Maps
Colocamos “Beco do Batman” en Google Maps. Busca alguna interseccion o esquina en donde su nombre contenga “Harm” Y luego… ¡Aparece un lugar llamado “Coringa do Beco”!
![E-Virtus osint3.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-3.png)

Con el formato de TryHackMe ``THM{nombre_con_guiones_bajos}`` la respuesta es

```
THM{coringa_do_beco}
```

## Catch Me if You Can 2

En la segunda parte, Phicer sigue en “Beco do Batman”, admirando los murales. Se menciona que se detuvo ante un _texto cifrado_.
![E-Virtus osint4.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-4)
> Segundo reto de OSINT

### Murales y texto cifrado
Observando la foto, podemos notar que existen muchos cartenes, palabras en diferentes colores, e informacion variada que puede ser facilmente una distraccion, pero si observamos de forma detenida, encontraremos un texto cifrado.
![E-Virtus osint5.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-5.png)
> Foto del mural entregado por TryHackMe

En la zona inferior de Pele, podemos ver que hay un texto cifrado, estos corresponden a **Pigpen Cipher** (un alfabeto de cifrado por sustitución que usa formas geométricas en lugar de letras).

![E-Virtus osint6.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-6.png)


![E-Virtus osint7.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-7.png)
> Resumen del Cifrado Pigpen y fragmento de la imagen con el cifrado

### Descifrado
Buscamos una **tabla de Pigpen Cipher** en internet y comparamos cada símbolo. Se obtendra como resultado:
```
Meet at Torii Portal
```

Por lo tanto, la flag es ``THM{torii_portal}``

## Catch Me if You Can 3

Ahora, la pista descifrada dice: “Meet me at the Mr.Wok safe house”. No tenemos imagen, pero sí el **nombre de un local** (Mr. Wok) y una referencia a un “Torii Portal”, muy popular en cierta zona de São Paulo.
![E-Virtus osint8.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-8.png)
> Ultima maquina de OSINT

### Ubicando “Torii Portal” y “Mr.Wok”
En Google Maps, al buscar “Torii Portal Japonés” en São Paulo, encontramos que está en la **Rua Galvão Bueno** del barrio Liberdade.
![E-Virtus osint9.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-9.png)
> Ubicacion del Tori Japones en la Ciudad

Revisamos reseñas y descubrimos un restaurante “Mr. Wok” cercano, precisamente en la **dirección 83 de la Rua Galvão Bueno**.

![E-Virtus osint10.png](https://e-virtus.s3.us-east-2.amazonaws.com/blog/OSINT-10.png)
> Busca en Google del restaurante
### Estructura de la Flag
El reto pide el formato THM{streetnumber_street_name} sin mayúsculas ni caracteres adicionales.
- Primera idea: THM{83_rua_galvao_bueno} (un poco largo).
- Si es demasiado extenso, a veces se simplifica, pero en este caso la variante más probable es
```
THM{83_galvao_bueno}
```

## Conclusiones Finales
1. **Búsqueda Avanzada**: Herramientas como Google Maps y Street View fueron esenciales para cruzar nombres de calles y establecimientos.
2. **Observación de Detalles**: Leer carteles, letreros y fragmentos de dirección en imágenes puede ser la clave para resolver este tipo de retos.
3. **Cifrado Pigpen**: Un cifrado sencillo pero interesante. Reconocer sus símbolos te permite descifrar mensajes ocultos en murales o fotografías.
4. **Formato de Flags**: Asegúrate de seguir exactamente el estilo exigido por TryHackMe; basta un error en la sintaxis para que no se acepte la respuesta.
5. **Ética de OSINT**: Aunque estos desafíos se hacen en entornos controlados, recuerda que la recolección de datos reales puede tener implicaciones de privacidad. Siempre respeta los límites legales y la confidencialidad de la información ajena.
### Recursos Adicionales
- [Pigpen Cipher (Wikipedia)](https://es.wikipedia.org/wiki/Cifrado_de_Pigpen)
- Google Street View Basics
- [OSINT Framework – Recursos y guías](https://osintframework.com/)