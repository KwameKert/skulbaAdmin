export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface GuardianDTO {
  id: number;
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
  status: StudentStatus;
}

export interface StudentDTO {
  id: number;
  firstName: string;
  lastName: string;
  otherNames: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  address: string;
  classId: number;
  termId: number;
  gender: Gender;
  dateOfBirth: string;
  motherTongue: string;
  languages: string;
  medicalAllergies: string;
  medicalConditions: string;
  notes: string;
  code: string;
  status: StudentStatus;
  profileImageUrl: string;
  createdBy: string;
  updatedBy: string;
  guardians: GuardianDTO[];
}

export interface CrossTenantStudentResponseDTO {
  tenantId: string;
  student: StudentDTO;
}
