import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    MCard = "MCard",
        Member_ID = "Member_ID",
        P_pBtnVisibility = "P_pBtnVisibility",
        Combo_Title = "Combo_Title",
        First_Name = "First_Name",
        Last_Name = "Last_Name",
        Birth_Date = "Birth_Date",
        Combo_Gender = "Combo_Gender",
        btnSave = "btnSave",
        SubF_M_Contact = "SubF_M_Contact",
        SubFMEmail = "SubFMEmail",
        btnQuit = "btnQuit",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get Member_ID(): FormControl {
        return this.fg.controls[MgControlName.Member_ID] as FormControl;
    }

    get P_pBtnVisibility(): FormControl {
        return this.fg.controls[MgControlName.P_pBtnVisibility] as FormControl;
    }

    get Combo_Title(): FormControl {
        return this.fg.controls[MgControlName.Combo_Title] as FormControl;
    }

    get First_Name(): FormControl {
        return this.fg.controls[MgControlName.First_Name] as FormControl;
    }

    get Last_Name(): FormControl {
        return this.fg.controls[MgControlName.Last_Name] as FormControl;
    }

    get Birth_Date(): FormControl {
        return this.fg.controls[MgControlName.Birth_Date] as FormControl;
    }

    get Combo_Gender(): FormControl {
        return this.fg.controls[MgControlName.Combo_Gender] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}