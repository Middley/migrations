export class Pay {
    initial: number;
    paymentMode: number;
    total: number;
    traza: PayDetail[];
}

export class PayDetail {
    info: PayDetailDetail;
    paymentMethodId: number;
}

export class PaymentMethod {
    id: number;
    name: string;
}

export class PayDetailDetail {
    bankAccountId: number;
    bankAccountValue: string;
    financialEntityId: number;
    importAPay: number;
    amountDelivered: number;
    observation: string;
    carOperatorId: number;
}