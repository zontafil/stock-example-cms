import { StockInstance } from '../../models/stock.model';
import { UiService } from '../../services/ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { OnInit, Inject, Component } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    styleUrls: ['./edit-stock.component.scss'],
    template: `
        <h3>Edit stock {{stock.name}}</h3>
        <form [formGroup]="form" (ngSubmit)="ok()">
            <md-form-field>
            <input
              [(ngModel)]="currentPrice"
              required type="number"
              mdInput
              placeholder="Price"
              name="price"
              formControlName="currentPrice">
            <md-error *ngIf="form.controls['currentPrice'].hasError('required')">
              Price is <strong>required</strong>
            </md-error>
          </md-form-field>

          <button [disabled]="form.invalid || loading" color="primary" md-button>Save</button>

        </form>
  `
})
export class EditStockDialogComponent implements OnInit {
    loading = false;
    currentPrice: number;
    form = new FormGroup({
      currentPrice: new FormControl('', [
        Validators.required
      ])
    });
    constructor(
        @Inject(MD_DIALOG_DATA) public stock: StockInstance,
        public dialogRef: MdDialogRef<EditStockDialogComponent>,
        private _stockService: StockService,
        private _uiService: UiService
    ) { }

    async ngOnInit() {
      this.currentPrice = this.stock.currentPrice;
    }

    /**
     * Create the stock
     *
     *
     * @memberOf CreateStockDialogComponent
     */
    async ok() {

        this.loading = true;

        try {
          const stock = await this._stockService.updateStockPrice(this.stock.id, this.currentPrice);

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
