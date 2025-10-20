# Branch Naming Conventions - UiExpert Project

## Overview

Consistent branch naming improves collaboration, makes it easier to understand what each branch does, and helps automate workflows. This document defines the branch naming conventions for the UiExpert project.

## General Format

```
<type>/<description>
```

or with issue tracking:

```
<type>/<issue-number>-<description>
```

### Rules

1. **Lowercase only** - All branch names must be lowercase
2. **Use hyphens** - Separate words with hyphens (`-`), not underscores or spaces
3. **Be descriptive** - Use clear, concise descriptions
4. **Keep it short** - Aim for 2-4 words in description
5. **No special characters** - Only use letters, numbers, hyphens, and forward slashes

## Branch Types

### 1. Feature Branches

**Purpose**: New features or enhancements

**Format**: `feature/<description>` or `feature/<issue>-<description>`

**Examples**:
```
feature/event-registration
feature/member-search
feature/123-dark-mode
feature/456-export-to-pdf
feature/email-notifications
```

**Usage**:
- New functionality
- Enhancements to existing features
- UI improvements
- New components

---

### 2. Bugfix Branches

**Purpose**: Bug fixes for non-production code

**Format**: `bugfix/<description>` or `bugfix/<issue>-<description>`

**Examples**:
```
bugfix/login-validation
bugfix/date-format-error
bugfix/789-memory-leak
bugfix/101-form-submission
```

**Usage**:
- Fixing bugs in develop branch
- Addressing issues found in testing
- Non-critical bug fixes

---

### 3. Hotfix Branches

**Purpose**: Critical fixes for production code

**Format**: `hotfix/<version>-<description>` or `hotfix/<description>`

**Examples**:
```
hotfix/1.0.1-security-patch
hotfix/critical-data-loss
hotfix/payment-failure
hotfix/2.1.3-auth-bypass
```

**Usage**:
- Critical production bugs
- Security vulnerabilities
- Data integrity issues
- Urgent fixes that can't wait for next release

---

### 4. Release Branches

**Purpose**: Preparing for a new production release

**Format**: `release/<version>`

**Examples**:
```
release/1.0.0
release/2.1.0
release/3.0.0-beta
```

**Usage**:
- Preparing for production deployment
- Final testing and QA
- Version bumps
- Release documentation

---

### 5. Magic XPA Metadata Branches

**Purpose**: Changes from Magic XPA Studio (specific to this project)

**Format**: `magic/<description>`

**Examples**:
```
magic/add-event-program
magic/update-datasource
magic/member-form-changes
magic/new-report-program
```

**Usage**:
- XML metadata updates from Magic XPA Studio
- New programs created in Magic
- Data source modifications
- Model updates

---

### 6. Documentation Branches

**Purpose**: Documentation-only changes

**Format**: `docs/<description>`

**Examples**:
```
docs/api-documentation
docs/setup-guide
docs/update-readme
docs/architecture-diagrams
```

**Usage**:
- README updates
- Documentation files
- Code comments improvements
- Architecture documentation

---

### 7. Refactoring Branches

**Purpose**: Code refactoring without changing functionality

**Format**: `refactor/<description>`

**Examples**:
```
refactor/event-service
refactor/cleanup-imports
refactor/extract-utilities
refactor/optimize-queries
```

**Usage**:
- Code restructuring
- Performance improvements
- Code cleanup
- Removing technical debt

---

### 8. Testing Branches

**Purpose**: Adding or updating tests

**Format**: `test/<description>`

**Examples**:
```
test/event-component
test/member-service
test/e2e-registration
test/unit-coverage
```

**Usage**:
- Adding unit tests
- E2E test scenarios
- Test infrastructure
- Improving test coverage

---

### 9. Chore/Maintenance Branches

**Purpose**: Maintenance tasks, dependency updates, tooling

**Format**: `chore/<description>`

**Examples**:
```
chore/update-dependencies
chore/upgrade-angular
chore/configure-linter
chore/cleanup-build
```

**Usage**:
- Dependency updates
- Build configuration
- CI/CD changes
- Development tooling

---

## Branch Naming Best Practices

### DO ✅

```
feature/event-registration          ← Clear, concise
bugfix/123-login-error             ← Includes issue number
magic/add-member-program           ← Specific to Magic XPA
hotfix/1.2.1-security-patch        ← Version and description
```

### DON'T ❌

```
Feature/Event-Registration         ← Wrong: Uppercase
feature/event_registration         ← Wrong: Underscores
feature/add-a-new-event-registration-form-with-validation  ← Wrong: Too long
fix/bug                           ← Wrong: Not descriptive
johns-branch                      ← Wrong: Personal name, no type
temp-fix                          ← Wrong: No type, vague
```

## Special Cases

### Personal/Experimental Branches

If you need personal experimental branches:

**Format**: `experiment/<your-name>/<description>`

**Examples**:
```
experiment/john/new-architecture
experiment/sarah/performance-test
```

**Note**: These should not be merged to develop without review.

### Dependency Update Branches

**Format**: `deps/<package-name>` or `chore/update-<package>`

**Examples**:
```
deps/angular-19
chore/update-magic-xpa
deps/security-patches
```

## Integration with Issue Tracking

If using GitHub Issues, Jira, or other issue trackers:

**Format**: `<type>/<issue-number>-<short-description>`

**Examples**:
```
feature/PROJ-123-event-export
bugfix/GH-456-date-validation
hotfix/JIRA-789-critical-fix
```

**Benefits**:
- Automatic linking to issues
- Easy tracking of branch purpose
- Better project management integration

## Branch Lifecycle

### 1. Create Branch
```bash
git checkout develop
git pull
git checkout -b feature/my-new-feature
```

### 2. Work on Branch
```bash
# Make changes
git add .
git commit -m "feat: implement new feature"
git push origin feature/my-new-feature
```

### 3. Keep Updated
```bash
git checkout develop
git pull
git checkout feature/my-new-feature
git merge develop
```

### 4. Merge and Delete
```bash
# After PR is merged
git checkout develop
git pull
git branch -d feature/my-new-feature
git push origin --delete feature/my-new-feature
```

## Quick Reference Table

| Type | Format | Branch From | Merge To | Example |
|------|--------|-------------|----------|---------|
| Feature | `feature/<desc>` | develop | develop | `feature/event-registration` |
| Bugfix | `bugfix/<desc>` | develop | develop | `bugfix/login-error` |
| Hotfix | `hotfix/<desc>` | main | main + develop | `hotfix/1.0.1-patch` |
| Release | `release/<version>` | develop | main + develop | `release/2.0.0` |
| Magic | `magic/<desc>` | develop | develop | `magic/add-program` |
| Docs | `docs/<desc>` | develop | develop | `docs/update-readme` |
| Refactor | `refactor/<desc>` | develop | develop | `refactor/cleanup` |
| Test | `test/<desc>` | develop | develop | `test/add-unit-tests` |
| Chore | `chore/<desc>` | develop | develop | `chore/update-deps` |

## Validation Script (Optional)

You can add a Git hook to validate branch names. Create `.git/hooks/pre-push`:

```bash
#!/bin/bash

branch_name=$(git symbolic-ref --short HEAD)
valid_pattern="^(feature|bugfix|hotfix|release|magic|docs|refactor|test|chore|experiment)/[a-z0-9-]+$"

if ! [[ $branch_name =~ $valid_pattern ]]; then
    echo "Error: Invalid branch name '$branch_name'"
    echo "Branch names must match: $valid_pattern"
    exit 1
fi
```

---

*Last updated: 2025-10-20*
