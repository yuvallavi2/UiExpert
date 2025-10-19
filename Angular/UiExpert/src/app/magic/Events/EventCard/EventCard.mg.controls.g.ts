import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    EventCard = "EventCard",
        Event_ID = "Event_ID",
        P_pBtnVisibility = "P_pBtnVisibility",
        ComboEventType = "ComboEventType",
        Event_Name = "Event_Name",
        ComboEventLocation = "ComboEventLocation",
        Start_Date = "Start_Date",
        End_Date = "End_Date",
        EventStartTime = "EventStartTime",
        Event_Inforrmation_End_Time = "Event_Inforrmation_End_Time",
        Minimum_Attendees = "Minimum_Attendees",
        Maximum_Attendees = "Maximum_Attendees",
        btnSave = "btnSave",
        SfRegisteredMembers = "SfRegisteredMembers",
        btnQuit = "btnQuit",
}
export enum MgCustomProperties {}
export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get Event_ID(): FormControl {
        return this.fg.controls[MgControlName.Event_ID] as FormControl;
    }

    get P_pBtnVisibility(): FormControl {
        return this.fg.controls[MgControlName.P_pBtnVisibility] as FormControl;
    }

    get ComboEventType(): FormControl {
        return this.fg.controls[MgControlName.ComboEventType] as FormControl;
    }

    get Event_Name(): FormControl {
        return this.fg.controls[MgControlName.Event_Name] as FormControl;
    }

    get ComboEventLocation(): FormControl {
        return this.fg.controls[MgControlName.ComboEventLocation] as FormControl;
    }

    get Start_Date(): FormControl {
        return this.fg.controls[MgControlName.Start_Date] as FormControl;
    }

    get End_Date(): FormControl {
        return this.fg.controls[MgControlName.End_Date] as FormControl;
    }

    get EventStartTime(): FormControl {
        return this.fg.controls[MgControlName.EventStartTime] as FormControl;
    }

    get Event_Inforrmation_End_Time(): FormControl {
        return this.fg.controls[MgControlName.Event_Inforrmation_End_Time] as FormControl;
    }

    get Minimum_Attendees(): FormControl {
        return this.fg.controls[MgControlName.Minimum_Attendees] as FormControl;
    }

    get Maximum_Attendees(): FormControl {
        return this.fg.controls[MgControlName.Maximum_Attendees] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}