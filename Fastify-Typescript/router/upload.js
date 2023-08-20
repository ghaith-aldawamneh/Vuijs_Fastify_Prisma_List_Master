const path = require('path');
const fs = require('fs');
const fastifyMultipart = require('@fastify/multipart');

module.exports = function (fastify, opts, done) {
    // Register the fastify-multipart plugin
    fastify.register(fastifyMultipart);

    // Define the route for file upload
    fastify.post('/uploadphoto', async (request, reply) => {
        console.log("FAXTX")
        const { files } = request.body;

        // Check if any files were uploaded
        if (!files || Object.keys(files).length === 0) {
            reply.code(400).send({ error: 'No files uploaded' });
            return;
        }

        try {
            // Process each uploaded file
            for (const file of Object.values(files)) {
                const { data, filename } = file;

                const filePath = path.join(__dirname, 'uploads', filename);

                // Save the file to the specified path
                fs.writeFileSync(filePath, data);
            }

            reply.send({ message: 'Files uploaded successfully' });
        } catch (error) {
            console.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });

    done();
};