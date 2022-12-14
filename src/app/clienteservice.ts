import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cliente } from './cliente';

@Injectable()
export class ClienteService {

    constructor(private http: HttpClient) { }

    getClientesSmall() {
        return this.http.get<any>('assets/clientes-small.json')
        .toPromise()
        .then(res => <Cliente[]>res.data)
        .then(data => { return data; });
    }

    getClientes() {
        return this.http.get<any>('assets/clientes.json')
        .toPromise()
        .then(res => <Cliente[]>res.data)
        .then(data => { return data; });
    }

    getClientesWithOrdersSmall() {
        return this.http.get<any>('assets/clientes-orders-small.json')
        .toPromise()
        .then(res => <Cliente[]>res.data)
        .then(data => { return data; });
    }
}