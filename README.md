# Node.js with Flyway Database Migrations

This project demonstrates how to use Flyway for database migrations in a Node.js application.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Flyway CLI (v9 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your database connection in `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flyway_demo
DB_USER=postgres
DB_PASSWORD=postgres
FLYWAY_LOCATIONS=filesystem:./migrations
```

3. Create the database:
```bash
createdb flyway_demo
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

This will create a new migration file in the `migrations` directory with the next version number.

## Migration Files

Migration files are stored in the `migrations` directory and follow the naming convention:
`V{version}__{description}.sql`

Example: `V1__create_users_table.sql`

## Project Structure

```
.
├── migrations/           # SQL migration files
├── scripts/             # Node.js scripts
│   ├── migrate.js       # Script to run migrations
│   └── create-migration.js  # Script to create new migrations
├── .env                 # Environment variables
└── package.json         # Project configuration
``` 