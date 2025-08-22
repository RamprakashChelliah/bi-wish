import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Wish2Component } from './wish2/wish2.component';
import { BirthdayWishComponent } from './birthday-wish/birthday-wish.component';
import { SparkleContentComponent } from './sparkle-content/sparkle-content.component';
import { LoveMsgComponent } from './love-msg/love-msg.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "wish", component: Wish2Component
  },
  {
    path: "birthday-wish", component: BirthdayWishComponent
  },
  {
    path: "sparkle-content", component: SparkleContentComponent
  },
  {
    path: "love-msg", component: LoveMsgComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
