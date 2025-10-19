import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    MList = "MList",
        MainGroup = "MainGroup",
        Table_Member_List = "Table_Member_List",
        Column_Member_ID = "Column_Member_ID",
        Member_ID = "Member_ID",
        Column_Title = "Column_Title",
        Title = "Title",
        Column_First_Name = "Column_First_Name",
        First_Name = "First_Name",
        Column_Last_Name = "Column_Last_Name",
        Last_Name = "Last_Name",
        Column_Birth_Date = "Column_Birth_Date",
        Birth_Date = "Birth_Date",
        Column_Gender = "Column_Gender",
        Gender = "Gender",
        Column_Action = "Column_Action",
        btn_Modify = "btn_Modify",
        btn_Delete = "btn_Delete",
        btn_CreateMember = "btn_CreateMember",
        SFMCard = "SFMCard",
        V_vToggleSubForm = "V_vToggleSubForm",
}
export enum MgCustomProperties {}
export var
    MgDisplayedColumns = [
        'Column_Member_ID',
        'Column_Title',
        'Column_First_Name',
        'Column_Last_Name',
        'Column_Birth_Date',
        'Column_Gender',
        'Column_Action',
    ];

export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get Member_ID(): FormControl {
        return this.getTableChildFormControl(MgControlName.Member_ID);
    }

    get Title(): FormControl {
        return this.getTableChildFormControl(MgControlName.Title);
    }

    get First_Name(): FormControl {
        return this.getTableChildFormControl(MgControlName.First_Name);
    }

    get Last_Name(): FormControl {
        return this.getTableChildFormControl(MgControlName.Last_Name);
    }

    get Birth_Date(): FormControl {
        return this.getTableChildFormControl(MgControlName.Birth_Date);
    }

    get Gender(): FormControl {
        return this.getTableChildFormControl(MgControlName.Gender);
    }

    get V_vToggleSubForm(): FormControl {
        return this.fg.controls[MgControlName.V_vToggleSubForm] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}