export class UpdateStockAdjustment {
    id: number;
    confirmedAdjustment: boolean;
    warehouseId: number;
    warehouseRoleId: string;
    observation: string;
    adjustmentDetails: UpdateAdjustmentDetails[];
    constructor(
        id: number,
        confirmedAdjustment: boolean,
        warehouseId: number,
        warehouseRoleId: string,
        observation: string,
        adjustmentDetails: UpdateAdjustmentDetails[],
    ) {
        this.id = id;
        this.confirmedAdjustment = confirmedAdjustment;
        this.warehouseId = warehouseId;
        this.warehouseRoleId = warehouseRoleId;
        this.observation = observation;
        this.adjustmentDetails = adjustmentDetails;
    }
}

export class UpdateAdjustmentDetails {
    id: number;
    conceptId: number;
    stock: number;
    adjustment: number;
    unitCost: number;
    note: UpdateTransactionDetail[];
    constructor(
        id: number,
        conceptId: number,
        stock: number,
        adjustment: number,
        unitCost: number,
        note: UpdateTransactionDetail[],
    ) {
        this.id = id;
        this.conceptId = conceptId;
        this.stock = stock;
        this.adjustment = adjustment;
        unitCost = unitCost;
        this.note = note;
    }
}

export class UpdateTransactionDetail {
    stockCurrent: number;
    observation: string;
    checked: Boolean;
    constructor(
        stockCurrent: number,
        observation: string,
        checked: Boolean) {

        this.stockCurrent = stockCurrent;
        this.observation = observation;
        this.checked = checked;
    }
}