const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');

// Configuration
const KEEP_DIR = '/Users/chris/Workspace/folio/_temp/Takeout/Keep';
const OUTPUT_DIR = path.join(__dirname, '../content/_backlog');

// Helper function to convert microseconds timestamp to YYYY-MM-DD
function timestampToDate(microseconds) {
  const milliseconds = Math.floor(microseconds / 1000);
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to create a slug from title
function createSlug(title, content) {
  if (title && title.trim()) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // If no title, use first few words of content
  if (content && content.trim()) {
    const firstWords = content
      .trim()
      .split(/\s+/)
      .slice(0, 5)
      .join(' ');
    return firstWords
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  return 'untitled';
}

// Helper function to clean HTML entities and formatting
function cleanContent(text) {
  if (!text) return '';
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

// Helper function to generate frontmatter and content
function generateMarkdown(note) {
  const title = note.title || 'Untitled';
  const content = cleanContent(note.textContent);
  const createdDate = new Date(Math.floor(note.createdTimestampUsec / 1000));
  const editedDate = new Date(Math.floor(note.userEditedTimestampUsec / 1000));

  let markdown = `---
title: "${title}"
date: ${createdDate.toISOString()}
modified: ${editedDate.toISOString()}
draft: true
archived: ${note.isArchived}
pinned: ${note.isPinned}
trashed: ${note.isTrashed}
color: ${note.color}
---

${content}
`;

  // Add annotations if they exist (like web links)
  if (note.annotations && note.annotations.length > 0) {
    markdown += '\n\n---\n\n## References\n\n';
    note.annotations.forEach(annotation => {
      if (annotation.url) {
        markdown += `### [${annotation.title || 'Link'}](${annotation.url})\n\n`;
        if (annotation.description) {
          markdown += `${annotation.description}\n\n`;
        }
      }
    });
  }

  return markdown;
}

// Main function
async function convertKeepNotes() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Find all JSON files
  const jsonFiles = await glob('*.json', { cwd: KEEP_DIR, absolute: true });

  console.log(`Found ${jsonFiles.length} Keep notes to convert`);

  let converted = 0;
  let skipped = 0;
  const errors = [];

  for (const jsonFile of jsonFiles) {
    try {
      // Read and parse JSON
      const jsonContent = fs.readFileSync(jsonFile, 'utf8');
      const note = JSON.parse(jsonContent);

      // Skip trashed notes
      if (note.isTrashed) {
        console.log(`Skipping trashed note: ${note.title || path.basename(jsonFile)}`);
        skipped++;
        continue;
      }

      // Generate filename
      const date = timestampToDate(note.createdTimestampUsec);
      const slug = createSlug(note.title, note.textContent);
      const filename = `${date}-${slug}.md`;
      const outputPath = path.join(OUTPUT_DIR, filename);

      // Check if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`File already exists: ${filename}, skipping...`);
        skipped++;
        continue;
      }

      // Generate markdown
      const markdown = generateMarkdown(note);

      // Write file
      fs.writeFileSync(outputPath, markdown, 'utf8');

      console.log(`✓ Converted: ${filename}`);
      converted++;

    } catch (error) {
      errors.push({ file: path.basename(jsonFile), error: error.message });
      console.error(`✗ Error processing ${path.basename(jsonFile)}: ${error.message}`);
    }
  }

  console.log('\n=== Conversion Complete ===');
  console.log(`Converted: ${converted}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    errors.forEach(e => console.log(`  ${e.file}: ${e.error}`));
  }
}

// Run the conversion
convertKeepNotes().catch(console.error);
