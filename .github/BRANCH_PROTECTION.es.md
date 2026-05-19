# Reglas de Protección de Ramas (ES)

Configura estas reglas en GitHub después de crear el repositorio. Solo se hace una vez y no cambia con el código.

> Ruta en GitHub: **Settings → Branches → Add branch ruleset** (o Branch protection rules en repos sin Rulesets).

---

## Rama: `main`

Producción. Solo recibe merges desde `develop` a través de PR aprobado.

| Setting | Valor |
| --- | --- |
| Require a pull request before merging | ✅ activado |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | ✅ activado |
| Require review from Code Owners | ✅ activado (si hay CODEOWNERS) |
| Require status checks to pass before merging | ✅ activado |
| Require branches to be up to date before merging | ✅ activado |
| Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages`, `PR Title & Description` |
| Require conversation resolution before merging | ✅ activado |
| Do not allow bypassing the above settings | ✅ activado |
| Restrict who can push to matching branches | solo admins / CI bot |

## Rama: `develop`

Integración. Recibe PRs de ramas de feature/fix.

| Setting | Valor |
| --- | --- |
| Require a pull request before merging | ✅ activado |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | ✅ activado |
| Require status checks to pass before merging | ✅ activado |
| Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages` |
| Require conversation resolution before merging | ✅ activado |

---

## Configurar via GitHub CLI

Reemplaza `OWNER` y `REPO` con el usuario/organización y nombre del repositorio.

```bash
# Proteger main
gh api repos/OWNER/REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages","PR Title & Description"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# Proteger develop
gh api repos/OWNER/REPO/branches/develop/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

---

## Alternativa: Repository Rulesets (nuevo UI)

Si el repositorio usa Repository Rules en lugar de Branch Protection clásico:

1. Ve a **Settings → Rules → Rulesets → New ruleset**.
2. Nombre: `protect-main-develop`.
3. Target branches: `main`, `develop`.
4. Activa estas reglas:

| Regla | Configuración |
| --- | --- |
| Require a pull request | Mínimo 1 aprobación |
| Require status checks | Los checks de la tabla de arriba según la rama |
| Block force pushes | ✅ activado |
| Require linear history | opcional |
| Require signed commits | opcional |
