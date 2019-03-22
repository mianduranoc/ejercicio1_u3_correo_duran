const status=require('http-status');
let _product;
const getAll=(req,res)=>{
    _product.find({})
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
};

const create=(req,res)=>{
    const product=req.body;
    _product.create(product)
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
};

const deleteProduct=(req,res)=>{
    const {id}=req.params;
    _product.deleteOne({_id:id})
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
};

const getById=(req,res)=>{
    const id=req.params.id;
    _product.findOne({_id:id})
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

        });
};

const updateById=(req,res)=>{
    _product.updateOne({_id:req.params.id},{$set:{name:req.body.name}})
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
};

module.exports=(Product)=>{
    _product=Product;
    return ({
        getAll,create,deleteProduct,getById,updateById
    });
};