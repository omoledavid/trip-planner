# Road Trip Planner

A web application that allows users to plan their road trips by adding, rearranging, and viewing destinations on a map. The app also calculates distances, travel times, and suggests points of interest along the route.

## Features

- Add and remove destinations
- Reorder destinations
- View destinations on an interactive map
- Calculate total distance, travel time, and fuel consumption
- Display points of interest (POIs) between destinations
- Supports various types of POIs (restaurants, hotels, etc.)
- Store destinations in local storage

## Technology Stack

- **Frontend:** Vue.js 3 with TailwindCSS for styling
- **Backend:** Laravel 11 with Inertia.js
- **Mapping API:** Google Maps JavaScript API
- **Database:** MySQL


## Demonstration
<a href="http://trip-planner.designsamples.online/" >View Live Demo</a>

## Setup Instructions

- Install Backend Dependencies

```bash
composer install
```

- Install Frontend Dependencies

```bash
npm install
```
## Environment Configuration

- Copy the .env.example file to .env
- Generate the application key:
```bash
php artisan key:generate
```
- Set up your database
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```
- Add your Google Maps API Key to .env file
```bash
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Database Migration
```bash
php artisan migrate
```

## Build the Frontend
```bash
npm run dev  # For development
npm run build  # For production
```

### Prerequisites

- PHP 8.2 or higher
- Composer
- NPM or Yarn
- MySQL
- Google Maps API Key

### Clone the Repository

```bash
git clone https://github.com/omoledavid/trip-planner.git
cd trip-planner
```

# Author

- <a href="https://designsamples.online">**Omole Kessiena David** </a>

# License

This project is licensed under the MIT License
