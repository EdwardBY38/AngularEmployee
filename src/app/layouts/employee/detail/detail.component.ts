import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeObj } from 'app/shared/model/employee.model';

@Component({
    selector: 'employee-detail',
    templateUrl: './detail.component.html'
})

export class EmployeedetailComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: EmployeeObj, private dialog: MatDialogRef<EmployeedetailComponent>) { }

    ngOnInit(): void { }

    Cancel() {
        this.dialog.close();
    }
}