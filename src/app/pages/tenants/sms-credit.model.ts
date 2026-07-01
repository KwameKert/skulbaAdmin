export interface SmsCredit {
    tenantId: number;
    balance: number;
}

export interface SmsCreditTransaction {
    id: number;
    tenantId: number;
    type: 'TOPUP' | 'DEDUCTION' | 'REFUND';
    amount: number;
    reference: string;
    createdBy: string;
    createdAt: string;
}

export interface TopUpRequest {
    amount: number;
    reference: string;
    createdBy: string;
}

export interface DeductRequest {
    amount: number;
    reference: string;
}

export interface RefundRequest {
    amount: number;
    reference: string;
}
