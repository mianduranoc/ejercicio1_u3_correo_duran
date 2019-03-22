const status=require('http-status');
const bcrypt=require('bcryptjs');
const mail=require('../sendmail');
let _user;

const getAll=(req,res)=>{
    _user.find({})
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
};
const getByEmail=(req,res)=>{
    const email=req.params.email;
    _user.findOne({email:email})
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
};
const create=(req,res)=>{
    const user=req.body;
    user.password=bcrypt.hashSync(user.password,10);
    _user.create(user)
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
const deleteUser=(req,res)=>{
    const id=req.params.id;
    _user.deleteOne({_id:id})
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
};
const updatePassword=(req,res)=>{
    const id=req.params.id;
    const password=bcrypt.hashSync(req.body.password,10);
    _user.updateOne({_id:id},{$set:{password:password}})
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
};
const sendMail=(req,res)=>{
    const id=req.params.id;
    _user.findOne({_id:id})
        .then(data=>{
            res.status(200);
            mail.sendMail(data.email,data.name.firstName+" "+data.name.lastName,data._id);
            res.json({
                code:200,
                msg:"Correo Enviado",
                detail:data
            })
        })
        .catch(error=>{
            res.status(400);
            res.json({
                code:400,
                msg:"Error al enviar",
                detail:error
            })
        });
};
module.exports=(User)=>{
    _user=User;
    return({
        getAll,getByEmail,create,deleteUser,updatePassword,sendMail
    });
};