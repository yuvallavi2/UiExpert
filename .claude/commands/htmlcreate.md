use html-formatter agent and create the html requested file based on the JSON file provide as metadata

If both HTML and JSON files are provided, use them. Otherwise, prompt the user to provide the JSON file and the HTML file.

**CRITICAL: Do not read any files yourself, and DO NOT give the agent detailed step-by-step instructions.**

Your job is to:
1. Parse the file paths from the command arguments
2. Pass those file paths to the agent with a MINIMAL prompt like: "Generate HTML template from JSON metadata at [json-path] and write to [html-path]"
3. Let the agent follow its OWN instructions and workflow

**DO NOT:**
- Give the agent explicit formatting instructions
- Tell it what technologies to use (Material, Tailwind, etc.)
- Override its built-in workflow
- Specify step-by-step procedures

The agent has its own comprehensive instructions and will read the UI guidelines automatically.

**Next Step**
- once the Agent html-formatter is finshed you need to call to magicbind command and past the name of the JSON and the name of the HTML files as parameters 