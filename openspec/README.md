# OpenSpec Agent Adapters

The command and skill files under `.claude/`, `.codex/`, `.cursor/`,
`.github/`, and `.opencode/` form one generated distribution. The repository
pins `@fission-ai/openspec` to `1.2.0`; use the project-local binary so a
different global version cannot silently rewrite the adapters.

Regenerate the distribution from the repository root with:

```bash
npx openspec update --force
```

Regeneration may restore upstream templates that do not satisfy this
repository's cross-tool safety rules. Review the diff, preserve the validated
archive and command semantics, then run:

```bash
npm run openspec:check
```

The check is the maintenance contract for this generated distribution. It
validates platform-specific command names, rejects references to workflows that
are not shipped, enforces terminal cancellation and CLI-owned archive behavior,
and scans reusable files for empty content or local and secret-like data. CI
runs the same command whenever an adapter, OpenSpec config, package lock, or
validator changes.
