import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { TranslatePipe } from '../../pipes/translate-pipe';
import { TranslationApiService } from '../../services/translation-api';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './create-event.html',
  styleUrl: './create-event.css'
})
export class CreateEventComponent implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private backendBaseUrl = 'http://localhost:8080';
  private translationApi = inject(TranslationApiService);

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
    titleMr: '',
    titleEn: '',

    shortDescriptionMr: '',
    shortDescriptionEn: '',

    fullDescriptionMr: '',
    fullDescriptionEn: '',

    eventDate: '',
    eventTime: '',

    locationMr: '',
    locationEn: '',

    amount: 0,
    isPaid: false,
    status: 'ACTIVE',

    organizerMr: '',
    organizerEn: '',

    speakerNameMr: '',
    speakerNameEn: '',

    contactPersonMr: '',
    contactPersonEn: '',

    contactMobile: '',

    rulesMr: '',
    rulesEn: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.eventId = Number(id);
      this.loadEventDetails(this.eventId);
    }
  }

  loadEventDetails(id: number): void {
    this.loading.set(true);

    this.eventService.getEventById(id).subscribe({
      next: (event: any) => {
        this.eventForm = {
          titleMr: event.titleMr || event.title || '',
          titleEn: event.titleEn || '',

          shortDescriptionMr: event.shortDescriptionMr || event.shortDescription || '',
          shortDescriptionEn: event.shortDescriptionEn || '',

          fullDescriptionMr: event.fullDescriptionMr || event.fullDescription || '',
          fullDescriptionEn: event.fullDescriptionEn || '',

          eventDate: event.eventDate || '',
          eventTime: event.eventTime || '',

          locationMr: event.locationMr || event.location || '',
          locationEn: event.locationEn || '',

          amount: event.amount || 0,
          isPaid: event.isPaid || false,
          status: event.status || 'ACTIVE',

          organizerMr: event.organizerMr || event.organizer || '',
          organizerEn: event.organizerEn || '',

          speakerNameMr: event.speakerNameMr || event.speakerName || '',
          speakerNameEn: event.speakerNameEn || '',

          contactPersonMr: event.contactPersonMr || event.contactPerson || '',
          contactPersonEn: event.contactPersonEn || '',

          contactMobile: event.contactMobile || '',

          rulesMr: event.rulesMr || event.rules || '',
          rulesEn: event.rulesEn || ''
        };

        this.coverImagePreview = this.getImageUrl(event.coverImageUrl);
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

    if (!this.eventForm.titleMr.trim() && !this.eventForm.titleEn.trim()) {
      this.errorMessage.set('कृपया कार्यक्रमाचे नाव मराठी किंवा English मध्ये भरा.');
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

    const formData = this.buildFormData();

    this.eventService.updateEvent(this.eventId, formData).subscribe({
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

    formData.append('titleMr', this.eventForm.titleMr || '');
    formData.append('titleEn', this.eventForm.titleEn || '');

    formData.append('shortDescriptionMr', this.eventForm.shortDescriptionMr || '');
    formData.append('shortDescriptionEn', this.eventForm.shortDescriptionEn || '');

    formData.append('fullDescriptionMr', this.eventForm.fullDescriptionMr || '');
    formData.append('fullDescriptionEn', this.eventForm.fullDescriptionEn || '');

    formData.append('eventDate', this.eventForm.eventDate || '');
    formData.append('eventTime', this.eventForm.eventTime || '');

    formData.append('locationMr', this.eventForm.locationMr || '');
    formData.append('locationEn', this.eventForm.locationEn || '');

    formData.append('amount', String(this.eventForm.amount || 0));
    formData.append('isPaid', String(this.eventForm.isPaid));
    formData.append('status', this.eventForm.status || 'ACTIVE');

    formData.append('organizerMr', this.eventForm.organizerMr || '');
    formData.append('organizerEn', this.eventForm.organizerEn || '');

    formData.append('speakerNameMr', this.eventForm.speakerNameMr || '');
    formData.append('speakerNameEn', this.eventForm.speakerNameEn || '');

    formData.append('contactPersonMr', this.eventForm.contactPersonMr || '');
    formData.append('contactPersonEn', this.eventForm.contactPersonEn || '');

    formData.append('contactMobile', this.eventForm.contactMobile || '');

    formData.append('rulesMr', this.eventForm.rulesMr || '');
    formData.append('rulesEn', this.eventForm.rulesEn || '');

    if (this.coverImageFile) {
      formData.append('coverImage', this.coverImageFile);
    }

    this.galleryImageFiles.forEach(file => {
      formData.append('galleryImages', file);
    });

    return formData;
  }

  private getImageUrl(imageUrl: string | null | undefined): string | null {
    if (!imageUrl) return null;

    if (imageUrl.startsWith('data:image')) return imageUrl;
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${this.backendBaseUrl}${imageUrl}`;

    return `${this.backendBaseUrl}/${imageUrl}`;
  }

  translateField(
  sourceField: keyof typeof this.eventForm,
  targetField: keyof typeof this.eventForm,
  sourceLang: 'mr' | 'en',
  targetLang: 'mr' | 'en'
): void {
  const text = String(this.eventForm[sourceField] || '').trim();

  if (!text) {
    this.errorMessage.set('Translate करण्यासाठी आधी text भरा.');
    return;
  }

  this.translationApi.translate({
    text,
    sourceLang,
    targetLang
  }).subscribe({
    next: (res) => {
      (this.eventForm[targetField] as string) = res.translatedText;
    },
    error: (err) => {
      console.error('Translation failed:', err);
      this.errorMessage.set('Translation करता आले नाही.');
    }
  });
}
}