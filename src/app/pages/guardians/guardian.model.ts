export interface Guardian {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    relationshipToStudent: string;
    occupation: string;
    isPrimary: boolean;
    isEmailEnable: boolean;
    isSmsEnable: boolean;
    status: string;
}

export enum GuardianStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface CrossTenantGuardianResponseDTO {
    tenantId: string;
    guardian: Guardian;
}
