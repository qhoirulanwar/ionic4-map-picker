import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from "@angular/http";
import { AgmCoreModule } from '@agm/core';

import { MapPickerComponent } from "../app/component/map-picker/map-picker.component";

@NgModule({
  declarations: [
    AppComponent,
    MapPickerComponent
  ],
  entryComponents: [
    MapPickerComponent
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: MapPickerComponent.apiKey,
      libraries: ["places"]
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
