// SplitEdit: separates the editor's answer into the memo, its change list, and its flags.
// If the markers are missing, keep everything as the memo and flag it. Nothing stops.
const raw = $input.first().json.text || '';
const flags = [];
let memo = raw, changes = '', editorFlags = '';
const c = raw.indexOf('===CHANGES===');
const f = raw.indexOf('===FLAGS===');
if (c === -1 || f === -1 || f < c) {
  flags.push('Editor output did not follow the format; the whole answer is kept as the memo.');
} else {
  memo = raw.slice(0, c).trim();
  changes = raw.slice(c + 13, f).trim();
  editorFlags = raw.slice(f + 11).trim();
}
if (!raw.trim()) flags.push('Editor returned nothing; check Maximum Number of Tokens on its model.');
return [{ json: { memo, changes, editor_flags: editorFlags, flags } }];
