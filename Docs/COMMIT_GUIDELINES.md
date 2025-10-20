# Commit Message Guidelines - UiExpert Project

## Overview

Good commit messages help team members understand what changed, why it changed, and how it affects the project. This document defines commit message standards for the UiExpert project.

## Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Structure

1. **Type** (required): The kind of change
2. **Scope** (optional): What part of the codebase is affected
3. **Subject** (required): Short description of the change
4. **Body** (optional): Detailed explanation
5. **Footer** (optional): Breaking changes, issue references

## Commit Types

### Primary Types

#### `feat` - New Feature
New functionality or capability added to the application.

**Examples**:
```
feat: add event registration form
feat(members): implement member search functionality
feat(ui): add dark mode toggle
```

#### `fix` - Bug Fix
Fixes a bug or error in existing functionality.

**Examples**:
```
fix: correct date validation in event form
fix(auth): resolve login timeout issue
fix(members): prevent duplicate member entries
```

#### `docs` - Documentation
Changes to documentation only, no code changes.

**Examples**:
```
docs: update README with setup instructions
docs(api): add JSDoc comments to service methods
docs: create git workflow documentation
```

#### `style` - Code Style
Formatting, whitespace, semicolons, etc. No functional changes.

**Examples**:
```
style: format code with prettier
style(components): fix indentation in event-card
style: remove trailing whitespace
```

#### `refactor` - Code Refactoring
Code restructuring without changing functionality.

**Examples**:
```
refactor: extract event validation to separate service
refactor(members): simplify member card component logic
refactor: convert callback to async/await
```

#### `test` - Tests
Adding or updating tests.

**Examples**:
```
test: add unit tests for event service
test(members): add e2e tests for member registration
test: increase coverage for form validation
```

#### `chore` - Maintenance
Build process, dependencies, tooling, configuration.

**Examples**:
```
chore: update Angular to version 19.2
chore(deps): upgrade @magic-xpa/angular to 4.1200.0
chore: configure ESLint rules
```

---

### Special Types for UiExpert

#### `magic` - Magic XPA Changes
Changes to Magic XPA metadata or generated code.

**Examples**:
```
magic: add new event management program
magic(datasource): update member contact relationships
magic: regenerate Angular components from metadata
```

#### `gen` - Generated Code
Commits of auto-generated code (use sparingly).

**Examples**:
```
gen: regenerate Magic components after metadata update
gen(magic): update component-list after adding new forms
```

---

### Additional Types

#### `perf` - Performance Improvements
**Examples**:
```
perf: optimize member list query
perf(ui): lazy load event images
```

#### `build` - Build System
**Examples**:
```
build: update webpack configuration
build(angular): modify tsconfig for stricter checks
```

#### `ci` - Continuous Integration
**Examples**:
```
ci: add GitHub Actions workflow
ci: configure automated testing pipeline
```

#### `revert` - Revert Previous Commit
**Examples**:
```
revert: revert "feat: add dark mode"
```

## Subject Line Rules

1. **Use imperative mood**: "add" not "added" or "adds"
2. **Don't capitalize first letter**: "fix bug" not "Fix bug"
3. **No period at the end**: "add feature" not "add feature."
4. **Keep it under 50 characters** (hard limit: 72)
5. **Be specific and clear**: Describe what changed, not why

### Good Subject Lines ✅

```
feat: add event registration form
fix: resolve login timeout on slow connections
refactor: extract validation logic to service
docs: update API documentation
magic: add member contact program
```

### Bad Subject Lines ❌

```
Fixed stuff                    ← Not descriptive
Add new feature.              ← Has period, not specific
Updated the login form        ← Not imperative mood
FEAT: ADD DARK MODE           ← All caps
made some changes to events   ← Not imperative, vague
```

## Scope

The scope specifies what part of the codebase is affected.

### Common Scopes for UiExpert

**Angular Application**:
- `components` - Angular components
- `services` - Angular services
- `models` - Data models/interfaces
- `routing` - Routing configuration
- `ui` - UI/styling changes
- `forms` - Form-related changes

**Magic XPA**:
- `magic` - Magic XPA metadata
- `datasource` - Data sources
- `programs` - Magic programs
- `models` - Magic models

**Features**:
- `events` - Event-related functionality
- `members` - Member-related functionality
- `auth` - Authentication
- `api` - API/backend integration

**Infrastructure**:
- `build` - Build configuration
- `deps` - Dependencies
- `config` - Configuration files
- `ci` - CI/CD pipeline

### Scope Examples

```
feat(events): add event registration form
fix(members): resolve duplicate entry issue
refactor(services): extract common API logic
magic(datasource): update member relationships
chore(deps): update Angular dependencies
```

## Commit Body

Use the body to explain **what** and **why**, not **how**.

### When to Include a Body

- Complex changes that need explanation
- Breaking changes
- Changes affecting multiple areas
- Non-obvious decisions
- Important context for reviewers

### Format

- Separate from subject with blank line
- Wrap at 72 characters
- Use bullet points for multiple items
- Explain motivation and context

### Example

```
feat(events): add event registration with validation

- Implement registration form with reactive forms
- Add validation for required fields and date ranges
- Integrate with event service for data persistence
- Display confirmation message on successful registration

This addresses the need for users to self-register for events
rather than requiring admin intervention.
```

## Commit Footer

Use the footer for:
- Breaking changes
- Issue references
- Co-authors

### Breaking Changes

```
feat(api): update event API response format

BREAKING CHANGE: Event response now returns ISO date strings
instead of Unix timestamps. Update all consumers to handle
the new format.
```

### Issue References

```
fix(members): prevent duplicate entries

Fixes #123
Closes #456
Related to #789
```

### Multiple Issues

