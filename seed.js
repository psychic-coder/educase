require('dotenv').config();
const mysql = require('mysql2/promise');

async function seed() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: true }
    });

    console.log('Connected to Aiven MySQL. Running schema...');

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        )
    `);
    console.log('Table created (or already exists).');

    const schools = [
        ['Delhi Public School', 'Mathura Road, New Delhi, Delhi 110003', 28.5562, 77.2410],
        ['Ryan International School', 'Sector 31, Gurugram, Haryana 122001', 28.4595, 77.0266],
        ['The Shri Ram School', 'Moulsari Avenue, DLF Phase 3, Gurugram', 28.4945, 77.0890],
        ['Kendriya Vidyalaya No. 1', 'Kidwai Nagar, New Delhi, Delhi 110023', 28.6360, 77.2090],
        ['St. Columba School', 'Ashok Place, New Delhi, Delhi 110001', 28.6368, 77.2093],
        ['Modern School', 'Barakhamba Road, New Delhi, Delhi 110001', 28.6293, 77.2283],
        ['Bal Bharati Public School', 'Pitampura, New Delhi, Delhi 110034', 28.6959, 77.1340],
        ['Springdales School', 'Pusa Road, New Delhi, Delhi 110005', 28.6453, 77.1644],
    ];

    for (const [name, address, lat, lon] of schools) {
        await connection.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, lat, lon]
        );
        console.log(` Inserted: ${name}`);
    }

    console.log('\n🎉 Demo data seeded successfully!');
    await connection.end();
}

seed().catch(err => {
    console.error(' Seed failed:', err.message);
    process.exit(1);
});
