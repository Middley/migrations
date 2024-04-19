import { BusinessComprobantDTO } from "@cad-private/presale/shared/models/businessComprobantDTO.model";
import { GetActorCommercialDTO } from "@cad-private/presale/shared/models/getActorCommercialDTO.model";
import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { PayData } from "@cad-private/transactions/shared/models/payDTO.model";

export class RegsiterAdvancePaymentModel {
    orderPresaleID: number;
    applyIGVAnticipo: Boolean;
    registrationDate: string;
    client: GetActorCommercialDTO;
    comprobant: BusinessComprobantDTO;
    observationAnticipo: string;
    vendor: genericItemDTO;
    pay: PayData;
    total: number;

    constructor(
    ) {
        this.client = new GetActorCommercialDTO();
        this.comprobant = new BusinessComprobantDTO();
        this.vendor = new genericItemDTO();
        this.pay = new PayData();

    }
}