# Commit, PR and Branch Naming Guide (EN)

Quick reference to keep commits and pull requests aligned with project checks.

> Commit messages are automatically validated by **commitlint** (local hook via Husky) and by the `commitlint.yml` workflow in CI. PR titles are validated by `pr-checks.yml`.

---

## 1. Commit and PR title format

Use [Conventional Commits](https://www.conventionalcommits.org):

```text
type(scope): short description in lowercase
```

| Part | Rules |
| --- | --- |
| `type` | required, lowercase, one of the values in the table below |
| `scope` | optional but recommended, lowercase, inside parentheses |
| `description` | required, no trailing period, 100 characters max total |

### Allowed types

| Type | When to use it |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructuring without feat or fix |
| `test` | Adding or updating tests |
| `chore` | Build process, dependencies, tooling |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration changes |
| `revert` | Reverts a previous commit |

---

## 2. Branch naming

Branch names are not validated by CI, but follow this convention:

```text
<type>/<kebab-case-short-topic>
```

Examples:

```text
feat/validate-customer-rfc
fix/safeparsefloat-null
ci/harden-pr-checks
docs/update-branch-protection
refactor/split-date-utils
```

---

## 3. How the workflow works

**1 task = 1 branch = as many commits as you need = 1 PR at the end.**

You do not open a PR for every commit. Work on your branch, commit as many times as you need while you progress, and open the PR only when the task is ready for review.

```bash
# 1. Create your branch (once per task)
git checkout develop
git pull origin develop
git checkout -b feat/<my-feature>

# 2. Work and commit as many times as you need
git add .
git commit -m "feat(<scope>): add script skeleton"

git add .
git commit -m "feat(<scope>): add main validation logic"

git add .
git commit -m "fix(<scope>): handle empty field edge case"

# 3. Validate locally before pushing
npm run lint:fix
npm run lint
npm test

# 4. Push and open ONE PR when the task is complete
git push origin feat/<my-feature>

gh pr create \
  --base develop \
  --title "feat(<scope>): <short description of the whole task>" \
  --body "<What changed, how it was tested, and known risks.>"
```

---

## 4. Ready-to-copy examples

### Example A — new feature

```bash
git checkout -b feat/validate-customer-rfc
git commit -m "feat(customers): add RFC format validation on customer save"
gh pr create \
  --base develop \
  --title "feat(customers): add RFC format validation on customer save" \
  --body "Adds RFC validation on customer save, including null handling and unit tests."
```

### Example B — bug fix

```bash
git checkout -b fix/safeparsefloat-null
git commit -m "fix(utils): handle null and undefined in safeParseFloat"
gh pr create \
  --base develop \
  --title "fix(utils): handle null and undefined in safeParseFloat" \
  --body "Fixes parsing edge cases and adds regression tests for null and undefined values."
```

### Example C — CI change

```bash
git checkout -b ci/validate-xml-in-ci
git commit -m "ci(actions): install libxml2-utils before XML validation"
gh pr create \
  --base develop \
  --title "ci(actions): install libxml2-utils before XML validation" \
  --body "Stabilizes XML validation by installing xmllint dependency explicitly on the runner."
```
