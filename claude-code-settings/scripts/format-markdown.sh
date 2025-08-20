#!/bin/bash

# Markdown formatter wrapper for Claude Code
# Uses local packages in ~/.claude/local/markdown-formatter
# Configuration matches sw-alt repository

# Path to the local markdown formatter
FORMATTER_DIR="$HOME/.claude/local/markdown-formatter"
FORMATTER_SCRIPT="$FORMATTER_DIR/format-markdown.js"

# Check if formatter is installed
if [ ! -f "$FORMATTER_SCRIPT" ]; then
    echo "Error: Markdown formatter not found at $FORMATTER_SCRIPT"
    echo "Please ensure ~/.claude/local/markdown-formatter is properly set up"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "$FORMATTER_DIR/node_modules" ]; then
    echo "Error: Dependencies not installed in $FORMATTER_DIR"
    echo "Run: cd $FORMATTER_DIR && npm install"
    exit 1
fi

# Run the formatter using node (works with any node version via nodenv)
node "$FORMATTER_SCRIPT" "$@"