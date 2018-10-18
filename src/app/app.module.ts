import { RootLoaderComponent } from './components/root-loader/root-loader.component';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppInitialState, IAppStore, rootReducer } from './store/app.state';
import { SessionEffects, HostEffects } from './store/effects';

@NgModule({
  declarations: [AppComponent, RootLoaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(<any>rootReducer),
    EffectsModule.forRoot([SessionEffects, HostEffects])
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
