#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Enhanced table pattern for comparison tables
function enhanceComparisonTable(content) {
  // Match tables with "Feature", "Docker", "VM" pattern
  const dockerVsVmPattern =
    /\| Feature.*\| Docker.*\| (?:Virtual Machine|VM).*\|\n\|[^\n]+\|\n((?:\|[^\n]+\|\n)+)/gi;

  content = content.replace(dockerVsVmPattern, (match) => {
    return `
<div style="background: linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2); overflow-x: auto;">

<table style="width: 100%; min-width: 600px; border-collapse: separate; border-spacing: 0;">
<thead>
<tr style="background: linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));">
<th style="padding: 16px; text-align: left; border-top-left-radius: 8px; font-weight: bold; color: #22D3EE; border-bottom: 2px solid rgba(6, 182, 212, 0.4);">Feature</th>
<th style="padding: 16px; text-align: left; font-weight: bold; color: #22D3EE; border-bottom: 2px solid rgba(6, 182, 212, 0.4);">🐳 Docker</th>
<th style="padding: 16px; text-align: left; border-top-right-radius: 8px; font-weight: bold; color: #8B5CF6; border-bottom: 2px solid rgba(139, 92, 246, 0.4);">💻 Virtual Machine</th>
</tr>
</thead>
<tbody>
${convertTableRowsToHTML(match)}
</tbody>
</table>

</div>
`;
  });

  return content;
}

function convertTableRowsToHTML(tableText) {
  const rows = tableText
    .split("\n")
    .filter((line) => line.trim().startsWith("|") && !line.includes("---"));
  let html = "";
  let isOdd = true;

  rows.slice(2).forEach((row) => {
    const cells = row
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell);
    if (cells.length >= 3) {
      const bgColor = isOdd ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)";
      html += `<tr style="background: ${bgColor};">\n`;
      html += `<td style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); font-weight: 600; color: rgba(255, 255, 255, 0.9);">${cells[0]}</td>\n`;
      html += `<td style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">\n`;
      html += `<span style="display: inline-block; background: rgba(34, 197, 94, 0.2); color: #22C55E; padding: 4px 12px; border-radius: 12px; font-weight: bold; font-size: 14px;">${cells[1]}</span>\n`;
      html += `</td>\n`;
      html += `<td style="padding: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">\n`;
      html += `<span style="display: inline-block; background: rgba(251, 146, 60, 0.2); color: #FB923C; padding: 4px 12px; border-radius: 12px; font-weight: bold; font-size: 14px;">${cells[2]}</span>\n`;
      html += `</td>\n`;
      html += `</tr>\n`;
      isOdd = !isOdd;
    }
  });

  return html;
}

// Enhance pros/cons or advantages/disadvantages sections
function enhanceProsCons(content) {
  // Pattern for ✅/❌ or Advantages/Disadvantages sections
  const prosConsPattern =
    /(###?\s+(?:Advantages?|Pros?|Benefits?|✅)[^\n]*\n\n)((?:[-*]\s+[^\n]+\n?)+)(\n*)(###?\s+(?:Disadvantages?|Cons?|Limitations?|❌)[^\n]*\n\n)((?:[-*]\s+[^\n]+\n?)+)/gi;

  content = content.replace(
    prosConsPattern,
    (match, prosTitle, prosContent, gap, consTitle, consContent) => {
      const prosList = extractListItems(prosContent);
      const consList = extractListItems(consContent);

      return `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 24px 0;">

<div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1)); border: 2px solid rgba(34, 197, 94, 0.3); border-radius: 12px; padding: 24px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<span style="font-size: 32px;">✅</span>
<h4 style="margin: 0; color: #22C55E; font-size: 18px;">Advantages</h4>
</div>
<ul style="list-style: none; padding: 0; margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 2;">
${prosList
  .map(
    (item, i, arr) =>
      `<li style="padding: 8px 0; ${
        i < arr.length - 1
          ? "border-bottom: 1px solid rgba(34, 197, 94, 0.2);"
          : ""
      }">✓ ${item}</li>`
  )
  .join("\n")}
</ul>
</div>

<div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1)); border: 2px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 24px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<span style="font-size: 32px;">❌</span>
<h4 style="margin: 0; color: #EF4444; font-size: 18px;">Disadvantages</h4>
</div>
<ul style="list-style: none; padding: 0; margin: 0; color: rgba(255, 255, 255, 0.8); font-size: 14px; line-height: 2;">
${consList
  .map(
    (item, i, arr) =>
      `<li style="padding: 8px 0; ${
        i < arr.length - 1
          ? "border-bottom: 1px solid rgba(239, 68, 68, 0.2);"
          : ""
      }">✗ ${item}</li>`
  )
  .join("\n")}
