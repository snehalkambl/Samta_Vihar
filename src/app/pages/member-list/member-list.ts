import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberListComponent {
  private memberService = inject(MemberService);

  members = signal<Member[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor() {
    this.loadMembers();
  }

  loadMembers(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.memberService.getAllMembers().subscribe({
      next: (response) => {
        this.members.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.errorMessage.set('सदस्यांची माहिती मिळाली नाही.');
        this.loading.set(false);
      }
    });
  }

  downloadMembersExcel(): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Members');

    worksheet.mergeCells('A1:F1');
    const title = worksheet.getCell('A1');
    title.value = 'समता बुद्धविहार, ममतानगर - सदस्य यादी';
    title.font = { size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    title.alignment = { horizontal: 'center', vertical: 'middle' };
    title.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '2F4A9A' }
    };

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      'क्रमांक',
      'पूर्ण नाव',
      'मोबाईल क्रमांक',
      'पत्ता',
      'पेमेंट स्थिती',
      'पेमेंट मोड',
      'Transaction ID'
    ]);

    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '2F4A9A' }
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    this.members().forEach((member, index) => {
      const row = worksheet.addRow([
        index + 1,
        member.fullName,
        member.mobile,
        member.address,
        member.paymentStatus,
        member.paymentMode,
        member.transactionId || '-'
      ]);

      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    worksheet.columns = [
      { width: 10 },
      { width: 25 },
      { width: 18 },
      { width: 35 },
      { width: 18 },
      { width: 18 },
      { width: 22 }
    ];

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, 'members-report.xlsx');
    });
  }
}