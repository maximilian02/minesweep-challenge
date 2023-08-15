import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";

import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GameLoopComponent } from "./game-loop/game-loop.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { BombComponent } from './bomb/bomb.component';
import { FlagComponent } from './flag/flag.component';

@NgModule({
  declarations: [AppComponent, GameLoopComponent, PageNotFoundComponent, BombComponent, FlagComponent],
  imports: [CommonModule, AppRoutingModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
