export interface Staff {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    dateOfJoining: string;
    gender: string;
    address: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    languages: string;
    userId: string;
    qualification: string;
    employeeCode: string;
    employeeType: string;
    workExperience: string;
    previousSchool: string;
    maritalStatus: string;
    primaryContactNumber: string;
    notes: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy: string;
    updatedBy: string;
    profileImageUrl: string;
}

export interface CrossTenantStaffResponseDTO {
    tenantId: string;
    employee: Staff;
}
