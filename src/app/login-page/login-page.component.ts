import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit 
{
  @ViewChild('f') loginForm: NgForm;
  invalidLogin = false;

  ngOnInit()
  {
    this.loginForm.setValue({
      name: null,
      pswd: null
    })
  }

  onSubmit(form: NgForm)
  {
    if (this.loginForm.invalid)
    {
      return;
    }
    
    const input = form.value; 
    if (input.name === "admin" && input.pswd === "admin") 
    {
      // redirect to employee page
      this.invalidLogin = false;
    }
    else
    {
      this.invalidLogin = true;
    }
    this.loginForm.reset();
  }
}
