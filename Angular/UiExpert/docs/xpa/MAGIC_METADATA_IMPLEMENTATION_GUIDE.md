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
9. [Angular Binding Patterns](#angular-binding-patterns)
   - [Quick Reference: Essential Bindings](#quick-reference-essential-bindings)
   - [Root Form Element](#root-form-element)
   - [Text Input Binding Patterns](#text-input-binding-patterns)
   - [Dropdown/Combo Binding Pattern](#dropdowncombo-binding-pattern)
   - [Date and Time Input Patterns](#date-input-binding-pattern)
   - [Button Binding Patterns](#button-binding-patterns)
   - [SubForm Binding Pattern](#subform-binding-pattern)
   - [Control Type Mappings](#control-type-to-html-element-mapping)
   - [Special Cases](#special-cases)
   - [Material Design Component Patterns](#material-design-component-patterns)
   - [Advanced Table Binding Patterns](#advanced-table-binding-patterns)
   - [Magic Service (mg) Methods Reference](#magic-service-mg-methods-reference)
   - [Visibility Control Patterns](#visibility-control-patterns)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

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

---

## Angular Binding Patterns

This section explains how to add Magic XPA Angular bindings to HTML templates. These patterns are used when creating or enhancing Angular component templates to connect them to the Magic XPA backend.

### Overview

When integrating HTML templates with Magic XPA:
1. **DO NOT change HTML structure** - Only add Magic bindings
2. **DO NOT change CSS classes** - Preserve all styling
3. **ALWAYS use mgc.ControlName** - Never hardcode control names as strings
4. **ALWAYS match control IDs** - HTML element id/name must match JSON metadata props.id

### Quick Reference: Essential Bindings

Here are the essential bindings you'll add to transform pure HTML into Magic XPA components:

1. **Root form element:**
   ```html
   <div novalidate [formGroup]="screenFormGroup">
     <div [magic]="mgc.ComponentName">
   ```

2. **Text inputs:**
   ```html
   [magic]="mgc.ControlName"
   [formControlName]="mgc.ControlName"
   mgFormat
   ```

3. **Buttons:**
   ```html
   [magic]="mgc.ButtonName"
   [disabled]="mg.isDisabled(mgc.ButtonName)"  <!-- if dynamic enabled -->
   ```

4. **Dropdowns:**
   ```html
   [magic]="mgc.ControlName"
   [formControlName]="mgc.ControlName"
   *ngFor="let o of mg.getItemListValues(mgc.ControlName);"
   ```

5. **Error displays:**
   ```html
   <mgError [magic]=mgc.ControlName></mgError>
   <!-- OR for Material Design: -->
   <mat-error>Error message</mat-error>
   ```

### Root Form Element

Every Magic XPA component must have a root form structure:

```html
<div
    novalidate
    [formGroup]="screenFormGroup"
>
    <div [magic]="mgc.ComponentName">
        <!-- All controls go here -->
    </div>
</div>
```

### Text Input Binding Patterns

#### Editable Text Input (modifiable: true)

```html
<input
    [magic]="mgc.ControlName"
    [formControlName]="mgc.ControlName"
    mgFormat
    [required]="must_input === true"
/>
<mgError [magic]=mgc.ControlName></mgError>
```

**Add validators if present in metadata:**
- If `validator: "rangevalidator"` exists, add `rangevalidator` attribute

#### Read-Only Text Display (modifiable: false)

```html
<input
    [magic]="mgc.ControlName"
    [formControlName]="mgc.ControlName"
    mgFormat
    readonly
/>
```

### Dropdown/Combo Binding Pattern

```html
<select
    [magic]="mgc.ControlName"
    [formControlName]="mgc.ControlName"
    [required]="must_input === true"
>
    <option
        *ngFor="let o of mg.getItemListValues(mgc.ControlName);"
        [value]="o.index"
    >
        {{o.displayValue}}
    </option>
</select>
<mgError [magic]=mgc.ControlName></mgError>
```

### Date Input Binding Pattern

For date inputs (attribute: "D"):

```html
<div
    [magic]="mgc.ControlName"
    [eventsOnly]=true
>
    <input
        [magic]="mgc.ControlName"
        [formControlName]="mgc.ControlName"
        mgFormat
        type="date"
        [required]="must_input === true"
    />
</div>
```

### Time Input Binding Pattern

For time inputs (attribute: "T"):

```html
<input
    [magic]="mgc.ControlName"
    [formControlName]="mgc.ControlName"
    mgFormat
    type="time"
/>
```

### Button Binding Patterns

#### Button with Dynamic Enabled State (enabled.has_exp is true)

```html
<button
    [magic]="mgc.ButtonName"
    [disabled]="mg.isDisabled(mgc.ButtonName)"
>
    Button Text
</button>
```

#### Button with Static Enabled State (enabled.has_exp is false or not present)

```html
<button
    [magic]="mgc.ButtonName"
>
    Button Text
</button>
```

### SubForm Binding Pattern

```html
<magic-subform [magic]="mgc.SubFormName">
</magic-subform>
```

### Hidden Field Binding Pattern

```html
<input
    type="hidden"
    [magic]="mgc.ControlName"
    [formControlName]="mgc.ControlName"
/>
```

### Control Type to HTML Element Mapping

| JSON controlType | HTML Element | Binding Pattern |
|-----------------|--------------|-----------------|
| "T" | `<input>` | Text, number, date, time based on `attribute` |
| "B" | `<button>` | Button with optional `mg.isDisabled()` |
| "D" | `<select>` | Dropdown with `*ngFor` and `mg.getItemListValues()` |
| "F" | `<magic-subform>` | Subform component |
| "G" | `<div>` | Container group with `[magic]` directive |

### Attribute Type to Input Type Mapping

| JSON attribute | Input Type | HTML type attribute |
|---------------|------------|---------------------|
| "A" | text | `type="text"` (default) |
| "N" | number | `type="number"` |
| "D" | date | `type="date"` |
| "T" | time | `type="time"` |
| "B" | checkbox | `type="checkbox"` |

### Special Cases

#### Dynamic Enabled State

If JSON metadata has:
```json
"enabled": {
    "value": null,
    "has_exp": true
}
```

- For **buttons**: Add `[disabled]="mg.isDisabled(mgc.ControlName)"`
- For **inputs**: The Magic framework handles enabled state automatically

#### Dynamic Visibility

If JSON metadata has:
```json
"visible": {
    "value": null,
    "has_exp": true
}
```

The Magic framework handles visibility automatically through the `[magic]` directive. No additional binding needed.

#### Required Fields

If JSON metadata has `"must_input": true`:
- Add `[required]="true"` to the HTML element
- Include `<mgError [magic]=mgc.ControlName></mgError>` after the input

#### Read-Only Fields

If JSON metadata has `"modifiable": false`:
- Add `readonly` attribute for inputs
- Remove or omit any edit-mode features

### Binding Validation Checklist

Before finalizing your HTML template with Magic bindings, verify:

✅ **ALL controls from JSON have [magic] directive** - Every control must have it
✅ **Form inputs have [formControlName]** - All editable inputs need this
✅ **Buttons use mg.isDisabled correctly** - For dynamic enabled state
✅ **Dropdowns have *ngFor with mg.getItemListValues** - For dynamic options
✅ **Root has [formGroup]="screenFormGroup"** - Required for form controls
✅ **mgError components added** - After each form input that can have errors
✅ **SubForms converted** - Replace placeholder div with `<magic-subform>`
✅ **NO layout changes** - HTML structure and CSS classes preserved
✅ **Control IDs match** - HTML id attributes match JSON props.id

### Example: Before and After Binding

**Before (Pure HTML):**
```html
<div class="form-row">
  <label for="Event_Name">Event Name</label>
  <input
    type="text"
    id="Event_Name"
    name="Event_Name"
    maxlength="50"
    class="form-input"
  />
</div>
```

**After (With Magic Bindings):**
```html
<div class="form-row">
  <label for="Event_Name">Event Name</label>
  <input
    type="text"
    id="Event_Name"
    name="Event_Name"
    [magic]="mgc.Event_Name"
    [formControlName]="mgc.Event_Name"
    mgFormat
    [required]="true"
    maxlength="50"
    class="form-input"
  />
  <mgError [magic]=mgc.Event_Name></mgError>
</div>
```

**What Changed:**
- Added `[magic]="mgc.Event_Name"` - Connects to Magic XPA control
- Added `[formControlName]="mgc.Event_Name"` - Connects to Angular form control
- Added `mgFormat` - Applies Magic formatting
- Added `[required]="true"` - Marks field as required (based on metadata)
- Added `<mgError>` - Displays validation errors
- Preserved all original HTML attributes (type, id, name, maxlength, class)

### Critical Binding Rules

1. **Never change existing HTML structure** - Only add Magic bindings
2. **Never change CSS classes or styling** - Preserve all design
3. **Never remove existing HTML attributes** - Keep id, type, placeholder, etc.
4. **Always use mgc.ControlName** - Never hardcode strings like "Event_Name"
5. **Always match control IDs** - HTML id must match JSON metadata props.id
6. **Always add error displays** - Include `<mgError>` or `<mat-error>` for form inputs
7. **Always use mg service methods** - For isDisabled, getValue, getItemListValues, etc.
8. **Always preserve layout** - Don't modify any CSS or structure

---

## Material Design Component Patterns

Magic XPA supports Angular Material components. Below are binding patterns for Material Design elements.

### Material Text Input

**Basic Pattern:**
```html
<mat-form-field appearance="outline">
    <input matInput [magic]="mgc.ControlName" [formControlName]="mgc.ControlName">
    <mat-label>Label Text</mat-label>
</mat-form-field>
```

**With Required Validation:**
```html
<mat-form-field appearance="outline">
    <input matInput [magic]="mgc.First_Name" [formControlName]="mgc.First_Name" required>
    <mat-label>First Name</mat-label>
    <mat-error>Input First Name !!!</mat-error>
</mat-form-field>
```

**Read-Only:**
```html
<mat-form-field appearance="outline">
    <input matInput [magic]="mgc.Event_ID" [formControlName]="mgc.Event_ID" readonly>
    <mat-label>Event ID</mat-label>
</mat-form-field>
```

### Material Select (Dropdown)

**Basic Pattern:**
```html
<mat-form-field appearance="outline">
    <mat-select [magic]="mgc.ComboEventType" [formControlName]="mgc.ComboEventType">
        <mat-option [value]="item.index" *ngFor="let item of mg.getItemListValues(mgc.ComboEventType)">
            {{ item.displayValue }}
        </mat-option>
    </mat-select>
    <mat-label>Event Type</mat-label>
</mat-form-field>
```

**With Required Validation:**
```html
<mat-form-field appearance="outline">
    <mat-select [magic]="mgc.Combo_Title" [formControlName]="mgc.Combo_Title" required>
        <mat-option [value]="item.index" *ngFor="let item of mg.getItemListValues(mgc.Combo_Title)">
            {{ item.displayValue }}
        </mat-option>
    </mat-select>
    <mat-label>Title</mat-label>
    <mat-error>Select a Title</mat-error>
</mat-form-field>
```

### Material Date Picker

**Basic Pattern:**
```html
<mat-form-field appearance="outline" [magic]="mgc.Start_Date">
    <mat-label>Start Date</mat-label>
    <input matInput [matDatepicker]="startDatePicker" [magic]="mgc.Start_Date" [formControlName]="mgc.Start_Date">
    <mat-datepicker-toggle matSuffix [for]="startDatePicker"></mat-datepicker-toggle>
    <mat-datepicker #startDatePicker></mat-datepicker>
</mat-form-field>
```

**With mgFormat:**
```html
<mat-form-field appearance="outline" [magic]="mgc.Birth_Date">
    <mat-label>Birth Date</mat-label>
    <input matInput [matDatepicker]="birthDate" [magic]="mgc.Birth_Date" [formControlName]="mgc.Birth_Date" mgFormat>
    <mat-datepicker-toggle matSuffix [for]="birthDate"></mat-datepicker-toggle>
    <mat-datepicker #birthDate></mat-datepicker>
</mat-form-field>
```

**Key Points:**
- The `[magic]` directive can be on the `<mat-form-field>` or `<input>`
- Use unique `#templateRef` names for each datepicker
- `matSuffix` on the toggle positions it inside the form field
- Add `mgFormat` directive to apply Magic formatting

### Material Time Input

```html
<mat-form-field appearance="outline">
    <mat-label>Start Time</mat-label>
    <input type="time" matInput [magic]="mgc.EventStartTime" [formControlName]="mgc.EventStartTime">
</mat-form-field>
```

### Material Checkbox

**In Form:**
```html
<mat-checkbox [magic]="mgc.CheckBox_isPrimary" [formControlName]="mgc.CheckBox_isPrimary">
    Is Primary
</mat-checkbox>
```

**In Table:**
```html
<mat-checkbox [magic]="mgc.CheckSelect" [formControlName]="mgc.CheckSelect" [rowId]="row.rowId">
</mat-checkbox>
```

### Material Button

**Primary Button:**
```html
<button mat-raised-button [magic]="mgc.btnSave" color="primary">
    Save
</button>
```

**With Icon:**
```html
<button mat-raised-button [magic]="mgc.btnCreateEvent" color="primary">
    <mat-icon>calendar_today</mat-icon>
    Create Event
</button>
```

**With Disabled State:**
```html
<button mat-raised-button [magic]="mgc.btnSave" color="primary" [disabled]="screenFormGroup.invalid">
    Save
</button>
```

**Warn/Cancel Button:**
```html
<button mat-raised-button [magic]="mgc.btnQuit" color="warn">
    Cancel
</button>
```

---

## Advanced Table Binding Patterns

Magic XPA tables with Material Design use sophisticated bindings for row management and editing.

### Material Table Structure

```html
<div [magic]="mgc.TableName">
    <mat-table #table [dataSource]="dataSource" matSort matSortDisableClear (matSortChange)="tableService.sortData($event)">
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"
                 [ngClass]="{ 'selected': selection.isSelected(row)}"
                 [magicRow]="row?.rowId"
                 (click)="row? tableService.selectRow(row.rowId) : null">
        </mat-row>

        <!-- Column definitions -->
        <ng-container [magic]="mgc.ColumnName" [matColumnDef]="mgc.ColumnName">
            <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.ColumnName) }}</mat-header-cell>
            <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
                <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
                    <!-- Cell content -->
                </c-container>
            </mat-cell>
        </ng-container>
    </mat-table>
    <mat-paginator #paginator [pageSize]="10" [pageSizeOptions]="[5, 10, 20]"
                   (page)="tableService.mgOnPaginateChange($event)">
    </mat-paginator>
</div>
```

### Table Column Types

#### Display-Only Label Column

```html
<ng-container [magic]="mgc.EventID" [matColumnDef]="mgc.EventID">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.EventID) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <label [magic]="mgc.Event_ID" [rowId]="row.rowId">
                {{ mg.getValue(mgc.Event_ID, row.rowId) }}
            </label>
        </c-container>
    </mat-cell>
</ng-container>
```

#### Date Display Column with Formatting

```html
<ng-container [magic]="mgc.StartDate" [matColumnDef]="mgc.StartDate">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.StartDate) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <label [magic]="mgc.Start_Date" [rowId]="row.rowId">
                {{ mg.getValue(mgc.Start_Date, row.rowId) | date:'dd/MM/YYYY' }}
            </label>
        </c-container>
    </mat-cell>
</ng-container>
```

#### Editable Input Column with Row Editing

```html
<ng-container [magic]="mgc.Column_Value" [matColumnDef]="mgc.Column_Value">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.Column_Value) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <!-- Edit mode -->
            <mat-form-field appearance="outline" *ngIf="mg.isRowInRowEditing(row)">
                <input matInput [magic]="mgc.Contact_Value" [formControlName]="mgc.Contact_Value" [rowId]="row.rowId">
            </mat-form-field>
            <!-- Display mode -->
            <label [magic]="mgc.Contact_Value" [rowId]="row.rowId" *ngIf="!mg.isRowInRowEditing(row)">
                {{ mg.getValue(mgc.Contact_Value, row.rowId) }}
            </label>
        </c-container>
    </mat-cell>
</ng-container>
```

#### Dropdown Column with Display Value

```html
<ng-container [magic]="mgc.ColumnType" [matColumnDef]="mgc.ColumnType">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.ColumnType) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <!-- Edit mode -->
            <mat-form-field appearance="outline" *ngIf="mg.isRowInRowEditing(row)">
                <mat-select [magic]="mgc.ComboContactType" [formControlName]="mgc.ComboContactType" [rowId]="row.rowId">
                    <mat-option [value]="item.index" *ngFor="let item of mg.getItemListValues(mgc.ComboContactType)">
                        {{ item.displayValue }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <!-- Display mode -->
            <label [magic]="mgc.ComboContactType" [rowId]="row.rowId" *ngIf="!mg.isRowInRowEditing(row)">
                {{ mg.getDisplayValue(mgc.ComboContactType, row.rowId) }}
            </label>
        </c-container>
    </mat-cell>
</ng-container>
```

#### Checkbox Column

```html
<ng-container [magic]="mgc.ColumnCheck" [matColumnDef]="mgc.ColumnCheck">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.ColumnCheck) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <mat-checkbox [magic]="mgc.CheckSelect" [formControlName]="mgc.CheckSelect" [rowId]="row.rowId">
            </mat-checkbox>
        </c-container>
    </mat-cell>
</ng-container>
```

#### Action Buttons Column

```html
<ng-container [magic]="mgc.Column_Action" [matColumnDef]="mgc.Column_Action">
    <mat-header-cell *matHeaderCellDef>{{ mg.getText(mgc.Column_Action) }}</mat-header-cell>
    <mat-cell *matCellDef="let row" magicMark="magicTableRowContainer">
        <c-container #matCell [formGroup]="mg.getFormGroupByRow(row.rowId)" *ngIf="mg.ifRowCreated(row)">
            <button [magic]="mgc.btn_Modify" [rowId]="row.rowId" class="editbtn"></button>
            <button [magic]="mgc.btn_Delete" [rowId]="row.rowId" class="deletebtn"></button>
        </c-container>
    </mat-cell>
</ng-container>
```

### Table Binding Key Attributes

| Attribute | Purpose | Used On |
|-----------|---------|---------|
| `[magic]="mgc.TableName"` | Binds table container to Magic control | `<div>` wrapper around table |
| `[magic]="mgc.ColumnName"` | Binds column definition to Magic | `<ng-container>` for column |
| `[matColumnDef]="mgc.ColumnName"` | Defines Material column | `<ng-container>` for column |
| `[magicRow]="row?.rowId"` | Binds row to Magic row ID | `<mat-row>` |
| `[rowId]="row.rowId"` | Identifies row for control | Input, button, checkbox in table |
| `magicMark="magicTableRowContainer"` | Marks cell as Magic container | `<mat-cell>` |
| `[formGroup]="mg.getFormGroupByRow(row.rowId)"` | Row-specific form group | Container inside cell |
| `*ngIf="mg.ifRowCreated(row)"` | Shows content only for created rows | Container inside cell |

---

## Magic Service (mg) Methods Reference

The `mg` service provides methods to interact with Magic XPA controls and data.

### Form Control Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getValue(mgc.ControlName)` | Control name | any | Get value of form control |
| `getValue(mgc.ControlName, rowId)` | Control name, row ID | any | Get value of control in specific table row |
| `getDisplayValue(mgc.ControlName, rowId)` | Control name, row ID | string | Get display value for dropdown in table row |
| `getText(mgc.ControlName)` | Control name | string | Get label/text for control (e.g., column headers) |
| `getVisible(mgc.ControlName)` | Control name | string | Get visibility state ('visible' or 'hidden') |
| `isDisabled(mgc.ControlName)` | Control name | boolean | Check if button is disabled |
| `getItemListValues(mgc.ControlName)` | Control name | Array | Get dropdown options list |

### Table Row Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getFormGroupByRow(rowId)` | Row ID | FormGroup | Get Angular FormGroup for specific row |
| `ifRowCreated(row)` | Row object | boolean | Check if row has been created/initialized |
| `isRowInRowEditing(row)` | Row object | boolean | Check if row is in edit mode |

### Usage Examples

**Display value in form:**
```html
<span>{{ mg.getValue(mgc.Event_Name) }}</span>
```

**Display value in table:**
```html
<label [rowId]="row.rowId">{{ mg.getValue(mgc.Member_ID, row.rowId) }}</label>
```

**Column header:**
```html
<mat-header-cell>{{ mg.getText(mgc.Column_Action) }}</mat-header-cell>
```

**Conditional visibility:**
```html
<div [style.display]="mg.getVisible(mgc.MainGroup)=='visible'?'block':'none'">
```

**Dropdown display value:**
```html
<label [rowId]="row.rowId">{{ mg.getDisplayValue(mgc.ComboType, row.rowId) }}</label>
```

**Date formatting:**
```html
<label [rowId]="row.rowId">{{ mg.getValue(mgc.Birth_Date, row.rowId) | date:'dd/MM/YYYY' }}</label>
```

---

## Visibility Control Patterns

### Using mg.getVisible()

**Pattern 1: Style Display Toggle**
```html
<div [style.display]="mg.getVisible(mgc.MainGroup)=='visible'?'block':'none'">
    <!-- Content shown/hidden based on Magic control -->
</div>
```

**Pattern 2: Conditional Content**
```html
<c-card *ngIf="mg.getVisible(mgc.MainGroup)=='visible'">
    <!-- Main content -->
</c-card>
<c-card *ngIf="mg.getVisible(mgc.MainGroup)!=='visible'">
    <!-- Alternative content -->
</c-card>
```

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
