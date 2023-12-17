import express from "express";
import _dirname from "./dirname.js";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

//Routes
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/views.router.js";

const port = 5000
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(express.static(_dirname + 'public'));

//Routes
app.use("/api/products", productRouter);
app.use("/", viewsRouter);

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

//Inicializar server
app.listen(port, () => {
    console.log("Se Inicio el servidor")
});