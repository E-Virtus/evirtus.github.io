---
author: hector_norambuena
layout: post
title: Modelo de Purdue y los Principios de Ciberseguridad Industrial
date: 2021-05-24
categories:
  [Ciberseguridad industrial, ICS, Industria_4_0, ISA_95, ISA_99, IEC_62443]
---

Ciberseguridad aplicada a entornos ICS

![about](https://e-virtus.s3.us-east-2.amazonaws.com/about_5f2b38d770.png)

Cabe recordar que la creación del estándar [ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95) por parte de la Sociedad Internacional de Automatización (ISA, International Society of Automation) data de 1990 y su objetivo fue facilitar la integración de los sistemas de control y las funciones empresariales en las empresas productivas, basadas en el modelo de referencia de Purdue para CIM (Computer Integrated Manufacturing, Manufactura Integrada por Computador), en su creación claramente no estaba presente el concepto de “**Industria 4.0**” (Feria de Hannover, 2011) o de la “**Transformación Digital**”, tan en auge en estos días.

Si bien es cierto, el Modelo Purdue aportó seguridad en la comunicación gracias a su separación en capas y a la definición de cómo las máquinas y los procesos deben funcionar e interactuar, es en el año 2007 cuando se materializa la preocupación por la seguridad de los sistemas de control industrial con la publicación por parte del comité ISA-99: ANSI / ISA-99.01.01-2007 “Seguridad para sistemas de control y automatización industrial: conceptos, terminología y modelos”. Primer documento de una serie hasta el 2010, año en que la numeración de ISA 99 cambió a ANSI / ISA-62443 para estar en línea con la nomenclatura de documentos IEC (International Electrotechnical Commission / Comisión Electrotécnica Internacional). La IEC emplea como base la ISA-99, así como otras organizaciones y comités enviaron aportes a los grupos de trabajo de IEC y ayudaron a dar forma a [IEC-62443](https://www.iec.ch/cyber-security).

El propósito final de ambas normativas es mejorar la seguridad de los sistemas de control industrial, creando así una serie de documentos que ayudarán a incrementar la protección de estos sistemas durante los ciberataques, ayudando a identificar vulnerabilidades y abordarlas, reduciendo así el riesgo de comprometer la información confidencial o causar la degradación o falla de los procesos operacionales.

La prioridad en los entornos industriales es la continuidad operacional (**Disponibilidad**) y toda medida no debe intervenir el normal funcionamiento de los sistemas ICS, además la **integridad** de los datos pasa a ser crítica ya que cualquier alteración en los parámetros, por ejemplo, un cambio en los niveles de sulfuros podría generar un colapso general de una planta de tratamiento de aguas industriales, otros ejemplos a considerar como ciberataques a hospitales o a una planta de energía los cuales afectarían directamente el bienestar físico de las personas ya que las empresas afectadas no podrían entregar servicios básicos como agua, alimentos o atención médica.

Estas normativas explican diferentes principios básicos que deben tenerse en cuenta para todos los roles en todas las actividades, en esta oportunidad me voy a referir a dos ([ISA-SPAIN.ORG](https://isa-spain.org/diseno-de-zonas-conductos-y-canales-segun-la-normativa-iec-62443-isa99-en-una-industria-4-0-2a-parte/?cn-reloaded=1)):

1. 1 Zonas, Conductos y Canales
2. 2 Defensa en profundidad

**Zonas, Conductos y Canales**

La Ciberseguridad es clave en entornos de Industria 4.0. Dentro de la primera arquitectura de referencia para la Industria 4.0 (RAMI 4.0) se identifica la norma IEC 62443 como el marco de referencia para que la transición de una industria automatizada a una industria inteligente se realice de forma segura. Esta norma define los conceptos de **zona, conducto y canal** como elementos clave para que los activos que concurren en un entorno industrial dispongan de los niveles de seguridad adecuados.

**- Zonas:** Una zona (o zona de seguridad) es una agrupación de activos (dispositivos, datos, aplicaciones) físicos o lógicos que comparten los mismos requisitos de seguridad.

Una zona lleva implícito un borde o límite que determina los activos incluidos y por defecto los excluidos.

Una zona puede ser de confianza o no (trusted/untrusted).

Una zona puede contener activos independientes y/o subzonas (hijas) que hereden los requisitos de seguridad de la zona madre.

Si un activo tiene diferentes niveles de seguridad, este puede incluirse en la zona con mayor nivel de seguridad o crear una zona específica para su acceso por parte de los diferentes roles.

**- Conductos:** Un conducto (o conducto de seguridad) es un tipo de zona de seguridad que agrupa activos vinculados tradicionalmente a la electrónica de red (switches, routers, firewalls, cables, hubs, repetidores, etc.). Es decir, habitualmente se equipará un conducto con la red que une los diferentes activos de una zona o que permite comunicar/intercambiar información entre diferentes zonas de seguridad.

Un conducto puede ser una agrupación física o lógica de dispositivos y elementos de red.

Un conducto puede ser de confianza o no (trusted/untrusted). Normalmente, los de confianza son los que no cruzan las barreras de las zonas. Los de no confianza son los que comunican diferentes zonas con distintos requisitos de seguridad (aunque lo que se deberá́ procurar es que este conducto sea de confianza).

Un conducto no puede tener subzonas ni puede estar formado por subconductos, ahora bien, una subzona puede contener diferentes subconductos.

**- Canales:** Un canal es la forma lógica de comunicar diferentes zonas, por lo tanto, se asocia físicamente con un conducto.

Un canal puede ser de confianza o no (trusted/untrusted). Un canal trusted permite ampliar una zona de seguridad lógica. Es decir, permitiría incluir activos externos que están fuera de la zona de seguridad cumpliendo con los requisitos de seguridad de la zona. Un canal untrusted, por el contrario, implica que antes de comunicar dos zonas, es necesario realizar una validación de seguridad.

En este contexto para definir una zona en una Industria 4.0 se deben considerar las siguientes dimensiones:

1. Atributos de seguridad.
2. Activos físicos y lógicos.
3. Tecnologías autorizadas.
4. Evaluación de amenazas y vulnerabilidades.
5. Requerimientos de acceso y control.
6. Procedimientos de control y mejora continua.

**Defensa en profundidad (Defense in Depth, DiD)**

Dentro de los conceptos fundamentales definidos en la ISA/IEC 62443 están los criterios de diseño, entre los cuales se encuentra la defensa en profundidad.

La defensa en profundidad se define como la provisión de múltiples protecciones de seguridad, especialmente en capas, con la intención de retrasar o prevenir un ataque.

Defensa en profundidad implica capas de seguridad y detección, incluso en sistemas únicos, y requiere que los atacantes atraviesen múltiples capas sin ser detectados. El IACS (Industrial Automation and Control Systems) sigue estando protegido incluso si una vulnerabilidad en una capa está comprometida. Se debe prestar especial atención a una vulnerabilidad única que permita el compromiso potencial de múltiples capas.

Defense in Depth (DiD), se correlaciona con medidas de detección y protección diseñadas para impedir el progreso de un ciber-intruso al tiempo que permite a una organización detectar y responder a la intrusión con el objetivo de reducir y mitigar las consecuencias de una infracción.

La defensa en profundidad es una combinación de tareas que deben incluir conocimiento de amenazas, vulnerabilidades, estándares y contramedidas para proteger a las personas, la tecnología, y las operaciones que componen un ICS.

Muchas organizaciones están preocupadas por el aumento de incidentes de ciberseguridad en entornos ICS/OT, más aún aquellas consideradas como infraestructuras críticas, como son las empresas generadoras eléctricas, agua, centrales nucleares, salud, transporte y otros.

Organismos normativos independientes como ISA o gubernamentales como CISA se hacen cargo de esta necesidad y proponen mejoras y buenas practicas en la implementación de soluciones de defensa en profundidad como:

- **Programa de gestión de riesgos:** Identificar amenazas, Caracterizar el riesgo, Mantener inventario de activos.

- **Arquitectura de Ciberseguridad:** Estándares / Recomendaciones, Políticas, Procedimientos.
- **Seguridad Física:** Electrónica de campo bloqueada, Controles de acceso al centro de control, Vídeo remoto del sitio, controles de acceso, barreras.
- **Arquitectura de red ICS:** Zonas de arquitectura común, Zonas desmilitarizadas (DMZ), LAN virtuales.
- **Seguridad del perímetro de la red ICS:** Firewalls/Diodos unidireccionales, Acceso remoto y Autenticación, Servidores y Hosts de salto.
- **Seguridad de Host:** Gestión de vulnerabilidades y Parchado, Dispositivos de campo, Máquinas virtuales.
- **Monitoreo de seguridad:** Sistemas de Detección de Intrusos (IDS), Registros de auditorias de seguridad, - Monitoreo de incidentes y eventos de seguridad
- **Gestión de Proveedores:** Gestión de la cadena de suministros (Supply Chain), Servicios - Gestionados/Outsourcing, Aprovechar los servicios en la nube.
- **Elemento humano:** Políticas, Procedimientos, Capacitación y Concienciación.

Las organizaciones deben usar estas soluciones y estrategias en combinación para crear capas de defensas, habilitando la funcionalidad ICS al tiempo que brindan la mayor cantidad de protección robusta disponible para activos críticos.

![Modelo_Purdue_y_Principios_Ciberseguridad](https://e-virtus.s3.us-east-2.amazonaws.com/Modelo_Purdue_y_Principios_Ciberseguridad_pptx_e5572a6c24.png)
_Fig. 1: Arquitectura de red segura recomendada por CISA. Segmentación de zonas de arquitectura empresarial e ICS._
