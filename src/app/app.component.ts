import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{
  title = 'Employee Information';
  loadedFeature = 'home-page';

  onNavigate(feature: string)
  {
    this.loadedFeature = feature;
  }
}
