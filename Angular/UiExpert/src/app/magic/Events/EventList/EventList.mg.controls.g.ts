import {
    FormControl,
    FormGroup
} from "@angular/forms";
import {
    MagicServices
} from "@magic-xpa/angular";
export enum MgControlName {
    EventList = "EventList",
        MainGroup = "MainGroup",
        TableEventList = "TableEventList",
        EventID = "EventID",
        Event_Inforrmation_Event_ID = "Event_Inforrmation_Event_ID",
        EventType = "EventType",
        Event_Inforrmation_Event_Type = "Event_Inforrmation_Event_Type",
        EventName = "EventName",
        Event_Inforrmation_Event_Name = "Event_Inforrmation_Event_Name",
        EventLocation = "EventLocation",
        Event_Location = "Event_Location",
        StartDate = "StartDate",
        Event_Inforrmation_Start_Date = "Event_Inforrmation_Start_Date",
        EndDate = "EndDate",
        Event_Inforrmation_End_Date = "Event_Inforrmation_End_Date",
        Column_Action = "Column_Action",
        btn_Modify = "btn_Modify",
        btn_Delete = "btn_Delete",
        BtnViewRefresh = "BtnViewRefresh",
        btnCreateEvent = "btnCreateEvent",
        SFEventCard = "SFEventCard",
        V_vToggleSubForm = "V_vToggleSubForm",
}
export enum MgCustomProperties {}
export var
    MgDisplayedColumns = [
        'EventID',
        'EventType',
        'EventName',
        'EventLocation',
        'StartDate',
        'EndDate',
        'Column_Action',
    ];

export class MgFormControlsAccessor {
    constructor(private fg: FormGroup, private magicServices: MagicServices) {}

    get Event_Inforrmation_Event_ID(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Inforrmation_Event_ID);
    }

    get Event_Inforrmation_Event_Type(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Inforrmation_Event_Type);
    }

    get Event_Inforrmation_Event_Name(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Inforrmation_Event_Name);
    }

    get Event_Location(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Location);
    }

    get Event_Inforrmation_Start_Date(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Inforrmation_Start_Date);
    }

    get Event_Inforrmation_End_Date(): FormControl {
        return this.getTableChildFormControl(MgControlName.Event_Inforrmation_End_Date);
    }

    get V_vToggleSubForm(): FormControl {
        return this.fg.controls[MgControlName.V_vToggleSubForm] as FormControl;
    }

    getTableChildFormControl(name: MgControlName): FormControl {
        return this.magicServices.mgAccessorService.getFormGroupByRow(this.magicServices.tableService.getSelectedRow()).controls[name] as FormControl;
    }
}