import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { TranslatePipe } from '../../pipes/translate-pipe';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe
  ],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetailsComponent {

  private route = inject(ActivatedRoute);
  private eventService = inject(EventService);

  event = signal<Event | null>(null);

  loading = signal(true);

  errorMessage = signal('');

  selectedImage = signal<string>(
    '/images/event-placeholder.png'
  );

  constructor() {
    this.loadEvent();
  }

  loadEvent(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {

      this.errorMessage.set(
        'कार्यक्रम सापडला नाही.'
      );

      this.loading.set(false);

      return;
    }

    this.eventService.getEventById(id).subscribe({

      next: (response) => {

        this.event.set(response);

        this.selectedImage.set(
          response.coverImageUrl ||
          response.images?.[0]?.imageUrl ||
          '/images/event-placeholder.png'
        );

        this.loading.set(false);
      },

      error: (error) => {

        console.error(
          'Error fetching event details:',
          error
        );

        this.errorMessage.set(
          'कार्यक्रमाची माहिती मिळाली नाही.'
        );

        this.loading.set(false);
      }
    });
  }

  setSelectedImage(imageUrl: string): void {
    this.selectedImage.set(imageUrl);
  }

  setFallbackImage(event: any): void {

    const img = event.target as HTMLImageElement;

    img.src = '/images/event-placeholder.png';
  }
}