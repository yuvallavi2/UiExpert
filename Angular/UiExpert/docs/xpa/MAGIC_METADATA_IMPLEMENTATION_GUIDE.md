# Magic XPA Metadata JSON Implementation Guide

## Overview

This guide explains how to create and configure Magic XPA metadata JSON files that generate Angular components properly bound to the Magic XPA platform. These metadata files are the blueprint for auto-generating Angular UI components from Magic XPA backend programs.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Metadata File Structure](#metadata-file-structure)
3. [Control Types Reference](#control-types-reference)
4. [Property Definitions](#property-definitions)
5. [Configuration Setup](#configuration-setup)
6. [Step-by-Step Implementation](#step-by-step-implementation)
7. [Table/Grid Controls](#tablegrid-controls)
8. [Advanced Features](#advanced-features)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### The Generation Flow

```
Magic XPA Program (XML)
         ↓
Magic XPA Web Client Export
         ↓
Metadata JSON Files (magic-metadata/*.json)
         ↓
Magic Angular CLI (@magic-xpa/cli)
         ↓
Generated Angular Components
    - Component.ts
    - Component.html
    - Component.mg.controls.g.ts
         ↓
Registered in component-list.g.ts
         ↓
Loaded in MagicGenLibModule
         ↓
Connected to Magic WebClient Engine
```

### Key Principles

1. **DO NOT manually edit Component.mg.controls.g.ts files** - They will be overwritten
2. **Metadata defines Controls** - Angular components are auto-generated from JSON but will be overwrit by User/Agents
3. **In the Metadata files igoner all Reference to "coordinates" element** - all layout and desing will be Implemented by the UI style and design like this. 
4. **Magic engine handles logic** - Angular is just the presentation layer
5. **Bidirectional binding** - Changes flow both ways between UI and Magic XPA
6. **Type-safe access** - Generated enums provide compile-time safety

---

## Metadata File Structure

### Root Object Schema

Every metadata JSON file has this structure:

```json
{
    "style": null | { /* Style properties */ },
    "props": {
        "id": "ComponentName",
        "window_type": 1 | 12,
        "component_path": "Feature/ComponentName/",
        "module_name": "",
        "component_uniquename": "Feature_ComponentName_ComponentName"
    },
    "coordinates": {
        "x": 0,
        "y": 0,
        "width": 600,
        "height": 400
    },
    "hint": null | "Tooltip text",
    "controlType": null,
    "children": [ /* Array of control objects */ ]
}
```

#### Root Properties Explained

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `style` | object/null | No | CSS styling properties (rarely used, prefer CSS) |
| `props.id` | string | Yes | **Component identifier** - Must match the form name in Magic XPA |
| `props.window_type` | number | Yes | `1` = Screen (normal), `12` = Modal window |
| `props.component_path` | string | Yes | **Folder path** relative to magic-metadata root |
| `props.module_name` | string | No | Angular module name (usually empty for default module) |
| `props.component_uniquename` | string | Yes | **Unique component name** - Format: `{Folder}_{ComponentName}_{ComponentName}` |
| `coordinates` | object | Yes | Form dimensions (x, y, width, height in pixels) |
| `hint` | string/null | No | Tooltip for the entire form |
| `controlType` | null | Yes | Always `null` for root form object |
| `children` | array | Yes | Array of control objects (buttons, inputs, tables, etc.) |

---

## Control Types Reference

### Control Type Codes

Each control has a `controlType` property that defines what HTML element it becomes:

| Code | Control Type | HTML Element | Description |
|------|--------------|--------------|-------------|
| `"T"` | Text Box / Label | `<input>` or `<label>` | Text input field or display label |
| `"B"` | Button | `<button>` | Clickable button |
| `"D"` | Dropdown / Combo | `<mat-select>` | Selection dropdown |
| `"C"` | Checkbox | `<mat-checkbox>` | Boolean checkbox |
| `"R"` | Radio Button | `<mat-radio-button>` | Radio button group |
| `"A"` | Table / Grid | `<mat-table>` | Data table with rows/columns |
| `"K"` | Column | `<ng-container>` | Table column definition |
| `"F"` | Subform | `<magic-subform>` | Embedded child component |
| `"G"` | Group | `<div>` | Container for grouping controls |

---

## Property Definitions

### Common Control Properties

All controls in the `children` array share this base structure:

```json
{
    "style": null | { "border": true },
    "props": {
        "id": "ControlName",
        /* Control-specific properties */
    },
    "coordinates": {
        "x": 10,
        "y": 20,
        "width": 100,
        "height": 30
    },
    "hint": null | "Tooltip text",
    "controlType": "T",
    "children": null | [ /* Nested controls */ ]
}
```

### Control-Specific Properties

#### Text Box (`"T"`)

```json
{
    "props": {
        "id": "Event_Name",
        "enabled": {
            "value": null,
            "has_exp": true      // True = value comes from Magic expression
        },
        "modifiable": true | false,  // Can user edit?
        "must_input": true | false,  // Required field?
        "mgformat": "mgFormat",      // Apply Magic formatting
        "validator": "rangevalidator", // Apply validation
        "format": "XXXXXXXXXX",      // Magic PIC format
        "attribute": "A" | "N" | "D" | "T" | "B",  // Data type
        "common_line_id": "line81",  // Row identifier in Magic
        "is_table_child": true | false,  // Is inside table?
        "web_style": 2,              // Display vs Edit mode
        "row_editing_type": 0 | 1    // 0=display, 1=edit in table
    },
    "controlType": "T"
}
```

**Attribute Types:**
- `"A"` = Alpha (string)
- `"N"` = Numeric (number)
- `"D"` = Date
- `"T"` = Time
- `"B"` = Boolean

**Format Patterns:**
- `"X"` = Any character
- `"#"` = Numeric digit
- `"DD/MM/YYYY"` = Date format
- `"HH:MM"` = Time format

#### Button (`"B"`)

```json
{
    "props": {
        "id": "btnSave",
        "enabled": {
            "value": null,
            "has_exp": true
        },
        "visible": {
            "value": null,
            "has_exp": true
        },
        "button_style": 1,           // Button visual style
        "format": "Save",            // Button text
        "common_line_id": "line263",
        "is_table_child": false,
        "row_editing_type": 0
    },
    "controlType": "B"
}
```

#### Dropdown / Combo (`"D"`)

```json
{
    "props": {
        "id": "ComboEventType",
        "must_input": true,
        "items_list": "",            // Empty = dynamic from Magic
        "attribute": "N",
        "common_line_id": "line45"
    },
    "controlType": "D"
}
```

**Items List:**
- Empty string `""` = Values provided dynamically by Magic XPA
- Static list: `"Option1,Option2,Option3"`

#### Table / Grid (`"A"`)

```json
{
    "props": {
        "id": "Table_Member_List",
        "table_row_height": 56,
        "table_title_height": 20,
        "common_line_id": "line41",
        "web_style": 2
    },
    "controlType": "A",
    "children": [
        /* Column definitions (controlType: "K") */
    ]
}
```

#### Table Column (`"K"`)

```json
{
    "props": {
        "id": "Column_First_Name",
        "column_title": "First Name",
        "sortable": true | false,
        "is_table_child": true,
        "web_style": 2
    },
    "coordinates": {
        "width": 105              // Column width
    },
    "controlType": "K",
    "children": [
        /* Control(s) that appear in this column */
    ]
}
```

#### Subform (`"F"`)

```json
{
    "props": {
        "id": "SfRegisteredMembers",
        "visible": {
            "value": null,
            "has_exp": true
        },
        "common_line_id": "line300"
    },
    "coordinates": {
        "x": 12,
        "y": 300,
        "width": 203,
        "height": 53
    },
    "controlType": "F"
}
```

#### Group Container (`"G"`)

```json
{
    "props": {
        "id": "MainGroup",
        "visible": {
            "value": null,
            "has_exp": true
        },
        "common_line_id": "line22"
    },
    "controlType": "G",
    "children": [
        /* Grouped controls */
    ]
}
```

## Table/Grid Controls

### Structure

Tables require a hierarchical structure:

```
Table (controlType: "A")
  └── Column (controlType: "K")
        └── Control(s) (controlType: "T", "B", etc.)
```

### Complete Table Example

```json
{
    "props": {
        "id": "Table_M_Contact",
        "table_row_height": 24,
        "table_title_height": 19,
        "web_style": 2,
        "common_line_id": "line38"
    },
    "controlType": "A",
    "children": [
        {
            "props": {
                "id": "ColumnMember",
                "column_title": "Member",
                "is_table_child": true,
                "web_style": 2
            },
            "coordinates": {
                "width": 255
            },
            "controlType": "K",
            "children": [
                {
                    "props": {
                        "id": "Name",
                        "mgformat": "mgFormat",
                        "format": "XXXXXXXXXX",
                        "attribute": "A",
                        "is_table_child": true,
                        "web_style": 2,
                        "common_line_id": "line61"
                    },
                    "coordinates": {
                        "x": 16,
                        "y": 61,
                        "width": 250,
                        "height": 20
                    },
                    "controlType": "T"
                }
            ]
        },
        {
            "props": {
                "id": "ColumnAction",
                "column_title": "Action",
                "is_table_child": true,
                "web_style": 2
            },
            "coordinates": {
                "width": 90
            },
            "controlType": "K",
            "children": [
                {
                    "props": {
                        "id": "btnDelete",
                        "format": "Delete",
                        "is_table_child": true,
                        "web_style": 2,
                        "row_editing_type": 0,
                        "common_line_id": "line61"
                    },
                    "coordinates": {
                        "x": 271,
                        "y": 61,
                        "width": 82,
                        "height": 20
                    },
                    "controlType": "B"
                }
            ]
        }
    ]
}
```

### Important Table Properties

| Property | Required for Tables | Description |
|----------|---------------------|-------------|
| `is_table_child` | Yes | Must be `true` for all controls inside table columns |
| `web_style` | Yes | Usually `2` for table controls |
| `row_editing_type` | For buttons | `0` = always visible, `1` = only in edit mode |
| `common_line_id` | Yes | Must match across row controls for same row |

---

## Advanced Features

### Dynamic Visibility/Enabled State

Controls can have dynamic properties controlled by Magic XPA:

```json
{
    "props": {
        "id": "btnSave",
        "enabled": {
            "value": null,
            "has_exp": true    // True = Magic XPA calculates enabled state
        },
        "visible": {
            "value": null,
            "has_exp": true    // True = Magic XPA controls visibility
        }
    }
}
```

### Custom Formatters

Use Magic's built-in formatters:

```json
{
    "props": {
        "id": "Birth_Date",
        "formatter": "magicDate",
        "format": "DD/MM/YYYY",
        "attribute": "D"
    }
}
```

Available formatters:
- `"magicDate"` - Date formatting
- `"magicTime"` - Time formatting
- `"magicTime24"` - 24-hour time

### Validation

Apply validators through properties:

```json
{
    "props": {
        "id": "Age",
        "mgformat": "mgFormat",
        "validator": "rangevalidator",
        "must_input": true,
        "format": "###",
        "attribute": "N"
    }
}
```

### Subforms (Child Components)

Embed one component inside another:

```json
{
    "props": {
        "id": "SfRegisteredMembers",
        "common_line_id": "line300"
    },
    "coordinates": {
        "x": 12,
        "y": 300,
        "width": 203,
        "height": 53
    },
    "controlType": "F"
}
```

The subform component must:
1. Exist as a separate metadata JSON file

---

## Best Practices

### 4. Table Design

For tables:
1. Always set `is_table_child: true` on all nested controls
2. Use `web_style: 2` consistently
3. Match `common_line_id` across controls in same row
4. Set appropriate `column_title` for headers


## Quick Reference

### Control Type Cheat Sheet

```
"T" → Text/Label    → <input> or <label>
"B" → Button        → <button>
"D" → Dropdown      → <mat-select>
"C" → Checkbox      → <mat-checkbox>
"A" → Table         → <mat-table>
"K" → Column        → <ng-container>
"F" → Subform       → <magic-subform>
"G" → Group         → <div>
```

### Attribute Type Cheat Sheet

```
"A" → Alpha     → String
"N" → Numeric   → Number
"D" → Date      → Date
"T" → Time      → Time
"B" → Boolean   → true/false
```

### Required Properties Checklist

For every control:
- ✅ `id` (unique identifier)
- ✅ `controlType` (T, B, D, C, A, K, F, or G)
- ✅ `coordinates` (x, y, width, height)

For text controls:
- ✅ `attribute` (A, N, D, T, or B)
- ✅ `format` (Magic PIC string)

For table controls:
- ✅ `is_table_child: true`
- ✅ `web_style: 2`
- ✅ `common_line_id`

---

## Example: Complete Screen Form

Here's a complete example of a simple screen form:

```json
{
    "style": null,
    "props": {
        "id": "CustomerForm",
        "window_type": 1,
        "component_path": "Customers/CustomerForm/",
        "module_name": "",
        "component_uniquename": "Customers_CustomerForm_CustomerForm"
    },
    "coordinates": {
        "x": 0,
        "y": 0,
        "width": 500,
        "height": 300
    },
    "hint": null,
    "controlType": null,
    "children": [
        {
            "props": {
                "id": "Customer_ID",
                "modifiable": false,
                "mgformat": "mgFormat",
                "format": "##########",
                "attribute": "N",
                "common_line_id": "line10"
            },
            "coordinates": {
                "x": 10,
                "y": 10,
                "width": 100,
                "height": 26
            },
            "controlType": "T"
        },
        {
            "props": {
                "id": "Customer_Name",
                "must_input": true,
                "mgformat": "mgFormat",
                "format": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
                "attribute": "A",
                "common_line_id": "line40"
            },
            "coordinates": {
                "x": 10,
                "y": 40,
                "width": 300,
                "height": 26
            },
            "controlType": "T"
        },
        {
            "props": {
                "id": "Customer_Email",
                "mgformat": "mgFormat",
                "format": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
                "attribute": "A",
                "common_line_id": "line70"
            },
            "coordinates": {
                "x": 10,
                "y": 70,
                "width": 300,
                "height": 26
            },
            "controlType": "T"
        },
        {
            "props": {
                "id": "Active_Status",
                "items_list": "Active,Inactive",
                "attribute": "N",
                "common_line_id": "line100"
            },
            "coordinates": {
                "x": 10,
                "y": 100,
                "width": 150,
                "height": 26
            },
            "controlType": "D"
        },
        {
            "props": {
                "id": "btnSave",
                "format": "Save",
                "common_line_id": "line140"
            },
            "coordinates": {
                "x": 10,
                "y": 140,
                "width": 100,
                "height": 35
            },
            "controlType": "B"
        },
        {
            "props": {
                "id": "btnCancel",
                "format": "Cancel",
                "common_line_id": "line140"
            },
            "coordinates": {
                "x": 120,
                "y": 140,
                "width": 100,
                "height": 35
            },
            "controlType": "B"
        }
    ]
}
```

---

## Summary

1. **Create** Magic XPA program in Studio
2. **Export** metadata JSON from Magic XPA Web Client tools
3. **Place** JSON in `magic-metadata/{Feature}/{Component}/{Component}.json`
4. **Register** in `config.json` `form_files` array
5. **Generate** Angular components using `npx @magic-xpa/cli`
6. **Test** in development server with `npm start`

The metadata JSON is the single source of truth for your UI structure. Magic XPA handles all business logic, validation, and data management - Angular just renders the UI and captures user input.

---

## Additional Resources

- Magic XPA Documentation: Consult your Magic XPA Studio help files
- Angular Material: https://material.angular.io/
- @magic-xpa/angular: Check node_modules for TypeScript definitions
- Project CLAUDE.md: Contains project-specific guidelines and architecture

For questions or issues, review the generated component HTML to see how metadata translates to Angular templates.
