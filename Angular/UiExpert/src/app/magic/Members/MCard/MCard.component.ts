import { Component } from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./MCard.mg.controls.g";


import { TaskBaseMagicComponent, magicProviders } from "@magic-xpa/angular";


import { MagicModalInterface } from "@magic-xpa/angular";

@Component({
    selector: 'mga-Members_MCard_MCard',
    providers: [...magicProviders],
    standalone: false,
    templateUrl: './MCard.component.html'
})
export class MCard extends TaskBaseMagicComponent implements MagicModalInterface {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;
    override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }
    private static readonly formName: string = "MCard";
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
        return MCard.x;
    }
    Y() {
        return MCard.y;
    }
    Width(): string {
        return MCard.width;
    }
    Height(): string {
        return MCard.height;
    }
    IsCenteredToWindow() {
        return MCard.isCenteredToWindow;
    }
    FormName() {
        return MCard.formName;
    }
    ShowTitleBar() {
        return MCard.showTitleBar;
    }
    ShouldCloseOnBackgroundClick() {
        return MCard.shouldCloseOnBackgroundClick;
    }
    IsResizable() {
        return MCard.isResizable;
    }
    IsMovable() {
        return MCard.isMovable;
    }
}