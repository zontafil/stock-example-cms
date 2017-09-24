import { StockInstance } from '../models/stock.model';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';

@Injectable()
export class StockService {
    constructor(private _http: Http, private _config: ConfigService) { }

    async getStocks() {
        const url = `${this._config.API.url}/stock`;
        const response = await this._http.get(url).toPromise();

        return response.json() as StockInstance[];
    }

    async updateStockPrice(stockId: number, price: number) {
        const url = `${this._config.API.url}/stock/${stockId}`;
        const response = await this._http.put(url, {
            currentPrice: price
        }).toPromise();

        return response.json() as StockInstance;
    }

    async createStock(stock: StockInstance) {
        const url = `${this._config.API.url}/stock`;
        const response = await this._http.post(url, stock).toPromise();

        return response.json() as StockInstance;
    }
}
