<!--
Sync Impact Report:
- Version change: Initial version → 1.0.0
- New constitution created for UiExpert hybrid Magic XPA/Angular project
- Principles defined based on project documentation (CLAUDE.md, GIT_WORKFLOW.md, COMMIT_GUIDELINES.md)
- Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligned
  ✅ spec-template.md - Requirements structure compatible
  ✅ tasks-template.md - Task organization reflects principles
- No deferred placeholders - all values filled
-->

# UiExpert Project Constitution

## Core Principles

### I. Metadata-First Architecture

**The Magic XPA backend is the single source of truth for all data structures, business logic, and application metadata.**

- All changes to data models, programs, and business logic MUST originate in Magic XPA Studio
- Direct manual edits to XML files in the `Source/` directory are STRICTLY FORBIDDEN
- Angular components are generated artifacts and MUST NOT be manually modified if they have `.g.ts` suffix
- Component regeneration from Magic metadata MUST occur after any Magic XPA metadata changes
- Testing and validation MUST occur after regeneration to ensure consistency

**Rationale**: The hybrid architecture relies on Magic XPA as the authoritative source. Manual edits to generated files or XML metadata will be overwritten and create inconsistencies between backend and frontend.

### II. Separation of Concerns

**Clear boundaries MUST be maintained between Magic-managed code and Angular-managed code.**

**Magic XPA Domain** (Source/):
- XML metadata files (programs, data sources, models)
- Database schema definitions
- Business logic and workflows
- Backend integration configurations

**Angular Domain** (Angular/UiExpert/src/):
- UI styling (non-generated CSS)
- Routing configuration
- Custom Angular components (non-Magic)
- Client-side utilities and helpers

**Generated Artifacts** (Read-only):
- `magic-metadata/**/*.json` - Component metadata
- `src/app/magic/**/*.g.ts` - Generated components, controls, modules
- `component-list.g.ts`, `magic.gen.lib.module.ts` - Component registry

**What can be modified**:
- TypeScript files without `.g.ts` suffix
- HTML templates for custom (non-generated) components
- Global styles: `src/styles.css`, `src/magic-styles.css`
- Project configuration: `angular.json`, `tsconfig.json`, `tailwind.config.js`

**Rationale**: Respecting these boundaries prevents regeneration conflicts and maintains the integrity of the dual-layer architecture.

### III. Git Discipline

**All code changes MUST follow the defined Git workflow and commit message conventions.**

**Branch Strategy**:
- `develop` - Integration branch (default)
- `feature/*` - New features (from develop)
- `bugfix/*` - Bug fixes (from develop)
- `hotfix/*` - Critical production fixes (from main)
- `magic/*` - Magic XPA metadata updates (from develop)
- `release/*` - Release preparation (from develop)

**Commit Message Format**:
- Follow Conventional Commits: `<type>(<scope>): <subject>`
- Use imperative mood: "add feature" not "added feature"
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `magic`, `perf`, `build`, `ci`, `revert`
- Subject line MUST be under 50 characters (hard limit: 72)
- No period at end of subject line
- Include issue references in footer when applicable

**Code Review Requirements**:
- All code MUST be reviewed before merging to develop
- Reviewers MUST verify no manual edits to generated files
- Reviewers MUST check proper separation of Magic and Angular code
- Tests MUST pass before merge (when applicable)

**Rationale**: Consistent Git practices ensure traceability, facilitate collaboration, and prevent conflicts in the hybrid codebase where both generated and manual code coexist.

### IV. Test Coverage and Quality

**Testing is encouraged but not mandatory for all features; when implemented, tests MUST be meaningful and maintainable.**

**Testing Guidelines**:
- Unit tests for complex business logic and utilities
- Integration tests for cross-component workflows
- E2E tests for critical user journeys
- Manual testing documentation for UI changes
- Screenshot evidence for UI modifications in PRs

**Testing Tools**:
- Angular testing framework with Karma/Jasmine
- `ng test` for unit tests
- `ng test --watch=false --code-coverage` for coverage reports

**When Tests Are Required**:
- Critical data validation logic
- Authentication/authorization flows
- Complex state management
- Backend integration points
- Breaking changes or refactoring

**Rationale**: Given the generated nature of many components, comprehensive testing is pragmatic rather than absolute. Focus testing efforts on custom logic and critical paths where bugs have the highest impact.

### V. Documentation and Traceability

**All significant changes MUST be documented for future maintainability.**

