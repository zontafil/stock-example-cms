import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class UiService {
    constructor(private _snackBar: MdSnackBar) { }

    openSnackBar(message: string) {
        const snackBar = this._snackBar.open(message);

        setTimeout(() => {
            snackBar.dismiss();
        }, 3000);
    }
}
