import {Component, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Submission} from "../../interfaces/submission";
import {Router} from "@angular/router";

@Component({
  selector: 'list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() displayArray: Array<any> = [];

  displayInterval: number = 20;
  displayStart: number = 0;
  displayEnd: number = this.displayInterval;
  page: number = 0;

  constructor(
    public storage: StorageService,
    public router: Router
  ) { }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    if(event.code === '37'){
      //back
      if(this.page != 0){
        this.loadPage(this.page - 1);
      }
    }
    if(event.code === '39'){
      //forward
      if(this.page != this.storage.pages.length - 1){
        this.loadPage(this.page + 1);
      }
    }
  }

  ngOnInit(): void {
    console.log("Loaded list")
    this.storage.pages = this.storage.paginate(this.displayArray, this.displayInterval);
  }

  canDisplay(nmb: Submission) {
    if(nmb.hide && !this.storage.showHide){
      return ['d-none']
    }
    if(nmb.r18 && !this.storage.showR18){
      return ['d-none']
    }
    return ['col-md-3']

  }

  loadImage(nmb: number) {
    if(nmb >= this.displayStart && nmb <= this.displayEnd){
      return this.displayArray[nmb].url;
    }
    return '#'
  }

  loadPage(i: number) {
    this.page = i;
  }

  loadView(n: Submission) {
    this.storage.selectedToView = [n];
    this.router.navigate(['/view', n.submissionId])
  }
}
