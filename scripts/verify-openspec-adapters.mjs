import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const expectedActions = ['apply', 'archive', 'explore', 'propose'];
const platforms = [
  {
    name: 'Claude', roots: ['.claude/commands', '.claude/skills'], separator: ':',
    commandRoot: '.claude/commands/opsx', commandPattern: /^([a-z-]+)\.md$/,
  },
  { name: 'Codex', roots: ['.codex/skills'], separator: null, commandRoot: null, commandPattern: null },
  {
    name: 'Cursor', roots: ['.cursor/commands', '.cursor/skills'], separator: '-',
    commandRoot: '.cursor/commands', commandPattern: /^opsx-([a-z-]+)\.md$/,
  },
  {
    name: 'GitHub', roots: ['.github/prompts', '.github/skills'], separator: '-',
    commandRoot: '.github/prompts', commandPattern: /^opsx-([a-z-]+)\.prompt\.md$/,
  },
  {
    name: 'OpenCode', roots: ['.opencode/command', '.opencode/skills'], separator: '-',
    commandRoot: '.opencode/command', commandPattern: /^opsx-([a-z-]+)\.md$/,
  },
];
const archiveFiles = [
  '.claude/commands/opsx/archive.md',
  '.claude/skills/openspec-archive-change/SKILL.md',
  '.codex/skills/openspec-archive-change/SKILL.md',
  '.cursor/commands/opsx-archive.md',
  '.cursor/skills/openspec-archive-change/SKILL.md',
  '.github/prompts/opsx-archive.prompt.md',
  '.github/skills/openspec-archive-change/SKILL.md',
  '.opencode/command/opsx-archive.md',
  '.opencode/skills/openspec-archive-change/SKILL.md',
];

const failures = [];

async function filesUnder(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(relativePath));
    else if (entry.isFile()) files.push(relativePath);
  }
  return files;
}

for (const platform of platforms) {
  const files = (await Promise.all(platform.roots.map(filesUnder))).flat();
  const availableActions = new Set();
  if (platform.commandRoot) {
    const entries = await readdir(path.join(root, platform.commandRoot), { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const match = entry.name.match(platform.commandPattern);
      if (match) availableActions.add(match[1]);
    }
  }

  const expected = platform.commandRoot ? expectedActions : [];
  const actual = [...availableActions].sort();
  if (actual.join(',') !== [...expected].sort().join(',')) {
    failures.push(`${platform.name}: expected commands [${expected.join(', ')}], found [${actual.join(', ')}]`);
  }

  for (const file of files) {
    const absolute = path.join(root, file);
    const metadata = await stat(absolute);
    const content = await readFile(absolute, 'utf8');
    if (metadata.size === 0 || content.trim() === '') failures.push(`${file}: empty file`);

    for (const match of content.matchAll(/\/opsx([:-])([a-z-]+)/g)) {
      const [, separator, action] = match;
      if (separator !== platform.separator || !availableActions.has(action)) {
        failures.push(`${file}: unshipped command ${match[0]}`);
      }
    }

    if (/openspec-continue-change|\/opsx(?::|-)continue/.test(content)) {
      failures.push(`${file}: references an unshipped continue workflow`);
    }
    if (/\/Users\/|-----BEGIN [A-Z ]*PRIVATE KEY-----|\bghp_[A-Za-z0-9]+/.test(content)) {
      failures.push(`${file}: contains local or secret-like data`);
    }
  }
}

for (const file of archiveFiles) {
  const content = await readFile(path.join(root, file), 'utf8');
  const required = [
    ['terminal cancellation', '**Cancel**: Stop immediately'],
    ['normal CLI archive', 'openspec archive "<name>" --yes'],
    ['explicit no-sync archive', 'openspec archive "<name>" --skip-specs --yes'],
    ['CLI failure boundary', 'Do not move files manually'],
  ];
  for (const [label, fragment] of required) {
    if (!content.includes(fragment)) failures.push(`${file}: missing ${label}`);
  }
  if (/Task tool|openspec-sync-specs|mkdir\s+-p|\bmv\s+/.test(content)) {
    failures.push(`${file}: contains a manual archive fallback`);
  }
}

const config = await readFile(path.join(root, 'openspec/config.yaml'), 'utf8');
if (/\/Users\/|-----BEGIN [A-Z ]*PRIVATE KEY-----|\bghp_[A-Za-z0-9]+/.test(config)) {
  failures.push('openspec/config.yaml: contains local or secret-like data');
}

if (failures.length > 0) {
  console.error(`OpenSpec adapter verification failed (${failures.length}):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`OpenSpec adapter verification passed (${archiveFiles.length} archive variants, ${platforms.length} platforms).`);
