export class RegisterStockAdjustment {
    confirmedAdjustment: boolean;
    warehouseId: number;
    warehouseRoleId: string;
    observation: string;
    adjustmentDetails: AdjustmentDetails[];
    constructor(
        confirmedAdjustment: boolean,
        warehouseId: number,
        warehouseRoleId: string,
        observation: string,
        adjustmentDetails: AdjustmentDetails[],
    ) {
        this.confirmedAdjustment = confirmedAdjustment;
        this.warehouseId = warehouseId;
        this.warehouseRoleId = warehouseRoleId;
        this.observation = observation;
        this.adjustmentDetails = adjustmentDetails;
    }
}

export class AdjustmentDetails {
    conceptId: number;
    stock: number;
    adjustment: number;
    unitCost: number;
    note: TrnsactionDetail[];
    constructor(
        conceptId: number,
        stock: number,
        adjustment: number,
        unitCost: number,
        note: TrnsactionDetail[],
    ) {
        conceptId = conceptId;
        stock = stock;
        adjustment = adjustment;
        unitCost = unitCost;
        note = note;
    }
}

export class TrnsactionDetail {
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