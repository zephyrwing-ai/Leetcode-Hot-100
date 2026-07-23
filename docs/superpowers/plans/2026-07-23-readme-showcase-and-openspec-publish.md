# README Showcase and OpenSpec Publishing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a verified README with three real product screenshots and the reusable OpenSpec workflows to the existing GitHub repository.

**Architecture:** Keep product runtime code unchanged. Capture deterministic browser states into documentation assets, describe the existing manifest-to-visualization data flow accurately, and isolate reusable agent workflows from machine-local settings through explicit ignore rules and separate commits.

**Tech Stack:** Vite 8, vanilla JavaScript, CSS, Playwright CLI, Git, GitHub Pages, Markdown, OpenSpec workflow files.

---

## File Map

- Create `README.md`: public project overview, screenshots, verified capabilities, architecture, and development instructions.
- Create `docs/screenshots/desktop-overview.png`: desktop evidence of navigation, code highlighting, state rendering, and controls.
- Create `docs/screenshots/n-queens.png`: complex backtracking visualization at a meaningful intermediate step.
- Create `docs/screenshots/mobile-view.png`: responsive mobile evidence with navigation exposed.
- Modify `.gitignore`: exclude local settings, macOS metadata, visual brainstorming artifacts, generated output, and dependencies.
- Add `.claude/commands/opsx/*.md` and `.claude/skills/*/SKILL.md`: reusable Claude OpenSpec commands and skills.
- Add `.codex/skills/*/SKILL.md`: reusable Codex OpenSpec skills.
- Add `.cursor/commands/*.md` and `.cursor/skills/*/SKILL.md`: reusable Cursor OpenSpec commands and skills.
- Add `.github/prompts/*.prompt.md` and `.github/skills/*/SKILL.md`: reusable GitHub OpenSpec prompts and skills.
- Add `.opencode/command/*.md` and `.opencode/skills/*/SKILL.md`: reusable OpenCode commands and skills.
- Add `openspec/config.yaml`: repository OpenSpec configuration.

### Task 1: Establish the Public File Boundary

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add explicit ignore rules**

Set `.gitignore` to:

```gitignore
node_modules/
dist/

# Machine-local and generated files
.DS_Store
.claude/settings.local.json
.superpowers/
```

- [ ] **Step 2: Verify local artifacts are ignored**

Run:

```bash
git check-ignore -v openspec/.DS_Store .claude/settings.local.json .superpowers/
```

Expected: all three paths match an explicit `.gitignore` rule.

- [ ] **Step 3: Verify reusable workflow files remain visible**

Run:

```bash
git status --short
```

Expected: reusable `.claude`, `.codex`, `.cursor`, `.github`, `.opencode`, and `openspec/config.yaml` paths remain untracked; local artifacts do not appear.

### Task 2: Build and Capture Product Evidence

**Files:**
- Create: `docs/screenshots/desktop-overview.png`
- Create: `docs/screenshots/n-queens.png`
- Create: `docs/screenshots/mobile-view.png`

- [ ] **Step 1: Verify the production build**

Run:

```bash
npm run build
```

Expected: Vite exits successfully and emits `dist/` without import errors.

- [ ] **Step 2: Start the local Vite server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints a reachable localhost URL and keeps running.

- [ ] **Step 3: Capture the desktop overview**

Use Playwright CLI with a 1440 x 960 viewport. Open:

```text
http://127.0.0.1:<vite-port>/Leetcode-Hot-100/#hash/two-sum
```

Expand the `Hash` navigation section and advance to a state where the active code line, hash-map visualization, explanation, and controls are all populated. Capture the full viewport as `docs/screenshots/desktop-overview.png`.

Expected: the screenshot contains the brand, expanded problem navigation, highlighted source line, visualization state, step counter, and playback controls with no overlap.

- [ ] **Step 4: Capture the complex visualization**

Open:

```text
http://127.0.0.1:<vite-port>/Leetcode-Hot-100/#backtracking/n-queens
```

Advance to step 8, where four queens form the first valid solution. Capture the full viewport as `docs/screenshots/n-queens.png` at 1440 x 960.

Expected: the board, queens, highlighted code, phase, explanation, result state, and controls are readable.

- [ ] **Step 5: Capture the responsive view**

Set a 390 x 844 viewport, open the Two Sum route, click the hamburger button to expose navigation, and capture `docs/screenshots/mobile-view.png`.

Expected: the mobile sidebar and main visualization are framed coherently with no clipped labels or incoherent overlap.

- [ ] **Step 6: Inspect image dimensions and pixels**

Run:

```bash
sips -g pixelWidth -g pixelHeight docs/screenshots/*.png
```

Expected: both desktop images are 1440 x 960 and the mobile image is 390 x 844. Visually inspect every PNG and reject blank, loading, or poorly framed captures.

### Task 3: Write an Evidence-Based README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create the README structure**

Write these sections in concise Chinese:

