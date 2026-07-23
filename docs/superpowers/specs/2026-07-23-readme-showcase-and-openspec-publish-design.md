# README Showcase and OpenSpec Publishing Design

## Goal

Publish an accurate, maintainable project README with three reproducible product screenshots, then share the repository's cross-tool OpenSpec workflows without exposing machine-local configuration.

## Current State

- The product is a static Vite application with no backend, API, or database.
- The manifest dynamically loads 100 LeetCode problem modules across 17 categories.
- The visualization engine synchronizes algorithm steps with source-line highlighting, controls, status panels, and data-structure renderers.
- `main` and `origin/main` currently point to the same commit.
- The current untracked files are OpenSpec/agent workflow files plus machine-local artifacts.
- GitHub Pages deploys `dist/` after every push to `main`.

## Scope

### Included

- A new root `README.md`.
- Three real PNG screenshots under `docs/screenshots/`:
  - desktop overview;
  - complex data-structure visualization;
  - mobile responsive view.
- Reusable OpenSpec integrations for Claude, Codex, Cursor, GitHub, and OpenCode.
- `openspec/config.yaml`.
- `.gitignore` rules for machine-local and temporary files.

### Excluded

- Product behavior changes.
- Fixes for the separately identified visualization lifecycle, routing race, and keyboard-event issues.
- `.claude/settings.local.json`.
- `.DS_Store` files.
- `.superpowers/` brainstorming artifacts.
- Generated `dist/` output and dependency directories.

## README Structure

The README will contain:

1. Project title, concise positioning, and the GitHub Pages demo link.
2. A desktop overview screenshot as the primary visual.
3. A feature summary grounded in verified behavior.
4. Two supporting screenshots for a complex visualization and mobile layout.
5. Architecture and interaction-flow documentation.
6. Local development and production build commands.
7. Repository structure and contribution guidance.

The README will not claim backend capabilities or UI features that are not currently exposed.

## Screenshot Production

Screenshots will be generated from the local application with Playwright at fixed viewport sizes. Routes, inputs, and execution steps will be selected deterministically so captures are reproducible.

- Desktop overview: show navigation, source code, visualization state, and playback controls.
- Complex visualization: use a tree or backtracking problem with a meaningful intermediate state.
- Mobile view: demonstrate responsive content and navigation without overlap.

PNG is preferred over GIF because it preserves readability, keeps repository size predictable, and avoids expensive README playback downloads.

## Runtime Architecture Documentation

There is no backend implementation. The browser loads the static Vite bundle, the hash router resolves a manifest slug, and the manifest dynamically imports the selected problem configuration. The visualization engine owns the current execution state and updates the code panel, renderer, explanations, test cases, and controls. Local browser storage supports client-side preferences and progress where implemented.

## OpenSpec Publishing Boundary

Reusable workflow definitions will be published for the supported tools. Machine-specific settings and transient files will be ignored. The OpenSpec material will be committed separately from the README so reviewers can assess documentation and agent workflow changes independently.

## Validation

- Run `npm run build` successfully.
- Verify the application in desktop and mobile browser viewports.
- Check screenshot dimensions, content framing, text readability, and absence of overlap.
- Check browser console output during representative flows.
- Verify all README image paths resolve from GitHub Markdown.
- Review the staged file list before each commit.
- Push only to the configured `origin` repository.
- Confirm the GitHub Pages workflow succeeds after push when authentication permits.

## Commit Strategy

1. Commit this approved design document.
2. Commit README and screenshot assets together.
3. Commit reusable OpenSpec workflows and ignore rules separately.
4. Push the resulting commits to the existing remote repository.

## Known Risks

- The local GitHub CLI token is invalid. Git push may still work through another credential helper; otherwise re-authentication is required.
- Product code has known lifecycle and routing issues that are deliberately outside this documentation-focused scope.
- Multi-tool OpenSpec definitions duplicate some workflow content by necessity. Their separation from product code makes later consolidation or removal straightforward.
