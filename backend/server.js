import express from "express";

const app = express();
const porta = 8000;

// Lista que armazena todas as informações
const personagens = [
    {
        id: 1,
        nome: "Phoenix Wright",
        profissao: "Advogado",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    },
    {
        id: 2,
        nome: "Mia Fey",
        profissao: "Advogada",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    },
    {
        id: 3,
        nome: "Euclides Graça",
        profissao: "Promotor",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    },
    {
        id: 4,
        nome: "Lucca Beludo",
        profissao: "Vendedor de Cachorros quentes",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    },
    {
        id: 5,
        nome: "Cíntia Rocha",
        profissao: "Modelo",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    },
    {
        id: 6,
        nome: "Juiz",
        profissao: "Juiz",
        url: "",
        audio: {
            protesto: "",
            espera: ""
        }
    }
];

// GET/
// Método: GET
// Descrição: Retorna a mensagem padrão de funcionamento da API
app.get("/",(request,response) => {
    response.send("API funciando como deveria excelência!");
});

// GET/personagens
// Método: GET
// Descrição: Retorna todos os personagens de Phoenix Wright: Ace Attorney Trilogy presentes na API
app.get("/personagens",(request,response) => {
    response.json(personagens);
});

// GET/personagem/:id
// Método: GET
// Descrição: Pega um personagem específico por meio do ID
app.get("/personagem/:id",(request,response) => {
    const id = parseInt(request.params.id);
    const personagem = personagens.find(p => p.id === id);

    if(!personagem) {
        response.status(404).
        json({
            mensagem: "O personagem não foi encontrado na tribuna."
        });
    }

    response.json(personagem);
});

// LISTEN Porta: 8000
// Porta: 8000
// Método: LISTEN
// Descrição: Escuta sempre que a API for chamada e informa o link do servidor
app.listen(porta,(request,response) => {
    console.log("Servidor rodando: http://127.0.0.1:8000")
});