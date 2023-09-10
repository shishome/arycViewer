import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {RestService} from "../../services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {Submission} from "../../interfaces/submission";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(
    public storage: StorageService,
    private rest: RestService,
    private router: ActivatedRoute
  ) {
    this.loadingArray = this.initLoadByDate();
  }

  loadingArray: Array<number>;

  ngOnInit(): void {
    console.log("Loaded Home.");
    this.rest.setTitle("Browser");
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
