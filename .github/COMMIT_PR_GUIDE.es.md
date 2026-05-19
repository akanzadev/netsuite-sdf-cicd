# Guía de Nombres para Rama, Commit y PR (ES)

Referencia rápida para mantener commits y PRs alineados con los checks del proyecto.

> Los mensajes de commit son validados automáticamente por **commitlint** (hook local vía Husky) y por el workflow `commitlint.yml` en CI. El título del PR es validado por `pr-checks.yml`.

---

## 1. Formato de commit y título de PR

Usa [Conventional Commits](https://www.conventionalcommits.org):

```text
type(scope): descripción corta en minúsculas
```

| Parte | Reglas |
| --- | --- |
| `type` | obligatorio, en minúsculas, uno de los valores de la tabla de abajo |
| `scope` | opcional pero recomendado, en minúsculas, entre paréntesis |
| `descripción` | obligatoria, no termina con punto, máximo 100 caracteres en total |

### Tipos permitidos

| Tipo | Cuándo usarlo |
| --- | --- |
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo cambios de documentación |
| `style` | Formato, sin cambio de lógica |
| `refactor` | Reestructuración sin feat ni fix |
| `test` | Agregar o actualizar tests |
| `chore` | Proceso de build, dependencias, tooling |
| `perf` | Mejora de rendimiento |
| `ci` | Cambios en configuración CI/CD |
| `revert` | Revierte un commit anterior |

---

## 2. Nombre de rama

No está validado por CI, pero sigue esta convención:

```text
<type>/<tema-corto-kebab-case>
```

Ejemplos:

```text
feat/validar-rfc-cliente
fix/safeparsefloat-null
ci/endurecer-pr-checks
docs/actualizar-branch-protection
refactor/separar-utils-fechas
```

---

## 3. Cómo funciona el flujo

**1 tarea = 1 rama = los commits que necesites = 1 PR al final.**

No abres un PR por cada commit. Trabajas en tu rama, haces todos los commits que necesites mientras avanzas, y abres el PR solo cuando la tarea está lista para revisión.

```bash
# 1. Crear la rama (una sola vez para esta tarea)
git checkout develop
git pull origin develop
git checkout -b feat/<mi-funcionalidad>

# 2. Trabajar y commitear cuantas veces necesites
git add .
git commit -m "feat(<scope>): primer avance"

git add .
git commit -m "feat(<scope>): agrego validación de campo vacío"

git add .
git commit -m "fix(<scope>): corrijo caso borde encontrado al probar"

# 3. Verificar localmente antes de subir
npm run lint:fix
npm run lint
npm test

# 4. Subir la rama y abrir UN solo PR cuando la tarea está lista
git push origin feat/<mi-funcionalidad>

gh pr create \
  --base develop \
  --title "feat(<scope>): <descripción corta de la tarea completa>" \
  --body "<Qué cambió, cómo se probó y riesgos conocidos.>"
```

---

## 4. Ejemplos listos para copiar

### Ejemplo A — nueva funcionalidad

```bash
git checkout -b feat/validar-rfc-cliente
git commit -m "feat(customers): add RFC format validation on customer save"
gh pr create \
  --base develop \
  --title "feat(customers): add RFC format validation on customer save" \
  --body "Se agrega validación de RFC al guardar clientes, con manejo de null y pruebas unitarias."
```

### Ejemplo B — corrección de bug

```bash
git checkout -b fix/safeparsefloat-null
git commit -m "fix(utils): handle null and undefined in safeParseFloat"
gh pr create \
  --base develop \
  --title "fix(utils): handle null and undefined in safeParseFloat" \
  --body "Se corrigen casos borde de parseo y se agregan pruebas para null y undefined."
```

### Ejemplo C — cambio de CI

```bash
git checkout -b ci/validar-xml-en-ci
git commit -m "ci(actions): install libxml2-utils before XML validation"
gh pr create \
  --base develop \
  --title "ci(actions): install libxml2-utils before XML validation" \
  --body "Se estabiliza el job de validación XML instalando la dependencia xmllint en el runner."
```
