# HTTP Status Meaning Demo

This is a simple Next.js app that demonstrates the features of the [http-status-meaning](https://github.com/username/http-status-meaning) package.

## Features

- Look up HTTP status codes and their meanings
- Find HTTP status codes by description (fuzzy matching)
- View common use cases for status codes
- Supports multiple languages

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the demo application.

## API Routes

This demo includes two API routes:

### `/api/status-code`

Returns information about a specific status code.

Query parameters:
- `code` (required): The HTTP status code
- `language` (optional): The language code (defaults to 'en')

Example: `/api/status-code?code=404&language=fr`

### `/api/description`

Finds a status code based on a description.

Query parameters:
- `description` (required): The description to match
- `language` (optional): The language code for the response (defaults to 'en')

Example: `/api/description?description=Not%20Found&language=de`

## Learn More

To learn more about the HTTP Status Meaning package, check out the [GitHub repository](https://github.com/Lukman10a/http-status-meaning). 