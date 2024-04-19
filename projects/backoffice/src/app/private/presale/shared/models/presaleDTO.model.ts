import { PayData } from "../../../transactions/shared/models/payDTO.model";
import { PresaleOrderData } from "./orderData.model";

export class presaleDTO {
    id: number;
    order: PresaleOrderData;
    pay: PayData;
    isvalid: boolean;
    registrationDate: Date;
    transaccionOrigin: any;
    transactionsModify: any[];
    transactionCreation: any;
    actorReference: any;
    newState: any;
    isSaleBoxMode: boolean;

    constructor(
        Order: PresaleOrderData,
        Pay: PayData,
        Isvalid: boolean,
    ) {
        this.order = Order;
        this.pay = Pay;
        this.isvalid = Isvalid;
    }
}