'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const libraryPackagePath = path.join(
  __dirname,
  '..',
  'projects',
  'ng2-date-picker',
  'package.json',
);
const libraryPackage = JSON.parse(fs.readFileSync(libraryPackagePath, 'utf8'));
const tag = `v${libraryPackage.version}`;
const asset = path.join(__dirname, '..', `ng2-date-picker-${libraryPackage.version}.tgz`);

if (!fs.existsSync(asset)) {
  console.error(`Expected package tarball was not found: ${asset}`);
  process.exit(1);
}

function runGh(args, options = {}) {
  execFileSync('gh', args, {
    stdio: 'inherit',
    ...options,
  });
}

let releaseExists = true;

try {
  execFileSync('gh', ['release', 'view', tag], { stdio: 'ignore' });
} catch {
  releaseExists = false;
}

if (releaseExists) {
  runGh(['release', 'upload', tag, asset, '--clobber']);
  console.log(`Updated GitHub release ${tag} with ${path.basename(asset)}`);
} else {
  runGh([
    'release',
    'create',
    tag,
    asset,
    '--verify-tag',
    '--title',
    tag,
    '--generate-notes',
  ]);
  console.log(`Created GitHub release ${tag} with ${path.basename(asset)}`);
}
