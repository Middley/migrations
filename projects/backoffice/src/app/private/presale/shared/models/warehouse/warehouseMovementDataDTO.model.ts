import { genericItemDTO } from "@cad-private/shared/models/Generic/genericItemDTO.model";

export class WarehouseMovementDataDTO {
    warehouse: genericItemDTO;
    warehouseKeeper: genericItemDTO;
    isDiferredDelivery: boolean;
    existComprobatMerchandiseExit: boolean;
    constructor() {
        this.warehouse = new genericItemDTO();
        this.warehouseKeeper = new genericItemDTO();
    }
}