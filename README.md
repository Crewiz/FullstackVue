
# Recipe Assistant App

## Overview
The Recipe Assistant App is a full-stack Vue.js application that integrates the OpenAI Assistant API to offer an interactive recipe assistant. Users can engage in conversations with the assistant to find and learn new recipes, enhancing their cooking experience.

## Features
- **Interactive Chat**: Engage with the OpenAI-powered assistant for recipe suggestions and culinary advice.
- **Recipe Database**: Explore a wide range of saved recipes.
- **Custom Recommendations**: Receive recipe suggestions tailored to your preferences and available ingredients.

## Technology Stack
- **Frontend**: Vue.js, Vuetify, Vue router, Pinia
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **AI Integration**: OpenAI Assistant API

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL, for this project we used Railway as our cloud-based database.

### Installation
1. Clone the repository:
- git clone https://github.com/Crewiz/FullstackVue.git

2. Install backend dependencies:
- cd backend
- npm install

3. Install frontend dependencies:
- cd frontend
- npm install

4. Set up your environment variables in a `.env` file.

5. Start the backend server:
npm run start

6. Start the frontend application:
npm run dev



## Usage
- Initiate a conversation with the recipe assistant through the chat interface.
- Edit and save ai-generated recipes.
- Access to your saved recipes via the profile.
- Enjoy personalized recipe recommendations based on your requests and available ingredients.

## Creators
- Sebastian Salas
- Oliver Sandström
- Joel Sellgren

## License
MIT