const fastify = require('fastify')({
    logger : true
})

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mycargarage')
    .then(()=> console.log("mongodb Connected"))
    .catch(err => console.log(err));

const routes = require('./routes')

routes.forEach((route, index) => {
    fastify.route(route);
})

fastify.get('/', async (req, rep) => {
    return {hello: 'world'};
})

const start = async ()=> {
    try {
        await fastify.listen({port:3001});
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start()