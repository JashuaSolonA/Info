import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './clienteservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
    clienteDialog: boolean;

    clientes: Cliente[];

    cliente: Cliente;

    selectedClientes: Cliente[];

    submitted: boolean;

    constructor(private clienteService: ClienteService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.clienteService.getClientes().then(data => this.clientes = data);
    }

    openNew() {
        this.cliente = {};
        this.submitted = false;
        this.clienteDialog = true;
    }

    deleteSelectedClientes() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar los clientes seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientes = this.clientes.filter(val => !this.selectedClientes.includes(val));
                this.selectedClientes = null;
                this.messageService.add({severity:'success', summary: 'Proceso realizado con éxito', detail: 'Clientes Eliminados', life: 3000});
            }
        });
    }

    editCliente(cliente: Cliente) {
        this.cliente = {...cliente};
        this.clienteDialog = true;
    }

    deleteCliente(cliente: Cliente) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar al cliente con id ' + cliente.id + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.clientes = this.clientes.filter(val => val.id !== cliente.id);
                this.cliente = {};
                this.messageService.add({severity:'success', summary: 'Proceso realizado con éxito', detail: 'Cliente Eliminado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }
    
    saveCliente() {
        this.submitted = true;

        if (this.cliente.id) {
            this.clientes[this.findIndexById(this.cliente.id)] = this.cliente;                
            this.messageService.add({severity:'success', summary: 'Proceso realizado con éxito', detail: 'Cliente Actualizado', life: 3000});
        }   else {
            this.cliente.id = this.createId();
            this.clientes.push(this.cliente);
            this.messageService.add({severity:'success', summary: 'Proceso realizado con éxito', detail: 'Cliente Creado', life: 3000});
        }

        this.clientes = [...this.clientes];
        this.clienteDialog = false;
        this.cliente = {};
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): number {
        let newId = 0;
        newId = this.clientes.length + 1;
        return newId;
    }
}
