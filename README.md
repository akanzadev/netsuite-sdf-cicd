# NetSuite SDF Skeleton

Plantilla base para iniciar proyectos NetSuite SDF con una estructura mínima, validaciones de calidad y flujos de CI listos para usar.

## Qué incluye

- Estructura inicial SDF en src con ejemplo funcional.
- Scripts base de SuiteScript en FileCabinet.
- Ejemplos de SuiteScript por tipo (Client, User Event, Suitelet, RESTlet, Scheduled, Map/Reduce, Workflow Action).
- Tests unitarios simples en Node.js.
- Lint con ESLint + Prettier.
- Workflows de GitHub Actions para lint, tests, validación XML y calidad de PR.

## Inicio rápido

1. Instalar dependencias.
2. Activar hooks de Git.
3. Ejecutar validaciones locales.

      npm install
      npm run prepare
      npm run lint
      npm test

## Estructura base

      .
      ├── src/
      │   ├── manifest.xml
      │   ├── deploy.xml
      │   ├── FileCabinet/
      │   │   └── SuiteScripts/
      │   │       └── basic_sdf_project/
      │   │           ├── utils.js
      │   │           └── examples/
      │   │               ├── client_script_example.js
      │   │               ├── user_event_script_example.js
      │   │               ├── suitelet_example.js
      │   │               ├── restlet_example.js
      │   │               ├── scheduled_script_example.js
      │   │               ├── map_reduce_example.js
      │   │               └── workflow_action_example.js
      │   └── Objects/
      │       └── customrecord_basic_sdf_log.xml
      ├── tests/
      │   └── utils.test.js
      ├── .github/
      │   ├── workflows/
      │   ├── BRANCH_PROTECTION.md
      │   └── COMMIT_PR_GUIDE.md
      ├── .eslintrc.js
      ├── commitlint.config.js
      ├── package.json
      └── README.md

## Comandos disponibles

| Comando | Uso |
| --- | --- |
| npm run lint | Ejecuta ESLint |
| npm run lint:fix | Corrige problemas de lint corregibles |
| npm test | Ejecuta tests unitarios |

## CI disponible

Los workflows actuales cubren:

- Lint de JavaScript.
- Tests unitarios.
- Validación de XML SDF bien formado.
- Validación de mensajes de commit.
- Validación de título y descripción de PR.

## Personalización del skeleton

Checklist sugerido al crear un proyecto nuevo desde esta base:

1. Cambiar nombre del proyecto en package.json.
2. Renombrar carpeta src/FileCabinet/SuiteScripts/basic_sdf_project.
3. Ajustar IDs y nombres de objetos SDF en src/Objects y manifest.xml.
4. Revisar reglas de protección de ramas según el flujo del equipo.
5. Ajustar CODEOWNERS y templates de issues/PR.

## Documentación de gobierno del repo

La información de reglas y convenciones se mantiene fuera de este README:

- Branch protection (ES): .github/BRANCH_PROTECTION.es.md
- Branch protection (EN): .github/BRANCH_PROTECTION.en.md
- Commit/PR naming guide (ES): .github/COMMIT_PR_GUIDE.es.md
- Commit/PR naming guide (EN): .github/COMMIT_PR_GUIDE.en.md

## Deploy a NetSuite

Esta base no automatiza el deploy productivo por defecto.

Comandos mínimos con SuiteCloud CLI:

      npm install -g @oracle/suitecloud-cli
      suitecloud account:setup
      suitecloud project:deploy

## Ejemplos de tipos de script NetSuite

Carpeta de referencia:

      src/FileCabinet/SuiteScripts/basic_sdf_project/examples

Incluye ejemplos base para:

- Client Script
- User Event Script
- Suitelet
- RESTlet
- Scheduled Script
- Map/Reduce Script
- Workflow Action Script
