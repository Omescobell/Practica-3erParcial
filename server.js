import express from "express";
import cors from "cors";
import connection from "./db.js";
import { error } from "console";

const app = express();
app.use(cors());
app.use(express.json());

//Crear (POST)

app.post("/api/alumnos",(req,res)=>{
    const{ nombre,edad,curso}=req.body;
    const sql ="INSERT INTO alumnos(nombre,edad,curso) VALUES(?,?,?)";
    connection.query(sql,[nombre,edad,curso],(err,result)=>{
        if(err) return res.status(500).json({error:err});

    })
})
//Mostrar (GET)
app.get("/api/alumnos",(req,res)=>{
    connection.query("SELECT *FROM alumnos",(err,result)=>{
        if(err)return res.status(500).json({error:err});
        res.json(result);
    });
});
app.use(express.static("public"));
//Puerto
const PORT = 3000;
app.listen(PORT,()=>console.log('Servidor corriendo'));