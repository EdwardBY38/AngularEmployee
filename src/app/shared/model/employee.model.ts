export class EmployeeObj {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    basicSalary: number;
    status: string;
    group: string;
    description: Date;

    constructor() {
        this.id = 0;
        this.username = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.birthDate = null;
        this.basicSalary = 0;
        this.status = "";
        this.group = "";
        this.description = null;
    }


}