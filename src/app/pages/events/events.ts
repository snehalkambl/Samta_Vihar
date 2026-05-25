import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class EventsComponent {
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private translationService = inject(TranslationService);

  private backendBaseUrl = 'http://localhost:8080';

  events = signal<any[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  currentPage = signal(1);
  pageSize = 2;

  totalPages = computed(() => {
    const total = Math.ceil(this.events().length / this.pageSize);
    return total || 1;
  });

  paginatedEvents = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.events().slice(start, end);
  });

  constructor() {
    this.loadEvents();
  }

  currentLang(): 'mr' | 'en' {
    return this.translationService.currentLang();
  }

  eventTitle(event: any): string {
    return this.currentLang() === 'mr'
      ? event.titleMr || event.titleEn || event.title || ''
      : event.titleEn || event.titleMr || event.title || '';
  }

  eventLocation(event: any): string {
    return this.currentLang() === 'mr'
      ? event.locationMr || event.locationEn || event.location || ''
      : event.locationEn || event.locationMr || event.location || '';
  }

  eventDescription(event: any): string {
    return this.currentLang() === 'mr'
      ? event.shortDescriptionMr ||
          event.fullDescriptionMr ||
          event.shortDescriptionEn ||
          event.fullDescriptionEn ||
          event.shortDescription ||
          event.fullDescription ||
          ''
      : event.shortDescriptionEn ||
          event.fullDescriptionEn ||
          event.shortDescriptionMr ||
          event.fullDescriptionMr ||
          event.shortDescription ||
          event.fullDescription ||
          '';
  }

  loadEvents(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events.set(res || []);
        this.loading.set(false);

        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      },
      error: (err) => {
        console.error('Events load failed:', err);
        this.errorMessage.set('कार्यक्रम लोड करता आले नाहीत.');
        this.loading.set(false);
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isLoggedIn() && this.authService.isAdmin();
  }

  getEventImage(event: any): string {
    const imageUrl =
      event.coverImageUrl ||
      event.imageUrl ||
      event.image ||
      event.filePath ||
      event.images?.[0]?.imageUrl ||
      event.images?.[0]?.url ||
      event.images?.[0]?.filePath;

    if (!imageUrl) {
      return '/images/event-placeholder.png';
    }

    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    if (imageUrl.startsWith('/')) {
      return `${this.backendBaseUrl}${imageUrl}`;
    }

    return `${this.backendBaseUrl}/${imageUrl}`;
  }

  setFallbackImage(img: HTMLImageElement): void {
    img.src = '/images/event-placeholder.png';
  }

  deleteEvent(id: number): void {
    const confirmDelete = confirm('तुम्हाला हा कार्यक्रम delete करायचा आहे का?');

    if (!confirmDelete) return;

    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events.set(this.events().filter(event => event.id !== id));

        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(this.totalPages());
        }
      },
      error: (err) => {
        console.error('Delete event failed:', err);
        alert('कार्यक्रम delete करता आला नाही.');
      }
    });
  }

  pageNumbers(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}