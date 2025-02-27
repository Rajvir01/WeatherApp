import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CountriesComponent } from './pages/countries/countries.component';
import { WeatherComponent } from './pages/weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
  { path: 'weather/:country/:capital', component: WeatherComponent }, // Pass country name and capital as params

  // { path: '', redirectTo: 'countries', pathMatch: 'full' },
  // { path: 'countries', loadComponent: () => import('./pages/countries/countries.component').then(m => m.CountriesComponent) },
  // { path: 'weather/:capital/:countryCode', loadComponent: () => import('./pages/weather/weather.component').then(m => m.WeatherComponent) },
  // { path: '**', redirectTo: 'countries' } // Redirect unknown routes
];

export const appConfig = [
  provideRouter(routes),
];
