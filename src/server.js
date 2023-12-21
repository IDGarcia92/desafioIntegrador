import express from "express";
import _dirname from "./dirname.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

//chat
import http from 'http';
import { Server } from 'socket.io';

//Routes
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/views.router.js";
import cartRouter from "./routes/cart.router.js";


const port = 5000
const app = express();

//chat
const server = http.createServer(app);
const io = new Server(server);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//app.use(express.static('public'));
//app.use('/static', express.static('public'));
app.use(express.static(_dirname + '/public'));

//Routes
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// ruta a productos en tiempo real
app.use('/realTimeProducts', viewsRouter);

//Handlebars
app.engine('hbs', handlebars.engine(
    {
        extname: ".hbs",
        defaultLayout: "main"
    }
));
app.set("view engine", "hbs");
app.set("views", _dirname + "/views");

//Mongoose local
mongoose.connect('mongodb://127.0.0.1:27017/myapp') //mongodb://localhost:27017
    .then(() => console.log("Conectado a DB"))
    .catch((err) => console.log(err))

//schema de mensajes en Mongoose
const mensajeSchema = new mongoose.Schema({
    user: String,
    message: String,
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

// Configuración del socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Manejar el evento de mensaje
    socket.on('chat message', (data) => {
        // Guardar el mensaje en MongoDB usando Mongoose
        const nuevoMensaje = new Mensaje(data);
        nuevoMensaje.save((err) => {
            if (err) throw err;
                console.log('Mensaje guardado en MongoDB');

        // Emitir el mensaje a todos los clientes conectados
        io.emit('chat message', data);
        });
    });

    // Manejar la desconexión del usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

    // Ruta para la vista de chat
app.get('/chat', (req, res) => {
    res.render('chat');
});

//iniciamos el server
app.listen(port, () => {
    console.log(`Server listening on PORT ${port}.`)
});

