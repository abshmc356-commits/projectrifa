export type ApplicationStatus = 'not_started' | 'draft' | 'submitted' | 'under_review' | 'verified' | 'rejected';

export interface CollegeInfo {
  collegeName: string;
  address: string;
  contact: string;
  academicYear: string;
}

export interface CourseDetails {
  programName: string;
  department: string;
  level: 'UG' | 'PG' | 'Diploma';
  mediumOfInstruction: string;
  mode: 'Regular' | 'Distance';
}

export interface PersonalDetails {
  fullName: string;
  dateOfBirth: string; // ISO String
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
  religion?: string;
  community?: string;
  category: 'General' | 'OBC' | 'SC' | 'ST';
  aadhaarNumber?: string;
  educationLevel: '12th' | 'PU' | 'Diploma' | 'Degree';
}

export interface ContactDetails {
  mobileNumber: string;
  email: string;
  permanentAddress: string;
  correspondenceAddress: string;
  isSameAddress: boolean;
}

export interface ParentGuardianDetails {
  fatherName: string;
  motherName: string;
  guardianName?: string;
  occupation: string;
  contactNumber: string;
  annualIncome?: string;
}

export interface EducationDetails {
  lastInstitution: string;
  boardUniversity: string;
  yearOfPassing: string;
  subjectsStudied: string;
  marksPercentage: string;
  registerNumber: string;
}

export interface DocumentsSubmitted {
  transferCertificate: boolean;
  markSheets: boolean;
  idProof: boolean;
  communityCertificate: boolean;
  incomeCertificate: boolean;
  photos: boolean;
}

export interface Declarations {
  applicantSigned: string; // Name typed
  applicantAgreed: boolean;
  parentSigned: string; // Name typed
  parentAgreed: boolean;
  signedAt: string; // ISO String
  place: string;
}

export interface OfficeUse {
  applicationNumber?: string;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
  admissionStatus?: 'admitted' | 'pending';
  feeDetails?: string;
  remarks?: string;
  submissionDate?: string;
}

export interface ApplicationData {
  id?: string;
  userId: string;
  status: ApplicationStatus;
  createdAt: any; // Timestamp
  updatedAt: any; // Timestamp

  // Form Steps Data
  collegeInfo?: CollegeInfo;
  courseDetails?: CourseDetails;
  personalDetails?: PersonalDetails;
  contactDetails?: ContactDetails;
  parentDetails?: ParentGuardianDetails;
  educationDetails?: EducationDetails;
  documentsSubmitted?: DocumentsSubmitted;
  declarations?: Declarations;
  officeUse?: OfficeUse;
}

export const COLLEGES = [
  {
    name: "Yenapoya Institute of Technology",
    address: "Moodibidri, DS, Karnataka",
    contact: "+91-9876543210",
    academicYear: "2025-2026"
  }
];

export const PROGRAMS = [
  { name: "B.Sc Computer Science", department: "Computer Science", level: "UG", duration: "3 Years" },
  { name: "B.C.A", department: "Computer Applications", level: "UG", duration: "3 Years" },
  { name: "M.Sc Data Science", department: "Data Science", level: "PG", duration: "2 Years" }
] as const;
