import { Component } from '@angular/core';

import { FormGroup } from "@angular/forms";
import { MgFormControlsAccessor, MgControlName, MgCustomProperties } from "./EventCard.mg.controls.g";


import { TaskBaseMagicComponent, magicProviders } from "@magic-xpa/angular";


import { MagicModalInterface } from "@magic-xpa/angular";

@Component({
    selector: 'mga-Events_EventCard_EventCard',
    providers: [...magicProviders],
    standalone: false,
    templateUrl: './EventCard.component.html'
})
export class EventCard extends TaskBaseMagicComponent implements MagicModalInterface {

    mgc = MgControlName;
    mgcp = MgCustomProperties;
    mgfc!: MgFormControlsAccessor;
    override createFormControlsAccessor(formGroup: FormGroup) {
        this.mgfc = new MgFormControlsAccessor(formGroup, this.magicServices);
    }
    private static readonly formName: string = "EventCard";
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
        return EventCard.x;
    }
    Y() {
        return EventCard.y;
    }
    Width(): string {
        return EventCard.width;
    }
    Height(): string {
        return EventCard.height;
    }
    IsCenteredToWindow() {
        return EventCard.isCenteredToWindow;
    }
    FormName() {
        return EventCard.formName;
    }
    ShowTitleBar() {
        return EventCard.showTitleBar;
    }
    ShouldCloseOnBackgroundClick() {
        return EventCard.shouldCloseOnBackgroundClick;
    }
    IsResizable() {
        return EventCard.isResizable;
    }
    IsMovable() {
        return EventCard.isMovable;
    }
}