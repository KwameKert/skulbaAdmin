export enum ModuleStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    DELETED = 'DELETED'
}

export interface Module {
    id: number;
    name: string;
    description: string;
    code: string;
    status: ModuleStatus;
}
export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    CANCELLED = 'CANCELLED',
    EXPIRED = 'EXPIRED',
    DELETED = 'DELETED'
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    description: string;
    code: string;
    price: number;
    status: SubscriptionStatus;
    createdAt: string;
    updatedAt: string;
    modules: Array<Module>;

}

export interface SubscriptionPlanDTO {
    name: string;
    description: string;
    code: string;
    price: number;
    status: SubscriptionStatus;
}

export interface AssignModulesDTO {
    subscriptionId: string;
    moduleIds: Array<number>;
}