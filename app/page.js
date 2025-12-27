"use client";

import { useState } from "react";

const perguntas = [
  "Eu sinto um aperto no peito ou uma sensação de sufocamento ao pensar em situações futuras ou decisões que preciso tomar.",
  "Tenho dificuldade para controlar pensamentos negativos ou preocupantes que ficam repetidamente passando pela minha cabeça.",
  "Sinto-me inquieto(a), irritado(a) ou incapaz de relaxar, mesmo em momentos que deveriam ser tranquilos.",
  "Tenho dificuldades significativas em pegar no sono ou acordo frequentemente durante a noite preocupado(a) com situações diversas.",
  "Evito situações ou tarefas cotidianas por medo excessivo ou antecipação negativa do que pode acontecer.",
  "Tenho tido pensamentos frequentes sobre não querer mais viver ou que seria melhor sumir para não enfrentar tanta ansiedade.", // FLAG
  "Sinto sintomas físicos como suor frio, tremores, enjoo ou taquicardia em momentos de tensão ou nervosismo.",
  "Minhas preocupações interferem diretamente no meu desempenho profissional ou nas minhas relações familiares e pessoais.",
  "Costumo pensar obsessivamente sobre coisas ruins que podem acontecer comigo ou com pessoas próximas.",
  "Sinto que minha ansiedade está cada vez pior e fora do meu controle.",
];

const opcoes = [
  { valor: 1, main: "Muito pouco", sub: "Nunca" },
  { valor: 2, main: "Pouco", sub: "Raramente" },
  { valor: 3, main: "Mais ou menos", sub: "Às vezes" },
  { valor: 4, main: "Muito", sub: "Frequentemente" },
  { valor: 5, main: "Demais", sub: "Sempre" },
];

const textosResultado = {
  VERDE:
    "Você lida muito bem com esse tema e está emocionalmente bem resolvido. Poderá auxiliar grandemente outras pessoas que precisam de ajuda.",
  AMARELO:
    "Há sinais evidentes de dificuldades emocionais que precisam ser trabalhadas e que, com determinação e ajuda, poderão ser superadas.",
  VERMELHO:
    "Seus problemas emocionais com este tema precisam necessariamente de ajuda profissional. Procure com brevidade a ajuda de um médico ou psicólogo.",
};

const semaforoImagem = {
  VERDE: "/images/semaforo-verde.png",
  AMARELO: "/images/semaforo-amarelo.png",
  VERMELHO: "/images/semaforo-vermelho.png",
};

function statusClass(resultado) {
  if (resultado === "VERDE") return "green";
  if (resultado === "AMARELO") return "yellow";
  return "red";
}

export default function TesteAnsiedade() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) {
      // FLAG
      setResultado("VERMELHO");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("VERDE");
      else if (soma <= 35) setResultado("AMARELO");
      else setResultado("VERMELHO");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  const total = perguntas.length;
  const etapa = indiceAtual + 1;
  const progresso = Math.round((etapa / total) * 100);

  if (resultado) {
    const status = statusClass(resultado);

    return (
      <main className="app">
        <div className="shell">
          <header className="header">
            <div className="headerRow">
              <div className="title">Teste de Ansiedade</div>
              <div className="counter">Concluído</div>
            </div>
            <div className="progressTrack">
              <div className="progressFill" style={{ width: "100%" }} />
            </div>
          </header>

          <section className={`resultHero ${status}`}>
            <h2 className="resultTitle">Resultado: {resultado}</h2>
          </section>

          <section className="card">
            <img
              src={semaforoImagem[resultado]}
              alt={`Indicador ${resultado}`}
              className="resultImage"
            />

            <p className="resultText">{textosResultado[resultado]}</p>

            <div className="actions">
              <button className="primaryBtn" onClick={reiniciarTeste}>
                Refazer teste
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="shell">
        <header className="header">
          <div className="headerRow">
            <div className="title">Teste de Ansiedade</div>
            <div className="counter">
              {etapa}/{total}
            </div>
          </div>
          <div className="progressTrack">
            <div className="progressFill" style={{ width: `${progresso}%` }} />
          </div>
        </header>

        <section className="card">
          <p className="instruction">
            Indique com que frequência cada situação acontece com você atualmente.
            <br />
            <strong>
              (1) Nunca | (2) Raramente | (3) Às vezes | (4) Frequentemente | (5)
              Sempre
            </strong>
          </p>
          <h2 className="question">{perguntas[indiceAtual]}</h2>
        </section>

        <section className="answers">
          {opcoes.map((opt) => (
            <button
              key={opt.valor}
              className="answerBtn"
              onClick={() => registrarResposta(opt.valor)}
              aria-label={`Responder ${opt.sub} (${opt.valor})`}
            >
              <span className="answerLabel">
                <span className="answerMain">{opt.main}</span>
                <span className="answerSub">{opt.sub}</span>
              </span>
              <span className="badge">{opt.valor}</span>
            </button>
          ))}
        </section>

        <div className="footerNote">Toque em uma opção para avançar.</div>
      </div>
    </main>
  );
}
