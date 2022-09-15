import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeObj } from 'app/shared/model/employee.model';
import { EmployeeAddComponent } from '../add/add.component';
import { EmployeedetailComponent } from '../detail/detail.component';

@Component({
    selector: 'employee-paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.css']
})

export class EmployeePagingComponent implements OnInit {

    // MatPaginator Inputs
    readonly pageSizeOptions: number[] = [10, 25, 100];

    ngOnInit(): void {
        // Overrride default filter behaviour of Material Datatable
        this.dataSource.filterPredicate = this.createFilter();
    }

    SearchForm: FormGroup = new FormGroup({
        Username: new FormControl(''),
        Email: new FormControl('')
    });

    displayedColumns = [
        "No",
        "username",
        "email",
        "birthDate",
        "basicSalary",
        "status",
        "group",
        "Action"
    ];
    dataSource: MatTableDataSource<EmployeeObj>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private dialog: MatDialog) {
        // Create 100 users
        const Emp: EmployeeObj[] = this.GenerateListEmployee();

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(Emp);
    }

    Add() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'role-modal';
        dialogConfig.width = '50%';
        dialogConfig.disableClose = true;
        dialogConfig.backdropClass = "blur-bg";

        const dialogRef = this.dialog.open(EmployeeAddComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: EmployeeObj) => {
            console.log(result);
            if(result != undefined) {
                this.TotalData++;
                result.id = this.TotalData;
                const data = this.dataSource.data;
                data.push(result);
                this.dataSource.data = data;
            }
        });
    }

    Search() {
        const Username = this.SearchForm.get("Username").value;
        const Email = this.SearchForm.get("Email").value;
        this.filterChange("username", Username);
        this.filterChange("email", Email);
    }

    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    filterValues = {};
    private filterChange(column: string, val) {
        this.filterValues[column] = val.trim().toLowerCase()
        this.dataSource.filter = JSON.stringify(this.filterValues)
    }

    // Custom filter method fot Angular Material Datatable
    private createFilter() {
        let filterFunction = function (data: any, filter: string): boolean {
            let searchTerms = JSON.parse(filter);
            let isFilterSet = false;
            for (const col in searchTerms) {
                if (searchTerms[col].toString() !== '') {
                    isFilterSet = true;
                } else {
                    delete searchTerms[col];
                }
            }

            let nameSearch = () => {
                let found = true;
                if (isFilterSet) {
                    for (const col in searchTerms) {
                        searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
                            if (data[col].toString().toLowerCase().indexOf(word) == -1 || !isFilterSet) {
                                found = false
                            }
                        });
                    }
                    return found
                } else {
                    return true;
                }
            }
            return nameSearch()
        }
        return filterFunction
    }

    TotalData: number = 0;
    private GenerateListEmployee(): Array<EmployeeObj> {
        const firstName = "User";
        const lastName = "Family";
        const ListEmployee: Array<EmployeeObj> = new Array();

        this.TotalData = 100;
        for (let index = 1; index <= this.TotalData; index++) {
            //#region init const value
            const firstNameVal = firstName + index;
            const lastNameVal = lastName + index;
            const usrNameVal = firstNameVal + lastNameVal;
            const email = usrNameVal + "@gmail.com";
            const birthDate = this.GetNewBirthDt(2 * index);
            const basicSalary = this.GetBasicSalary(index);
            const status = this.GetStatus(index);
            const group = this.GetGroup(index);
            const description = this.GetNewDescription(index);
            //#endregion

            const EmpObj: EmployeeObj = {
                id: index,
                username: usrNameVal,
                firstName: firstNameVal,
                lastName: lastNameVal,
                email: email,
                birthDate: birthDate,
                basicSalary: basicSalary,
                status: status,
                group: group,
                description: description
            };
            ListEmployee.push(EmpObj);
        }

        return ListEmployee;
    }

    //#region GenerateListEmployee const value
    private GetStatus(idx: number): string {
        if (idx % 2) return "NEW";
        return "OLD";
    }

    private GetBasicSalary(idx: number): number {
        const Num1 = idx % 7;
        const Num2 = idx % 5;
        return 1000000 * (Num1 + 1) * (Num2 + 1);
    }

    private GetGroup(idx: number): string {
        const GrpNum = (idx % 10) + 1;
        return "Group" + GrpNum;
    }

    private GetNewBirthDt(minus: number): Date {
        const birthDate = new Date();
        const minusYear = 17;
        const minusDate = 17 + (minus * 2);
        const year = birthDate.getFullYear();
        birthDate.setFullYear(year - minusYear);
        const date = birthDate.getDate();
        birthDate.setDate(date - minusDate);
        return birthDate;
    }

    private GetNewDescription(plus: number): Date {
        const birthDate = new Date();
        const date = birthDate.getDate();
        birthDate.setDate(date + plus);
        return birthDate;
    }
    //#endregion

    EditData(EmpObj: EmployeeObj) {
        console.log(EmpObj);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.id = 'role-modal';
        dialogConfig.width = '50%';
        dialogConfig.data = EmpObj;
        dialogConfig.disableClose = true;
        dialogConfig.backdropClass = "blur-bg";

        const dialogRef = this.dialog.open(EmployeedetailComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
        });
    }

    DeleteData(Idx: number) {
        const tempData = this.dataSource.data;
        const idxFound = tempData.findIndex(x => x.id == Idx);
        if (idxFound >= 0) {
            tempData.splice(idxFound, 1);
        }
        this.dataSource.data = tempData;
    }

    // Reset table filters
    ResetFilters() {
        this.filterValues = {}
        const UsernameControl = this.SearchForm.get("Username");
        UsernameControl.setValue("");
        const EmailControl = this.SearchForm.get("Email");
        EmailControl.setValue("");
        this.dataSource.filter = "";
    }
}