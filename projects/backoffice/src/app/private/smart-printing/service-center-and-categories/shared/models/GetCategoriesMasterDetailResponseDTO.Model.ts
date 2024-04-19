
export class GetCategoriesMasterDetailResponseDTO {
    id: string;
    name: string;
    subCategories: GetCategoriesMasterDetailResponseDTO[];
    filename: string;
    type: any;
}