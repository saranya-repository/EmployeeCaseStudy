import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Employee } from './employee.model';
import { EmployeeListService } from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[];
  private subscription: Subscription;

  constructor(private empService: EmployeeListService) {}

  ngOnInit(): void 
  {
    this.employees = this.empService.getEmployees();
    this.subscription = this.empService.employeeDataChanged
      .subscribe(
        (employees: Employee[]) => {
          this.employees = employees;
        }
      )
  }

  onEditItem(index: number)
  {
    this.empService.startedEditing.next(index);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
