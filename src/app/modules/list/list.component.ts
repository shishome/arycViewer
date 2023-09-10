import {Component, HostListener, Input, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Submission} from "../../interfaces/submission";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'list-module',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() displayArray: Array<any> = [];
  @Input() isSearch: boolean = false;

  displayInterval: number = 16;
  displayStart: number = 0;
  displayEnd: number = this.displayInterval;
  page: number = 0;

  abs = Math.abs;

  constructor(
    public storage: StorageService,
    public router: Router,
    public aRouter: ActivatedRoute
  ) { }

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'ArrowLeft'){
      //back
      if(this.page != 0){
        this.loadPage(this.page - 1);
      }
    }
    if(event.key === 'ArrowRight'){
      //forward
      if(this.page != this.storage.pages.length - 1){
        this.loadPage(this.page + 1);
      }
    }
  }

  ngOnInit(): void {
    //console.log("Loaded list")
    this.storage.pages = this.storage.paginate(this.displayArray, this.displayInterval);
    let n = this.aRouter.snapshot.params.num || null;
    if(n !== null){
      console.log("found a page to navigate to ", n);
      this.loadPage(parseInt(n));
    }

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
    let paths: string[] = [];
    this.aRouter.url.forEach((a) => {
      a.forEach((b) => {
        paths.push(b.path)
      })
    })
    if(this.page === 0){
      this.router.navigate([paths.join("/").split("page/")[0]]);
      return true;
    }
    let n = this.aRouter.snapshot.params.num || null;
    if(n === null) {
        this.router.navigate([paths.join("/")+'/page/'+(i)]);
    }else{
      this.router.navigate([paths.join("/").split("page/")[0]+'page/'+(i)])
    }
    return true;
  }

  loadView(n: Submission) {
    this.storage.selectedToView = [n];
    this.router.navigate(['/view', n.submissionId])
  }
}
