export interface GroupInsumo {
    idPrimaryConcept: number;
    fromDate: string;
    toDate: string;
    itemGroupConcept: ItemGroupConcept[];
}

export interface ItemGroupConcept {
    idSecundaryConcept: number;
    quantity: string
}