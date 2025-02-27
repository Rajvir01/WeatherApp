import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { WeatherComponent } from '../weather/weather.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchText: string = '';
  sortKey: string = 'name';
  sortAscending: boolean = true;

  // Pagination
  page = 1;
  pageSize = 10;

  // Weather Data
  selectedCountry: any = null;
  weatherData: any = null;

  isGridView = false;

  constructor(private countryService: CountryService,
    private weatherService: WeatherService,
    private router: Router) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      this.filteredCountries = [...this.countries];
    });
  }

  sortCountries(key: string) {
    this.sortAscending = this.sortKey === key ? !this.sortAscending : true;
    this.sortKey = key;

    this.filteredCountries.sort((a, b) => {
      const valueA = a[key]?.common || a[key];
      const valueB = b[key]?.common || b[key];

      return this.sortAscending
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  searchCountries() {
    this.filteredCountries = this.countries.filter(country =>
      country.name.common.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
    const capital = country.capital ? country.capital[0] : null;
    if (capital) {
      this.weatherService.getWeather(capital, country.cca2).subscribe(
        (weather) => {
          this.weatherData = weather;
        },
        (error) => {
          console.error('Error fetching weather:', error);
          this.weatherData = null;
        }
      );
    }
  }

  toggleView() {
    this.isGridView = !this.isGridView;
  }

  navigateToWeather(country: any) {
    this.router.navigate(['/weather', country.name.common, country.capital?.[0] || '']);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredCountries.length / this.pageSize);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

}
