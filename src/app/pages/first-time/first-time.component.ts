import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.css']
})
export class FirstTimeComponent implements OnInit {

  constructor(
    public storage: StorageService
  ) { }

  ngOnInit(): void {
  }

  acknowledge() {
    this.storage.notFirstTime = true;
    this.storage.showR18 = true;
    this.storage.showHide = false;
    localStorage.setItem("artarchive4_firsttime", "false");
    localStorage.setItem("artarchive4_r18", "true");
    localStorage.setItem("artarchive4_hide", "false");
    this.storage.checkFirstTime();
  }

  acknowledgeHidden() {
    this.storage.notFirstTime = true;
    this.storage.showR18 = true;
    this.storage.showHide = true;
    localStorage.setItem("artarchive4_firsttime", "false");
    localStorage.setItem("artarchive4_r18", "true");
    localStorage.setItem("artarchive4_hide", "true");
    window.location.reload();
  }

  acknowledgeSFW() {
    this.storage.notFirstTime = true;
    this.storage.showR18 = false;
    this.storage.showHide = false;
    localStorage.setItem("artarchive4_firsttime", "false");
    localStorage.setItem("artarchive4_r18", "false");
    localStorage.setItem("artarchive4_hide", "false");
    this.storage.checkFirstTime();
  }

  bye() {
    this.storage.notFirstTime = false;
    this.storage.showR18 = false;
    this.storage.showHide = false;
    localStorage.removeItem("artarchive4_firsttime");
    localStorage.setItem("artarchive4_r18", "false");
    localStorage.setItem("artarchive4_hide", "false");

  }
}
