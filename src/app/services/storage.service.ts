import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {environment} from "../../environments/environment";
import YAML from 'yaml';
import {Master} from "../interfaces/master";
import {IndexedMaster} from "../interfaces/indexed-master";
import {IndexedCategory} from "../interfaces/indexed-category";
import {Submission} from "../interfaces/submission";
import {Reference} from "../interfaces/reference";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public isFullyLoaded = false;
  public isArycListLoaded = false;
  public isArycMasterLoaded = false;
  public isArycReading = false;
  public isArycReadingDone = false;
  public isCatagorizing = false;

  public arycList = [];
  public arycMaster: any;

  public arycIndex: IndexedMaster;

  public arycListTotal = 0;
  public arycListCurrent = 0;

  public showR18 = false;
  public showHide = false;

  public notFirstTime = true;
  public pages: any;

  public reloadChangeToNoFilter = false;

  public selectedToView: Submission[] = [];

  searchText: string = '';



  constructor(
    private rest: RestService
  ) {
    this.arycIndex = new class implements IndexedMaster {
      categories: IndexedCategory[] = [];
    }
    this.checkFirstTime();
    this.fetchList();
  }

  getSubmissionMetadata(submissionId: string): Submission | undefined{
    if(!this.isArycReadingDone){
      throw new Error("Aryc Master isn't loaded yet into the system.");
    }
    for (let i = 0; i < this.arycMaster.submissions.length; i++) {
      if(submissionId === this.arycMaster.submissions[i].submissionId){

        return this.arycMaster.submissions[i];
      }
    }
    return undefined
  }

  checkFirstTime(){
    let store = localStorage.getItem("artarchive4_firsttime");
    if(store === null){
      this.notFirstTime = false;
    }else{
      let r18Check = localStorage.getItem("artarchive4_r18");
      if(r18Check === "false"){
        this.showR18 = false;
      }else{
        this.showR18 = true;
      }
      let hideCheck = localStorage.getItem("artarchive4_hide");
      if(hideCheck === "false"){
        this.showHide = false;
      }else{
        this.showHide = true;
      }

      if(!this.showHide || !this.showR18){
        this.fetchMaster(true);
      }else{
        this.fetchMaster();
      }

    }
  }

  paginate(arr:any, size:any) {
    return arr.reduce((acc:any, val:any, i:any) => {
      let idx = Math.floor(i / size)
      let page = acc[idx] || (acc[idx] = [])
      page.push(val)

      return acc
    }, [])
  }

  fetchList(){
    this.rest.get(environment.listFile)
      .subscribe(
        (res) => {
          this.arycList = res;
          this.isArycListLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      )
  }

  fetchMaster(doFilterCheck: boolean=false){
    this.rest.get(environment.masterOutputFile, {
      observe: 'body',
      responseType: "text"
    })
      .subscribe(
        (res) => {
          this.isArycMasterLoaded = false;
          this.arycMaster = YAML.parse(res);
          console.log(this.arycMaster);
          // do filter

          let r18Check = this.showR18;
          let hideCheck = this.showHide;

          if(doFilterCheck){
            console.log("Doing a filter check.")
            this.arycMaster.submissions = this.arycMaster.submissions.filter(function(el: Submission){
              if(el.r18 && !r18Check){
                return false;
              }
              if(el.hide && !hideCheck){
                return false;
              }
              return true;
            })
            console.log(this.arycMaster.submissions);
            this.reloadChangeToNoFilter = true;
          }
          this.arycListTotal = this.arycMaster['submissions'].length;
          this.isArycMasterLoaded = true;
          this.readMaster(doFilterCheck);
        },
        (err) => {
          console.log(err)
        }
      )
  }

  findArycIndexedCategory(name: string): number{
    for (let i: number = 0; i < this.arycIndex.categories.length; i++) {
      if(name === this.arycIndex.categories[i].name){
        return i;
      }
    }
    return -1;
  }

  readMaster(doFilterCheck: boolean){
    this.isArycReading = true;
    let mT: Master = this.arycMaster;
    for (let i = 0; i < mT.categories.length; i++) {
      this.arycIndex.categories.push({
        name: mT.categories[i].name,
        references: [],
        submissions: []
      });
    }
    for (let i = 0; i < mT.references.length; i++) {
      console.log("found ref", mT.references[i]);
      this.arycIndex.categories[this.findArycIndexedCategory(mT.references[i].category)].references.push(mT.references[i]);
    }
    for (let i = 0; i < mT.submissions.length; i++) {
      this.arycIndex.categories[this.findArycIndexedCategory(mT.submissions[i].category)].submissions.push(mT.submissions[i]);
      this.arycListCurrent = i + 1;
    }
    this.isArycReadingDone = true;
    this.catagorizeAndFinalize();
  }
  catagorizeAndFinalize(){
    this.isCatagorizing = true;

    this.isFullyLoaded = true;
  }
}
