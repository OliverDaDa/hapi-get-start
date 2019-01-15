const Hapi = require('hapi')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

const client = Hapi.server({
    port: 3002,
    host: 'localhost'
})

let speech = {
    value: 'welcome',
    set (val) {
        this.value = val
    }
}
const init = async () => {
    client.route({
        path: '/',
        method: 'GET',
        handler () {
            return 'Hapi world'
        }
    })
    server.route({
        path: '/api/welcome/{name}',
        method: 'GET',
        handler (request) {
            return {
                code: 200,
                success: true,
                data: {
                    msg: `${speech.value} ${request.params.name}`
                }
            }
        }
    })
    server.route({
        path: '/api/speech',
        method: 'POST',
        handler (request) {
            speech.set(request.payload.word)
            return {
                code: 200,
                success: true,
                data: {
                    msg: `speech is *${speech.value}* now`
                }
            }
        }
    })
    await server.start()
    await client.start()
    console.log(`Server running at: ${server.info.uri}`)
}
init()