#!/usr/bin/env node

import {
  getStatusMeaning,
  getStatusCategory,
  isInformational,
  isSuccess,
  isRedirection,
  isClientError,
  isServerError,
  getStatusCodesByCategory,
  getStatusCodeUseCases,
  findStatusCodeByDescription
} from './index.mjs';

// ANSI colors
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m"
};

// Color by category
const categoryColors = {
  "Informational": colors.blue,
  "Success": colors.green,
  "Redirection": colors.cyan,
  "Client Error": colors.yellow,
  "Server Error": colors.red,
  "Unknown": colors.gray
};

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
${colors.bright}HTTP Status Meaning CLI${colors.reset}

Usage:
  http-status [options] <code or description>

Options:
  -h, --help          Display this help message
  -c, --category      Show only the category of the status code
  -u, --usecases      Show use cases for the status code
  -d, --details       Show detailed information (meaning, category, and use cases)
  -l, --language=XX   Use specified language (e.g., en, fr, es, de)

Examples:
  http-status 404                    # Get the meaning of 404 status code
  http-status "Not Found"            # Find status code by description
  http-status -c 200                 # Get the category of 200 status code
  http-status -u 429                 # Get use cases for 429 status code
  http-status -d 500                 # Get detailed information for 500
  http-status --language=fr 404      # Get the meaning in French
  http-status -l de -d 401           # Get detailed information in German
  `);
}

/**
 * Format code block with color based on category
 * @param {number} code 
 * @returns {string} Formatted code
 */
function formatCode(code) {
  const category = getStatusCategory(code);
  const color = categoryColors[category] || colors.reset;
  return `${color}${code}${colors.reset}`;
}

/**
 * Format category with color
 * @param {string} category 
 * @returns {string} Formatted category
 */
function formatCategory(category) {
  const color = categoryColors[category] || colors.reset;
  return `${color}${category}${colors.reset}`;
}

/**
 * Print status code information
 * @param {number|string} input - Status code or description
 * @param {Object} options - Display options
 */
function printStatusInfo(input, options) {
  const { showCategory, showUseCases, showDetails, language } = options;
  
  // Parse the input to a number if it's a valid number
  let code = parseInt(input, 10);
  
  // If the input is not a valid number, try to find by description
  if (isNaN(code)) {
    code = findStatusCodeByDescription(input);
    if (code === null) {
      console.error(`${colors.red}Error: Could not find a status code matching "${input}"${colors.reset}`);
      process.exit(1);
    }
  }
  
  // Default behavior: show meaning
  if (!showCategory && !showUseCases && !showDetails) {
    console.log(`${formatCode(code)}: ${getStatusMeaning(code, language)}`);
    return;
  }
  
  // Show only category
  if (showCategory && !showDetails) {
    const category = getStatusCategory(code, language);
    console.log(`${formatCode(code)}: ${formatCategory(category)}`);
    return;
  }
  
  // Show only use cases
  if (showUseCases && !showDetails) {
    const useCases = getStatusCodeUseCases(code);
    if (useCases.length === 0) {
      console.log(`${formatCode(code)}: ${colors.gray}No documented use cases${colors.reset}`);
      return;
    }
    
    console.log(`${formatCode(code)} ${colors.bright}Use Cases:${colors.reset}`);
    useCases.forEach(useCase => {
      console.log(`  ${colors.gray}•${colors.reset} ${useCase}`);
    });
    return;
  }
  
  // Show detailed information
  if (showDetails) {
    const meaning = getStatusMeaning(code, language);
    const category = getStatusCategory(code, language);
    const useCases = getStatusCodeUseCases(code);
    
    console.log(`${colors.bright}Status Code:${colors.reset} ${formatCode(code)}`);
    console.log(`${colors.bright}Meaning:${colors.reset} ${meaning}`);
    console.log(`${colors.bright}Category:${colors.reset} ${formatCategory(category)}`);
    
    if (useCases.length > 0) {
      console.log(`${colors.bright}Use Cases:${colors.reset}`);
      useCases.forEach(useCase => {
        console.log(`  ${colors.gray}•${colors.reset} ${useCase}`);
      });
    } else {
      console.log(`${colors.bright}Use Cases:${colors.reset} ${colors.gray}None documented${colors.reset}`);
    }
  }
}

// Parse command line arguments
function parseArguments(args) {
  const options = {
    showCategory: false,
    showUseCases: false,
    showDetails: false,
    language: 'en',
    input: null
  };
  
  // Skip the first two arguments (node and script path)
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-h' || arg === '--help') {
      printUsage();
      process.exit(0);
    } else if (arg === '-c' || arg === '--category') {
      options.showCategory = true;
    } else if (arg === '-u' || arg === '--usecases') {
      options.showUseCases = true;
    } else if (arg === '-d' || arg === '--details') {
      options.showDetails = true;
    } else if (arg.startsWith('-l=') || arg.startsWith('--language=')) {
      options.language = arg.split('=')[1];
    } else if (arg === '-l' || arg === '--language') {
      // Next argument should be the language code
      if (i + 1 < args.length) {
        options.language = args[++i];
      }
    } else if (!arg.startsWith('-')) {
      // Treat as input if not a flag
      options.input = arg;
    }
  }
  
  return options;
}

// Main function
function main() {
  const options = parseArguments(process.argv);
  
  if (!options.input) {
    console.error(`${colors.red}Error: Please provide a status code or description${colors.reset}`);
    printUsage();
    process.exit(1);
  }
  
  printStatusInfo(options.input, options);
}

// Run the script
main(); 