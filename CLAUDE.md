# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UiExpert is a hybrid application built with Magic XPA (low-code platform) and Angular 19. The project uses Magic XPA's code generation capabilities to create Angular components from metadata, with a SQLite database backend.

⚠️  **BEFORE STARTING ANY WORK - READ AND ACKNOWLEDGE THESE CRITICAL RULES:**
  - !Never update any files in the Source folder 
  - Yoc can only change TS, HTML, and CSS files that are part of Angular components 

## Architecture

### Dual-Layer Structure

1. **Magic XPA Backend** (Source/ directory):
   - XML-based metadata files defining programs, data sources, models
   - `.edp` project file (UiExpert.edp) - main Magic XPA project
   - Programs numbered as `Prg_*.xml` (e.g., Prg_33554462.xml)
   - Data sources, relationships, and models in DataSources.xml, Models.xml
   - SQLite database (UiExpert.SQLite) configured via INI/Project.ini

2. **Angular Frontend** (Angular/UiExpert/ directory):
   - Generated Angular 19 application
   - Uses `@magic-xpa/angular` and `@magic-xpa/cli` packages
   - Auto-generated components from Magic metadata
   - Material Design theme via Angular Material

### Magic XPA to Angular Flow

The Magic XPA CLI generates Angular code from metadata:

- **Metadata files**: `magic-metadata/**/*.json` - JSON representations of forms/components
- **Generated components**: `src/app/magic/**/*.component.ts` - Auto-generated from metadata
- **Component registry**: `src/app/magic/component-list.g.ts` - Hash map of all generated components
- **Module configuration**: `src/app/magic/magic.gen.lib.module.ts` - Angular module with all generated components

### Component Organization

Components are organized by feature domains:
- **Events**: EventCard, EventList, RegisteredMembers, MemberSelection
- **Members**: MList (list), MCard (card), MContact (contact)
- **mainWC**: StartProgram, Welcome, UserDropdown

Each component has:
- Metadata JSON in `magic-metadata/`
- Generated TypeScript component in `src/app/magic/`
- Generated HTML template
- Generated controls accessor (.mg.controls.g.ts)

## Development Commands

All commands must be run from the `Angular/UiExpert/` directory:

```bash
cd Angular/UiExpert
```

### Development Server
```bash
npm start
# or
ng serve
```
Application runs at `http://localhost:4200/`

### Build
```bash
ng build                           # Production build
ng build --configuration development   # Development build
ng build --watch --configuration development  # Watch mode
```
Output: `dist/ui-expert/`

### Testing
```bash
ng test              # Run unit tests with Karma
ng test --watch=false --code-coverage  # Run tests once with coverage
```

### Code Generation
```bash
ng generate component component-name
ng generate --help   # See all available schematics
```

Note: Angular CLI is configured to generate non-standalone components by default (see angular.json schematics).

## Magic XPA Integration

### Server Configuration

The application connects to a Magic XPA server defined in:
- `Angular/UiExpert/magic-metadata/server-config.json`
- `Angular/UiExpert/public/assets/server-config.json` (runtime)

Current configuration:
- Protocol: HTTP
- Server: IL-Ylavi.MSE.Corp
- Requester: MagicScripts412/MGrqispi.dll
- AppName: UiExpert

### Regenerating Components from Magic Metadata

When Magic XPA metadata changes, components must be regenerated. This typically happens through the Magic XPA CLI tool (`@magic-xpa/cli`). The config.json file controls:
- Whether to create new project (`create_new_project: false`)
- Which forms to generate (listed in `web_modules[].form_files`)
- Output folder location
- Theme selection (currently "material")

### Important Constraints

1. **DO NOT manually edit generated files** - Files with `.g.ts` suffix or in auto-generated component folders will be overwritten
2. **Component naming**: Components use format `{Folder}_{ComponentName}_{ComponentName}` (e.g., EventCard_EventCard)
3. **Standalone vs Module**: Project uses module-based components (standalone: false in angular.json)
4. **Magic services**: Components extend `TaskBaseMagicComponent` and use `magicProviders`

## Project Structure

```
UiExpert/
├── Angular/UiExpert/           # Angular application
│   ├── src/app/
│   │   ├── magic/              # Auto-generated Magic components
│   │   │   ├── Events/
│   │   │   ├── Members/
│   │   │   ├── mainWC/
│   │   │   ├── component-list.g.ts
│   │   │   ├── magic.gen.lib.module.ts
│   │   │   └── lazy-loader.service.ts
│   │   ├── app.module.ts
│   │   └── app.routes.ts
│   ├── magic-metadata/         # JSON metadata from Magic XPA
│   │   ├── config.json
│   │   ├── server-config.json
│   │   └── {Feature}/{Component}/
│   └── public/assets/
├── Source/                     # Magic XPA XML metadata
│   ├── *.xml                   # Program definitions, models, data sources
│   └── ProjProps.xml          # Project properties
├── INI/
│   └── Project.ini            # Magic XPA configuration
└── UiExpert.edp               # Main Magic XPA project file
```

## Database

- **Type**: SQLite
- **File**: `UiExpert.SQLite` (in project root)
- **Configuration**: Defined in `INI/Project.ini` under `[MAGIC_DATABASES]`
- **Tables**: Managed through Magic XPA data sources (see Source/DataSources.xml)

Main entities:
- Events (with types, locations, dates, attendees)
- Members (with contacts)
- Relationships defined in DataSources.xml

## Key Dependencies

### Magic XPA Packages
- `@magic-xpa/angular@4.1200.0` - Core Magic framework for Angular
- `@magic-xpa/angular-material-core` - Material Design integration
- `@magic-xpa/cli@4.1200.0` - CLI tools for code generation

### Angular Packages (v19.2)
- Angular Material for UI components
- ReactiveFormsModule for form handling
- ng-dynamic-component for dynamic component loading

### Third-party UI Libraries
- ngx-currency - Currency input formatting
- ngx-mask - Input masking
- ngx-infinite-scroll - Infinite scrolling
- hammerjs - Touch gesture support

## Common Workflows

### Adding a New Feature in Magic XPA

1. Create/modify program in Magic XPA Studio
2. Ensure program is set for web client exposure
3. Run Magic XPA web client generation
4. Magic CLI updates magic-metadata/*.json files
5. Regenerate Angular components (updates component-list.g.ts and component files)
6. Test in development server

### Modifying UI Styling

- Global styles: `src/styles.css`
- Magic-specific styles: `src/magic-styles.css`
- Component styles: Define in component's HTML/CSS (but avoid for generated components)

### Working with Forms

All forms use Angular Reactive Forms:
- Access via `mgfc` (MgFormControlsAccessor) in components
- Control names defined in `MgControlName` enum
- Form controls created automatically from metadata
