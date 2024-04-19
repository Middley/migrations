export class GetStockAdjustmentById {
    id: number;
    stateAdjustmentName: string;
    stateAdjustment: number;
    stateConfirmParameter: number;
    stateRegistratedParameter: number;
    registrationDate: Date;
    establishment: string;
    employee: string;
    warehouse: string;
    inputStockAdjustment: number;
    outputStockAdjustment: number;
    consolidatedStockAdjustment: number;
    observation: string;
    stockAdjustmentByIdDetails: StockAdjustmentDetail[]
}

export class StockAdjustmentDetail {
    conceptName: string;
    systemStock: number;
    currentStock: number;
    adjustment: number;
    unitCost: number;
    note: string;
}
