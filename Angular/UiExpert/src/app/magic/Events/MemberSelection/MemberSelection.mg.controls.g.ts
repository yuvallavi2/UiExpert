import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    MemberSelection = "MemberSelection",
        MemberSelectionTable = "MemberSelectionTable",
        ColumnCheck = "ColumnCheck",
        CheckSelect = "CheckSelect",
        ColumnMemberName = "ColumnMemberName",
        MemberName = "MemberName",
        BtnSelect = "BtnSelect",
        BtnCancel = "BtnCancel",
}
export enum MgCustomProperties {}
export var
    MgDisplayedColumns = [
        'ColumnCheck',
        'ColumnMemberName',
    ];

export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get CheckSelect(): FormControl {
        return this.getTableChildFormControl(MgControlName.CheckSelect);
    }

    get MemberName(): FormControl {
        return this.getTableChildFormControl(MgControlName.MemberName);
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}