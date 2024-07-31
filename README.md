# Social Media Post Generator

This is a fullstack web application built with TypeScript and Next.js that generates social media posts using OpenAI's API and saves them to a Google Spreadsheet.

## Features

- Generate social media posts using OpenAI's API based on user prompts
- Save generated posts to a Google Spreadsheet
- [Bonus] Retrieve and display posts from the Google Spreadsheet

## Technology Stack

- Frontend: Next.js with TypeScript , MagicUI 
- APIs: OpenAI API, Google Sheets API
- Additional - react-tweet , sonner , zod , moment-timezone

## Folder Structure
- 

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your API keys
4. Run the development server: `npm run dev`

## Deployment

This application is deployed on Vercel . You can access it at [DEPLOYED ](https://techmoondev-assignment.vercel.app/).

## Google Spreadsheet

You can view and edit the Google Spreadsheet used for this application [here](https://docs.google.com/spreadsheets/d/1kz5ksjDASY87PSDLBTiamVNvmysg_HxxqjvbhvAr-YQ/edit?usp=sharing).

## Bonus Task

I implemented the bonus task of retrieving and displaying posts from the Google Spreadsheet on the UI.

## Notes

- This project uses environment variables for API keys. Make sure to set them up in your deployment environment.
- The Google Sheets integration uses REST APIs as per the assignment requirements, without any Google SDKs.