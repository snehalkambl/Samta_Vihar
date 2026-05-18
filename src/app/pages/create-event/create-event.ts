import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEventComponent implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  isEditMode = false;
  eventId: number | null = null;

  coverImageFile: File | null = null;
  galleryImageFiles: File[] = [];

  coverImagePreview: string | null = null;
  galleryImagePreviews: string[] = [];

  eventForm = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    eventDate: '',
    eventTime: '',
    location: '',
    amount: 0,
    isPaid: false,
    status: 'ACTIVE',
    organizer: '',
    speakerName: '',
    contactPerson: '',
    contactMobile: '',
    rules: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('EDIT ID FROM ROUTE = ', id);

    if (id) {
      this.isEditMode = true;
      this.eventId = Number(id);
      this.loadEventDetails(this.eventId);
    }
  }

  loadEventDetails(id: number): void {
    console.log('CALLING GET EVENT API FOR ID = ', id);

    this.loading.set(true);

    this.eventService.getEventById(id).subscribe({
      next: (event: any) => {
        console.log('EVENT RESPONSE = ', event);

        this.eventForm = {
          title: event.title || '',
          shortDescription: event.shortDescription || '',
          fullDescription: event.fullDescription || '',
          eventDate: event.eventDate || '',
          eventTime: event.eventTime || '',
          location: event.location || '',
          amount: event.amount || 0,
          isPaid: event.isPaid || false,
          status: event.status || 'ACTIVE',
          organizer: event.organizer || '',
          speakerName: event.speakerName || '',
          contactPerson: event.contactPerson || '',
          contactMobile: event.contactMobile || '',
          rules: event.rules || ''
        };

        this.coverImagePreview = event.coverImageUrl || null;
        this.loading.set(false);
      },
      error: (error) => {
        console.error('GET EVENT ERROR = ', error);
        this.errorMessage.set('कार्यक्रमाची माहिती लोड करता आली नाही.');
        this.loading.set(false);
      }
    });
  }

  onCoverImageSelected(event: globalThis.Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.coverImageFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onGalleryImagesSelected(event: globalThis.Event): void {
    const input = event.target as HTMLInputElement;
    this.galleryImageFiles = input.files ? Array.from(input.files) : [];
    this.galleryImagePreviews = [];

    this.galleryImageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.galleryImagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  submitForm(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (!this.eventForm.title.trim()) {
      this.errorMessage.set('कृपया कार्यक्रमाचे नाव भरा.');
      return;
    }

    if (!this.eventForm.eventDate) {
      this.errorMessage.set('कृपया तारीख भरा.');
      return;
    }

    this.loading.set(true);

    if (this.isEditMode && this.eventId) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }

  createEvent(): void {
    const formData = this.buildFormData();

    this.eventService.createEvent(formData).subscribe({
      next: () => {
        this.successMessage.set('कार्यक्रम यशस्वीरीत्या जतन झाला.');
        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/events']);
        }, 1000);
      },
      error: (error) => {
        console.error('CREATE EVENT ERROR = ', error);
        this.errorMessage.set('कार्यक्रम जतन करता आला नाही.');
        this.loading.set(false);
      }
    });
  }

  updateEvent(): void {
    if (!this.eventId) {
      this.errorMessage.set('कार्यक्रम ID मिळाला नाही.');
      this.loading.set(false);
      return;
    }

    this.eventService.updateEvent(this.eventId, this.eventForm as any).subscribe({
      next: () => {
        this.successMessage.set('कार्यक्रम यशस्वीरीत्या अपडेट झाला.');
        this.loading.set(false);

        setTimeout(() => {
          this.router.navigate(['/events']);
        }, 1000);
      },
      error: (error) => {
        console.error('UPDATE EVENT ERROR = ', error);
        this.errorMessage.set('कार्यक्रम अपडेट करता आला नाही.');
        this.loading.set(false);
      }
    });
  }

  private buildFormData(): FormData {
    const formData = new FormData();

    formData.append('title', this.eventForm.title);
    formData.append('shortDescription', this.eventForm.shortDescription);
    formData.append('fullDescription', this.eventForm.fullDescription);
    formData.append('eventDate', this.eventForm.eventDate);
    formData.append('eventTime', this.eventForm.eventTime);
    formData.append('location', this.eventForm.location);
    formData.append('amount', String(this.eventForm.amount || 0));
    formData.append('isPaid', String(this.eventForm.isPaid));
    formData.append('status', this.eventForm.status);
    formData.append('organizer', this.eventForm.organizer);
    formData.append('speakerName', this.eventForm.speakerName);
    formData.append('contactPerson', this.eventForm.contactPerson);
    formData.append('contactMobile', this.eventForm.contactMobile);
    formData.append('rules', this.eventForm.rules);

    if (this.coverImageFile) {
      formData.append('coverImage', this.coverImageFile);
    }

    this.galleryImageFiles.forEach(file => {
      formData.append('galleryImages', file);
    });

    return formData;
  }
}