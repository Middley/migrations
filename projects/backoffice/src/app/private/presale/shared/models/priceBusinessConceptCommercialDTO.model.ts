
export class PriceConceptBusinessCommercialDTO {
    id: number;
    value: number;
    tariffId: number;
    tariff: string;
    valueString: string;
    code: string;
    isActive: boolean;
    exist: boolean;
    edited: boolean;

    constructor(priceDto: PriceConceptBusinessCommercialDTO) {
        this.id = priceDto.id;
        this.code = priceDto.code;
        this.valueString = priceDto.valueString;
        this.value = priceDto.value;
        this.tariffId = priceDto.tariffId;
        this.isActive = priceDto.isActive;
        this.exist = priceDto.exist;
        this.edited = priceDto.edited;
    }
}