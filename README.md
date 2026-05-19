# NetSuite SDF Skeleton

Plantilla base para iniciar proyectos NetSuite SDF con una estructura mínima, validaciones de calidad y flujos de CI listos para usar.

## Qué incluye

- Estructura inicial SDF en `src/` con ejemplo funcional.
- Scripts base de SuiteScript en `FileCabinet/`.
- Ejemplos de SuiteScript por tipo (Client, User Event, Suitelet, RESTlet, Scheduled, Map/Reduce, Workflow Action).
- Tests unitarios simples en Node.js (sin dependencias externas).
- Lint con ESLint + Prettier.
- Hooks de Git con Husky (lint automático en pre-commit).
- Workflows de GitHub Actions para lint, tests, validación XML y calidad de PR.

---

## Prerrequisitos

| Herramienta | Versión mínima | Instalación |
| --- | --- | --- |
| Node.js | 20 | https://nodejs.org |
| Git | cualquier versión reciente | https://git-scm.com |
| GitHub CLI (`gh`) | cualquier versión reciente | https://cli.github.com (opcional, para crear PRs desde terminal) |

Verifica que tienes todo antes de empezar:

```bash
node --version   # debe mostrar v20.x.x o superior
git --version
gh --version     # opcional
```

---

## Setup inicial (una sola vez)

Clona el repositorio (o úsalo como template en GitHub) y ejecuta:

```bash
# 1. Clonar
git clone https://github.com/<owner>/<repo>.git
cd <repo>

# 2. Instalar dependencias
npm install

# 3. Activar hooks de Git (Husky)
npm run prepare

# 4. Verificar que todo funciona
npm run lint
npm test
```

Si lint y tests terminan sin errores, el entorno está listo.

---

## Flujo de trabajo diario

La regla es simple: **1 tarea = 1 rama = los commits que necesites = 1 PR al final.**

No abres un PR por cada commit. Abres el PR cuando la tarea está lista para revisión.

---

### Ejemplo real: crear un script UE para validar proveedores

#### Paso 1 — Crear la rama (una sola vez para esta tarea)

```bash
git checkout develop
git pull origin develop
git checkout -b feat/validar-proveedores-ue
```

#### Paso 2 — Trabajar y commitear las veces que necesites

No hay límite de commits. Guarda tu avance con frecuencia:

```bash
# Primer avance: estructura base del script
git add .
git commit -m "feat(vendors): add user event script skeleton"

# Segundo avance: lógica de validación
git add .
git commit -m "feat(vendors): validate RFC format on vendor beforeSubmit"

# Corrección mientras desarrollas
git add .
git commit -m "fix(vendors): handle empty RFC field without throwing"
```

Cada vez que necesites puedes también validar localmente:

```bash
npm run lint:fix   # corrige formato automáticamente
npm run lint       # verifica que no haya errores
npm test           # corre los tests
```

#### Paso 3 — Abrir el PR cuando la tarea está lista

Solo cuando terminas la funcionalidad completa, subes la rama y abres **1 PR**:

```bash
git push origin feat/validar-proveedores-ue

gh pr create \
  --base develop \
  --title "feat(vendors): add vendor RFC validation UE script" \
  --body "Se agrega script User Event que valida formato de RFC al guardar proveedores. Incluye manejo de campo vacío."
```

O abre el PR manualmente en GitHub con el mismo título.

#### Paso 4 — CI automático

Al abrir el PR se ejecutan automáticamente:

| Check | Qué valida |
| --- | --- |
| ESLint | Sin errores ni warnings de lint |
| Unit Tests | Todos los tests pasan |
| Validate SDF XML Objects | XML bien formado en `src/Objects/` y `src/manifest.xml` |
| Validate Commit Messages | Todos los commits del PR siguen Conventional Commits |
| PR Title & Description | Título válido y descripción de al menos 20 caracteres |

Todos los checks deben pasar antes de poder hacer merge.

---

### Ejemplo: mejora posterior al mismo script

