# WHV Australia Monitor

## Overview
Backend monitoring service for Australia Working Holiday Visa availability. Automatically checks visa slot openings and sends Discord notifications.

## Features
- **Automated Monitoring**: Periodic checks for WHV availability
- **Discord Notifications**: Real-time alerts when registrations open
- **Web Scraping**: Uses Cheerio to scrape official WHV pages
- **Scheduled Checks**: Configurable monitoring intervals

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** NestJS, Express
- **Web Scraping**: Cheerio
- **Notifications**: Discord Webhooks
- **Process Management**: PM2
- **CI/CD**: GitHub Actions

## Architecture
- Monolithic NestJS application
- Scheduled tasks for periodic checks
- Web scraping service for WHV page monitoring
- Discord integration for notifications

## CI/CD Pipeline
- Automated via GitHub Actions
- Deployment to VM using PM2 for process management
