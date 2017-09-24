import { StockInstance } from '../../models/stock.model';
import { UiService } from '../../services/ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { OnInit, Inject, Component } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    styleUrls: ['./create-stock.component.scss'],
    template: `
        <h3>Create a new stock</h3>
        <form [formGroup]="form" (ngSubmit)="ok()">
          <md-form-field>
            <input
              [(ngModel)]="stock.name"
              required
              mdInput
              placeholder="Name"
              name="name"
              formControlName="name">
            <md-error *ngIf="form.controls['name'].hasError('required')">
              Name is <strong>required</strong>
            </md-error>
            </md-form-field>

            <md-form-field>
            <input
              [(ngModel)]="stock.currentPrice"
              required type="number"
              mdInput
              placeholder="Price"
              name="price"
              formControlName="currentPrice">
            <md-error *ngIf="form.controls['currentPrice'].hasError('required')">
              Price is <strong>required</strong>
            </md-error>
          </md-form-field>

          <button [disabled]="form.invalid || loading" color="primary" md-button>Create</button>

        </form>
  `
})
export class CreateStockDialogComponent implements OnInit {
    loading = false;
    stock: StockInstance = {};
    form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      currentPrice: new FormControl('', [
        Validators.required
      ])
    });
    constructor(
        public dialogRef: MdDialogRef<CreateStockDialogComponent>,
        private _stockService: StockService,
        private _uiService: UiService
    ) { }

    async ngOnInit() {}

    /**
     * Create the stock
     *
     *
     * @memberOf CreateStockDialogComponent
     */
    async ok() {

        this.loading = true;

        try {
          const stock = await this._stockService.createStock(this.stock);

          this.loading = false;

          this.dialogRef.close(stock);
        } catch (err) {
          this.loading = false;
          this._uiService.openSnackBar(err);
          this.dialogRef.close();
        }
    }

    /**
     * Close the modal
     *
     *
     * @memberOf CreateStockDialogComponent
     */
    cancel() {
        this.dialogRef.close();
    }
}
