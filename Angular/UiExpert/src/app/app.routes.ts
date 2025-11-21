import { Routes, RouterModule } from '@angular/router';
import { RouterContainerMagicComponent } from "@magic-xpa/angular";
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
export const routes: Routes = [

    {
        path: 'welcome',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'MList',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'MCard',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'MContact',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'EventCard',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'RegisteredMembers',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'EventList',
        component: RouterContainerMagicComponent,

    },
    {
        path: 'MemberSelection',
        component: RouterContainerMagicComponent,

    },

];

@NgModule({
    imports: [CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class MagicRoutingModule {}