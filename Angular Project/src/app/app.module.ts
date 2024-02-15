import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabComponent } from './component/tab/tab.component';
import { AddEditDialogComponent } from './component/dialogs/add-edit-dialog/add-edit-dialog.component';
import { HistoryComponent } from './component/dialogs/history/history.component';
import { TruncatePipePipe } from './pipe/truncate-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    AddEditDialogComponent,
    HistoryComponent,
    TruncatePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
