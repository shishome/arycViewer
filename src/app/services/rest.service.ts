import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private title: Title
  ) { }

  get(uri: string, options: any={}): Observable<any>{
    return this.http.get(environment.artDirectory+uri, options)
  }

  setTitle(str: string){
    this.title.setTitle("Yuu.im Art Archive :: "+str)
  }

}
