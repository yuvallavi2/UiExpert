import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    MContact = "MContact",
        btnCreate_Contact = "btnCreate_Contact",
        TableMContact = "TableMContact",
        ColumnType = "ColumnType",
        ComboContactType = "ComboContactType",
        Column_Value = "Column_Value",
        Contact_Inforrmation_Value = "Contact_Inforrmation_Value",
        Column_isPrimary = "Column_isPrimary",
        CheckBox_isPrimary = "CheckBox_isPrimary",
        ColumnAction = "ColumnAction",
        btnDelete = "btnDelete",
}
export enum MgCustomProperties {}
export var
    MgDisplayedColumns = [
        'ColumnType',
        'Column_Value',
        'Column_isPrimary',
        'ColumnAction',
    ];

export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get ComboContactType(): FormControl {
        return this.getTableChildFormControl(MgControlName.ComboContactType);
    }

    get Contact_Inforrmation_Value(): FormControl {
        return this.getTableChildFormControl(MgControlName.Contact_Inforrmation_Value);
    }

    get CheckBox_isPrimary(): FormControl {
        return this.getTableChildFormControl(MgControlName.CheckBox_isPrimary);
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}