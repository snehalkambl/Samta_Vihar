import { Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

  adminWhatsappNumber = '918551086490';

  groupInviteLink = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_CODE';

  openAdminWhatsapp(): void {
    const message = encodeURIComponent(
      'नमस्कार, मला समता बुद्धविहार WhatsApp group मध्ये join व्हायचे आहे. कृपया मला माहिती द्या.'
    );

    window.open(
      `https://wa.me/${this.adminWhatsappNumber}?text=${message}`,
      '_blank'
    );
  }

  openGroupInvite(): void {
    window.open(this.groupInviteLink, '_blank');
  }
}