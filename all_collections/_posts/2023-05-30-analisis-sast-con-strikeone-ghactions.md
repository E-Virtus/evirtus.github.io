---
author: alejandro_hermosilla
layout: post
title: Análisis SAST en GitHub Actions con StrikeOne
date: 2023-05-30
categories: [DevSecOps, CI/CD, SAST]
---

Dentro del ciclo DevSecOps es importante el uso de un CI/CD para poder agilizar las integraciones y despliegues de un proyecto, pero también es importante tener un nivel de seguridad dentro del código donde se tienen que cumplir ciertos estándares a nivel organizacional como a nivel general del código.

El análisis **SAST**, o bien **"Análisis de código estático"**, son las pruebas de _caja blanca_ del código fuente de la aplicación, es decir que el código no está en tiempo de ejecución.

En StrikeOne es posible realizar este análisis, invocando dentro de un pipeline del CI/CD que esté ocupando tu organización, ya sea; GitHub Actions, GitLab CI/CD, Azure DevOps, Bitbucket pipelines, Jenkins, entre otros...

Herramientas disponibles en StrikeOne
| Secrets | SCA | SAST | DAST |
|--|--|--|--|
| GitLeaks | OWASP Dependency-Check | SonarQube, Horusec | OWASP ZAP, OpenVAS, Nuclei

En primera instancia nos logueamos dentro de StrikeOne con nuestras credenciales.
![Login StrikeOne](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_login_26_05_2023.png)

Vamos al módulo ScanOne, apartado Vulnerability Management > Assets
![Assets StrikeOne](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_assets_26_05_2023.png)

Creamos un nuevo Asset (correspondiente a una aplicación)
![Nuevo Asset](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_new_asset_26_05_2023.png)

Vamos a los "detalles"
![Asset Creado](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_asset_list_26_05_2023.png)

Creamos un nuevo Dominio, que se asociará posteriormente el **Scan**
![Nuevo Dominio](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_new_domain_26_05_2023.png)

Creamos un nuevo Scan, donde se almacenarán los resultados de los tests de seguridad
![Nuevo Scan](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_new_scan_26_05_2023.png)

Debemos crear un API_KEY dentro de StrikeOne para acceder al uso de los tests.
My Account > Integrations > API Tokens
![Nueva API KEY StrikeOne](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_new_api_token_26_05_2023.png)

Ahora podemos configurar nuestro pipeline dentro de GitHub Actions:

- Guardamos como Secret nuestra API Token de StrikeOne
  ![Nuevo Secret GitHub](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_secret_ghactions_26_05_2023.png)

- Creamos un nuevo "Workflow"
  ![Nuevo workflow GHActions](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_new_action_26_05_2023.png)

- Insertamos el siguiente pipeline
```
name: StrikeOne Scan

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  execute_so_test:

    runs-on: ubuntu-latest

    steps:
    - name: StrikeOne Test Execution
      id: strikeone_test_execution
      uses: fjogeleit/http-request-action@v1
      with:
        url: "https://assessment.strikeone.io/api/vm/tests/external/execute"
        method: "POST"
        customHeaders: '{"Content-Type": "application/json"}'
        bearerToken: ${{ secrets.SO_API_TOKEN }}
        data: '{"externalData": { "parsedDomainId": "188800312", "parsedScanId": "188800401", "tool": "sonarqube", "testName": "Test SonarQube from GitHub Actions" }, "toolData": { "projectUrl": "https://github.com/aleHRevirtus/DVWA.git", "projectName": "DVWA" }}'
    - name: Show Response
      run: |
        echo ${{ steps.strikeone_test_execution.outputs.response }}
```

Desglose:

- parsedDomainId: ID perteneciente al dominio ingresado en StrikeOne. ![parsedDomainId](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_id_domain_26_05_2023.png)
- parsedScanId: ID perteneciente al scan ingresado en StrikeOne. ![parsedScanId](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_id_scan_26_05_2023.png)
- tool: Herramienta utilizada para el test.
  - openvas
  - owasp_zap
  - sonarqube
  - dep_check (OWASP Dependency-Check)
  - nuclei
  - gitleaks
  - horusec
- testName: Nombre que se asociará el nuevo test.
- projectUrl: URL del repositorio (https://github.com/aleHRevirtus/DVWA.git) (https://user:token@github.com/aleHRevirtus/DVWA.git en caso de que el repositorio sea privado)
- projectName: Nombre del repositorio (DVWA)

Resultado de pipeline:
![Resultado pipeline](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_success_pipeline_26_05_2023.png)

Resultado en StrikeOne:
![Resultado test en StrikeOne](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_result_test_26_05_2023.png)

Lista de vulnerabilidades (visión general):
![Lista de vulnerabilidades](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_list_vulns_25_05_2023.png)

Una vez teniendo los resultados y las vulnerabilidades encontradas, es hora de priorizar las vulnerabilidades, según su severidad e impacto. Por ejemplo las vulnerabilidades de severidad Crítica y/o Alta deberían remediarse lo antes posible, comúnmente se pre-define un SLA. 

Podemos priorizar la vulnerabilidad deseada, una vez haya sido confirmada dentro del código.
![Modificar Vulnerabilidad](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_mod_vuln_26_05_2023.png)
![Modificar Vulnerabilidad](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_prioritize_vuln_26_05_2023.png)
![Modificar Vulnerabilidad](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_update_vuln_26_05_2023.png)

Una vez priorizada, podemos ir al apartado OWASP, para ver solo las vulnerabilidades priorizadas, que se le darán mayor importancia.
![Vista OWASP](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_owasp_view_26_05_2023.png)

Podrás subir evidencia que respalde la vulnerabilidad y si tienes conectada tu cuenta de Jira podrás crear un ticket en tu tablero de Ciberseguridad.
![Subir evidencia](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_upload_evidence_26_05_2023.png)
![Asignar ticket de Jira](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_jira_issue_26_05_2023.png)

![StrikeOne](https://e-virtus.s3.us-east-2.amazonaws.com/blog/analisis_sast_strikeone_logo_26_05_2023.png)