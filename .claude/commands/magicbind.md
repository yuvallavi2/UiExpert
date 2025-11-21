Use magic-xpa-binding agent to add Magic XPA framework bindings to an existing HTML component template.

This command receives two file paths:
1. JSON metadata file (e.g., Angular/UiExpert/magic-metadata/Events/EventCard/EventCard.json)
2. HTML component file (e.g., Angular/UiExpert/src/app/magic/Events/EventCard/EventCard.component.html)

**CRITICAL: Do not read any files yourself, and DO NOT give the agent detailed step-by-step instructions.**

Your job is to:
1. Parse the JSON metadata file path and HTML file path from the command arguments
2. Pass those file paths to the magic-xpa-binding agent with a MINIMAL prompt like: "Add Magic XPA bindings to [html-path] using metadata from [json-path]"
3. Let the agent follow its OWN instructions and workflow

**DO NOT:**
- Give the agent explicit binding instructions
- Tell it which directives to use
- Override its built-in workflow
- Specify step-by-step procedures
- Read or analyze files yourself

The agent has comprehensive instructions and will:
- Read the Magic XPA documentation
- Study existing component examples
- Apply bindings following established patterns
- Preserve all layout and styling
