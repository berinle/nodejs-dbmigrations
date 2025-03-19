require('dotenv').config();
const { exec } = require('child_process');
const path = require('path');

const flywayCommand = `flyway -url=jdbc:postgresql://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} \
  -user=${process.env.DB_USER} \
  -password=${process.env.DB_PASSWORD} \
  -locations=${process.env.FLYWAY_LOCATIONS} \
  migrate`;

exec(flywayCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Flyway: ${error}`);
    process.exit(1);
  }
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
}); 