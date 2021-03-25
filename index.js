const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./data_base/data_base")
const Pergunta = require("./model/Pergunta")
const Resposta = require("./model/Resposta")

connection
    .authenticate()
    .then(() => {
        console.log("DataBase conected!")
})
.catch((msgErro) => {
    console.log(msgErro);
})

app.set('view engine', 'ejs');
app.set(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true , order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        })
    }) 
})

app.get("/perguntar", (req, res) => {
  res.render("perguntar")
})

app.get("/perguntar/:id", (req, res) => {
    const id = req.params.id
    Pergunta.findOne({
        where: { id:  id}
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                }, order: [
                    ['id', 'DESC'] ]
            }).then((respostas) => {
                res.render("perguntas", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });    
        } else {
            res.redirect("/")            
        }
    })
})


app.post("/salvarpergunta" ,(req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo, 
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})

app.post("/responder", (req, res) => {
    const corpo = req.body.corpo;
    const perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/perguntar/"+perguntaId)
    });
});


app.listen(3000, ()=> {
    console.log("Server Runing")
})