#!/usr/bin/env node

/**
 * Markdown formatter script for Claude Code subagents
 * Uses the same Prettier and textlint configuration as the sw-alt repository
 * 
 * Usage: format-markdown.js <file.md>
 * Or pipe content: echo "content" | format-markdown.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Configuration that matches sw-alt repository
const PRETTIER_CONFIG = {
  printWidth: 80,
  singleQuote: true,
  proseWrap: "always"
};

const TEXTLINT_CONFIG = {
  rules: {
    "preset-ja-spacing": {
      "ja-no-space-between-full-width": true,
      "ja-space-between-half-and-full-width": {
        "space": "never"
      }
    }
  }
};

// Check if required packages are installed globally
function checkDependencies() {
  const requiredPackages = [
    'prettier',
    'textlint',
    'textlint-rule-preset-ja-spacing'
  ];

  const missingPackages = [];
  
  for (const pkg of requiredPackages) {
    try {
      execSync(`npm list -g ${pkg} --depth=0`, { stdio: 'ignore' });
    } catch {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.error('Missing required packages. Please install them globally:');
    console.error(`npm install -g ${missingPackages.join(' ')}`);
    process.exit(1);
  }
}

// Format markdown content
async function formatMarkdown(content, filePath = 'temp.md') {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-format-'));
  const tempFile = path.join(tempDir, path.basename(filePath));
  const prettierConfigFile = path.join(tempDir, '.prettierrc');
  const textlintConfigFile = path.join(tempDir, '.textlintrc');

  try {
    // Write config files
    fs.writeFileSync(prettierConfigFile, JSON.stringify(PRETTIER_CONFIG, null, 2));
    fs.writeFileSync(textlintConfigFile, JSON.stringify(TEXTLINT_CONFIG, null, 2));
    
    // Write content to temp file
    fs.writeFileSync(tempFile, content);

    // Run prettier
    execSync(`prettier --write --config ${prettierConfigFile} ${tempFile}`, {
      cwd: tempDir,
      stdio: 'ignore'
    });

    // Run textlint
    execSync(`textlint --fix --config ${textlintConfigFile} ${tempFile}`, {
      cwd: tempDir,
      stdio: 'ignore'
    });

    // Read formatted content
    let formatted = fs.readFileSync(tempFile, 'utf8');
    
    // Post-processing: Remove empty lines between list items
    // This fixes the issue where Prettier adds blank lines between list items
    formatted = formatted.replace(/^(-\s+.+)\n\n(?=-\s+)/gm, '$1\n');
    
    // Cleanup
    fs.rmSync(tempDir, { recursive: true, force: true });
    
    return formatted;
  } catch (error) {
    // Cleanup on error
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw error;
  }
}

// Main function
async function main() {
  checkDependencies();

  let content;
  let outputFile;

  // Check if input is from stdin or file argument
  if (process.argv.length > 2) {
    // File argument provided
    const inputFile = process.argv[2];
    if (!fs.existsSync(inputFile)) {
      console.error(`File not found: ${inputFile}`);
      process.exit(1);
    }
    content = fs.readFileSync(inputFile, 'utf8');
    outputFile = inputFile;
  } else if (!process.stdin.isTTY) {
    // Read from stdin
    content = fs.readFileSync(0, 'utf8');
  } else {
    console.error('Usage: format-markdown.js <file.md>');
    console.error('Or pipe content: echo "content" | format-markdown.js');
    process.exit(1);
  }

  try {
    const formatted = await formatMarkdown(content, outputFile || 'stdin.md');
    
    if (outputFile) {
      // Write back to file
      fs.writeFileSync(outputFile, formatted);
      console.log(`Formatted: ${outputFile}`);
    } else {
      // Output to stdout
      process.stdout.write(formatted);
    }
  } catch (error) {
    console.error('Error formatting markdown:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for use as module
module.exports = { formatMarkdown, PRETTIER_CONFIG, TEXTLINT_CONFIG };