import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {
    public API: {
        url: string
    };

    constructor() {
        this.API = {
            url: environment.api.url
        };
    }
}
