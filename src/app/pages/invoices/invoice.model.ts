export enum TenantSubscriptionInvoiceStatus {
    DRAFT = 'DRAFT',
    SENT = 'SENT',
    VOID = 'VOID',
}

export enum BillingSource {
    CRON = 'CRON',
    MANUAL = 'MANUAL',
}

export interface TenantSubscriptionInvoiceDTO {
    id: number;
    invoiceNumber: string;
    tenantId: number;
    tenantName: string;
    periodStart: string;
    periodEnd: string;
    source: BillingSource;
    enrolledStudentCount: number;
    pricePerStudent: number;
    amount: number;
    currency: string;
    status: TenantSubscriptionInvoiceStatus;
    generatedBy: string;
    generatedAt: string;
    sentAt: string | null;
}
