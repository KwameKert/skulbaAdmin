export interface PayrollStatutoryConfig {
    id: number;
    configKey: string;
    configValue: string;
    effectiveFrom: string;
    effectiveTo: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PayrollPayeBand {
    id: number;
    lowerBound: number;
    higherBound: number;
    rate: number;
    effectiveFrom: string;
    effectiveTo: string | null;
    createdAt: string;
    updatedAt: string;
}