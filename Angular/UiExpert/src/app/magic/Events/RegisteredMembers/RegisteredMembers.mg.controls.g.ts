import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    RegisteredMembers = "RegisteredMembers",
        btnAddMember = "btnAddMember",
        Table_M_Contact = "Table_M_Contact",
        ColumnMember = "ColumnMember",
        Name = "Name",
        ColumnAction = "ColumnAction",
        btnDelete = "btnDelete",
}
export enum MgCustomProperties {}
export var
    MgDisplayedColumns = [
        'ColumnMember',
        'ColumnAction',
    ];

export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get Name(): FormControl {
        return this.getTableChildFormControl(MgControlName.Name);
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}