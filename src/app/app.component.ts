import { Component } from '@angular/core';
import {StorageService} from "./services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arycViewer';

  constructor(
    public storage: StorageService,
    private router: Router
  ) { }

  loadCategory(routerLink: string){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([routerLink]);
  }

}
