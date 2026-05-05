# Megusta Cars Mobile App

This is the companion mobile app for Megusta Cars, built with **React Native**, **Expo Router**, and **Firebase**.

## Features

- **Customer Flow (Anonymous)**
  - View fleet
  - See active/past bookings
  - Profile (Anonymous ID)

- **Admin Flow (Authenticated)**
  - View bookings
  - Manage fleet
  - Dashboard overview

## Getting Started

1. Ensure your Firebase environment variables are set in `.env.local` at the root of the project (the mobile app reads these via `EXPO_PUBLIC_`).
2. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```
3. Run the app:
   ```bash
   npx expo start
   ```

## Usage

- Use the **Expo Go** app on your iOS or Android device to scan the QR code.
- Alternatively, press `a` to open in an Android Emulator, or `i` to open in an iOS Simulator.
- The app uses **Expo Router** for file-based routing.
- The auth flow automatically diverts users between `(customer)` and `(admin)` tabs. Log in with your admin credentials to access the admin layout.
