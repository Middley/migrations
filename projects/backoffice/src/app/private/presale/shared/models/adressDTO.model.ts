import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";

export class AddressDTO {
    id: number;
    country: genericItemDTO;
    ubigeo: genericItemDTO;
    residency: string;
    detail: string;

}