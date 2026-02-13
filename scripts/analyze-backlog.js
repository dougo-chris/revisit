const fs = require('fs');
const path = require('path');
const glob = require('fast-glob');
const matter = require('gray-matter');

// Configuration
const BACKLOG_DIR = path.join(__dirname, '../content/_backlog');
const OUTPUT_FILE = path.join(__dirname, '../backlog-report.md');

// Helper to extract keywords from title and content
function extractKeywords(title, content) {
  const text = `${title} ${content}`.toLowerCase();
  const keywords = new Set();

  // Define topic patterns
  const topics = {
    'AI/ML': /\b(ai|artificial intelligence|machine learning|ml|llm|claude|gpt|openai|chatgpt)\b/gi,
    'Development': /\b(code|coding|developer|engineering|engineer|technical|tech stack|api|database|git|pull request)\b/gi,
    'Business': /\b(business|revenue|sales|customer|market|startup|company|growth|scale|product)\b/gi,
    'Career': /\b(career|job|hiring|recruit|interview|resume|linkedin|work)\b/gi,
    'Leadership': /\b(leadership|leader|manage|management|team|culture|people)\b/gi,
    'Learning': /\b(learn|learning|education|teach|course|book|podcast|masterclass)\b/gi,
    'Content': /\b(content|writing|blog|article|video|youtube|podcast)\b/gi,
    'Tools': /\b(tool|software|app|application|platform|service|saas)\b/gi,
    'Personal': /\b(life|personal|happiness|age|lesson|advice)\b/gi,
    'Food/Lifestyle': /\b(food|restaurant|burger|lunch|dinner|recipe|kite|footy|jeans)\b/gi,
  };

  for (const [topic, pattern] of Object.entries(topics)) {
    if (pattern.test(text)) {
      keywords.add(topic);
    }
  }

  return Array.from(keywords);
}

// Main analysis function
async function analyzeBacklog() {
  const files = await glob('*.md', { cwd: BACKLOG_DIR, absolute: true });

  console.log(`Analyzing ${files.length} files...`);

  const notes = [];
  const stats = {
    total: files.length,
    byYear: {},
    byMonth: {},
    byTopic: {},
    byStatus: {
      draft: 0,
      published: 0,
      archived: 0,
      trashed: 0,
      pinned: 0,
    },
    sources: {
      keep: 0,
      original: 0,
    },
    withReferences: 0,
    totalWords: 0,
  };

  // Analyze each file
  for (const filePath of files) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data, content: body } = matter(content);
      const filename = path.basename(filePath);

      // Extract date from filename
      const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);
      const year = dateMatch ? dateMatch[1] : 'Unknown';
      const month = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}` : 'Unknown';

      // Determine source (Keep notes have specific frontmatter)
      const isKeepNote = data.color !== undefined;

      // Extract topics
      const topics = extractKeywords(data.title || '', body);

      // Count words
      const wordCount = body.trim().split(/\s+/).length;

      // Check for references
      const hasReferences = body.includes('## References') || (data.annotations && data.annotations.length > 0);

      // Store note info
      notes.push({
        filename,
        title: data.title || 'Untitled',
        date: data.date || year,
        year,
        month,
        draft: data.draft !== false, // Default to draft if not specified
        archived: data.archived || false,
        trashed: data.trashed || false,
        pinned: data.pinned || false,
        topics,
        source: isKeepNote ? 'Keep' : 'Original',
        wordCount,
        hasReferences,
      });

      // Update stats
      stats.byYear[year] = (stats.byYear[year] || 0) + 1;
      stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;

      topics.forEach(topic => {
        stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
      });

      if (data.draft !== false) stats.byStatus.draft++;
      else stats.byStatus.published++;
      if (data.archived) stats.byStatus.archived++;
      if (data.trashed) stats.byStatus.trashed++;
      if (data.pinned) stats.byStatus.pinned++;

      if (isKeepNote) stats.sources.keep++;
      else stats.sources.original++;

      if (hasReferences) stats.withReferences++;

      stats.totalWords += wordCount;

    } catch (error) {
      console.error(`Error processing ${path.basename(filePath)}: ${error.message}`);
    }
  }

  // Generate report
  const report = generateReport(notes, stats);

  // Write report to file
  fs.writeFileSync(OUTPUT_FILE, report, 'utf8');
  console.log(`\n✓ Report generated: ${OUTPUT_FILE}`);

  return { notes, stats };
}

function generateReport(notes, stats) {
  const now = new Date().toISOString().split('T')[0];

  let report = `# Backlog Analysis Report

Generated: ${now}

## Summary

- **Total Notes**: ${stats.total}
- **Total Words**: ${stats.totalWords.toLocaleString()}
- **Average Words per Note**: ${Math.round(stats.totalWords / stats.total)}
- **Notes with References**: ${stats.withReferences}

## Status Distribution

- **Drafts**: ${stats.byStatus.draft} (${Math.round(stats.byStatus.draft / stats.total * 100)}%)
- **Published**: ${stats.byStatus.published} (${Math.round(stats.byStatus.published / stats.total * 100)}%)
- **Archived**: ${stats.byStatus.archived}
- **Trashed**: ${stats.byStatus.trashed}
- **Pinned**: ${stats.byStatus.pinned}

## Sources

- **Original Notes**: ${stats.sources.original}
- **Google Keep Import**: ${stats.sources.keep}

