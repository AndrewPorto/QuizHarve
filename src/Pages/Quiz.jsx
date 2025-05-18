import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Quiz = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [respostasSelecionadas, setRespostasSelecionadas] = useState([]);
  const [position, setPosition] = useState(0)


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


  const handleRespostaSelecionada = (perguntaId, respostaId) => {
    setRespostasSelecionadas((prev) => ({
      ...prev,
      [perguntaId]: respostaId,
    }));
  };

    const moverToLeft = () => {
    setPosition((prevDeslocamento) => prevDeslocamento + 450);
  };

  const moverToRight = () => {
    setPosition((prevDeslocamento) => prevDeslocamento - 450);
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
          <div key={pergunta.id} className="quest"
          style={{
          transform: `translateX(${position}px)`,
          transition: 'transform 0.5s ease', // Adiciona transição suave
        }}
          
          >
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
        <button onClick={moverToLeft}>4</button>
        <button className="btn" onClick={verificarResultado}>
          Ver Resultado
        </button>
        <button onClick={moverToRight}>6</button>
      </div>
    </div>
  );
};

export default Quiz;
