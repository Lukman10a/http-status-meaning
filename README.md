<!-- # HTTP Status Meaning

A simple yet comprehensive npm package that provides human-readable meanings for HTTP status codes.

## Installation

```bash
npm install http-status-meaning@latest
```

## Usage

### Basic Usage

```javascript
import { getStatusMeaning } from "http-status-meaning";

// Get the meaning of a specific status code
console.log(getStatusMeaning(200)); // "OK - The request was successful."
console.log(getStatusMeaning(404)); // "Not Found - The requested resource does not exist."
console.log(getStatusMeaning(500)); // "Internal Server Error - A generic error message for server issues."
```

### Advanced Usage

```javascript
import {
  getStatusCategory,
  isSuccess,
  isClientError,
  getStatusCodesByCategory,
  getAllStatusCodes,
} from "http-status-meaning";

// Get the category of a status code
console.log(getStatusCategory(200)); // "Success"
console.log(getStatusCategory(404)); // "Client Error"

// Check if a status code is in a specific category
console.log(isSuccess(200)); // true
console.log(isClientError(404)); // true

// Get all status codes in a specific category
const clientErrors = getStatusCodesByCategory("clientError");
console.log(clientErrors); // { '400': 'Bad Request - ...', '401': 'Unauthorized - ...', ... }

// Get all status codes
const allCodes = getAllStatusCodes();
console.log(allCodes); // { '100': 'Continue - ...', '200': 'OK - ...', ... }
```

## API Reference

### Functions

#### `getStatusMeaning(code)`

Returns the human-readable meaning of an HTTP status code.

- `code` (Number): The HTTP status code
- Returns (String): The human-readable meaning of the status code

#### `getStatusCategory(code)`

Returns the category of an HTTP status code.

- `code` (Number): The HTTP status code
- Returns (String): The category of the status code ("Informational", "Success", "Redirection", "Client Error", "Server Error", or "Unknown")

#### `isInformational(code)`

Checks if a status code is in the Informational category (1xx).

- `code` (Number): The HTTP status code
- Returns (Boolean): True if the code is in the Informational category

#### `isSuccess(code)`

Checks if a status code is in the Success category (2xx).

- `code` (Number): The HTTP status code
- Returns (Boolean): True if the code is in the Success category

#### `isRedirection(code)`

Checks if a status code is in the Redirection category (3xx).

- `code` (Number): The HTTP status code
- Returns (Boolean): True if the code is in the Redirection category

#### `isClientError(code)`

Checks if a status code is in the Client Error category (4xx).

- `code` (Number): The HTTP status code
- Returns (Boolean): True if the code is in the Client Error category

#### `isServerError(code)`

Checks if a status code is in the Server Error category (5xx).

- `code` (Number): The HTTP status code
- Returns (Boolean): True if the code is in the Server Error category

#### `getStatusCodesByCategory(category)`

Returns all status codes in a specific category.

- `category` (String): The category to filter by ('informational', 'success', 'redirection', 'clientError', 'serverError')
- Returns (Object): An object containing the filtered status codes and their meanings

#### `getAllStatusCodes()`

Returns all status codes.

- Returns (Object): An object containing all status codes and their meanings

## License

MIT -->

# HTTP Status Meaning

A comprehensive library for working with HTTP status codes with internationalization support.

