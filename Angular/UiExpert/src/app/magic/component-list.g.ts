import { EventCard as EventCard_EventCard } from './Events/EventCard/EventCard.component';
import { RegisteredMembers as RegisteredMembers_RegisteredMembers } from './Events/RegisteredMembers/RegisteredMembers.component';
import { EventList as EventList_EventList } from './Events/EventList/EventList.component';
import { MemberSelection as MemberSelection_MemberSelection } from './Events/MemberSelection/MemberSelection.component';
import { MList as MList_MList } from './Members/MList/MList.component';
import { MCard as MCard_MCard } from './Members/MCard/MCard.component';
import { MContact as MContact_MContact } from './Members/MContact/MContact.component';
import { StartProgram as StartProgram_StartProgram } from './mainWC/StartProgram/StartProgram.component';
import { UserDropdown as StartProgram_UserDropdown_UserDropdown } from './mainWC/StartProgram/UserDropdown/UserDropdown.component';
import { Welcome as Welcome_Welcome } from './mainWC/Welcome/Welcome.component';

export const title = "";

export const magicGenCmpsHash = {               EventCard_EventCard:EventCard_EventCard,
              RegisteredMembers_RegisteredMembers:RegisteredMembers_RegisteredMembers,
              EventList_EventList:EventList_EventList,
              MemberSelection_MemberSelection:MemberSelection_MemberSelection,
              MList_MList:MList_MList,
              MCard_MCard:MCard_MCard,
              MContact_MContact:MContact_MContact,
              StartProgram_StartProgram:StartProgram_StartProgram,
              StartProgram_UserDropdown_UserDropdown:StartProgram_UserDropdown_UserDropdown,
              Welcome_Welcome:Welcome_Welcome,
       
};

export const magicGenComponents = [
	EventCard_EventCard,
	RegisteredMembers_RegisteredMembers,
	EventList_EventList,
	MemberSelection_MemberSelection,
	MList_MList,
	MCard_MCard,
	MContact_MContact,
	StartProgram_StartProgram,
	StartProgram_UserDropdown_UserDropdown,
	Welcome_Welcome 
];


export const LazyLoadModulesMap = {};