## Distribution by Year

| Year | Count | Percentage |
|------|-------|------------|
`;

  // Sort years
  const years = Object.keys(stats.byYear).sort();
  years.forEach(year => {
    const count = stats.byYear[year];
    const pct = Math.round(count / stats.total * 100);
    report += `| ${year} | ${count} | ${pct}% |\n`;
  });

  report += `\n## Distribution by Month (Last 12 months)\n\n| Month | Count |\n|-------|-------|\n`;

  // Get last 12 months
  const months = Object.keys(stats.byMonth).sort().reverse().slice(0, 12);
  months.forEach(month => {
    report += `| ${month} | ${stats.byMonth[month]} |\n`;
  });

  report += `\n## Topics Distribution\n\n| Topic | Count | Percentage |\n|-------|-------|------------|\n`;

  // Sort topics by count
  const topics = Object.entries(stats.byTopic)
    .sort((a, b) => b[1] - a[1]);

  topics.forEach(([topic, count]) => {
    const pct = Math.round(count / stats.total * 100);
    report += `| ${topic} | ${count} | ${pct}% |\n`;
  });

  // Notes without topics
  const notesWithoutTopics = notes.filter(n => n.topics.length === 0);
  if (notesWithoutTopics.length > 0) {
    report += `\n### Notes Without Clear Topics (${notesWithoutTopics.length})\n\n`;
    notesWithoutTopics.slice(0, 20).forEach(note => {
      report += `- ${note.filename}: "${note.title}"\n`;
    });
    if (notesWithoutTopics.length > 20) {
      report += `\n... and ${notesWithoutTopics.length - 20} more\n`;
    }
  }

  // Multi-topic notes
  const multiTopicNotes = notes.filter(n => n.topics.length > 2).sort((a, b) => b.topics.length - a.topics.length);
  if (multiTopicNotes.length > 0) {
    report += `\n## Multi-Topic Notes (${multiTopicNotes.length})\n\n`;
    multiTopicNotes.slice(0, 10).forEach(note => {
      report += `- **${note.title}** (${note.topics.join(', ')})\n`;
    });
  }

  // Recent notes
  report += `\n## Most Recent Notes (Last 10)\n\n`;
  const recentNotes = notes.sort((a, b) => b.filename.localeCompare(a.filename)).slice(0, 10);
  recentNotes.forEach(note => {
    const topics = note.topics.length > 0 ? ` [${note.topics.join(', ')}]` : '';
    report += `- ${note.filename.split('-').slice(0, 3).join('-')}: **${note.title}**${topics}\n`;
  });

  // Longest notes
  report += `\n## Longest Notes (Top 10)\n\n`;
  const longestNotes = notes.sort((a, b) => b.wordCount - a.wordCount).slice(0, 10);
  longestNotes.forEach(note => {
    report += `- **${note.title}** (${note.wordCount} words)\n`;
  });

  // Notes with references
  if (stats.withReferences > 0) {
    report += `\n## Notes with External References (${stats.withReferences})\n\n`;
    const refNotes = notes.filter(n => n.hasReferences).slice(0, 15);
    refNotes.forEach(note => {
      report += `- ${note.title}\n`;
    });
    if (stats.withReferences > 15) {
      report += `\n... and ${stats.withReferences - 15} more\n`;
    }
  }

  report += `\n## Recommendations\n\n`;

  // Generate recommendations
  const draftCount = stats.byStatus.draft;
  const businessCount = stats.byTopic['Business'] || 0;
  const devCount = stats.byTopic['Development'] || 0;
  const aiCount = stats.byTopic['AI/ML'] || 0;

  report += `### Content Strategy\n\n`;

  if (draftCount > 50) {
    report += `- **High draft count**: You have ${draftCount} drafts. Consider reviewing and publishing the most polished ones.\n`;
  }

  if (businessCount > 10) {
    report += `- **Business focus**: With ${businessCount} business-related notes, consider creating a series or compilation.\n`;
  }

  if (devCount > 10) {
    report += `- **Development content**: ${devCount} development notes could form a technical blog series.\n`;
  }

  if (aiCount > 10) {
    report += `- **AI/ML trending**: ${aiCount} AI-related notes reflect current interests - timely content for publication.\n`;
  }

  if (notesWithoutTopics.length > 20) {
    report += `- **Uncategorized notes**: ${notesWithoutTopics.length} notes don't fit clear topics. Review for potential deletion or expansion.\n`;
  }

  const avgWords = Math.round(stats.totalWords / stats.total);
  if (avgWords < 100) {
    report += `- **Note length**: Average ${avgWords} words per note. Many notes may need expansion before publication.\n`;
  }

  report += `\n### Organization\n\n`;
  report += `- Consider adding tags or categories to frontmatter for better organization\n`;
  report += `- Review notes without clear topics for potential refinement\n`;
  report += `- Archive or delete notes marked as trashed (${stats.byStatus.trashed})\n`;

  return report;
}

// Run the analysis
analyzeBacklog()
  .then(({ notes, stats }) => {
    console.log('\n=== Analysis Complete ===');
    console.log(`Total notes: ${stats.total}`);
    console.log(`Total words: ${stats.totalWords.toLocaleString()}`);
    console.log(`Top topics:`, Object.entries(stats.byTopic)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count]) => `${topic} (${count})`)
      .join(', '));
  })
  .catch(console.error);
