import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '794ee95e63c5a32aaf88cd813fa2e425'; // Replace with your API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeather(city: string, countryCode: string, unit: string = 'metric'): Observable<any> {
    const url = `${this.apiUrl}?q=${city},${countryCode}&units=${unit}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

}
