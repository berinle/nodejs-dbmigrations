const fs = require('fs');
const path = require('path');

// Get migration name from command line arguments
const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

// Create migrations directory if it doesn't exist
const changesDir = path.join(__dirname, '..', 'db', 'changelog', 'changes');
if (!fs.existsSync(changesDir)) {
  fs.mkdirSync(changesDir, { recursive: true });
}

// Get the next version number
const files = fs.readdirSync(changesDir);
const versions = files
  .map(file => parseInt(file.split('-')[0]))
  .filter(version => !isNaN(version));
const nextVersion = versions.length > 0 ? Math.max(...versions) + 1 : 1;

// Create the migration file
const fileName = `${String(nextVersion).padStart(2, '0')}-${migrationName}.xml`;
const filePath = path.join(changesDir, fileName);
const content = `<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
    xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="1" author="app">
        <!-- Add your changes here -->
    </changeSet>

</databaseChangeLog>`;

fs.writeFileSync(filePath, content);

// Update the master changelog
const masterChangelogPath = path.join(__dirname, '..', 'db', 'changelog', 'db.changelog-master.xml');
let masterContent = fs.readFileSync(masterChangelogPath, 'utf8');
const includeLine = `    <include file="db/changelog/changes/${fileName}" relativeToChangelogFile="true"/>\n`;
masterContent = masterContent.replace('</databaseChangeLog>', `${includeLine}</databaseChangeLog>`);
fs.writeFileSync(masterChangelogPath, masterContent);

console.log(`Created migration file: ${fileName}`); 