**Documentation Requirements**:
- Update `CLAUDE.md` for architectural changes
- Update `TODO.md` for feature completions
- Create/update `Docs/` files for new workflows or standards
- Include JSDoc comments for complex functions
- Provide PR descriptions with:
  - What changed
  - Why it changed
  - How to test
  - Screenshots for UI changes

**Magic XPA Changes**:
- Document what changed in Magic Studio
- List generated files in commit body
- Explain impact on Angular layer
- Note any required manual steps after regeneration

**Rationale**: The hybrid architecture's complexity requires excellent documentation to help developers understand which layer to modify and how changes propagate between layers.

## Development Workflow

### Magic XPA Change Workflow

1. Make changes in Magic XPA Studio
2. Create branch: `git checkout -b magic/your-change`
3. Commit Magic XPA generated XML files with `magic:` type
4. Regenerate Angular components if needed (via Magic XPA CLI)
5. Commit generated Angular code separately with `gen:` type
6. Create PR with detailed description of Magic changes and impact
7. Request review focusing on metadata consistency
8. Merge to develop after approval

### Angular Feature Workflow

1. Create branch: `git checkout -b feature/your-feature`
2. Modify ONLY non-generated TypeScript, HTML, CSS files
3. Test changes locally with `npm start`
4. Commit changes with appropriate conventional commit type
5. Create PR with description and screenshots
6. Address review feedback
7. Merge to develop after approval
8. Delete feature branch

### Hotfix Workflow

1. Create branch from main: `git checkout -b hotfix/issue-description`
2. Apply critical fix
3. Test thoroughly
4. Create PR targeting both main AND develop
5. Fast-track review for critical issues
6. Merge to main, then merge/cherry-pick to develop
7. Tag release if applicable

## Quality Standards

### Code Quality

- Follow Angular style guide and TypeScript best practices
- Use meaningful variable and function names
- Keep functions focused and single-purpose
- Avoid deep nesting (max 3 levels)
- Use TypeScript strict mode
- Leverage Angular dependency injection
- Follow reactive programming patterns with RxJS

### UI/UX Standards

- Follow Material Design principles
- Ensure responsive design for all screen sizes
- Maintain accessibility standards (ARIA labels, keyboard navigation)
- Provide loading states for async operations
- Display user-friendly error messages
- Consistent spacing using Tailwind utilities
- Test on target browsers and devices

### Performance Standards

- Lazy load routes and modules where appropriate
- Optimize images and assets
- Use change detection strategies effectively
- Avoid memory leaks (unsubscribe from observables)
- Monitor bundle size
- Profile and optimize slow operations
- Cache API responses when appropriate

## Security and Data Protection

### Security Requirements

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for configuration
- Validate all user inputs on both client and server
- Sanitize data to prevent XSS attacks
- Follow OWASP security guidelines
- Keep dependencies updated for security patches
- Use HTTPS for production deployments

### Data Protection

- SQLite database file MUST be in `.gitignore`
- Backup database before schema migrations
- Test data migrations on copies, not production data
- Document database schema changes
- Use Magic XPA data source definitions for schema

## Governance

### Constitution Authority

This constitution is the authoritative governance document for the UiExpert project. In case of conflict between this document and other project practices, this constitution takes precedence.

### Amendment Process

1. Propose amendment via GitHub issue or PR
2. Discuss with team members and stakeholders
3. Document rationale and impact
4. Update constitution with version bump (MAJOR/MINOR/PATCH)
5. Update dependent templates and documentation
6. Require approval from project maintainers
7. Announce changes to team

### Compliance Verification

- All pull requests MUST be reviewed for constitutional compliance
- Code reviews MUST verify:
  - No manual edits to generated files
  - Proper branch naming and commit messages
  - Separation of concerns maintained
  - Documentation requirements met
  - Security standards followed

### Complexity Justification

Any practice that violates or extends these principles MUST be explicitly justified with:
- Clear business or technical rationale
- Explanation of why simpler alternatives are insufficient
- Documentation of the exception
- Plan for eventual alignment (if applicable)

### Version Control

This constitution uses semantic versioning:
- **MAJOR**: Backward-incompatible governance changes, principle removals/redefinitions
- **MINOR**: New principles added, material expansions of existing guidance
- **PATCH**: Clarifications, wording improvements, typo fixes

**Version**: 1.0.0 | **Ratified**: 2025-11-20 | **Last Amended**: 2025-11-20