[![npm version](https://img.shields.io/npm/v/http-status-meaning.svg)](https://www.npmjs.com/package/http-status-meaning)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🌐 **Internationalization Support**: Get status code meanings in multiple languages
- 📊 **Categorization**: Identify and filter status codes by their categories
- 🔍 **Validation Helpers**: Quickly check if a status code belongs to a specific category
- 📖 **Use Cases**: Access common use cases for specific status codes
- 🚀 **Browser Compatible**: Works in Node.js and browser environments

## Installation

```bash
npm install http-status-meaning
```

## Usage

### In Node.js (ESM)

```javascript
import httpStatusMeaning from "http-status-meaning";

// Get status meaning
console.log(httpStatusMeaning.getStatusMeaning(404)); // "Not Found"

// With language support
console.log(httpStatusMeaning.getStatusMeaning(404, "fr")); // "Non trouvé"
```

### In Node.js (CommonJS)

```javascript
const httpStatusMeaning = require("http-status-meaning");

// Get status meaning
console.log(httpStatusMeaning.getStatusMeaning(404)); // "Not Found"
```

### In Browser (UMD)

```html
<script src="node_modules/http-status-meaning/dist/http-status-meaning.min.js"></script>
<script>
  // Access through global variable
  console.log(httpStatusMeaning.getStatusMeaning(404)); // "Not Found"
</script>
```

### In Browser (ESM)

```html
<script type="module">
  import httpStatusMeaning from "./node_modules/http-status-meaning/dist/http-status-meaning.esm.js";

  console.log(httpStatusMeaning.getStatusMeaning(404)); // "Not Found"
</script>
```

## API Reference

### Status Code Information

#### `getStatusMeaning(code, language = 'en')`

Returns the human-readable meaning of an HTTP status code.

```javascript
httpStatusMeaning.getStatusMeaning(200); // "OK"
httpStatusMeaning.getStatusMeaning(404, "fr"); // "Non trouvé"
```

Parameters:

- `code` (Number): The HTTP status code
- `language` (String, optional): The language code (defaults to 'en')

Returns:

- (String): The human-readable meaning of the status code

#### `getStatusCategory(code, language = 'en')`

Returns the category of an HTTP status code.

```javascript
httpStatusMeaning.getStatusCategory(200); // "Success"
httpStatusMeaning.getStatusCategory(404, "fr"); // "Erreur Client"
```

Parameters:

- `code` (Number): The HTTP status code
- `language` (String, optional): The language code (defaults to 'en')

Returns:

- (String): The category of the status code

#### `getStatusCodeUseCases(code)`

Returns common use cases for a given status code.

```javascript
httpStatusMeaning.getStatusCodeUseCases(404);
// ["Resource not found", "Endpoint doesn't exist", "Item has been removed"]
```

Parameters:

- `code` (Number): The HTTP status code

Returns:

- (Array): Array of strings describing common use cases

### Category Validation

#### `isInformational(code)`

Checks if a status code is in the Informational category (1xx).

```javascript
httpStatusMeaning.isInformational(100); // true
httpStatusMeaning.isInformational(200); // false
```

#### `isSuccess(code)`

Checks if a status code is in the Success category (2xx).

```javascript
httpStatusMeaning.isSuccess(200); // true
httpStatusMeaning.isSuccess(404); // false
```

#### `isRedirection(code)`

Checks if a status code is in the Redirection category (3xx).

```javascript
httpStatusMeaning.isRedirection(301); // true
httpStatusMeaning.isRedirection(404); // false
```

#### `isClientError(code)`

Checks if a status code is in the Client Error category (4xx).

```javascript
httpStatusMeaning.isClientError(404); // true
httpStatusMeaning.isClientError(500); // false
```

#### `isServerError(code)`

Checks if a status code is in the Server Error category (5xx).

```javascript
httpStatusMeaning.isServerError(500); // true
httpStatusMeaning.isServerError(404); // false
```

### Collection Methods

#### `getStatusCodesByCategory(category, language = 'en')`

Returns all status codes in a specific category.

```javascript
httpStatusMeaning.getStatusCodesByCategory("success");
/* Returns:
{
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  ...
}
*/
```

Parameters:

- `category` (String): One of 'informational', 'success', 'redirection', 'clientError', 'serverError'
- `language` (String, optional): The language code (defaults to 'en')

Returns:

- (Object): An object with status codes as keys and their meanings as values

#### `getAllStatusCodes(language = 'en')`

Returns all status codes.

```javascript
httpStatusMeaning.getAllStatusCodes();
/* Returns:
{
  "100": "Continue",
  "101": "Switching Protocols",
  "200": "OK",
  ...
}
*/
```

Parameters:

- `language` (String, optional): The language code (defaults to 'en')

Returns:

- (Object): An object with status codes as keys and their meanings as values

### Internationalization

#### `getSupportedLanguages()`

Returns all supported languages.

```javascript
httpStatusMeaning.getSupportedLanguages();
// ["en", "fr", "es", "de", "pt", "it", "ru", "zh", "ja", "ar"]
```

Returns:

- (Array): Array of language codes

## Supported Languages

Currently, the following languages are supported:

| Code | Language   |
| ---- | ---------- |
| en   | English    |
| fr   | French     |
| es   | Spanish    |
| de   | German     |
| pt   | Portuguese |
| it   | Italian    |
| ru   | Russian    |
| zh   | Chinese    |
| ja   | Japanese   |
| ar   | Arabic     |

## Examples

### Working with Categories

```javascript
// Get all client error status codes
const clientErrors = httpStatusMeaning.getStatusCodesByCategory("clientError");
console.log(clientErrors);

// Check if a status code is a server error
if (httpStatusMeaning.isServerError(statusCode)) {
  console.log("This is a server error!");
}
```

### Internationalization Examples

```javascript
// Get status meaning in different languages
console.log(httpStatusMeaning.getStatusMeaning(404, "en")); // "Not Found"
console.log(httpStatusMeaning.getStatusMeaning(404, "fr")); // "Non trouvé"
console.log(httpStatusMeaning.getStatusMeaning(404, "es")); // "No encontrado"

// Get all status codes in a specific language
const germanStatusCodes = httpStatusMeaning.getAllStatusCodes("de");
```

### Using in Express.js

```javascript
import express from "express";
import httpStatusMeaning from "http-status-meaning";

const app = express();

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Get user's preferred language from Accept-Language header
  const language =
    req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";

  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: httpStatusMeaning.getStatusMeaning(statusCode, language),
      category: httpStatusMeaning.getStatusCategory(statusCode, language),
    },
  });
});

app.listen(3000);
```

### Creating a Status Code Reference Page

```javascript
import httpStatusMeaning from "http-status-meaning";

// Generate HTML for a status code reference
function generateStatusCodeReference() {
  const categories = [
    "informational",
    "success",
    "redirection",
    "clientError",
    "serverError",
  ];

  let html = '<div class="status-codes">';

  categories.forEach((category) => {
    const categoryName = category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    html += `<h2>${categoryName}</h2><table>`;
    html +=
      "<tr><th>Code</th><th>Description</th><th>Common Use Cases</th></tr>";

    const codes = httpStatusMeaning.getStatusCodesByCategory(category);

    for (const code in codes) {
      const useCases = httpStatusMeaning.getStatusCodeUseCases(Number(code));
      const useCasesHtml = useCases.length
        ? `<ul>${useCases
            .map((useCase) => `<li>${useCase}</li>`)
            .join("")}</ul>`
        : "N/A";

      html += `<tr>
        <td>${code}</td>
        <td>${codes[code]}</td>
        <td>${useCasesHtml}</td>
      </tr>`;
    }

    html += "</table>";
  });

  html += "</div>";
  return html;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
