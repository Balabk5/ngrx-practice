import { FormControl } from "@angular/forms";

export enum taskStatus{
    PENDING ='Pending',
    INPROGRESS ='In-Progress',
    COMPLETED ='Completed',
}
export enum taskPriority{
    HIGH ='High',
    MEDIUM ='Medium',
    LOW ='Low',
}
export interface createTask{
    Id: number ,
    title: string,
    description: string,
    status: taskStatus,
    priority: taskPriority
}
