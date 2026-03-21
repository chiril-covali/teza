const fs = require('fs');
const path = require('path');

// Read algorithms metadata
const metadata = JSON.parse(fs.readFileSync('lib/algorithms/algorithms-metadata.json', 'utf8'));

// Map category names to folders
const categoryFolders = {
  'Backtracking': 'backtracking',
  'Cifrare': 'ciphers',
  'Căutare': 'search',
  'Diverse': 'other',
  'Grafuri': 'graph',
  'Manipulare Biți': 'bit_manipulation',
  'Matematică': 'maths',
  'Sortare': 'sorts',
  'Programare Dinamică': 'dynamic_programming',
  'Structuri de Date': 'data_structures',
};

// Convert algorithm names to file names
function nameToFileName(name, category) {
  // Remove accents and convert to snake_case
  const normalized = name
    .toLowerCase()
    .replace(/ă/g, 'a')
    .replace(/â/g, 'a')
    .replace(/ț/g, 't')
    .replace(/ş/g, 's')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  return normalized + '.ts';
}

// Generate mapping
const mapping = {};
metadata.forEach(algo => {
  const folder = categoryFolders[algo.category];
  if (folder) {
    const fileName = nameToFileName(algo.name, algo.category);
    mapping[algo.slug] = `TypeScript-master/${folder}/${fileName}`;
  }
});

// Output the mapping
console.log(`Total mapped: ${Object.keys(mapping).length}/${metadata.length} algorithms`);

// Save to JSON
fs.writeFileSync('slug-mapping.json', JSON.stringify(mapping, null, 2));
console.log('✓ Saved to slug-mapping.json');

// Show sample
console.log('\nSample mappings:');
const entries = Object.entries(mapping);
for (let i = 0; i < Math.min(10, entries.length); i++) {
  console.log(`  ${entries[i][0]} => ${entries[i][1]}`);
}
