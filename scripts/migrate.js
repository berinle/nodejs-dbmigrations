require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');

const liquibaseCommand = `liquibase --defaultsFile=liquibase.properties update`;

exec(liquibaseCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Liquibase: ${error}`);
    process.exit(1);
  }
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
}); 