import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TranslateRequest {
  text: string;
  sourceLang: 'mr' | 'en';
  targetLang: 'mr' | 'en';
}

export interface TranslateResponse {
  translatedText: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationApiService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/translate';

  translate(
    data: TranslateRequest
  ): Observable<TranslateResponse> {

    return this.http.post<TranslateResponse>(
      this.apiUrl,
      data
    );
  }
}