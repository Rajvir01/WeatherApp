# 🌤 Angular Weather App

This is a simple Angular Weather App that allows users to view weather conditions for different countries. It fetches country data from the REST Countries API and weather data from the OpenWeatherMap API. The app also features a **map view**.

---

## 🚀 Features

✅ **List of Countries** – Fetches and displays countries from REST Countries API with sorting, filtering, and pagination.  
✅ **Weather Page** – Displays real-time weather data using OpenWeatherMap API.  
✅ **Weather Icons** – Uses custom icons to represent different weather conditions.  
✅ **Unit Toggle** – Switch between metric and imperial units.  
✅ **Interactive Map** – Displays the location of the country’s capital using Leaflet.js.  

---

## 🛠 Technologies Used

- **Angular** – Frontend Framework  
- **TypeScript** – Programming Language  
- **Firebase** – (Optional) Backend Database  
- **REST Countries API** – Fetches country details  
- **OpenWeatherMap API** – Provides weather data  
- **Leaflet.js** – Interactive map for the capital city  

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository
```sh
git clone https://github.com/rajvir01/angular-weather-app.git
cd angular-weather-app
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 4️⃣ Run the app
```sh
ng serve
```
Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## 📂 Project Structure
```
angular-weather-app/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── country-list/
│   │   │   ├── weather/
│   │   ├── services/
│   │   │   ├── weather.service.ts
│   │   │   ├── country.service.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   │   ├── weather-icons/
│   ├── environments/
│── angular.json
│── package.json
│── README.md
```

---

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to use and modify it!

---
