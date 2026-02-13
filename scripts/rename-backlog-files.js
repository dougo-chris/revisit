const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

// Configuration
const BACKLOG_DIR = path.join(__dirname, '../content/_backlog');

// Helper function to check if filename already follows YYYY-MM-DD format
function hasDatePrefix(filename) {
  return /^\d{4}-\d{2}-\d{2}-/.test(filename);
}

// Helper function to get file modification date as YYYY-MM-DD
function getFileDate(filePath) {
  const stats = fs.statSync(filePath);
  const date = stats.mtime; // Use modification time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to strip leading numbers from filename
function stripLeadingNumbers(filename) {
  // Remove patterns like "001-", "000-", "999-", etc.
  return filename.replace(/^\d+-/, '');
}

// Main function
async function renameBacklogFiles() {
  // Find all markdown files
  const mdFiles = await glob('*.md', { cwd: BACKLOG_DIR, absolute: true });

  console.log(`Found ${mdFiles.length} total files in backlog`);

  let renamed = 0;
  let skipped = 0;
  const errors = [];
  const renames = [];

  for (const filePath of mdFiles) {
    try {
      const filename = path.basename(filePath);

      // Skip if already has date prefix
      if (hasDatePrefix(filename)) {
        skipped++;
        continue;
      }

      // Get the file's modification date
      const datePrefix = getFileDate(filePath);

      // Strip leading numbers from the filename
      const nameWithoutNumbers = stripLeadingNumbers(filename);

      // Create new filename
      const newFilename = `${datePrefix}-${nameWithoutNumbers}`;
      const newFilePath = path.join(BACKLOG_DIR, newFilename);

      // Check if target file already exists
      if (fs.existsSync(newFilePath)) {
        console.log(`⚠ Target file already exists: ${newFilename}`);
        errors.push({
          file: filename,
          error: 'Target file already exists',
          target: newFilename
        });
        continue;
      }

      // Store rename operation
      renames.push({
        from: filename,
        to: newFilename,
        fromPath: filePath,
        toPath: newFilePath
      });

      renamed++;

    } catch (error) {
      errors.push({ file: path.basename(filePath), error: error.message });
      console.error(`✗ Error processing ${path.basename(filePath)}: ${error.message}`);
    }
  }

  // Display planned renames
  if (renames.length > 0) {
    console.log('\n=== Planned Renames ===');
    renames.forEach(r => {
      console.log(`${r.from} → ${r.to}`);
    });

    // Execute renames
    console.log('\n=== Executing Renames ===');
    for (const rename of renames) {
      try {
        fs.renameSync(rename.fromPath, rename.toPath);
        console.log(`✓ Renamed: ${rename.to}`);
      } catch (error) {
        console.error(`✗ Failed to rename ${rename.from}: ${error.message}`);
        errors.push({ file: rename.from, error: error.message });
      }
    }
  }

  console.log('\n=== Rename Complete ===');
  console.log(`Renamed: ${renamed}`);
  console.log(`Skipped: ${skipped} (already have date prefix)`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  ${e.file}: ${e.error}${e.target ? ` (target: ${e.target})` : ''}`));
  }
}

// Run the rename
renameBacklogFiles().catch(console.error);
