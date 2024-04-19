import { PayData } from "@cad-private/transactions/shared/models/payDTO.model";
import { saleOrderDataDTO } from "./saleOrderData.model";
import { WarehouseMovementDataDTO } from "./warehouse/warehouseMovementDataDTO.model";

export class saleByPresaleDTO {
    id: number;
    presaleOrderId: number;
    presaleId: number;
    order: saleOrderDataDTO;
    warehouseMovement: WarehouseMovementDataDTO;
    pay: PayData;
    isvalid: boolean;
    registrationDate: Date;
    transaccionOrigin: any;
    transactionsModify: any[];
    transactionCreation: any;
    actorReference: any;
    newState: any;
    isSaleBoxMode: boolean;
    constructor() {
        this.order = new saleOrderDataDTO();
        this.pay = new PayData();
        this.warehouseMovement = new WarehouseMovementDataDTO();
    }
}