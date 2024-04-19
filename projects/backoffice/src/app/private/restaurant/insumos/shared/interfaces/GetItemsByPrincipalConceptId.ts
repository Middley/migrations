export interface GetItemsByPrincipalConceptId {
    namePrincipalConcept: string,
    available: number,
    items: ItemsForGetItemsByPrincipalConceptId[]
}

export interface ItemsForGetItemsByPrincipalConceptId {
    itemName: string,
    currentStock: number,
    quantityRequiredForOneUnit: number,
    unitOfMeasurement: string,
    quantityMaxProducction: number,

}