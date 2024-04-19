import { PaymentTraceDTO } from "./payDetailDTO.model";

export class PayData {
    cashier: any //cajero
    cashRegister: any     //caja
    initial: number;
    payMode: number;
    total: number;
    trace: PaymentTraceDTO[];
}



