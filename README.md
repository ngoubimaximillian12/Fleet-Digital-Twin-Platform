# 🚚 Fleet Digital Twin Platform

A comprehensive, real-time IoT fleet management dashboard with AI-powered diagnostics, telemetry streaming, and predictive maintenance tracking. Built with modern React and deployed on AWS.

🌐 **Live Demo:** [Fleet Digital Twin Platform](https://dev.d245d9cwnga02n.amplifyapp.com)

---

## 📋 Table of Contents
- [Overview](#-overview)  
- [Features](#-features)  
- [Screenshots](#-screenshots)  
- [Tech Stack](#-tech-stack)  
- [Architecture](#-architecture)  
- [Installation](#-installation)  
- [Usage](#-usage)  
- [Deployment](#-deployment)  
- [Project Structure](#-project-structure)  
- [API Reference](#-api-reference)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Author](#-author)  
- [Acknowledgments](#-acknowledgments)  

---

## 🎯 Overview

The **Fleet Digital Twin Platform** is an enterprise-grade web application designed for real-time fleet management and monitoring. It provides fleet managers with comprehensive insights into:

- Vehicle health  
- Driver performance  
- Route optimization  
- Predictive maintenance scheduling  

### Key Capabilities
- **Real-time Telemetry**: Live streaming of vehicle metrics updated every 2 seconds  
- **AI Diagnostics**: Intelligent health monitoring for 5+ critical vehicle systems  
- **Predictive Maintenance**: Automated scheduling with cost estimation and priority management  
- **Route Intelligence**: Active delivery tracking with ETA predictions and delay notifications  
- **Driver Analytics**: Performance monitoring with compliance tracking  
- **Inventory Management**: Cargo tracking with real-time value and weight calculations  

---

## ✨ Features

### 📊 Dashboard Modules
1. **Overview Tab**  
   - 6 KPI cards (Active Vehicles, Total Miles, Efficiency, Alerts, Revenue, On-Time Rate)  
   - Real-time telemetry charts (Speed, Temperature, Fuel, Battery, RPM, Throttle)  
   - AI-powered diagnostics for Engine, Transmission, Brakes, Cooling, Electrical  
   - Active alerts panel with severity-based categorization  

2. **Analytics Tab**  
   - Fleet status distribution (Pie Chart)  
   - Fuel efficiency comparison across vehicles (Bar Chart)  
   - 24-hour performance trends (Line Chart)  
   - Fuel consumption and cost analysis (Area Chart)  
   - Fleet uptime, cost per mile, and delivery metrics  

3. **Maintenance Tab**  
   - Comprehensive scheduling & task management (High, Normal, Low)  
   - Monthly cost tracking & service type distribution  
   - Upcoming maintenance calendar  

4. **Routes Tab**  
   - Active route tracking with progress indicators  
   - Real-time ETA calculations and delay notifications  
   - Fuel stop planning & delivery statistics dashboard  

5. **Drivers Tab**  
   - Driver performance ratings (5-star system)  
   - HOS compliance tracking (70-hour limit)  
   - Trip completion statistics  
   - Vehicle assignment management  

6. **Inventory Tab**  
   - Real-time cargo tracking (weight, value, status)  
   - Destination monitoring  
   - Fleet-wide cargo analytics  

### 🎨 UI/UX Features
- Dark theme with cyan/blue gradients  
- Responsive (mobile, tablet, desktop)  
- Search, filter, grid/list views  
- Notification panel & alert management  
- Real-time streaming with pause/resume controls  
- Export functionality for reports  

---

## 📸 Screenshots
👉 Visit the [Live Demo](https://dev.d245d9cwnga02n.amplifyapp.com) to see it in action.  

---

## 🛠 Tech Stack

**Frontend**
- React 18.3.1  
- Vite 7.1.8  
- Tailwind CSS 3.4.1  
- Recharts  
- Lucide React  

**Deployment & Infrastructure**
- AWS Amplify (CI/CD Hosting)  
- PostCSS & Autoprefixer  

**Development Tools**
- ESLint  
- React Hooks (useState, useEffect, useMemo)  

---

## 🏗 Architecture

fleet-digital-twin/
├── src/
│ ├── FleetDigitalTwin.jsx # Main application (1247 lines)
│ ├── App.jsx # Root component
│ ├── main.jsx # App entry point
│ └── index.css # Global styles
├── public/ # Static assets
├── amplify/ # AWS Amplify config
├── build/ # Production build
├── vite.config.js # Vite config
├── tailwind.config.js # Tailwind config
├── postcss.config.js # PostCSS config
└── package.json # Dependencies

yaml
Copy code

---

## 📦 Installation

### Prerequisites
- Node.js >= 18.x  
- npm >= 9.x  
- AWS Account (for deployment)  

### Local Setup

```bash
# Clone repo
git clone https://github.com/ngoubimaximillian12/Fleet-Digital-Twin-Platform.git

cd Fleet-Digital-Twin-Platform

# Install dependencies
npm install

# Start dev server
npm run dev
The app runs at: http://localhost:5173/

🚀 Usage
Development Mode

bash
Copy code
npm run dev
Production Build

bash
Copy code
npm run build
Preview Production

bash
Copy code
npm run preview
Lint Code

bash
Copy code
npm run lint
🌍 Deployment
Deploy to AWS Amplify
bash
Copy code
npm install -g @aws-amplify/cli
amplify configure
amplify init
amplify add hosting
amplify publish
Continuous Deployment: Push to main → auto-deploy on Amplify.
Current Deployment: Live Demo

📁 Project Structure (src/FleetDigitalTwin.jsx)
Mock API (fetchVehicles, fetchAlerts, etc.)

State Management (20+ useState hooks)

Telemetry Streaming (2s intervals)

Utility Functions (getStatusColor, getHealthColor)

6 Tab Modules Rendering

Main Component Return → Complete UI

🔌 API Reference
Mock Endpoints
js
Copy code
const mockAPI = {
  fetchVehicles: async () => [...],      
  fetchAlerts: async () => [...],        
  fetchMaintenance: async () => [...],   
  fetchRouteData: async () => [...],     
  fetchAnalytics: async () => ({...}),   
  fetchDrivers: async () => [...],       
  fetchInventory: async () => [...]      
};
Data Models
Vehicle

ts
Copy code
{
  vehicleId: string,
  name: string,
  status: 'active' | 'warning' | 'maintenance' | 'offline',
  health: number,
  location: string,
  driver: string,
  mileage: number,
  fuelEfficiency: number,
  cargo: string,
  cargoWeight: number,
  lastMaintenance: string,
  nextMaintenance: string,
  lat: number,
  lng: number
}
Alert

ts
Copy code
{
  alertId: string,
  vehicleId: string,
  title: string,
  message: string,
  severity: 'high' | 'medium' | 'low',
  timestamp: string,
  acknowledged: boolean
}
Maintenance

ts
Copy code
{
  id: string,
  vehicleId: string,
  type: string,
  scheduled: string,
  status: 'scheduled' | 'urgent' | 'in-progress' | 'completed',
  cost: number,
  estimatedDuration: string,
  priority: 'high' | 'normal' | 'low'
}
🤝 Contributing
Fork the repo

Create feature branch:

bash
Copy code
git checkout -b feature/AmazingFeature
Commit:

bash
Copy code
git commit -m "Add some AmazingFeature"
Push:

bash
Copy code
git push origin feature/AmazingFeature
Open Pull Request

Guidelines

Follow React best practices

Use functional components with hooks

Stick to ESLint config

Write meaningful commit messages

Test thoroughly before PRs

📄 License
MIT License – see LICENSE for details.

👤 Author
Ngoubi Maximillian Diangha

GitHub: @ngoubimaximillian12

Repo: Fleet-Digital-Twin-Platform

Live Demo: App on AWS Amplify

🙏 Acknowledgments
React team

Recharts

Tailwind CSS

AWS Amplify

Lucide Icons

Built with ❤️ using React + AWS Amplify

🌐 Live Application

pgsql
Copy code

Would you like me to also create a **badge-style header** (with React, AWS, Amplify, MIT License, etc.) for the top of the README so it looks more professional?