```markdown
# LeetCode Hot 100 Visualization

Interactive execution visualizations for all 100 LeetCode Hot 100 problems.

[在线体验](https://zephyrwing-ai.github.io/Leetcode-Hot-100/)

![桌面端算法执行总览](docs/screenshots/desktop-overview.png)

## 项目特点
## 可视化场景
## 运行架构
## 本地开发
## 项目结构
## OpenSpec 工作流
```

Use the verified facts: 100 modules, 17 categories, dynamic problem imports, Python line highlighting, synchronized render state, multiple test cases, previous/next/automatic playback controls, 0.5x/1x/2x speed, search, collapsible categories, local progress, hash routes, resizable desktop panels, and responsive navigation.

- [ ] **Step 2: Add the supporting screenshots**

Place the N Queens image under `## 可视化场景` with a description of backtracking state, and place the mobile image beside text describing responsive navigation. Use relative paths so GitHub renders the assets from the repository.

- [ ] **Step 3: Document runtime architecture accurately**

Describe this client-side flow:

```text
Hash Router -> Problem Manifest -> Dynamic Import -> Visualization Engine
                                             |-> Code Panel
                                             |-> State Renderer
                                             |-> Playback Controls
                                             `-> localStorage Progress
```

State explicitly that the project has no backend service, API, or database.

- [ ] **Step 4: Document exact development commands**

Include Node.js `>=20.19`, then:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

- [ ] **Step 5: Validate README references and claims**

Run:

```bash
rg -n 'docs/screenshots/(desktop-overview|n-queens|mobile-view)\.png' README.md
test "$(rg -c "slug:" src/problems/manifest.js)" -eq 100
test -f docs/screenshots/desktop-overview.png
test -f docs/screenshots/n-queens.png
test -f docs/screenshots/mobile-view.png
```

Expected: three image references, 100 manifest entries, and all three files exist.

- [ ] **Step 6: Commit the showcase**

Run:

```bash
git add README.md docs/screenshots
git commit -m "docs: add project showcase and screenshots"
```

Expected: only README and three screenshot assets are included in this commit.

### Task 4: Publish Reusable OpenSpec Workflows

**Files:**
- Modify: `.gitignore`
- Add: `.claude/commands/opsx/*.md`
- Add: `.claude/skills/*/SKILL.md`
- Add: `.codex/skills/*/SKILL.md`
- Add: `.cursor/commands/*.md`
- Add: `.cursor/skills/*/SKILL.md`
- Add: `.github/prompts/*.prompt.md`
- Add: `.github/skills/*/SKILL.md`
- Add: `.opencode/command/*.md`
- Add: `.opencode/skills/*/SKILL.md`
- Add: `openspec/config.yaml`

- [ ] **Step 1: Scan the reusable files for local leakage**

Run:

```bash
rg -n '/Users/|settings\.local|\.DS_Store|BEGIN .*PRIVATE KEY|ghp_' \
  .claude/commands .claude/skills .codex .cursor .github/prompts \
  .github/skills .opencode openspec/config.yaml
```

Expected: no machine-local paths, private keys, tokens, or references to excluded files.

- [ ] **Step 2: Verify every workflow file is nonempty**

Run:

```bash
find .claude/commands .claude/skills .codex .cursor .github/prompts \
  .github/skills .opencode -type f -size 0 -print
```

Expected: no output.

- [ ] **Step 3: Stage only the reusable configuration**

Run:

```bash
git add .gitignore .claude/commands .claude/skills .codex .cursor \
  .github/prompts .github/skills .opencode openspec/config.yaml
git diff --cached --name-status
```

Expected: no `.claude/settings.local.json`, `.DS_Store`, `.superpowers`, `dist`, or `node_modules` entry.

- [ ] **Step 4: Commit the reusable workflows**

Run:

```bash
git commit -m "chore: share OpenSpec agent workflows"
```

Expected: the commit contains only ignore rules and reusable OpenSpec integrations.

### Task 5: Final Verification and Push

**Files:**
- Verify: all files committed by Tasks 1-4

- [ ] **Step 1: Verify repository state and commit boundaries**

Run:

```bash
git status --short --branch
git log --oneline --decorate -4
git show --stat --oneline HEAD
git show --stat --oneline HEAD~1
```

Expected: `main` is ahead of `origin/main`; excluded local files are ignored; README assets and OpenSpec workflows are in separate commits.

- [ ] **Step 2: Re-run the production build**

Run:

```bash
npm run build
```

Expected: successful Vite production build.

- [ ] **Step 3: Push to the existing remote**

Run:

```bash
git remote get-url origin
git push origin main
```

Expected: remote is `https://github.com/zephyrwing-ai/Leetcode-Hot-100` and push succeeds. If authentication fails, stop and request GitHub re-authentication without changing the remote.

- [ ] **Step 4: Verify deployment**

Check the latest GitHub Actions run for the `Deploy to GitHub Pages` workflow and open:

```text
https://zephyrwing-ai.github.io/Leetcode-Hot-100/
```

Expected: the workflow succeeds and the deployed application still loads. README-only and workflow-document changes do not alter runtime behavior.
