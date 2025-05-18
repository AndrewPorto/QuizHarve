import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState([]);

  // Função para buscar as perguntas da API
  useEffect(() => {
    axios
      .get("http://localhost:3000/perguntas")
      .then((response) => {
        setPerguntas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
      });
  }, []);

  // Função para lidar com a seleção de respostas
  const handleRespostaSelecionada = (perguntaId, respostaId) => {
    setRespostasSelecionadas((prev) => ({
      ...prev,
      [perguntaId]: respostaId,
    }));
  };

  const verificarResultado = () => {
    let acertos = 0;
    perguntas.forEach((pergunta) => {
      const respostaSelecionada = respostasSelecionadas[pergunta.id];
      const respostaCorreta = pergunta.respostas.find((r) => r.is_correta);
      if (respostaSelecionada === respostaCorreta.id) {
        acertos++;
      }
    });
    alert(`Você acertou ${acertos} de ${perguntas.length} perguntas.`);
  };

  return (
    <div className="container">
      <h1 className="">Quiz de Front-End</h1>
      <div className="quests">
        {perguntas.map((pergunta) => (
          <div key={pergunta.id} className="quest">
            <h3 className="title">{pergunta.pergunta}</h3>
            {pergunta.respostas.map((resposta) => (
              <div key={resposta.id}>
                <input
                  type="radio"
                  id={`pergunta-${pergunta.id}-resposta-${resposta.id}`}
                  name={`pergunta-${pergunta.id}`}
                  value={resposta.id}
                  onChange={() =>
                    handleRespostaSelecionada(pergunta.id, resposta.id)
                  }
                />
                <label
                  htmlFor={`pergunta-${pergunta.id}-resposta-${resposta.id}`}
                >
                  {resposta.resposta}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="btn">
        <button>4</button>
        <button className="btn" onClick={verificarResultado}>
          Ver Resultado
        </button>
        <button>6</button>
      </div>
    </div>
  );
};

export default Quiz;
