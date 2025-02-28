# NTCU Guide

## Overview

NTCU Guide is a web application designed to help students and visitors explore businesses around National Taichung University of Education (NTCU). It provides information about local shops, allows users to add new businesses, leave feedback, and manage their profiles.

## Features

- **Business Listings**: View categorized shop information (food, life, shopping, and more).
- **User Authentication**: Users can register, log in, and manage their profiles.
- **Add & Remove Shops**: Users can contribute by adding or removing businesses.
- **Feedback System**: Leave and view ratings and reviews for businesses.
- **Responsive Design**: Mobile-friendly UI with Bootstrap.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ntcu-guide.git
   cd ntcu-guide
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The application will be available at `http://localhost:3000/`.

## Technologies Used

- **React.js**: Frontend framework.
- **React Router**: Navigation.
- **Bootstrap**: UI components.
- **Axios**: API communication.
- **Node.js & Express**: Backend API.
- **MongoDB / MySQL** (if applicable): Database for shop and user management.

## API Communication

The application interacts with the backend API for authentication, shop management, and feedback submission. Example:

```js
import Axios from 'axios';
Axios.post('/login', { username, password }).then(response => console.log(response.data));
```
