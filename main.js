const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const bcrypt=require('bcryptjs');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/u3',{useNewUrlParser:true});

const productSchema=new mongoose.Schema({
    code: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
const userSchema=new mongoose.Schema({
   email:{
       required:true,
       type:String
   },
    password:{
       required:true,
        type:String
    },
    name:{
       firstName:{
           required:true,
           type:String
       },
        lastName:{
           required:true,
            type:String
        }
    }
});
const User=mongoose.model("User",userSchema,"users");
const Product=mongoose.model("Product",productSchema,"products");
/*userSchema.pre('validate',true,function(next){
    bcrypt.genSalt(10).then(salt=>{
        bcrypt.hash(this.password,salt).then(hash=>{
            this.password=hash;
            console.log(this.password);
            next();
        }).catch(error=>next(error))
    }).catch(error=>next(error));
});*/
//Definir endPoints

const productRouter=express.Router();
const userRouter=express.Router();
productRouter.post("/",(req,res)=>{
    const product=req.body;
    console.log(req);
    Product.create(product)
        .then(data=>{
            console.log(data);
            res.status(200);
            res.json({
                code:200,
                msg:"Saved!",
                detail:data
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(400);
            res.json({
                code:400,
                msg:"No se pudo insertar",
                detail:error
            });
        });
});
productRouter.get("/",(req,res)=>{
    Product.find({})
        .then(data=>{
            console.log(data);
            res.status(200);
            res.json({
                code:200,
                msg:"Consulta exitosa",
                detail:data
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(400);
            res.json({
                code:400,
                msg:"Error en consulta",
                detail:error
            });
        });
});
productRouter.get("/:id",(req,res)=>{
    const id=req.params.id;
    Product.findOne({_id:id})
        .then(product=>{
            res.status(200);
            res.json({
                code:200,
                msg:"Consulta exitosa",
                detail:product
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"Error",
                detail:error
            })

        })
});
productRouter.delete("/:id",(req,res)=>{
    const {id}=req.params;
    Product.deleteOne({_id:id})
        .then(data=>{
            console.log(data);
            res.status(200);
            res.json({
                code:200,
                msg:"Deleted!",
                detail:data
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(400);
            res.json({
                code:400,
                msg:"Error en consulta",
                detail:error
            });
        });
});
productRouter.put("/:id",(req,res)=>{
    Product.updateOne({_id:req.params.id},{$set:{name:req.body.name}})
        .then(data=>{
            console.log(data);
            res.status(200);
            res.json({
                code:200,
                msg:"Updated!",
                detail:data
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(400);
            res.json({
                code:400,
                msg:"Error en consulta",
                detail:error
            });
        });
});

userRouter.post("/",(req,res)=>{
    const user=req.body;
    user.password=bcrypt.hashSync(user.password,10);
    //console.log(req);
    User.create(user)
        .then(data=>{
            console.log(data);
            res.status(200);
            res.json({
                code:200,
                msg:"Saved!",
                detail:data
            });
        })
        .catch(error=>{
            console.log(error);
            res.status(400);
            res.json({
                code:400,
                msg:"No se pudo insertar",
                detail:error
            });
        });
});
userRouter.get("/",(req,res)=>{
    User.find({})
        .then(data=>{
            res.status(200);
            res.json({
                code:200,
                msg:"Consulta Exitosa",
                detail:data
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"Consulta Fallida",
                detail:error
            })
        });
});
userRouter.get("/:email",(req,res)=>{
    const email=req.params.email;
    User.findOne({email:email})
        .then(data=>{
            res.status(200);
            res.json({
                code:200,
                msg:"Consulta Exitosa",
                detail:data
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"Consulta Fallida",
                detail:error
            })
        });
});
userRouter.delete("/:id",(req,res)=>{
    const id=req.params.id;
    User.deleteOne({_id:id})
        .then(data=>{
            res.status(200);
            res.json({
                code:200,
                msg:"Eliminado Exitosamente",
                detail:data
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"No se elimino",
                detail:error
            })
        });
});
userRouter.put("/:id",(req,res)=>{
    const id=req.params.id;
    const password=req.body.password;
    User.updateOne({_id:id},{$set:{password:password}})
        .then(data=>{
            res.status(200);
            res.json({
                code:200,
                msg:"Usuario Actualizado",
                detail:data
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"Error al actualizar",
                detail:error
            })
        });
});

//Configurando servidor express
let app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/products",productRouter);
app.use("/users",userRouter);
//Configurando el servidor http
const server=require('http').Server(app);
const port=3002;

//Ejecutando el servidor
server.listen(port);
console.log(`Running on port ${port}`);
