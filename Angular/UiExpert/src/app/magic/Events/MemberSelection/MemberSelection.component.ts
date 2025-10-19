import { Component } from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./MemberSelection.mg.controls.g";
import { MgDisplayedColumns } from "./MemberSelection.mg.controls.g";


import { BaseMatTableMagicComponent, matMagicProviders } from "@magic-xpa/angular-material-core";


import { MagicModalInterface } from "@magic-xpa/angular";

@Component({
    selector: 'mga-Events_MemberSelection_MemberSelection',
    providers: [...matMagicProviders],
    standalone: false,
    templateUrl: './MemberSelection.component.html'
})
export class MemberSelection extends BaseMatTableMagicComponent implements MagicModalInterface {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;
    mgdp = MgDisplayedColumns;
    override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }
    private static readonly formName: string = "MemberSelection";
    private static readonly showTitleBar: boolean = true;
    private static readonly x: number = 0;
    private static readonly y: number = 0;
    private static readonly width: string = "300px";
    private static readonly height: string = "300px";
    private static readonly isCenteredToWindow: boolean = true;
    private static readonly shouldCloseOnBackgroundClick: boolean = true;
    private static readonly isResizable: boolean = true;
    private static readonly isMovable: boolean = true;
    X() {
        return MemberSelection.x;
    }
    Y() {
        return MemberSelection.y;
    }
    Width(): string {
        return MemberSelection.width;
    }
    Height(): string {
        return MemberSelection.height;
    }
    IsCenteredToWindow() {
        return MemberSelection.isCenteredToWindow;
    }
    FormName() {
        return MemberSelection.formName;
    }
    ShowTitleBar() {
        return MemberSelection.showTitleBar;
    }
    ShouldCloseOnBackgroundClick() {
        return MemberSelection.shouldCloseOnBackgroundClick;
    }
    IsResizable() {
        return MemberSelection.isResizable;
    }
    IsMovable() {
        return MemberSelection.isMovable;
    }
    override displayedColumns = this.mgdp;
}