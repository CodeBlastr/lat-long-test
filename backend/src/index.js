const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const mysql = require('mysql');

// Register the CORS plugin globally
fastify.register(fastifyCors, {
  // Configure CORS to allow all origins
  origin: "*",  // Adjust this in production to be more restrictive
  methods: ["GET", "POST", "OPTIONS"]
});

// MySQL connection setup
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'db',  // Assuming 'db' is the correct Docker service name
    user: 'root',
    password: 'password',
    database: 'coordinates'
});

// Simple route to check the server's functionality
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

// GET route to simulate fetching data (modify as needed for actual functionality)
fastify.get('/coords', async (request, reply) => {
    fastify.log.info('Received request for /coords');
    try {
        return reply.send({ hello: 'world' });
    } catch (error) {
        fastify.log.error('Error handling /coords:', error);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
});

// POST route to save coordinates
fastify.post('/coords', (request, reply) => {
    const { notes, lat, lng } = request.body;
    db.query(
        'INSERT INTO coords_data (notes, lat, lng) VALUES (?, ?, ?)',
        [notes, lat, lng],
        (error, results) => {
            if (error) {
                fastify.log.error('Database error:', error);
                return reply.status(500).send({ error: 'Database error' });
            }
            reply.send({ success: true, id: results.insertId });
        }
    );
});

// Function to start the server
const start = async () => {
  try {
    await fastify.listen({ port: 8000, host: '0.0.0.0' });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
