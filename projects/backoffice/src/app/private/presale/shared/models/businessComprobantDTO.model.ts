import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { voucherSerieDTO } from "./voucherSerieDTO.model";

export class BusinessComprobantDTO {
    id: number;
    number: number;
    serieNumber: number;
    serie: voucherSerieDTO;
    type: genericItemDTO;
}