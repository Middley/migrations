import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { voucherSerieDTO } from "./voucherSerieDTO.model";

export class getAllComprobantSelectorDTO {
    comprobantId: number;
    typeComprobant: genericItemDTO;
    voucherSeries: voucherSerieDTO[];
    isOwn: boolean;
    voucherSerieSelected: number;
    enteredVoucherSeries: string;
    enteredNumber: number;
    showVoucherSerieSelector: boolean;
    showEnteredVoucherSerie: boolean;
    showEnteredNumber: boolean;
}