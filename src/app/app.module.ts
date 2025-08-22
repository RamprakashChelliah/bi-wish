import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Wish2Component } from './wish2/wish2.component';
import { BirthdayWishComponent } from './birthday-wish/birthday-wish.component';
import { SparkleContentComponent } from './sparkle-content/sparkle-content.component';
import { LoveMsgComponent } from './love-msg/love-msg.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Wish2Component,
    BirthdayWishComponent,
    SparkleContentComponent,
    LoveMsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
