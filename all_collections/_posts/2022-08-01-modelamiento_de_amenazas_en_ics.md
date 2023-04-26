---
author: hector_norambuena
layout: post
title: Modelamiento de amenazas en ICS
date: 2022-08-01
categories: [Ciberseguridad, ICS, Ciberseguridad industrial, IEC_62443]
---

Malware en un entorno industrial

![Modelo_Purdue_y_Principios_Ciberseguridad](https://e-virtus.s3.us-east-2.amazonaws.com/Modelo_Purdue_y_Principios_Ciberseguridad_pptx_d2e450c43a.png)

Quiero compartir una investigación que desarrollé en el Máster de Ciberseguridad Industrial del CCI, el cual expone claramente que los ciberdelincuentes ya tienen como foco los ambientes operacionales, de hecho ya existen desarrollos de malware específicos para ICS, de igual manera han puesto foco en los entornos ICS los fabricantes de plataformas de ciberseguridad, así como el framework de Mitre Att&ck, que ya cuenta con una matriz para ICS de TTPs (Tácticas, Técnicas y Procedimientos).

El modelado de amenazas es un proceso para optimizar la seguridad de aplicaciones, sistemas y procesos de negocios mediante la identificación de objetivos y vulnerabilidades, y luego la definición y priorización de contramedidas para prevenir o mitigar los efectos de las amenazas al sistema.

El modelado de amenazas ayuda a identificar los requisitos de seguridad de un sistema o proceso, cualquier cosa que sea de misión crítica, sensible al procesamiento o compuesta de datos valiosos. Es un proceso sistemático y estructurado que tiene como objetivo identificar amenazas y vulnerabilidades potenciales para reducir el riesgo de los recursos. También ayuda a los administradores a comprender el impacto de las amenazas, cuantificar su gravedad e implementar controles.

Este trabajo tiene como fuentes una alerta publicada por la agencia federal de Seguridad de Infraestructura y Ciberseguridad de EE.UU. CISA, la alerta AA22-103A de fecha 13 de abril del 2022 y la investigación desarrollada por la empresa Dragos “Chernovite’s Emerging Malware Targeting Industrial Control Systems”.

En el documento se explica en detalle el caso de un ciberataque, usando el malware PIPEDREAM, su estructura modular y zonas del modelo de Purdue donde aplican, como se aprecia en la siguiente figura.

![Componentes Malware Pipedream](https://e-virtus.s3.us-east-2.amazonaws.com/8440_A008_4_D34_4101_93_EF_48_F3_B953_EF_7_B_984e4cd822.jpeg)

**Análisis a través del framework de Mitre Att&ck, para el modelamiento de las TTPs empleadas.**

![Flujo Matriz Mitre Att&ck con attack-navigator](https://e-virtus.s3.us-east-2.amazonaws.com/64570_A7_B_4_F1_C_41_A4_958_B_D8_DC_14201_A3_B_e001e6d81d.jpeg)

[En este link puedes ver el documento completo.](https://e-virtus.s3.us-east-2.amazonaws.com/Modelamiento_de_Amenazas_en_ICS_bef7bcaba5.pdf){:target="\_blank"}
