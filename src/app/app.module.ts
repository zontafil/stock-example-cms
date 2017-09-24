import { EditStockDialogComponent } from './ui/edit-stock/edit-stock.component';
import { CreateStockDialogComponent } from './ui/create-stock/create-stock.component';
import { StockComponent } from './pages/stock/stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConfigService } from './services/config.service';
import { StockService } from './services/stock.service';
import { UiService } from './services/ui.service';

import {
    MdButtonModule,
    MdCardModule,
    MdDialogModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule,
    MdCheckboxModule
} from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        StockComponent,
        CreateStockDialogComponent,
        EditStockDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,

        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdInputModule,
        MdListModule,
        MdSelectModule,
        MdSidenavModule,
        MdSnackBarModule,
        MdTabsModule,
        MdToolbarModule,
        MdCheckboxModule,

        NgxDatatableModule,

        BrowserAnimationsModule,

        ReactiveFormsModule,
        FormsModule
    ],

    providers: [
        ConfigService,
        StockService,
        UiService
    ],

    bootstrap: [AppComponent],

    entryComponents: [
        CreateStockDialogComponent,
        EditStockDialogComponent
    ]
})
export class AppModule { }
