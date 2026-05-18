import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/events';

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  createEvent(formData: FormData): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, formData);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${id}`, event);
  }

  addGalleryImages(eventId: number, formData: FormData): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/${eventId}/gallery`, formData);
  }

  deleteGalleryImage(imageId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/gallery/${imageId}`, { responseType: 'text' });
  }

  deleteEvent(id: number) {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}