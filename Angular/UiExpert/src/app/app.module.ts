import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MagicModule, MagicLazyLoaderService } from '@magic-xpa/angular';
import { MagicAngularMaterialModule } from '@magic-xpa/angular-material-core';
import { MagicGenLibModule } from './magic/magic.gen.lib.module';
import { MagicRoutingModule } from './app.routes';
import { LazyLoaderService } from './magic/lazy-loader.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MagicModule,
    MagicAngularMaterialModule,
    MagicGenLibModule,
    MagicRoutingModule
  ],
  providers: [{ provide: MagicLazyLoaderService, useClass: LazyLoaderService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
