import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
    private modalData: any;

    constructor() { }

    setModalData(data: any) {
        this.modalData = data;
    }

    getModalData() {
        return this.modalData;
    }
}