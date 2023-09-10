import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import {MarkdownModule} from "ngx-markdown";
import { ListComponent } from './modules/list/list.component';
import { FirstTimeComponent } from './pages/first-time/first-time.component';
import { ViewComponent } from './pages/view/view.component';
import { CategoryComponent } from './pages/category/category.component';
import {CommonModule} from "@angular/common";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ListComponent,
    FirstTimeComponent,
    ViewComponent,
    CategoryComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MarkdownModule.forRoot(),
    FormsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
