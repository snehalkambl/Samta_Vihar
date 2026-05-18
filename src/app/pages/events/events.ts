import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class EventsComponent implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);

  events = signal<Event[]>([]);
  loading = signal(false);
  errorMessage = signal('');

  currentPage = signal(1);
  pageSize = 3;

  showDeleteModal = signal(false);
  selectedEventId = signal<number | null>(null);

  totalPages = computed(() => {
    return Math.ceil(this.events().length / this.pageSize);
  });

  paginatedEvents = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.events().slice(start, end);
  });

  pageNumbers = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  ngOnInit(): void {
    this.loadEvents();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadEvents(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events.set(data);
        this.currentPage.set(1);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.errorMessage.set('कार्यक्रम लोड करता आले नाहीत.');
        this.loading.set(false);
      }
    });
  }

  openDeleteModal(eventId: number): void {
    this.selectedEventId.set(eventId);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal(): void {
    this.selectedEventId.set(null);
    this.showDeleteModal.set(false);
  }

  confirmDeleteEvent(): void {
    const id = this.selectedEventId();

    if (!id) {
      return;
    }

    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        this.events.set(this.events().filter(event => event.id !== id));

        if (this.currentPage() > this.totalPages()) {
          this.currentPage.set(Math.max(this.totalPages(), 1));
        }

        this.closeDeleteModal();
      },
      error: (error) => {
        console.error('Delete failed:', error);
        this.errorMessage.set('कार्यक्रम delete करता आला नाही.');
        this.closeDeleteModal();
      }
    });
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setFallbackImage(img: HTMLImageElement): void {
    img.src = '/images/event-placeholder.png';
  }
}