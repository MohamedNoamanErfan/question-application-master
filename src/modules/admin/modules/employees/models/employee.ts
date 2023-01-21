import { IEmployeeAtendances } from "../../attendances/models/employee-atendances";

export interface IEmployee {
    name: string;
    email: string;
    phoneNo: string;
    employeeAttendanceModels: IEmployeeAtendances[];
    id: number;
    createdON: Date;
    updatedON: Date;
}