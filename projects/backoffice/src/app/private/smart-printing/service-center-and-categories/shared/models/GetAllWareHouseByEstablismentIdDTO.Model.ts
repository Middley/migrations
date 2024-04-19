import { GetCategoriesMasterDetailResponseDTO } from "./GetCategoriesMasterDetailResponseDTO.Model";

export class GetAllWareHouseByEstablismentIdDTO {
    public id: number;
    public name: string;
    public internalName: string;
    public categories: GetCategoriesMasterDetailResponseDTO[];

}