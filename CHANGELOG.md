# Changelog

All notable changes to this package. Versions follow semver and are published as git tags (`vX.Y.Z`).

## 0.1.0 (2026-10-22)

- First release.
- Tokens (`tokens.css`, scoped to `.ds`) and the 23 panel components copied from the nynt repo (`src/lib/components/ui`).
- New: `Wordmark` and `PoweredBy` Svelte components.
- New: framework agnostic classes (`components.css`), `motion.css` and `nomotion.css`, `fonts.css` (Outfit Variable, DM Mono).
- New: React bindings in `nynt-ui/react` (Button, IconButton, Card, Pill, IconChip, Field, Message, Icon, Wordmark, PoweredBy).
- Icon paths live in `icons.ts`, shared by Svelte and React; added `image`, `trash` and `grip` glyphs.