```
fix(auth): resolve multiple authentication issues

- Fix login timeout on slow connections
- Resolve token refresh race condition
- Handle expired session gracefully

Fixes #101, #102, #103
```

## Complete Examples

### Simple Feature

```
feat(events): add export to PDF button
```

### Feature with Details

```
feat(members): implement advanced search

Add multi-criteria search for member list including:
- Name (first/last)
- Email
- Registration date range
- Member status

Includes debounce on input to optimize performance.

Closes #234
```

### Bug Fix

```
fix(events): correct date validation in event form

The event form was accepting past dates for future events.
Updated validation to ensure event dates are in the future
and end date is after start date.

Fixes #567
```

### Magic XPA Update

```
magic: add member contact management program

- Created new program for contact CRUD operations
- Updated Member model with contact relationships
- Regenerated Angular components with new metadata

Generated files:
- magic-metadata/Members/MContact/MContact.json
- src/app/magic/Members/MContact_MContact/*
```

### Refactoring

```
refactor(services): extract common HTTP error handling

Moved duplicate error handling logic from individual services
to a centralized error interceptor. This reduces code duplication
and ensures consistent error handling across the application.
```

### Breaking Change

```
feat(api): update server configuration format

Changed server-config.json structure to support multiple
environments and enhanced security options.

BREAKING CHANGE: Server configuration format has changed.
Old format:
{
  "protocol": "HTTP",
  "server": "example.com"
}

New format:
{
  "environments": {
    "production": {
      "protocol": "HTTPS",
      "server": "example.com"
    }
  }
}

Migration guide: See docs/migration/server-config.md
```

### Revert

```
revert: revert "feat(events): add export to PDF"

This reverts commit abc123def456.

The PDF export feature is causing memory issues on large
event lists. Reverting until optimization is complete.

Related to #890
```

## Best Practices

### DO ✅

1. **Write clear, specific messages**
   ```
   feat(events): add event capacity limit validation
   ```

2. **Use present tense, imperative mood**
   ```
   fix: resolve login timeout issue
   ```

3. **Reference issues when applicable**
   ```
   fix(members): prevent duplicate entries

   Fixes #123
   ```

4. **Explain complex changes in body**
   ```
   refactor(services): restructure event service

   Extracted query logic into separate methods for better
   testability and reusability. Updated tests accordingly.
   ```

5. **Group related changes**
   ```
   feat(events): add event registration workflow

   - Add registration form component
   - Implement registration service
   - Add confirmation email template
   - Update event model with attendee count
   ```

### DON'T ❌

1. **Don't be vague**
   ```
   ❌ fix: bug fix
   ✅ fix(auth): resolve token expiration handling
   ```

2. **Don't use past tense**
   ```
   ❌ fixed the login bug
   ✅ fix: resolve login timeout issue
   ```

3. **Don't commit unrelated changes together**
   ```
   ❌ feat: add dark mode and fix login and update docs
   ✅ Split into 3 commits, one for each change
   ```

4. **Don't include file names in subject**
   ```
   ❌ fix: update event.service.ts
   ✅ fix(events): resolve event creation validation
   ```

5. **Don't use generic messages**
   ```
   ❌ chore: updates
   ❌ misc changes
   ❌ WIP
   ✅ chore(deps): update Angular to 19.2
   ```

## Commit Message Template

You can configure Git to use a commit template:

```bash
git config commit.template .gitmessage
```

Create `.gitmessage` file:

```
# <type>(<scope>): <subject>
# |<----  Using a Maximum Of 50 Characters  ---->|

# Explain why this change is being made
# |<----   Try To Limit Each Line to a Maximum Of 72 Characters   ---->|

# Provide links or keys to any relevant tickets, articles or other resources

# --- COMMIT END ---
# Type can be
#    feat     (new feature)
#    fix      (bug fix)
#    refactor (refactoring code)
#    style    (formatting, missing semi colons, etc; no code change)
#    docs     (changes to documentation)
#    test     (adding or refactoring tests; no production code change)
#    chore    (updating build tasks, package.json, etc; no production code change)
#    magic    (Magic XPA metadata changes)
#    perf     (performance improvements)
# --------------------
# Remember to
#    - Use the imperative mood in the subject line
#    - Do not end the subject line with a period
#    - Capitalize the subject line and each paragraph
#    - Separate subject from body with a blank line
#    - Use the body to explain what and why vs. how
#    - Can use multiple lines with "-" for bullet points in body
# --------------------
```

## Automated Validation

You can add a commit message hook to validate format. Create `.git/hooks/commit-msg`:

```bash
#!/bin/bash

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# Check commit message format
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|magic|perf|build|ci|revert)(\(.+\))?: .{1,50}"; then
    echo "Error: Commit message doesn't follow conventional commits format"
    echo "Format: <type>(<scope>): <subject>"
    echo "Example: feat(events): add registration form"
    exit 1
fi
```

## Quick Reference

| Type | Purpose | Example |
|------|---------|---------|
| feat | New feature | `feat(events): add registration form` |
| fix | Bug fix | `fix(auth): resolve login timeout` |
| docs | Documentation | `docs: update README` |
| style | Code formatting | `style: apply prettier formatting` |
| refactor | Code restructure | `refactor(services): extract validation` |
| test | Add/update tests | `test(events): add unit tests` |
| chore | Maintenance | `chore(deps): update Angular` |
| magic | Magic XPA changes | `magic: add member program` |
| perf | Performance | `perf: optimize query` |
| build | Build system | `build: update webpack config` |
| ci | CI/CD | `ci: add GitHub Actions` |
| revert | Revert commit | `revert: revert "feat: feature"` |

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)

---

*Last updated: 2025-10-20*
