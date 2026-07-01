export interface Tenant {
    id: number;
    tenantId: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
}

export interface TenantDetailsDTO {
    id: number;
    tenantId: string;
    subscriptionPlanName: string;
    subscriptionPlanCode: string;
    subscriptionStatus: string;
    subscriptionPlanPrice: string; // BigDecimal as string for precision
    subscriptionPlanID: number;
    tenantName: string;
    tenantEmail: string;
    tenantPhoneNumber: string;
    trialStartsAt: string;
    trialEndsAt: string;
    subscriptionStartsAt: string;
    subscriptionEndsAt: string;
    nextBillingDate: string; // YYYY-MM-DD
}

export interface TenantSubscriptionDTO {
    tenantId: number;
    subscriptionPlanId: number;
    trialStartsAt: string;
    trialEndsAt: string;
    subscriptionStartsAt: string;
    subscriptionEndsAt: string;
    nextBillingDate: string;
}
