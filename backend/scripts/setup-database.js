
require('dotenv').config();
const { execSync } = require('child_process');
const mysql = require('mysql2');

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env;

async function setupDatabase() {
  console.log('Creating database if it doesn\'t exist...');
  
  // Create connection without database name
  const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD
  });
  
  // Create database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
    if (err) {
      console.error('Error creating database:', err);
      process.exit(1);
    }
    
    console.log(`Database '${DB_NAME}' created or already exists.`);
    connection.end();
    
    // Run migrations
    console.log('Running migrations...');
    try {
      execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });
      console.log('Migrations completed successfully.');
    } catch (error) {
      console.error('Error running migrations:', error);
      process.exit(1);
    }
    
    console.log('Database setup completed!');
  });
}

setupDatabase();
