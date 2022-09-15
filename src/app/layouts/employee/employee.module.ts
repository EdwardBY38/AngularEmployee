import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from 'app/shared/angular-material.module';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { EmployeeAddComponent } from './add/add.component';
import { EmployeedetailComponent } from './detail/detail.component';
import { EmployeeRoutingModule } from './employee.routing';
import { EmployeePagingComponent } from './paging/paging.component';

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 0,
    prefix: "",
    suffix: "",
    thousands: ",",
    nullable: false,
    inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        EmployeeRoutingModule,
        FormsModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        MatDialogModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ],
    declarations: [
        EmployeePagingComponent,
        EmployeeAddComponent,
        EmployeedetailComponent
    ]
})

export class EmployeeModule { }