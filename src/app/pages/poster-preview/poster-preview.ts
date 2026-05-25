import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-poster-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './poster-preview.html',
  styleUrl: './poster-preview.css'
})
export class PosterPreviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  eventId!: number;

  posterUrl = signal('');
  loading = signal(false);
  errorMessage = signal('');

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPoster();
  }

  loadPoster(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.eventService.getEventPoster(this.eventId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        this.posterUrl.set(url);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Poster load failed:', err);
        this.errorMessage.set('Poster तयार करता आला नाही.');
        this.loading.set(false);
      }
    });
  }

  downloadPoster(): void {
    if (!this.posterUrl()) return;

    const link = document.createElement('a');
    link.href = this.posterUrl();
    link.download = `event-poster-${this.eventId}.png`;
    link.click();
  }

  shareOnWhatsApp(): void {
    const message = encodeURIComponent(
      `समता बुद्धविहार कार्यक्रमाचा poster तयार आहे.\n\nकृपया download केलेला poster WhatsApp group मध्ये attach करून send करा.`
    );

    window.open(`https://web.whatsapp.com/send?text=${message}`, '_blank');
  }
}