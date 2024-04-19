import { ConceptBusinessCommercialDTO, GetConceptByIdWithComplementsDTO } from '../models/getConceptByIdWithComplementsDTO.model';

export class OperationDetail {
    public id: number;
    public businessConcept: GetConceptByIdWithComplementsDTO;
    public amount: number;
    public unitPrice: number;
    public import: number;
    public neto: number;
    public igv: number;
    public isc: number;
    public discount: number;
    public detail: string;
    public lote: string;
    public register: string;
    public expiration: Date | null;
    public calculationMask: string;
    public amount1: number;
    public centerOfAttentionId: number;
    public rolId: number;
    public priceCalculateOperation: boolean;
    public tariffPrice: any;
    public saleValue: number;

}
