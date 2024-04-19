import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { GetActorCommercialDTO } from "./getActorCommercialDTO.model";
import { BusinessComprobantDTO } from "./businessComprobantDTO.model";

export class saleOrderDataDTO {
    public id: number;
    public pointOfSale: genericItemDTO;
    public vendor: genericItemDTO;
    public client: GetActorCommercialDTO;
    public clientAdvancePayment: GetActorCommercialDTO;
    public comprobant: BusinessComprobantDTO[] = [];
    public applyIGVWhenItIsAmazonia: boolean;
    public unifyDetails: boolean;
    public unifiedDetailValue: string;
    public observationPresale: string;
    public observationAnticipo: string;
    public total: number;
    public subTotal: number;
    public freight: number;
    public plasticBagsNumber: number;
    public icbper: number;
    public plate: string;
    public information: string;
    public isPastSale: boolean;
    public issueDate: Date;
    public stateId: number;
    public ParentTransactionId: number;
    public comprobantTypeIdIssue: number;
    public isPreGeneratedOperation: boolean;
    public preGeneratedOperationId: number;
    public igv: number;
    public existAssetsInDetails: boolean;
    public discount: number;
    public applyIgv: boolean;
    public totalImport: number;
    public globalDiscount: number;
    public discountByItem: number;
    public anticipation: number;
    public gravada: number;
    public exoneration: number;
    public unaffect: number;
    public free: number;
    public isc: number;
    public otherCharges: number;
    public otherTributes: number;
    constructor() {
        this.client = new GetActorCommercialDTO();
        this.gravada = 0;
        this.unaffect = 0;
        this.exoneration = 0;
        this.igv = 0;
        this.isc = 0;
    }
}