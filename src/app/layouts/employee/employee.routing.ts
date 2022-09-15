import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeePagingComponent } from "./paging/paging.component";

export const routes: Routes = [
    {
        path: 'Paging',
        component: EmployeePagingComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeeRoutingModule { }