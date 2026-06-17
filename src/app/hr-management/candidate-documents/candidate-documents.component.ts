import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CandidateDoc {
  seq: number;
  type: string;
  mandatory: boolean;
  uploadDate: string | null;
  expiryDate: string | null;
  status: 'Verified' | 'Pending' | 'Not Uploaded' | 'Requested' | 'Rejected';
  verifiedBy: string | null;
  verifiedByRole: string | null;
  fileName: string | null;
  fileSize: string | null;
  uploadedBy: 'Candidate' | 'Recruiter' | null;
  bgvApplicable?: boolean;
}

export interface AuditEntry {
  dateTime: string;
  user: string;
  role: string;
  action: string;
  docType: string;
  remarks: string;
}

@Component({
  selector: 'app-candidate-documents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-documents.component.html',
  styleUrls: ['./candidate-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateDocumentsComponent {
  @Output() navigate = new EventEmitter<string>();

  trackByIndex(i: number, _: any) { return i; }
  trackById(i: number, item: { id: string }) { return item.id; }

  // Candidate info
  candidate = {
    name: 'Arjun Nair', id: 'CAND-000124', position: 'Software Engineer',
    requisitionId: 'REQ-2024-00056', recruiter: 'Rahul Sharma',
    stage: 'Documentation', initials: 'AN', avatarColor: '#6366f1',
  };

  searchQuery = '';
  selectedDoc: CandidateDoc | null = null;
  verificationRemark = '';
  bgvRemark = 'Pending BGV';
  bgvStatus = 'In Progress';
  showUploadModal = false;
  showAuditAll = false;

  // Upload form
  uploadForm = {
    docType: '', file: null as File | null, fileName: '', expiryDate: '', comment: '',
  };
  docTypeOptions = ['Resume / CV', 'Photograph', 'Aadhaar Card', 'PAN Card',
    'Educational Degree', 'Experience Letter', 'Salary Slips (Latest 3 Months)',
    'Relieving Letter', 'Passport', 'Address Proof', 'BGV Report', 'Other (Certificates)'];

  docs: CandidateDoc[] = [
    { seq:1,  type:'Resume / CV',                 mandatory:true,  uploadDate:'10-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Meera Joshi',  verifiedByRole:'HR Executive', fileName:'Resume_Arjun_Nair.pdf',   fileSize:'156 KB',  uploadedBy:'Candidate', bgvApplicable:false },
    { seq:2,  type:'Photograph',                  mandatory:true,  uploadDate:'10-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Meera Joshi',  verifiedByRole:'HR Executive', fileName:'Photo_Arjun_Nair.jpg',    fileSize:'45 KB',   uploadedBy:'Candidate', bgvApplicable:false },
    { seq:3,  type:'Aadhaar Card',                mandatory:true,  uploadDate:'11-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Meera Joshi',  verifiedByRole:'HR Executive', fileName:'Aadhaar_Arjun_Nair.pdf',  fileSize:'320 KB',  uploadedBy:'Candidate', bgvApplicable:false },
    { seq:4,  type:'PAN Card',                    mandatory:true,  uploadDate:'11-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Meera Joshi',  verifiedByRole:'HR Executive', fileName:'PAN_Card_Arjun_Nair.pdf', fileSize:'245 KB',  uploadedBy:'Candidate', bgvApplicable:false },
    { seq:5,  type:'Educational Degree',          mandatory:true,  uploadDate:'12-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Rahul Sharma', verifiedByRole:'HR Manager',   fileName:'Degree_Arjun_Nair.pdf',   fileSize:'1.2 MB',  uploadedBy:'Candidate', bgvApplicable:false },
    { seq:6,  type:'Experience Letter',           mandatory:true,  uploadDate:'12-May-2024', expiryDate:null,          status:'Verified',     verifiedBy:'Rahul Sharma', verifiedByRole:'HR Manager',   fileName:'ExpLetter_Arjun_Nair.pdf',fileSize:'88 KB',   uploadedBy:'Candidate', bgvApplicable:false },
    { seq:7,  type:'Salary Slips (Latest 3 Months)', mandatory:true, uploadDate:'13-May-2024', expiryDate:null,        status:'Pending',      verifiedBy:null,           verifiedByRole:null,           fileName:'SalarySlips_Arjun.pdf',   fileSize:'540 KB',  uploadedBy:'Candidate', bgvApplicable:false },
    { seq:8,  type:'Relieving Letter',            mandatory:true,  uploadDate:'13-May-2024', expiryDate:null,          status:'Pending',      verifiedBy:null,           verifiedByRole:null,           fileName:'RelievingLetter.pdf',      fileSize:'72 KB',   uploadedBy:'Candidate', bgvApplicable:false },
    { seq:9,  type:'Passport',                    mandatory:false, uploadDate:null,          expiryDate:'14-Aug-2026', status:'Not Uploaded', verifiedBy:null,           verifiedByRole:null,           fileName:null,                      fileSize:null,      uploadedBy:null,        bgvApplicable:false },
    { seq:10, type:'Address Proof',               mandatory:true,  uploadDate:null,          expiryDate:null,          status:'Requested',    verifiedBy:null,           verifiedByRole:null,           fileName:null,                      fileSize:null,      uploadedBy:null,        bgvApplicable:false },
    { seq:11, type:'BGV Report',                  mandatory:true,  uploadDate:null,          expiryDate:null,          status:'Not Uploaded', verifiedBy:null,           verifiedByRole:null,           fileName:null,                      fileSize:null,      uploadedBy:null,        bgvApplicable:true  },
    { seq:12, type:'Other (Certificates)',        mandatory:false, uploadDate:null,          expiryDate:null,          status:'Not Uploaded', verifiedBy:null,           verifiedByRole:null,           fileName:null,                      fileSize:null,      uploadedBy:null,        bgvApplicable:false },
  ];

  audit: AuditEntry[] = [
    { dateTime:'13-May-2024 11:20 AM', user:'Rahul Sharma',          role:'HR Manager',  action:'Marked as Pending Verification', docType:'Salary Slips (Latest 3 Months)', remarks:'-' },
    { dateTime:'13-May-2024 10:18 AM', user:'Arjun Nair (Candidate)',role:'Candidate',   action:'Uploaded Document',              docType:'Salary Slips (Latest 3 Months)', remarks:'Uploaded latest salary slips.' },
    { dateTime:'12-May-2024 05:10 PM', user:'Rahul Sharma',          role:'HR Manager',  action:'Verified Document',              docType:'Experience Letter',              remarks:'Document verified.' },
    { dateTime:'11-May-2024 10:15 AM', user:'Arjun Nair (Candidate)',role:'Candidate',   action:'Uploaded Document',              docType:'PAN Card',                       remarks:'Uploaded PAN card.' },
    { dateTime:'10-May-2024 09:30 AM', user:'Arjun Nair (Candidate)',role:'Candidate',   action:'Uploaded Document',              docType:'Resume / CV',                    remarks:'Uploaded resume.' },
    { dateTime:'10-May-2024 09:32 AM', user:'Rahul Sharma',          role:'HR Manager',  action:'Sent Document Request',          docType:'Address Proof',                  remarks:'Requested address proof.' },
  ];

  get filteredDocs() {
    if (!this.searchQuery) return this.docs;
    const q = this.searchQuery.toLowerCase();
    return this.docs.filter(d => d.type.toLowerCase().includes(q));
  }

  get totalRequired()  { return this.docs.length; }
  get uploaded()       { return this.docs.filter(d => d.uploadDate).length; }
  get pending()        { return this.docs.filter(d => d.status === 'Pending').length; }
  get verified()       { return this.docs.filter(d => d.status === 'Verified').length; }
  get rejected()       { return this.docs.filter(d => d.status === 'Rejected').length; }

  get visibleAudit()   { return this.showAuditAll ? this.audit : this.audit.slice(0, 4); }

  selectDoc(doc: CandidateDoc) {
    if (doc.fileName) { this.selectedDoc = doc; this.verificationRemark = ''; }
  }

  closePreview() { this.selectedDoc = null; }

  verifyDoc() {
    if (this.selectedDoc) {
      this.selectedDoc.status = 'Verified';
      this.selectedDoc.verifiedBy = 'Rahul Sharma';
      this.selectedDoc.verifiedByRole = 'HR Manager';
      this.audit.unshift({ dateTime: 'Just now', user: 'Rahul Sharma', role: 'HR Manager', action: 'Verified Document', docType: this.selectedDoc.type, remarks: this.verificationRemark || 'Document verified.' });
      this.closePreview();
    }
  }

  rejectDoc() {
    if (this.selectedDoc) {
      this.selectedDoc.status = 'Rejected';
      this.audit.unshift({ dateTime: 'Just now', user: 'Rahul Sharma', role: 'HR Manager', action: 'Rejected Document', docType: this.selectedDoc.type, remarks: this.verificationRemark || 'Document rejected.' });
      this.closePreview();
    }
  }

  requestReupload() {
    if (this.selectedDoc) {
      this.selectedDoc.status = 'Requested';
      this.audit.unshift({ dateTime: 'Just now', user: 'Rahul Sharma', role: 'HR Manager', action: 'Requested Re-upload', docType: this.selectedDoc.type, remarks: this.verificationRemark || 'Re-upload requested.' });
      this.closePreview();
    }
  }

  openUpload() { this.uploadForm = { docType:'', file:null, fileName:'', expiryDate:'', comment:'' }; this.showUploadModal = true; }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadForm.file = input.files[0];
      this.uploadForm.fileName = input.files[0].name;
    }
  }

  submitUpload() {
    if (!this.uploadForm.docType || !this.uploadForm.fileName) return;
    const existing = this.docs.find(d => d.type === this.uploadForm.docType);
    if (existing) {
      existing.uploadDate = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).replace(/ /g,'-');
      existing.status = 'Pending';
      existing.fileName = this.uploadForm.fileName;
      existing.fileSize = '—';
      existing.uploadedBy = 'Recruiter';
    }
    this.audit.unshift({ dateTime:'Just now', user:'Rahul Sharma', role:'HR Manager', action:'Uploaded Document', docType:this.uploadForm.docType, remarks: this.uploadForm.comment || 'Document uploaded.' });
    this.showUploadModal = false;
  }

  statusStyle(s: string): { bg: string; color: string } {
    const m: Record<string, { bg: string; color: string }> = {
      'Verified':     { bg: '#dcfce7', color: '#15803d' },
      'Pending':      { bg: '#fef3c7', color: '#b45309' },
      'Not Uploaded': { bg: '#f1f5f9', color: '#64748b' },
      'Requested':    { bg: '#eff6ff', color: '#1d4ed8' },
      'Rejected':     { bg: '#fee2e2', color: '#b91c1c' },
    };
    return m[s] || { bg: '#f1f5f9', color: '#64748b' };
  }
}
