# Commit, PR and Branch Naming Guide (EN)

Quick reference to keep commits and pull requests aligned with project checks.

## 1) Allowed commit and PR title format

Use Conventional Commits:

```text
type(scope): short description
```

Allowed types in this repository:

- feat
- fix
- docs
- style
- refactor
- test
- chore
- perf
- ci
- revert

Notes:

- type must be lowercase.
- scope is optional in PR titles, but recommended.
- Do not end the subject with a period.
- Header max length: 100 characters.
- PR description must be at least 20 characters.

## 2) Recommended branch naming

Branch names are not linted by CI, but use this convention:

```text
<type>/<kebab-case-short-topic>
```

Examples:

- feat/validate-customer-rfc
- fix/safeparsefloat-null
- ci/harden-pr-checks
- docs/update-branch-protection
- refactor/split-date-utils

## 3) Ready-to-use examples

### Example A

- Branch: feat/validate-customer-rfc
- Commit: feat(customers): add RFC format validation on customer save
- PR title: feat(customers): add RFC format validation on customer save
- PR body: Adds RFC validation on customer save, including null handling and unit tests.

### Example B

- Branch: fix/safeparsefloat-null
- Commit: fix(utils): handle null and undefined in safeParseFloat
- PR title: fix(utils): handle null and undefined in safeParseFloat
- PR body: Fixes parsing edge cases and adds regression tests for null and undefined values.

### Example C

- Branch: ci/validate-xml-in-ci
- Commit: ci(actions): install libxml2-utils before XML validation
- PR title: ci(actions): install libxml2-utils before XML validation
- PR body: Stabilizes XML validation by installing xmllint dependency explicitly on the runner.

## 4) CLI templates

```bash
# Commit
git commit -m "feat(scope): short description"

# PR (from your branch to develop)
gh pr create \
  --base develop \
  --head feat/your-branch \
  --title "feat(scope): short description" \
  --body "What changed, how it was tested, and known risks."
```
