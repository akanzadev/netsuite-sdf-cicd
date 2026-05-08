# Branch Protection Rules (EN)

Configure these rules in GitHub > Settings > Branches for each protected branch.

## Branch: main

| Setting | Value |
| --- | --- |
| Require a pull request before merging | enabled |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | enabled |
| Require review from Code Owners | enabled (if CODEOWNERS exists) |
| Require status checks to pass before merging | enabled |
| Require branches to be up to date before merging | enabled |
| Required status checks | ESLint, Unit Tests, Validate SDF XML Objects, Validate Commit Messages, PR Title & Description |
| Require conversation resolution before merging | enabled |
| Do not allow bypassing the above settings | enabled |
| Restrict who can push to matching branches | admins / CI bot only |

## Branch: develop

| Setting | Value |
| --- | --- |
| Require a pull request before merging | enabled |
| Required approvals | 1 |
| Dismiss stale PR approvals when new commits are pushed | enabled |
| Require status checks to pass before merging | enabled |
| Required status checks | ESLint, Unit Tests, Validate SDF XML Objects, Validate Commit Messages |
| Require conversation resolution before merging | enabled |

## Configure via GitHub CLI (alternative)

```bash
# Protect main
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ESLint","Unit Tests","Validate SDF XML Objects","Validate Commit Messages","PR Title & Description"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

## Alternative ruleset (new UI)

If you use Repository Rules, create a ruleset with:

- Target: main, develop
- Enabled rules:
  - Require a pull request -> min 1 approval
  - Require status checks -> checks listed above
  - Block force pushes
  - Require linear history (optional)
  - Require signed commits (optional)
