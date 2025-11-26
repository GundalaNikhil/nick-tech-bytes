const ReactMarkdown = require('react-markdown');
const rehypeRaw = require('rehype-raw');
const remarkGfm = require('remark-gfm');

const markdown = `
# Test

<div style="color: red;">This should be red</div>

Regular text
`;

console.log('Testing markdown parsing...');
