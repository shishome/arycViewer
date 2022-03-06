import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    public storage: StorageService,
    private rest: RestService
  ) { }

  ngOnInit(): void {
    this.rest.setTitle("About Aryc")
  }

}
