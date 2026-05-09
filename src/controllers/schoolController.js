const pool = require('../config/db');

// Haversine formula to calculate distance between two points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Valid name is required.' });
        }
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ error: 'Valid address is required.' });
        }
        if (latitude === undefined || typeof latitude !== 'number') {
            return res.status(400).json({ error: 'Valid latitude is required as a number.' });
        }
        if (longitude === undefined || typeof longitude !== 'number') {
            return res.status(400).json({ error: 'Valid longitude is required as a number.' });
        }

        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [name, address, latitude, longitude]);

        return res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId
        });
    } catch (error) {
        console.error('Error adding school:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.listSchools = async (req, res) => {
    try {
        let { latitude, longitude } = req.query;

        // Validation
        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'Latitude and longitude are required query parameters.' });
        }

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers.' });
        }

        const [rows] = await pool.execute('SELECT * FROM schools');

        const schoolsWithDistance = rows.map(school => {
            const distance = getDistanceFromLatLonInKm(
                latitude,
                longitude,
                school.latitude,
                school.longitude
            );
            return { ...school, distance };
        });

        // Sort nearest first
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        return res.status(200).json(schoolsWithDistance);
    } catch (error) {
        console.error('Error listing schools:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
