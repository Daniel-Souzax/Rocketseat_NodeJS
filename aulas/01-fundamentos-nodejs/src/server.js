import http from 'node:http';
import { json } from './middlewares/json.js' //Middlewares é um interceptador (uma função que intercepta a requisição)
import { routes } from './routes.js'

// Query Parameters: URL Stateful  => Filtros, paginação, não-obrigatorio
// Route Parameters: Identificação de recurso
// Request Body: Envio de informaçoues de um formulario (HTTPs)

// http://localhost:3333/users?userId=1&name=Daniel

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users


const server = http.createServer(async (req, res) => {

    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    
   if (route){
    const routeParams =  req.url.match(route.path)
    
    console.log(routeParams);
    
    return route.handler(req, res)
   }
    
    return res.writeHead(404).end()

})

server.listen(3333)