import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";

export class PayInformationDTO {
    importToPay: number;
    importDelivered: number;
    change: number; // vuelto de dinero
    financialEntity: genericItemDTO;
    bankAccount: genericItemDTO;
    operatorCard: genericItemDTO;
    operationNumber: string;
    depositorData: string;
    destinationAccount: string;
    originAccount: string;
    observation: string;
    pointsPending: number;
    cashedPoints: number;
    cashedImport: number;
    informationJson: string;
    supplierAccount: string;

    constructor() {
        this.bankAccount = new genericItemDTO();
        this.financialEntity = new genericItemDTO();
        this.operatorCard = new genericItemDTO();
    }
}