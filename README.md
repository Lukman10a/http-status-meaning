# HTTP Status Meaning

A simple yet comprehensive npm package that provides human-readable meanings for HTTP status codes.

## Installation

```bash
npm install http-status-meaning
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

MIT
