# Branch Protection Rules (EN)

Configure these rules in GitHub after creating the repository. This is a one-time setup that does not change with the code.

> Path in GitHub: **Settings → Branches → Add branch ruleset** (or Branch protection rules for repos without Rulesets).

---

## Branch: `main`

Production. Only receives merges from `develop` via an approved PR.

| Setting | Value |
| --- | --- |
| Require a pull request before merging | ✅ enabled |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | ✅ enabled |
| Require review from Code Owners | ✅ enabled (if CODEOWNERS exists) |
| Require status checks to pass before merging | ✅ enabled |
| Require branches to be up to date before merging | ✅ enabled |
| Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages`, `PR Title & Description` |
| Require conversation resolution before merging | ✅ enabled |
| Do not allow bypassing the above settings | ✅ enabled |
| Restrict who can push to matching branches | admins / CI bot only |

## Branch: `develop`

Integration branch. Receives PRs from feature/fix branches.

| Setting | Value |
| --- | --- |
| Require a pull request before merging | ✅ enabled |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | ✅ enabled |
| Require status checks to pass before merging | ✅ enabled |
| Required status checks | `ESLint`, `Unit Tests`, `Validate SDF XML Objects`, `Validate Commit Messages` |
| Require conversation resolution before merging | ✅ enabled |

---

## Configure via GitHub CLI

Replace `OWNER` and `REPO` with the user/organization and repository name.

```bash
# Protect main
gh api repos/OWNER/REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages","PR Title & Description"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# Protect develop
gh api repos/OWNER/REPO/branches/develop/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

---

## Alternative: Repository Rulesets (new UI)

If the repository uses Repository Rules instead of classic Branch Protection:

1. Go to **Settings → Rules → Rulesets → New ruleset**.
2. Name: `protect-main-develop`.
3. Target branches: `main`, `develop`.
4. Enable these rules:

| Rule | Configuration |
| --- | --- |
| Require a pull request | Minimum 1 approval |
| Require status checks | The checks from the table above, per branch |
| Block force pushes | ✅ enabled |
| Require linear history | optional |
| Require signed commits | optional |
