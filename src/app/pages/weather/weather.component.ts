import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import * as L from 'leaflet'; // Import Leaflet

@Component({
  selector: 'app-weather',
  standalone: true, // Standalone component
  imports: [CommonModule], // Ensure CommonModule is imported
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  country!: string;
  countryCode!: string;
  capital!: string;
  weatherData: any;
  unit: string = 'metric'; // Default to metric
  map: any;
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.country = params['country'];
      this.capital = params['capital'];

      // Fetch country code based on country name
      this.countryService.getCountries().subscribe(countries => {
        const selectedCountry = countries.find(c => c.name.common === this.country);
        if (selectedCountry) {
          this.countryCode = selectedCountry.cca2;
          this.fetchWeather(); // Initial fetch with default unit
        }

      });
    });
  }

  getWeatherIcon(weatherCondition: string): string {
    const iconMap: { [key: string]: string } = {
      Clear: 'sunny.png',
      Clouds: 'cloudy.png',
      Rain: 'rainy.png',
      Thunderstorm: 'stormy.png',
      Snow: 'snowy.png',
      Mist: 'foggy.png',
      Fog: 'foggy.png',
    };

    return `assets/weather-icons/${iconMap[weatherCondition] || 'sunny.png'}`;
  }

  initMap(lat: number, lng: number) {
    if (this.map) {
      this.map.remove(); // Remove previous map instance before reinitializing
    }

    setTimeout(() => { // Ensures map initializes correctly after DOM update
      this.map = L.map('map', { zoomControl: false }).setView([lat, lng], 10);

      // Load map tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // Add marker for the capital
      L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`<b>${this.capital}, ${this.country}</b>`)
        .openPopup();
    }, 500); // Small delay to ensure proper rendering
  }


  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Destroy map instance when component is destroyed
    }
  }

  // Fetch weather with the selected unit
  fetchWeather() {
    if (this.capital && this.countryCode) {
      this.weatherService.getWeather(this.capital, this.countryCode, this.unit).subscribe(data => {
        this.weatherData = data;
        this.weatherData.iconUrl = this.getWeatherIcon(this.weatherData.weather[0].main);
        // Fetch country details again to get lat/lng
        this.countryService.getCountries().subscribe(countries => {
          const selectedCountry = countries.find(c => c.name.common === this.country);
          if (selectedCountry && selectedCountry.latlng) {
            this.initMap(selectedCountry.latlng[0], selectedCountry.latlng[1]); // Call initMap with coordinates
          }
        });
      });
    }
  }


  // Toggle units and refresh weather data
  toggleUnits() {
    this.unit = this.unit === 'metric' ? 'imperial' : 'metric';
    this.fetchWeather();
  }

  goBack() {
    this.router.navigate(['/countries']);
  }
}
