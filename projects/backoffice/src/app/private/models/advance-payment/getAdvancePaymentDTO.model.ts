import { GetActorCommercialDTO } from "@cad-private/presale/shared/models/getActorCommercialDTO.model";
import { parametersForBussinessSelectorAndComprobantDTO } from "../../shared/models/parameter/parametersForBussinessSelectorAndComprobantDTO";

export class GetAdvancePaymentDTO {
    id: number;
    firstComprobantTypeID: number;
    parameterComprobantType: number;
    client: string;
    totalAmountPresale: number;
    totalAmountAdvancePayment: number;
    totalAmountOutstanding: number;
    registerDate: Date;
    comprobant: string;
    applyAmazonLaw: boolean;
    clientAdvancePayment: GetActorCommercialDTO;

}