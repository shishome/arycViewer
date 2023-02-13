import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Submission} from "../../interfaces/submission";
import {ActivatedRoute} from "@angular/router";
import {IndexedMaster} from "../../interfaces/indexed-master";
import {IndexedCategory} from "../../interfaces/indexed-category";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: string = "";
  selInRefLen: number = 0;

  constructor(
    public storage: StorageService,
    public route: ActivatedRoute,
    public rest: RestService
  ) {
    this.loadingArray = this.initLoadByDate();
    this.category = this.route.snapshot.params['id'];
    for (let i = 0; i < this.storage.arycIndex.categories.length; i++) {
      if(this.storage.arycIndex.categories[i].name === this.category){
        this.selectedIndex = this.storage.arycIndex.categories[i];
        this.selInRefLen = this.storage.arycIndex.categories[i].references.length;
      }
    }
  }

  selectedList = [];
  selectedIndex: IndexedCategory | undefined;

  loadingArray: Array<number>;

  ngOnInit(): void {
    this.rest.setTitle("Category Browser")
  }

  initLoadByDate(): Array<number>{
    let tmpI: Array<number> = [];
    let dic: any = {};
    let tmpArr: any = this.storage.arycMaster.submissions
    for (let i = 0; i < this.storage.arycMaster.submissions.length; i++) {
      dic[this.storage.arycMaster.submissions[i].submissionId] = i;
    }
    //console.table(tmpArr);
    tmpArr.sort((a: Submission, b: Submission) => (a.dateCreated > b.dateCreated) ? 1 : -1)
    tmpArr.sort((a: Submission, b: Submission) => (a.folder < b.folder) ? 1 : -1)
    //console.table(tmpArr);
    for (let i = 0; i < tmpArr.length; i++) {
      tmpI.push(dic[tmpArr[i].submissionId]);
    }
    return tmpI;
  }

}
