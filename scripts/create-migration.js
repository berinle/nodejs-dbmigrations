const fs = require('fs');
const path = require('path');

// Get migration name from command line arguments
const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

// Create migrations directory if it doesn't exist
const migrationsDir = path.join(__dirname, '..', 'migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
}

// Get the next version number
const files = fs.readdirSync(migrationsDir);
const versions = files
  .map(file => parseInt(file.split('__')[0].substring(1)))
  .filter(version => !isNaN(version));
const nextVersion = versions.length > 0 ? Math.max(...versions) + 1 : 1;

// Create the migration file
const fileName = `V${nextVersion}__${migrationName}.sql`;
const filePath = path.join(migrationsDir, fileName);
const content = `-- Migration: ${migrationName}
-- Version: ${nextVersion}

-- Add your SQL migration here
`;

fs.writeFileSync(filePath, content);
console.log(`Created migration file: ${fileName}`); 