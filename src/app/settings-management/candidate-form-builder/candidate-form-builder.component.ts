import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormField {
  id: number;
  name: string;
  type: string;
  mandatory: boolean;
  visible: boolean;
  placeholder: string;
  helpText: string;
  validation: string;
  defaultValue: string;
  key: string;
}

export interface FormSection {
  id: number;
  name: string;
  collapsed: boolean;
  fields: FormField[];
}

@Component({
  selector: 'app-candidate-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-form-builder.component.html',
  styleUrls: ['./candidate-form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CandidateFormBuilderComponent {
  trackByIndex(i: number, _: any) { return i; }
  trackById(_: number, item: { id: string | number }) { return item.id; }

  formTab: 'fields' | 'settings' = 'fields';
  selectedFormField: FormField | null = null;
  nextFieldId = 100;

  fieldTypes = [
    { type: 'Text Box',     icon: 'A' },
    { type: 'Text Area',    icon: '☰' },
    { type: 'Number',       icon: '#' },
    { type: 'Email',        icon: '@' },
    { type: 'Phone',        icon: '☎' },
    { type: 'Date',         icon: '▦' },
    { type: 'Dropdown',     icon: '▾' },
    { type: 'Radio Button', icon: '◉' },
    { type: 'Checkbox',     icon: '☑' },
    { type: 'File Upload',  icon: '⬆' },
  ];

  formSections: FormSection[] = [
    {
      id: 1, name: 'PERSONAL INFORMATION', collapsed: false,
      fields: [
        { id: 1, name: 'Full Name',        type: 'Text Box',    mandatory: true,  visible: true, placeholder: 'Enter full name',     helpText: 'Please enter your full name as per official documents.', validation: 'No Validation', defaultValue: '', key: 'full_name' },
        { id: 2, name: 'Email Address',    type: 'Email',       mandatory: true,  visible: true, placeholder: 'Enter email',         helpText: 'We will use this to contact you.', validation: 'Email Format', defaultValue: '', key: 'email_address' },
        { id: 3, name: 'Phone Number',     type: 'Phone',       mandatory: true,  visible: true, placeholder: 'Enter phone number',  helpText: '', validation: 'Phone Format', defaultValue: '', key: 'phone_number' },
        { id: 4, name: 'Date of Birth',    type: 'Date',        mandatory: false, visible: true, placeholder: '',                    helpText: '', validation: 'No Validation', defaultValue: '', key: 'date_of_birth' },
        { id: 5, name: 'Current Location', type: 'Dropdown',    mandatory: true,  visible: true, placeholder: 'Select location',     helpText: '', validation: 'No Validation', defaultValue: '', key: 'current_location' },
        { id: 6, name: 'Resume / CV',      type: 'File Upload', mandatory: true,  visible: true, placeholder: 'PDF, DOC, DOCX',      helpText: '', validation: 'No Validation', defaultValue: '', key: 'resume_cv' },
      ]
    },
    {
      id: 2, name: 'EDUCATION', collapsed: false,
      fields: [
        { id: 7, name: 'Highest Qualification', type: 'Dropdown', mandatory: true,  visible: true, placeholder: 'Select qualification', helpText: '', validation: 'No Validation', defaultValue: '', key: 'highest_qualification' },
        { id: 8, name: 'University / College',  type: 'Text Box', mandatory: false, visible: true, placeholder: 'Enter university name', helpText: '', validation: 'No Validation', defaultValue: '', key: 'university_college' },
      ]
    },
  ];

  selectFormField(field: FormField): void { this.selectedFormField = field; }

  addFieldToSection(type: string): void {
    const section = this.formSections[0];
    const key = type.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + this.nextFieldId;
    const field: FormField = { id: this.nextFieldId++, name: type, type, mandatory: false, visible: true, placeholder: '', helpText: '', validation: 'No Validation', defaultValue: '', key };
    section.fields.push(field);
    this.selectedFormField = field;
  }

  deleteFormField(sectionId: number, fieldId: number): void {
    const sec = this.formSections.find(s => s.id === sectionId);
    if (!sec) return;
    sec.fields = sec.fields.filter(f => f.id !== fieldId);
    if (this.selectedFormField?.id === fieldId) this.selectedFormField = null;
  }

  addFormSection(): void {
    const id = Math.max(...this.formSections.map(s => s.id)) + 1;
    this.formSections.push({ id, name: 'NEW SECTION', collapsed: false, fields: [] });
  }

  toggleSectionCollapse(section: FormSection): void { section.collapsed = !section.collapsed; }

  validationOptions = ['No Validation', 'Email Format', 'Phone Format', 'URL Format', 'Number Only', 'Min Length', 'Max Length'];
}