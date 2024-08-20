const fastify = require('fastify')({ logger: true });
const mysql = require('mysql');

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

fastify.get('/coords', async (request, reply) => {
    fastify.log.info('Received request for /coords');
    try {
        return reply.send({ hello: 'world' });
    } catch (error) {
        fastify.log.error('Error handling /coords:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
});

// MySQL connection
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'db',
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

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8000, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();

