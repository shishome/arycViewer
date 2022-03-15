import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Submission} from "../../interfaces/submission";
import {RestService} from "../../services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import moment from 'moment/moment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  selectedToView: Submission | undefined;
  readyForRender = false;
  displayUrl = "";
  selectedVariant: any;

  constructor(
    public storage: StorageService,
    public rest: RestService,
    route: ActivatedRoute,
    router: Router
  ) {

    this.selectedToView = this.storage.selectedToView[0];

    console.log(route.snapshot.params['id']);
    if(route.snapshot.params['id'] != undefined && this.selectedToView === undefined){
      this.selectedToView = this.storage.getSubmissionMetadata(route.snapshot.params['id']);
      console.log(this.selectedToView)
    }


    if(this.selectedToView === undefined){
      router.navigate(['/']);
    }else{
      this.selectedVariant = this.selectedToView.mainFile;
      this.readyForRender = true;
      this.rest.setTitle(this.selectedToView.submissionId);
    }



  }

  buildUrl(uri: string): string{
    return (environment.artDirectory+uri.slice(0,1))
  }

  ngOnInit(): void {
  }

  doMoment(dateCreated: number | undefined) {
    if(dateCreated === undefined){
      return ''
    }else{
      return moment(dateCreated).fromNow();
    }
  }
}
