# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Project Type**: Hybrid Magic XPA + Angular web application
**Backend**: Magic XPA (low-code platform) with SQLite database
**Frontend**: Angular 19 with Angular Material and Tailwind CSS
**Architecture**: Dual-layer with metadata-driven code generation

**Key Technologies**:
- Magic XPA 4.12 - Backend metadata and business logic
- Angular 19.2 - Frontend framework
- @magic-xpa/angular@4.1200.0 - Magic-Angular integration
- Angular Material - UI component library
- Tailwind CSS - Utility-first styling
- SQLite - Database (UiExpert.SQLite)

**Testing**: Angular testing framework with Karma/Jasmine (`ng test`)
**Build**: Angular CLI (`ng build`)
**Dev Server**: `npm start` (runs at http://localhost:4200/)

**Code Generation Flow**:
1. Magic XPA Studio → XML metadata (Source/)
2. Magic CLI → JSON metadata (magic-metadata/)
3. Magic CLI → Angular components (src/app/magic/)

**Performance Goals**: [Feature-specific, e.g., form load <500ms, list rendering <1s]
**Constraints**: [Feature-specific, e.g., must work with generated components, cannot modify .g.ts files]
**Scale/Scope**: [Feature-specific, e.g., expected number of records, concurrent users, screen count]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Verify compliance with UiExpert Constitution (`.specify/memory/constitution.md`):

- [ ] **Metadata-First Architecture**: Does this feature require Magic XPA backend changes? If yes, ensure Magic Studio changes are planned before Angular implementation.
- [ ] **Separation of Concerns**: Have we identified which files are Magic-managed (read-only) vs Angular-managed (modifiable)?
- [ ] **Git Discipline**: Is the branch naming correct (`feature/`, `magic/`, etc.)? Are commit message conventions understood?
- [ ] **Test Coverage**: Have we identified critical paths requiring tests (validation logic, auth, integration)?
- [ ] **Documentation**: Have we planned documentation updates (CLAUDE.md, TODO.md, PR descriptions)?

**Generated File Impact**: List any generated files that will be affected (`.g.ts` files, component-list, etc.)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (UiExpert repository structure)

```text
UiExpert/
├── Source/                          # Magic XPA Backend (DO NOT EDIT MANUALLY)
│   ├── DataSources.xml             # Data source definitions
│   ├── Models.xml                  # Magic XPA models
│   ├── Prg_*.xml                   # Program definitions
│   └── ProjProps.xml               # Project properties
│
├── Angular/UiExpert/               # Angular Frontend
│   ├── src/app/
│   │   ├── magic/                  # Generated Magic components (READ-ONLY *.g.ts)
│   │   │   ├── Events/             # Event-related components
│   │   │   ├── Members/            # Member-related components
│   │   │   ├── mainWC/             # Main workflow components
│   │   │   ├── component-list.g.ts # Component registry (generated)
│   │   │   └── magic.gen.lib.module.ts # Module config (generated)
│   │   ├── app.component.ts        # Root component (modifiable)
│   │   ├── app.module.ts           # App module (modifiable)
│   │   └── app.routes.ts           # Routing config (modifiable)
│   │
│   ├── magic-metadata/             # JSON metadata from Magic XPA
│   │   ├── config.json
│   │   ├── server-config.json
│   │   └── [Feature]/[Component]/  # Component metadata
│   │
│   ├── src/styles.css              # Global styles (modifiable)
│   ├── src/magic-styles.css        # Magic-specific styles (modifiable)
│   ├── angular.json                # Angular CLI config (modifiable)
│   └── tailwind.config.js          # Tailwind config (modifiable)
│
├── INI/
│   └── Project.ini                 # Magic XPA configuration
│
├── .specify/                       # Feature specifications
│   ├── memory/constitution.md      # Project constitution
│   └── templates/                  # Spec templates
│
├── Docs/                           # Project documentation
│   ├── GIT_WORKFLOW.md
│   ├── COMMIT_GUIDELINES.md
│   └── BRANCH_NAMING.md
│
├── CLAUDE.md                       # Claude Code instructions
├── TODO.md                         # Project TODO list
└── UiExpert.SQLite                 # SQLite database (gitignored)
```

**File Modification Rules**:
- ✅ **CAN MODIFY**: Non-.g.ts TypeScript files, custom HTML/CSS, configs, docs
- ❌ **CANNOT MODIFY**: Source/*.xml, src/app/magic/**/*.g.ts, component-list.g.ts
- ⚠️ **REGENERATE REQUIRED**: After Magic XPA changes, run Magic CLI to update Angular components

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