Misma lógica — nueva tarea, nueva rama:

```bash
git checkout develop && git pull origin develop
git checkout -b feat/validar-proveedores-internacional

# ... trabajas, haces los commits que necesites ...

git push origin feat/validar-proveedores-internacional
gh pr create \
  --base develop \
  --title "feat(vendors): support international RFC format" \
  --body "Extiende la validación para aceptar formatos de RFC de proveedores extranjeros."
```

---

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run prepare` | Activa los hooks de Git con Husky |
| `npm run lint` | Ejecuta ESLint (falla si hay errores o warnings) |
| `npm run lint:fix` | Corrige automáticamente los problemas de lint |
| `npm test` | Ejecuta los tests unitarios |

---

## Estructura del proyecto

```
.
├── src/
│   ├── manifest.xml
│   ├── deploy.xml
│   ├── FileCabinet/
│   │   └── SuiteScripts/
│   │       └── basic_sdf_project/
│   │           ├── utils.js              ← helpers reutilizables
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
│   │   ├── ci.yml
│   │   ├── commitlint.yml
│   │   └── pr-checks.yml
│   ├── BRANCH_PROTECTION.es.md
│   ├── BRANCH_PROTECTION.en.md
│   ├── COMMIT_PR_GUIDE.es.md
│   └── COMMIT_PR_GUIDE.en.md
├── .eslintrc.js
├── .prettierrc
├── commitlint.config.js
├── package.json
└── README.md
```

---

## Personalización del skeleton

Al crear un proyecto nuevo desde esta base, sigue este checklist:

```bash
# 1. Cambiar el nombre del proyecto en package.json
npm pkg set name="mi-proyecto-sdf"

# 2. Renombrar la carpeta de scripts (reemplaza mi_proyecto con tu nombre)
mv src/FileCabinet/SuiteScripts/basic_sdf_project \
   src/FileCabinet/SuiteScripts/mi_proyecto

# 3. Actualizar la referencia en el test
#    Edita tests/utils.test.js: cambia basic_sdf_project por mi_proyecto
```

Ajustes manuales adicionales:

- Actualiza `projectname` en `src/manifest.xml`.
- Ajusta IDs y nombres en `src/Objects/*.xml`.
- Revisa `CODEOWNERS` con los usuarios correctos.
- Configura las reglas de protección de ramas según `.github/BRANCH_PROTECTION.es.md`.

---

## Deploy a NetSuite

Esta base no automatiza el deploy productivo por defecto.

Pasos con SuiteCloud CLI:

```bash
# Instalar SuiteCloud CLI (una sola vez)
npm install -g @oracle/suitecloud-cli

# Configurar credenciales de la cuenta NetSuite
suitecloud account:setup

# Validar el proyecto antes de deployar
suitecloud project:validate

# Deployar a NetSuite
suitecloud project:deploy
```

---

## Ejemplos de SuiteScript por tipo

Carpeta de referencia: `src/FileCabinet/SuiteScripts/basic_sdf_project/examples/`

| Archivo | Tipo de script |
| --- | --- |
| `client_script_example.js` | Client Script |
| `user_event_script_example.js` | User Event Script |
| `suitelet_example.js` | Suitelet |
| `restlet_example.js` | RESTlet |
| `scheduled_script_example.js` | Scheduled Script |
| `map_reduce_example.js` | Map/Reduce Script |
| `workflow_action_example.js` | Workflow Action Script |

---

## Documentación de gobierno del repo

| Documento | Descripción |
| --- | --- |
| `.github/BRANCH_PROTECTION.es.md` | Reglas de protección de ramas (ES) |
| `.github/BRANCH_PROTECTION.en.md` | Branch protection rules (EN) |
| `.github/COMMIT_PR_GUIDE.es.md` | Guía de nombres para rama, commit y PR (ES) |
| `.github/COMMIT_PR_GUIDE.en.md` | Commit, PR and branch naming guide (EN) |
