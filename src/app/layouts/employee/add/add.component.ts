import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'employee-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})

export class EmployeeAddComponent implements OnInit {

    readonly DtMin: Date = new Date();

    EmployeeForm: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]),
        birthDate: new FormControl('', [Validators.required]),
        basicSalary: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
        group: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
    });

    constructor(private dialog: MatDialogRef<EmployeeAddComponent>) { }

    ngOnInit(): void {
        this.SetListGrp();
    }

    GetFormControl(control: string): AbstractControl {
        return this.EmployeeForm.get(control) as AbstractControl;
    }

    ListGrp: Array<string> = new Array();
    private SetListGrp() {
        for (let index = 1; index <= 10; index++) {
            const grp = "Group" + index;
            this.ListGrp.push(grp);
        }
    }

    Cancel() {
        this.dialog.close();
    }

    SaveForm() {
        console.log(this.EmployeeForm);
        console.log(this.EmployeeForm.getRawValue());
        const Data = this.EmployeeForm.getRawValue();
        this.dialog.close(Data);
    }
}