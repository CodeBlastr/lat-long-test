const fastify = require('fastify')({ logger: true });
const mysql = require('mysql');

// MySQL connection
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'coordinates'
});

// POST route to save coordinates
fastify.post('/coords', (request, reply) => {
    const { notes, lat, lng } = request.body;
    db.query(
        'INSERT INTO coords_data (notes, lat, lng) VALUES (?, ?, ?)',
        [notes, lat, lng],
        (error, results) => {
            if (error) throw error;
            reply.send({ success: true, id: results.insertId });
        }
    );
});

// Start server
fastify.listen(8000, err => {
    if (err) console.log(err);
    console.log('Server is running on http://localhost:8000');
});

