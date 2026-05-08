# NetSuite SDF Basic Project — CI/CD con GitHub Actions1

Proyecto base de NetSuite SDF que demuestra buenas prácticas de CI/CD usando GitHub Actions: linting, tests, validación de formato de commits y flujo de aprobación en PRs.

---

## Estructura del proyecto

```
.
├── src/
│   ├── manifest.xml                          # Manifiesto SDF
│   ├── deploy.xml                            # Configuración de deployment
│   ├── FileCabinet/
│   │   └── SuiteScripts/
│   │       └── basic_sdf_project/
│   │           ├── hello_world.js            # User Event Script de ejemplo
│   │           └── utils.js                  # Módulo de utilidades (con tests)
│   └── Objects/
│       └── customrecord_basic_sdf_log.xml    # Custom Record SDF
├── tests/
│   └── utils.test.js                         # Tests unitarios (vanilla Node.js)
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                            # ESLint + Tests + XML validation
│   │   ├── commitlint.yml                    # Validación de mensajes de commit
│   │   └── pr-checks.yml                     # Título de PR + descripción
│   ├── CODEOWNERS                            # Asignación de revisores por área
│   ├── BRANCH_PROTECTION.md                  # Guía para configurar branch rules
│   └── ISSUE_TEMPLATE/
│       └── bug_report.md
├── .eslintrc.js                              # Reglas ESLint para SuiteScript 2.1
├── commitlint.config.js                      # Conventional Commits config
├── package.json
└── .gitignore
```

---

## Setup inicial

```bash
# 1. Instalar dependencias
npm install

# 2. Activar hooks de Git (Husky)
npm run prepare
```

---

## Comandos disponibles

| Comando | Descripción |
|---|---|
| `npm test` | Ejecuta tests unitarios |
| `npm run lint` | Revisa estilo y buenas prácticas con ESLint |
| `npm run lint:fix` | Corrige automáticamente los problemas corregibles |

---

## GitHub Actions (Pipelines)

### `ci.yml` — Lint & Tests
Se ejecuta en cada **PR** y **push** a `main`/`develop`.

| Job | Descripción |
|---|---|
| `ESLint` | Valida estilo y reglas de SuiteScript |
| `Unit Tests` | Ejecuta `tests/utils.test.js` |
| `Validate SDF XML Objects` | Verifica que los XML sean bien formados (`xmllint`) |

### `commitlint.yml` — Commit Messages
Valida que **todos los commits del PR** sigan [Conventional Commits](https://www.conventionalcommits.org/).

### `pr-checks.yml` — PR Quality
- Valida que el **título del PR** siga Conventional Commits.
- Exige una **descripción mínima** de 20 caracteres.

---

## Conventional Commits

Formato requerido:

```
<type>(<scope>): <descripción corta>

[cuerpo opcional]

[footer opcional]
```

**Tipos permitidos:**

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `style` | Formato, sin cambio lógico |
| `refactor` | Reestructura sin feat/fix |
| `test` | Agregar o modificar tests |
| `chore` | Dependencias, build, tooling |
| `perf` | Mejora de rendimiento |
| `ci` | Cambios en CI/CD |
| `revert` | Reversar un commit anterior |

**Ejemplos válidos:**
```
feat(sales-order): add validation for negative amounts
fix(utils): handle null value in safeParseFloat
chore: update eslint to v8.57
ci: add xml validation step to ci workflow
```

---

## Flujo de trabajo (branching)

```
feature/xxx  ──PR──►  develop  ──PR──►  main
                         ▲                ▲
                   1 reviewer       1 reviewer
                   + CI passing     + CI passing
```

1. Crear rama desde `develop`: `git checkout -b feat/my-feature`
2. Hacer commits con formato Conventional Commits
3. Abrir PR hacia `develop` con título y descripción
4. Todos los checks de CI deben pasar
5. Requiere **1 aprobación** antes de hacer merge
6. Para llegar a `main`, abrir PR desde `develop`

### Crear PR con GitHub CLI (correcto)

```bash
# Login inicial (una sola vez)
gh auth login

# Crear PR (nota: el comando correcto es "gh pr create")
gh pr create --base develop --head feat/my-feature \
      --title "feat(scope): descripcion" \
      --body "Resumen del cambio, pruebas y riesgos"
```

---

## Branch Protection Rules

Ver `.github/BRANCH_PROTECTION.md` para instrucciones detalladas de configuración en GitHub.

**Checks requeridos para merge en `main`:**
- `ESLint`
- `Unit Tests`
- `Validate SDF XML Objects`
- `Validate Commit Messages`
- `PR Title & Description`

---

## ESLint — Reglas destacadas

- `no-var` / `prefer-const` — Solo `let`/`const` (ES2020+)
- `eqeqeq` — Solo `===`, nunca `==`
- `no-eval` / `no-implied-eval` — Prohibido en NetSuite
- `semi`, `quotes: single`, `indent: 2` — Estilo consistente
- `require-jsdoc` — Documenta funciones declaradas

---

## Deployment a NetSuite

Este proyecto usa SDF (SuiteCloud Development Framework). Para deployar:

```bash
# Instalar SuiteCloud CLI (requiere Java 11+)
npm install -g @oracle/suitecloud-cli

# Autenticar
suitecloud account:setup

# Deployar
suitecloud project:deploy
```

> El deployment a NetSuite **no está automatizado** en este repo base. Se recomienda agregarlo como un workflow separado con secrets de autenticación.
