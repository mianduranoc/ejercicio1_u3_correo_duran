const express=require('express');
const bodyParser=require('body-parser');
const wagner=require('wagner-core');

require('./models/models')(wagner);

//Importar productRouter
const productRouter=require('./routers/product.router')(wagner);
const userRouter=require('./routers/user.router')(wagner);
//Configurando servidor express
let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/products",productRouter);
app.use("/users",userRouter);

module.exports=app;