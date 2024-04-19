import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { PayDetailDetail } from "./payDetailDetail.DTO.model";
import { PayInformationDTO } from "./payInformationDTO.model";


export class PaymentTraceDTO {
    payInformation: PayInformationDTO;
    paymentMethod: genericItemDTO;
    constructor() {
        this.payInformation = new PayInformationDTO();
        this.paymentMethod = new genericItemDTO();

    }

}