import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    StartProgram = "StartProgram",
        btnHelloXPA = "btnHelloXPA",
        headerText = "headerText",
        SubformRout = "SubformRout",
        footerText = "footerText",
        userDropdown = "userDropdown",
}
export enum MgCustomProperties {
    StartProgram_menuData = 'StartProgram~menuData',
}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get headerText(): FormControl {
        return this.fg.controls[MgControlName.headerText] as FormControl;
    }

    get footerText(): FormControl {
        return this.fg.controls[MgControlName.footerText] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}