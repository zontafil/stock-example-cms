import { StockInstance } from '../../models/stock.model';
import { EditStockDialogComponent } from '../../ui/edit-stock/edit-stock.component';
import { StockService } from '../../services/stock.service';
import { CreateStockDialogComponent } from '../../ui/create-stock/create-stock.component';
import {MdDialog, MdDialogRef } from '@angular/material';

import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StockComponent implements OnInit {
    stocksList: StockInstance[];
    columns = [];

    @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
    @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;

    constructor(
        private _stockService: StockService,
        private _dialog: MdDialog,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        this.columns = [{
            resizeable: false,
            name: 'id',
            prop: 'id'
        }, {
            resizeable: false,
            name: 'Name',
            prop: 'name'
        }, {
            resizeable: false,
            name: 'Price',
            prop: 'currentPrice'
        }, {
            resizeable: false,
            name: 'Updated',
            cellTemplate: this.dateTemplate
        }, {
            resizeable: false,
            cellTemplate: this.actionsTemplate
        }];

        this.stocksList = await this._stockService.getStocks();
    }

    /**
     * Open the create stock dialog
     *
     *
     * @memberOf StockComponent
     */
    addStock() {
        const dialogRef = this._dialog.open(CreateStockDialogComponent);

        dialogRef.afterClosed().subscribe(stock => {
            if (stock) {
                this.stocksList = [...this.stocksList, stock];
            }
        });
    }

    /**
     * Open the edit stock price dialog
     *
     * @param {StockInstance} stock
     *
     * @memberOf StockComponent
     */
    editStockPrice(stock: StockInstance, index: number) {
        const dialogRef = this._dialog.open(EditStockDialogComponent, {
            data: stock
        });

        dialogRef.afterClosed().subscribe(updatedStock => {
            if (updatedStock) {
                stock.currentPrice = updatedStock.currentPrice;
                this.stocksList = [...this.stocksList.slice(0, index), updatedStock, ...this.stocksList.slice(index + 1)];
            }
        });
    }

}
