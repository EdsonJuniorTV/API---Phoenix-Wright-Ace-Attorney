import express from "express";
import path from "path";

const app = express();
const porta = 8000;

// Lista que armazena todas as informações
const personagens = [
    {
        id: 1,
        nome: "Phoenix Wright",
        profissao: "Advogado de defesa",
        idade: 24,
        descricao: "Advogado de defesa com cabelo espetado, conhecido também pelo apelido de Nico, protagonista da série de jogos Phoenix Wright: Ace Attorney.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU95YgGd4m32SeBRbMNdTga8K5jyJk2H7JLA&s",
        audio: {
            protesto: "protesto_phoenix wright.wav",
            espera: "calma-la_phoenix wright.wav"
        }
    },
    {
        id: 2,
        nome: "Mia Fey",
        profissao: "Advogada de defesa",
        idade: 27,
        descricao: "Advogada de defesa, mentora de Phoenix Wright, sendo uma pessoa renomada na sua área.",
        img: "https://static.wikia.nocookie.net/legendsofthemultiuniverse/images/f/f0/Mia0.jpg/revision/latest?cb=20140620115231",
        audio: {
            protesto: "protesto_mia fey.wav",
            espera: "calma-la_mia fey.wav"
        }
    },
    {
        id: 3,
        nome: "Euclides Graça",
        profissao: "Promotor",
        idade: 52,
        descricao: "Primeiro promotor que enfrentamos nos três primeiros jogos da franquia Phoenix Wright: Ace Attorney, sendo conhecido como assasino de novatos, mas sempre perde para o protagonista",
        img: "https://static.wikia.nocookie.net/aceattorney/images/f/fa/Payne2.png/revision/latest/scale-to-width-down/250?cb=20251123171114",
        audio: {
            protesto: "protesto_euclides graca.wav",
            espera: ""
        }
    },
    {
        id: 4,
        nome: "Miles Edgeworth",
        profissao: "Promotor",
        idade: 24,
        descricao: "Promotor recorrente ao longo dos três primeiros jogos, busca a condenação dos réus a qualquer custo, mas ainda visa pela verdade acima de tudo. Foi um amigo de infência do protagonista.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqQSVV-Srfh0nDDajb9fMfck5YrVTkbeqbYg&s",
        audio: {
            protesto: "protesto_miles edgeworth.wav",
            espera: "calma-la_miles edgeworth.wav"
        }
    },
    {
        id: 5,
        nome: "Manfred Von Karma",
        profissao: "Promotor",
        idade: 65,
        descricao: "Promotor mais voraz, busca a condenação dos réus acima de tudo, mentor de Miles Edgeworth. Possui um histórico de 40 anos sem derrotas no tribunal.",
        img: "https://static.wikia.nocookie.net/aceattorney/images/f/fa/Manfred_von_Karma_OA.png/revision/latest/scale-to-width-down/1200?cb=20260112045647",
        audio: {
            protesto: "protesto_monfred von karma.wav",
            espera: ""
        }
    },
    {
        id: 6,
        nome: "Franziska Von Karma",
        profissao: "Promotora",
        idade: 18,
        descricao: "A pessoa mais nova a se tronar promotora, filha de Manfred Von Karma. Estudou na Alemanha e venceu diversos casos ao longo da sua curta carreira. Busca honrar o legado da família Von Karma e a perfeição acima de tudo.",
        img: "https://static.wikia.nocookie.net/aceattorney/images/4/43/Franzi.png/revision/latest/scale-to-width-down/1200?cb=20260111222531",
        audio: {
            protesto: "protesto_franziska von karma.wav",
            espera: ""
        }
    },
    {
        id: 7,
        nome: "Diego Armando (Godot)",
        profissao: "Promotor",
        idade: 33,
        descricao: "Promotor misterioso, viciado em café que possui uma inimizade contra Wright.",
        img: "https://upload.wikimedia.org/wikipedia/en/7/7a/Godot_Ace_Attorney.png",
        audio: {
            protesto: "protesto_diego armando (godot).wav",
            espera: ""
        }
    },
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
app.get("/personagem/id/:id",(request,response) => {
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

// GET/personagem/nome/:nome
// Método: GET
// Descrição: Pega um personagem específico pro meio do nome
app.get("/personagem/nome/:nome",(request,response) => {
    const nome = request.params.nome.trim().toLowerCase();
    const personagem = personagens.filter(
        p => p.nome.trim().toLowerCase().includes(nome)
    );

    if(personagem.length === 0) {
        response.status(404).json({
            mensagem: "Esse nome não corresponde a ninguém da lista de envolvidos com o caso."
        });
    }

    response.json(personagem);
});

// GET
// Método: GET
// Descrição: Pega um áudio de um personagem pelo nome
app.get("/personagem/audio/protesto/nome/:nome",(request,response) => {
    const nome = request.params.nome.trim().toLowerCase();
    const personagem = personagens.find(
        p => p.nome.trim().toLowerCase().includes(nome)
    );

    if(!personagem) {
        response.status(404).json({
            mensagem: "Não conseguimos escutar esse indivíduo."
        });
    }

    response.sendFile(path.join(import.meta.dirname, 'audios', personagem.audio.protesto));
});

// GET/personagens/profissao/:profissao
// Método: GET
// Decsrição: Pega um conjunto de personagens com aquela profissão
app.get("/personagens/profissao/:profissao",(request,response) => {
    const profissao = request.params.profissao.trim().toLowerCase();
    const profissionais = personagens.filter(
        p => p.profissao.trim().toLowerCase() === profissao
    );

    if(profissionais.length === 0) {
        return response.status(404).json({
            mensagem: "Essa profissão não está listada."
        });
    }

    response.json(profissionais);
});

// LISTEN Porta: 8000
// Porta: 8000
// Método: LISTEN
// Descrição: Escuta sempre que a API for chamada e informa o link do servidor
app.listen(porta,(request,response) => {
    console.log("Servidor rodando: http://127.0.0.1:8000")
});