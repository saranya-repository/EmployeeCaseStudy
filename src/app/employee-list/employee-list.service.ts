import { Employee } from './employee.model'
import { Subject } from 'rxjs';

export class EmployeeListService
{
    employeeDataChanged = new Subject<Employee[]>();
    startedEditing = new Subject<number>();

    private employees: Employee[] = 
    [
        new Employee(101, 'A', 'Apex', 100000),
        new Employee(102, 'S', 'Smartloan', 250000),
        new Employee(101, 'X', 'Loanet', 450000),
    ];

    getEmployees()
    {
        return this.employees.slice();
    }

    getEmployee(index: number)
    {
        return this.employees[index];
    }

    addEmployee(emp: Employee)
    {
        this.employees.push(emp);
        this.employeeDataChanged.next(this.employees.slice());
    }

    addEmployees(employees: Employee[])
    {
        this.employees.push(...this.employees);
        this.employeeDataChanged.next(this.employees.slice());
    }

    updateEmployee(index: number, newEmployee: Employee)
    {
        this.employees[index] = newEmployee;
        this.employeeDataChanged.next(this.employees.slice());
    }

    deleteEmployee(index: number)
    {
        this.employees.slice(index, 1);
        this.employeeDataChanged.next(this.employees.slice());
    }
}