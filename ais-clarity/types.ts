
export enum ReconciliationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  EXPLAINABLE = 'EXPLAINABLE',
  UNEXPLAINED = 'UNEXPLAINED',
  RISK_FLAG = 'RISK_FLAG'
}

export enum AISSection {
  SFT = 'SFT',
  TDS = 'TDS',
  TAX_PAYMENT = 'Tax Payment',
  DEMAND_REFUND = 'Demand & Refund',
  OTHER = 'Other'
}

export interface Evidence {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  content?: string; 
}

export interface AIAnalysis {
  status: ReconciliationStatus;
  explanation: string;
  evidenceIds: string[];
  confidenceScore: number;
  timestamp: string;
}

export interface AISEntry {
  id: string;
  section: AISSection;
  description: string;
  reportedAmount: number;
  actualAmount?: number;
  reportingEntity: string;
  financialYear: string;
  reconciliation?: AIAnalysis;
  auditTrail: AuditEvent[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export interface SupportMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'OPEN' | 'RESOLVED' | 'PENDING_INFO';
  priority: 'NORMAL' | 'URGENT';
  messages: SupportMessage[];
  linkedEntryId?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  pan: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ACTION_REQUIRED';
  lastActivity: string;
  riskCount: number;
  verifiedCount: number;
  totalEntries: number;
  entries: AISEntry[];
}

export type UserRole = 'SUPER_ADMIN' | 'CLIENT';
