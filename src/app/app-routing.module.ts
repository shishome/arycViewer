import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AboutComponent} from "./pages/about/about.component";
import {FirstTimeComponent} from "./pages/first-time/first-time.component";
import {ViewComponent} from "./pages/view/view.component";
import {CategoryComponent} from "./pages/category/category.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'first-time',
    component: FirstTimeComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
