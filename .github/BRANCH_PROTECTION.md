# Branch Protection Rules

Configure estas reglas en **GitHub > Settings > Branches** para cada rama protegida.

---

## Rama: `main`

| Setting | Value |
|---|---|
| **Require a pull request before merging** | ✅ enabled |
| — Required approvals | **1** |
| — Dismiss stale PR approvals when new commits are pushed | ✅ enabled |
| — Require review from Code Owners | ✅ enabled (si hay CODEOWNERS) |
| **Require status checks to pass before merging** | ✅ enabled |
| — Require branches to be up to date before merging | ✅ enabled |
| — Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages`, `PR Title & Description` |
| **Require conversation resolution before merging** | ✅ enabled |
| **Do not allow bypassing the above settings** | ✅ enabled |
| **Restrict who can push to matching branches** | Solo admins / CI bot |

---

## Rama: `develop`

| Setting | Value |
|---|---|
| **Require a pull request before merging** | ✅ enabled |
| — Required approvals | **1** |
| — Dismiss stale PR approvals when new commits are pushed | ✅ enabled |
| **Require status checks to pass before merging** | ✅ enabled |
| — Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages` |
| **Require conversation resolution before merging** | ✅ enabled |

---

## Configurar via GitHub CLI (alternativa)

```bash
# Proteger main
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages","PR Title & Description"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

---

## Ruleset alternativo (GitHub Enterprise / nuevo UI)

Si usas **Repository Rules** (nuevo sistema), crea un ruleset con:

- **Target**: `main`, `develop`
- **Rules habilitadas**:
  - `Require a pull request` → min 1 approval
  - `Require status checks` → los 5 checks de arriba
  - `Block force pushes`
  - `Require linear history` (opcional, evita merge commits)
  - `Require signed commits` (opcional)
