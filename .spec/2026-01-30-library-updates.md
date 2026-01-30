# Library Updates - January 30, 2026

## Overview

Updated all dependencies to their latest versions, including major version upgrades for React 19, Next.js 16, and Tailwind CSS 4. All builds and tests pass successfully.

## Major Framework Updates

| Package            | Previous Version | New Version | Change Type |
|--------------------|------------------|-------------|-------------|
| React              | 18.2.0           | 19.2.4      | Major       |
| React DOM          | 18.2.0           | 19.2.4      | Major       |
| Next.js            | 15.4.3           | 16.1.6      | Major       |
| Tailwind CSS       | 3.2.1            | 4.1.18      | Major       |
| ESLint             | 8.26.0           | 9.39.2      | Major       |
| ESLint Config Next | 13.0.2           | 16.1.6      | Major       |

## Other Dependency Updates

| Package                     | Previous Version | New Version | Change Type |
|-----------------------------|------------------|-------------|-------------|
| @headlessui/react           | 1.7.8            | 2.2.9       | Major       |
| @mapbox/rehype-prism        | 0.8.0            | 0.9.0       | Minor       |
| @tailwindcss/typography     | 0.5.4            | 0.5.19      | Patch       |
| autoprefixer                | 10.4.12          | 10.4.23     | Patch       |
| clsx                        | 1.2.1            | 2.1.1       | Major       |
| fast-glob                   | 3.2.12           | 3.3.3       | Minor       |
| feed                        | 4.2.2            | 5.2.0       | Major       |
| focus-visible               | 5.2.0            | 5.2.1       | Patch       |
| postcss-focus-visible       | 6.0.4            | 11.0.0      | Major       |
| Prettier                    | 2.7.1            | 3.8.1       | Major       |
| prettier-plugin-tailwindcss | 0.1.11           | 0.7.2       | Minor       |

## New Dependencies Added

- **@tailwindcss/postcss** (^4.1.18) - Required for Tailwind CSS 4 PostCSS integration

## Configuration Changes

### 1. package.json

Updated build script to use webpack mode:

```json
"scripts": {
  "build": "next build --webpack"
}
```

**Reason:** Next.js 16 uses Turbopack by default, but `next-plugin-yaml` requires webpack loaders which aren't yet supported in Turbopack.

### 2. postcss.config.js

Changed Tailwind CSS plugin:

```javascript
// Before
plugins: {
  tailwindcss: {},
  // ...
}

// After
plugins: {
  '@tailwindcss/postcss': {},
  // ...
}
```

**Reason:** Tailwind CSS 4 moved the PostCSS plugin to a separate package.

### 3. src/styles/tailwind.css

Simplified Tailwind imports:

```css
/* Before */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import './prism.css';
@import 'tailwindcss/utilities';

/* After */
@import "tailwindcss";
@import './prism.css';
```

**Reason:** Tailwind CSS 4 uses a single import statement instead of separate base/components/utilities imports.

### 4. next.config.mjs

Added empty Turbopack configuration:

```javascript
turbopack: {},
```

**Reason:** Silences warnings in development mode when using webpack config from `next-plugin-yaml`.

## Build Verification

### Development Server
```bash
npm run dev
```
- ✅ Starts successfully on http://localhost:3000
- ✅ Turbopack enabled with no warnings
- ✅ Hot reload working correctly

### Production Build
```bash
npm run build
```
- ✅ All 56 pages generated successfully
- ✅ Static export to `out/` directory completed
- ✅ Build time: ~325ms for page generation

### Generated Routes
- 2 articles
- 31 backlog items
- 4 developer guides (3 tags: elixir, css, ruby)
- 7 curated lists
- Static pages: home, about, work, 404

## Security Audit

### Current Vulnerabilities
- 3 moderate severity vulnerabilities in `prismjs` dependency
- Comes from `@mapbox/rehype-prism` package
- Vulnerability: DOM Clobbering (GHSA-x7hr-w5r2-h6wg)
- **Status:** No fix available
- **Risk Assessment:** Low risk for static site with controlled content

## Breaking Changes & Migration Notes

### React 19
- No code changes required for this codebase
- All existing patterns compatible with React 19

### Next.js 16
- Default bundler changed from webpack to Turbopack
- Using `--webpack` flag in build script for YAML loader compatibility
- Static export mode continues to work as expected

### Tailwind CSS 4
- CSS import syntax changed (handled)
- PostCSS plugin moved to separate package (installed)
- All existing utility classes remain compatible

### ESLint 9
- No configuration changes required
- `eslint-config-next` 16.1.6 provides compatible settings

## Node.js Version

The project uses asdf for Node.js version management:

```bash
asdf set nodejs 22.14.0
```

Stored in `.tool-versions` file.

## Recommendations

1. **Monitor Turbopack support** - Once Turbopack supports webpack loaders or native YAML imports, remove the `--webpack` flag from build script for faster builds
2. **Consider prismjs alternatives** - If security becomes a concern, evaluate alternatives like Shiki or Highlight.js
3. **Test thoroughly** - While no breaking changes were detected in automated tests, manual testing of all features is recommended
4. **Update CLAUDE.md** - Consider updating the commands section if the `--webpack` flag becomes permanent

## Related Files Modified

- `package.json` - Updated dependencies and build script
- `package-lock.json` - Updated lock file with new versions
- `postcss.config.js` - Changed Tailwind plugin
- `next.config.mjs` - Added turbopack config
- `src/styles/tailwind.css` - Simplified imports
- `.tool-versions` - Set Node.js version to 22.14.0

## Next Steps

- ✅ All dependencies updated
- ✅ Development server verified
- ✅ Production build verified
- ✅ Static export verified
- ⏭️ Deploy updated site to verify in production environment
- ⏭️ Monitor for any runtime issues with new dependency versions
