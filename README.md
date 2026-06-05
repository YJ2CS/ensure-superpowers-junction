# ensure-superpowers-junction

OpenCode plugin that automatically creates a Windows junction to the superpowers skills directory at startup.

## Problem

When you install superpowers skills via OpenCode, they're stored in a deep cache path:

```
~/.cache/opencode/packages/superpowers@git+https_/github.com/obra/superpowers.git/node_modules/superpowers/skills
```

This path is hard to remember and access.

## Solution

This plugin creates a junction (Windows symbolic link) at:

```
~/.config/opencode/skills/superpowers
```

Pointing to the cached superpowers skills directory. Now you can easily browse and reference skill files.

## Installation

### Option 1: Install from GitHub

```bash
# Navigate to your OpenCode plugins directory
cd ~/.config/opencode/plugins

# Clone this repository
git clone https://github.com/YJ2CS/ensure-superpowers-junction.git

# Or download and extract manually
```

### Option 2: Manual Installation

1. Copy `ensure-superpowers-junction.js` to your OpenCode plugins directory:
   ```
   ~/.config/opencode/plugins/ensure-superpowers-junction.js
   ```

2. Restart OpenCode

## How It Works

On OpenCode startup (before skills are loaded), the plugin:

1. Checks if the superpowers cache directory exists
2. Checks if the junction already exists
3. If the cache exists but junction doesn't → creates the junction
4. Logs the result to console

## Requirements

- Windows OS (uses `fs.symlinkSync` with `'junction'` type)
- OpenCode with superpowers package installed
- Node.js (for the plugin runtime)

## File Structure

```
ensure-superpowers-junction/
├── .opencode/
│   └── plugins/
│       └── ensure-superpowers-junction.js   # Plugin source
├── package.json
└── README.md
```

## Development

```bash
# Clone the repo
git clone https://github.com/YJ2CS/ensure-superpowers-junction.git

# Make your changes to .opencode/plugins/ensure-superpowers-junction.js

# Test by restarting OpenCode
```

## AI Auto-Install

Copy this prompt to OpenCode AI for automatic installation:

```
Install the ensure-superpowers-junction plugin.

Steps:
1. Clone https://github.com/YJ2CS/ensure-superpowers-junction.git to ~/.config/opencode/plugins/ensure-superpowers-junction
2. Verify the plugin file exists at ~/.config/opencode/plugins/ensure-superpowers-junction/.opencode/plugins/ensure-superpowers-junction.js
3. Restart OpenCode to activate the plugin

Expected result: ~/.config/opencode/skills/superpowers junction created pointing to superpowers cache directory
```

## License

MIT