</ul>
</div>

</div>
`;
    }
  );

  return content;
}

function extractListItems(content) {
  return content
    .split("\n")
    .filter((line) => line.trim().match(/^[-*]\s+/))
    .map((line) => line.replace(/^[-*]\s+/, "").trim());
}

// Enhance step-by-step instructions
function enhanceSteps(content) {
  // Match numbered lists that look like steps
  const stepsPattern =
    /(###?\s+(?:Steps?|How to|Instructions?|Procedure)[^\n]*\n\n)((?:\d+\.\s+\*\*[^*]+\*\*[^\n]*\n(?:\s+-[^\n]+\n)*)+)/gi;

  content = content.replace(stepsPattern, (match, title, stepsContent) => {
    const steps = extractSteps(stepsContent);
    if (steps.length === 0) return match;

    const colors = [
      "#22D3EE",
      "#3B82F6",
      "#8B5CF6",
      "#A855F7",
      "#EC4899",
      "#EF4444",
    ];

    return `${title}
<div style="background: linear-gradient(to bottom, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05)); border-radius: 12px; padding: 24px; margin: 24px 0; border: 1px solid rgba(6, 182, 212, 0.2);">

<div style="display: flex; flex-direction: column; gap: 16px;">

${steps
  .map((step, index) => {
    const color = colors[index % colors.length];
    const nextColor = colors[(index + 1) % colors.length];
    const hasNext = index < steps.length - 1;

    return `<div style="display: flex; align-items: start; gap: 16px;">
<div style="flex-shrink: 0; width: 40px; height: 40px; background: linear-gradient(135deg, ${color}, ${nextColor}); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 18px;">${
      index + 1
    }</div>
<div style="flex: 1;">
<div style="font-weight: bold; color: ${color}; font-size: 16px; margin-bottom: 4px;">${
      step.title
    }</div>
<div style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">${
      step.description
    }</div>
</div>
</div>${
      hasNext
        ? '\n\n<div style="margin-left: 20px; border-left: 2px dashed rgba(6, 182, 212, 0.3); height: 24px;"></div>'
        : ""
    }`;
  })
  .join("\n\n")}

</div>

</div>
`;
  });

  return content;
}

function extractSteps(content) {
  const steps = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.match(/^\d+\.\s+\*\*/)) {
      const title = line.replace(/^\d+\.\s+\*\*([^*]+)\*\*.*/, "$1").trim();
      const description = line
        .replace(/^\d+\.\s+\*\*[^*]+\*\*:?\s*/, "")
        .trim();
      steps.push({
        title,
        description: description || "Configure and proceed",
      });
    }
  }

  return steps;
}

// Process a single markdown file
function processMarkdownFile(filePath) {
  console.log(`Processing: ${path.basename(filePath)}`);

  let content = fs.readFileSync(filePath, "utf-8");
  const originalContent = content;

  // Apply enhancements
  content = enhanceComparisonTable(content);
  content = enhanceProsCons(content);
  content = enhanceSteps(content);

  // Only write if content changed
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✓ Enhanced: ${path.basename(filePath)}`);
    return true;
  } else {
    console.log(`- No changes: ${path.basename(filePath)}`);
    return false;
  }
}

// Main execution
const dockerMarkdownDir = path.join(__dirname, "../lib/markdown/docker");
const files = fs
  .readdirSync(dockerMarkdownDir)
  .filter((file) => file.endsWith(".md") && file !== "01-what-is-docker.md") // Skip the one we already did
  .map((file) => path.join(dockerMarkdownDir, file));

console.log(`\nFound ${files.length} Docker markdown files to enhance\n`);

let enhancedCount = 0;
files.forEach((file) => {
  if (processMarkdownFile(file)) {
    enhancedCount++;
  }
});

console.log(`\n✅ Enhanced ${enhancedCount} out of ${files.length} files`);
