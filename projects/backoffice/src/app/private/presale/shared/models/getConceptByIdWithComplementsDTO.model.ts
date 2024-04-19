import { ActivePriceDTO } from "./activePriceDTO.model";
import { ConceptRolDTO } from "./conceptRolDTO.model";
import { OperationDetail } from "./operationDetail.model";
import { PriceConceptBusinessCommercialDTO } from "./priceBusinessConceptCommercialDTO.model";

export class GetConceptByIdWithComplementsDTO {
  id: number;
  familyId: number;
  codeBar: string;
  name: string;
  detailName: string;
  basicConceptValue: string;
  isAsset: boolean;
  stock: number;
  prices: PriceConceptBusinessCommercialDTO[];
  exemptIGV: boolean;
  listRolsConcept: ConceptRolDTO[];
  buyPriceActive: ActivePriceDTO;

  constructor(operationDetail: OperationDetail) {
    this.name = operationDetail.businessConcept.name;
    this.detailName = operationDetail.businessConcept.detailName;
    this.basicConceptValue = operationDetail.businessConcept.basicConceptValue;
    this.familyId = operationDetail.businessConcept.familyId;
    this.id = operationDetail.businessConcept.id;
    this.isAsset = operationDetail.businessConcept.isAsset;

  }
}

export class ConceptBusinessCommercialDTO {
  id: number;
  familyId: number;
  codeBar: string;
  name: string;
  detailName: string;
  basicConceptValue: string;
  isAsset: boolean;
  stock: number;
  prices: PriceConceptBusinessCommercialDTO[];
  exemptIGV: boolean;
  listRolsConcept: ConceptRolDTO[];
  buyPriceActive: ActivePriceDTO;

  settings: any;
  code: string;
  suffix: string;
  basicConceptId: number;
  basicConceptName: string;
  characteristicsValues: any[];
  presentationName: string;
  content: number;
  codeUnitMeasurementPresentation: string;
  codeUnitMeasureCommercial: string;
  codeUnitMeasureReferential: string;
  presentationUnitMeasurement: string;
  commercialMeasureUnit: string;
  referenceMeasureUnit: string;
  complements: any[];
  salePrice: number | null;
  unitCost: number | null;
  extemptIgv: boolean | null;
  subContentId: number | null;
}





