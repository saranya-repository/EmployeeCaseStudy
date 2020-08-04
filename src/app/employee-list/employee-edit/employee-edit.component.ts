import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Employee } from '../employee.model';
import { EmployeeListService} from '../employee-list.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit, OnDestroy
{
  @ViewChild('f') empForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Employee;

  constructor(private empService: EmployeeListService) { }

  ngOnInit() 
  {
    this.subscription = this.empService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.empService.getEmployee(index);
        this.empForm.setValue({
          id: this.editedItem.eid,
          name: this.editedItem.name,
          dept: this.editedItem.dept,
          salary: this.editedItem.salary
        })
      }
    );
  }

  onSubmit(form: NgForm)
  {
    const input = form.value; 
    const newEmployee = new Employee(input.id, input.name, input.dept, input.salary);
    if (this.editedItem)
    {
      this.empService.updateEmployee(this.editedItemIndex, newEmployee);
    }
    else
    {
      this.empService.addEmployee(newEmployee);
    }
    this.editMode = false;
    form.reset();
  }

  onClear()
  {
    this.empForm.reset();
    this.editMode = false;
  }

  onDelete()
  {
    this.empService.deleteEmployee(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
