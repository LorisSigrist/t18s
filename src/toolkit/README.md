# t18s Toolkit
These are the t18s Devtools running in the browser.
They integrate with the core t18s plugin to provide a full suite of tools for developers to use when building their own t18s plugins.

## Structure
- `index.js` - The main entry point for the toolkit. It's it's own vite-plugin.
- `runtime/*` - Files that can be imported from the browser using the prefix `virtual:t18s-toolkit:/filename`
