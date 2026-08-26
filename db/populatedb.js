#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) UNIQUE NOT NULL,
  password VARCHAR ( 255 ) NOT NULL
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client(
    process.argv[2]
      ? { connectionString: process.argv[2] }
      : {
          host: process.env.PGHOST,
          user: process.env.PGUSER,
          database: process.env.PGDATABASE,
          port: process.env.PGPORT,
          password: process.env.PGPASSWORD,
        }
  );

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
