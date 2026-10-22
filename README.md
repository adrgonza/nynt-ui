# nynt-ui

The NYNT design system as a package: design tokens scoped to `.ds`, Svelte 5 components, framework agnostic CSS classes and thin React bindings. Pale grey canvas, one large white rounded frame, Outfit, the bynure blue accent (`#4a8bff`, tint `#f3f7ff`, deep `#2f6fe0`).

Everything is scoped to an element with the class `ds`, so a site can use it for a private area (an admin or `/manage` page) without touching its public pages.

## Install

Install from a git tag (no registry, no token needed, the repo is public):

```sh
npm install github:adrgonza/nynt-ui#v0.1.0
```

`package.json` then reads `"nynt-ui": "github:adrgonza/nynt-ui#v0.1.0"`. The built `dist/` is committed, so nothing is compiled on install.

## Import the styles

```js
import 'nynt-ui/css'; // fonts + tokens + component classes + quiet colour transitions
```

Or pick files:

| Entry | What it holds |
| --- | --- |
| `nynt-ui/fonts.css` | Outfit Variable and DM Mono (via Fontsource, bundled locally, no external requests) |
| `nynt-ui/tokens.css` | All `--ds-*` variables, scoped to `.ds` |
| `nynt-ui/components.css` | Framework agnostic classes: `ds-canvas`, `ds-frame`, `ds-gate`, `ds-card`, `ds-btn`, `ds-ib`, `ds-pill`, `ds-field`, `ds-label`, `ds-row`, `ds-powered`... |
| `nynt-ui/motion.css` | Short colour transitions on controls |
| `nynt-ui/nomotion.css` | Turns every transition and animation off inside `.ds` (use instead of `motion.css` on sites with no motion) |

Wrap the private UI in `class="ds"`.

## Svelte

```svelte
<script>
	import 'nynt-ui/fonts.css';
	import 'nynt-ui/tokens.css';
	import { Card, Button, Input, PoweredBy } from 'nynt-ui';
</script>

<div class="ds">
	<Card variant="surface" pad="lg">
		<Input label="Contraseña" type="password" size="lg" />
		<Button variant="primary">Entrar</Button>
	</Card>
	<PoweredBy />
</div>
```

Components: BarChart, Button, Card, CategoryTile, Icon, IconButton, IconChip, Input, Kbd, LineChart, ListRow, Meter, Pill, Popover, PoweredBy, Ring, SearchInput, SectionHeader, Segmented, Select, Shell, Sidebar, StatTile, StatusDot, Wordmark. Svelte components carry their own scoped styles; they only need `tokens.css` (and the fonts).

## React

```jsx
import 'nynt-ui/css';
import { Button, Card, Field, IconButton, Pill, PoweredBy } from 'nynt-ui/react';

<main className="ds ds-gate">
	<Card variant="surface" pad="lg" className="ds-door">
		<Field label="Mot de passe"><input className="ds-field lg" type="password" /></Field>
		<Button variant="primary" size="lg" block>Entrer</Button>
	</Card>
	<footer className="ds-foot"><PoweredBy /></footer>
</main>;
```

React is an optional peer dependency; Svelte apps never load it and React apps never load Svelte.

## Powered by NYNT

`PoweredBy` (Svelte and React) is a small DM Mono, uppercase, 12px link to https://nynt.ch. Use it only in private areas, never on a client's public pages.

## Develop

```sh
npm install
npm run check   # svelte-check
npm run build   # svelte-package into dist/, then publint
```

The components are the source of truth here. They started as a copy of `src/lib/components/ui` in the nynt repo.

## Release

Semver tags, `vMAJOR.MINOR.PATCH`:

1. Change `src/lib`, run `npm run check` and `npm run build`.
2. Bump `version` in `package.json`, add an entry to `CHANGELOG.md`.
3. Commit, including `dist/`.
4. Tag and push: `git tag v0.2.0 && git push origin main --tags`.

Patch for fixes that do not change the look of a page, minor for new components or visual changes that are backwards compatible, major when a class, prop or token is renamed or removed.

Consumers pin a tag. Each client repo has a Dependabot config (`.github/dependabot.yml`, npm ecosystem, `allow: nynt-ui`) that opens a PR when a newer tag exists; the PR gets a Vercel preview like any other.
