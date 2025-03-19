# Node.js with Liquibase Database Migrations

This project demonstrates how to use Liquibase for database migrations in a Node.js application.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Liquibase CLI (v4.20 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your database connection in `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=liquibase_demo
DB_USER=your_username
DB_PASSWORD=your_password
```

3. Create the database:
```bash
createdb liquibase_demo
```

## Usage

### Running Migrations

To run all pending migrations:
```bash
npm run migrate
```

### Creating New Migrations

To create a new migration file:
```bash
npm run migrate:create "migration_name"
```

This will create a new migration file in the `db/changelog/changes` directory with the next version number.

## Migration Files

Migration files are stored in the `db/changelog/changes` directory and follow the naming convention:
`{version}-{description}.xml`

Example: `01-create-users-table.xml`

## Project Structure

```
.
├── db/
│   └── changelog/
│       ├── changes/           # XML migration files
│       └── db.changelog-master.xml  # Master changelog
├── scripts/                   # Node.js scripts
│   ├── migrate.js            # Script to run migrations
│   └── create-migration.js   # Script to create new migrations
├── src/                      # Application source code
├── .env                      # Environment variables
└── package.json             # Project configuration
``` 