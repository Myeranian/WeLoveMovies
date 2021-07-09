const path = require("path");

if (process.env.USER) require("dotenv").config();
//"postgresql://postgres@localhost/postgres"
//"postgres://wineiurw:MhD_JLhmPbKPEWEeZXix1aS7WOfDMJL-@batyr.db.elephantsql.com/wineiurw"
const {
  DATABASE_URL = "postgres://wineiurw:MhD_JLhmPbKPEWEeZXix1aS7WOfDMJL-@batyr.db.elephantsql.com/wineiurw",
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
