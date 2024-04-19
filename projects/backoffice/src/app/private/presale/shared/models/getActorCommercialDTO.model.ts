import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";
import { AddressDTO } from "./adressDTO.model";

export class GetActorCommercialDTO {
    id: number;
    idActor: number;
    identityDocumentType: genericItemDTO;
    personType: genericItemDTO;
    identityDocumentNumber: string;
    legalName: string;
    fatherLastName: string;
    motherLastName: string;
    name: string;
    businessName: string;
    shortName: string;
    alias: string;
    code: string;
    active: boolean;
    email: string;
    birthDate: Date;
    advertisingInformation: string;
    numberPhone: string;
    fiscalAddress: AddressDTO;
    actorClass: genericItemDTO;
    legalState: genericItemDTO;
    nationality: genericItemDTO;
    roles: genericItemDTO[];
    selectGroup: boolean;
    noneGroup: boolean;
    group: genericItemDTO;
}