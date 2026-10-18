const estiloModal = document.createElement("style");
estiloModal.textContent = `
  .modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgb(15 23 42 / 55%);
  }

  .modal-dialogo {
    width: min(100%, 480px);
    border-radius: 12px;
    background: #fff;
    color: #172033;
    box-shadow: 0 20px 50px rgb(0 0 0 / 24%);
  }

  .modal-cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border-bottom: 1px solid #e2e8f0;
  }

  .modal-titulo { margin: 0; font: 600 18px sans-serif; }

  .modal-fechar {
    border: 0;
    background: transparent;
    color: #52657d;
    font: 24px sans-serif;
    cursor: pointer;
  }

  .modal-conteudo { min-height: 40px; padding: 20px; }
  .modal-texto { margin: 0; line-height: 1.5; }
  .modal-acoes {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 20px 20px;
  }
  .modal-acao {
    padding: 9px 14px;
    border: 0;
    border-radius: 6px;
    background: #2563eb;
    color: #fff;
    font: 600 14px sans-serif;
    cursor: pointer;
  }
  .modal-acao:hover { background: #1d4ed8; }
`;
document.head.append(estiloModal);

const modal = (titulo, texto, botoes = []) => {
  document.querySelector(".modal-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "presentation");

  const dialogo = document.createElement("section");
  dialogo.className = "modal-dialogo";
  dialogo.setAttribute("role", "dialog");
  dialogo.setAttribute("aria-modal", "true");
  dialogo.setAttribute("aria-labelledby", "modal-titulo");

  const cabecalho = document.createElement("header");
  cabecalho.className = "modal-cabecalho";

  const tituloModal = document.createElement("h2");
  tituloModal.className = "modal-titulo";
  tituloModal.id = "modal-titulo";
  tituloModal.textContent = titulo || "Aviso";

  const botaoFechar = document.createElement("button");
  botaoFechar.className = "modal-fechar";
  botaoFechar.type = "button";
  botaoFechar.setAttribute("aria-label", "Fechar modal");
  botaoFechar.textContent = "×";

  const conteudo = document.createElement("div");
  conteudo.className = "modal-conteudo";
  const textoModal = document.createElement("p");
  textoModal.className = "modal-texto";
  textoModal.textContent = texto || "";
  conteudo.append(textoModal);

  const acoes = document.createElement("div");
  acoes.className = "modal-acoes";
  for (const acao of botoes) {
    if (typeof acao?.title !== "string" || typeof acao.onClick !== "function")
      continue;

    const botaoAcao = document.createElement("button");
    botaoAcao.className = "modal-acao";
    botaoAcao.type = "button";
    botaoAcao.textContent = acao.title;
    botaoAcao.addEventListener("click", acao.onClick);
    acoes.append(botaoAcao);
  }

  cabecalho.append(tituloModal, botaoFechar);
  dialogo.append(cabecalho, conteudo, acoes);
  overlay.append(dialogo);
  document.body.append(overlay);

  function fecharModal() {
    overlay.remove();
    document.removeEventListener("keydown", aoPressionarTecla);
  }

  function aoPressionarTecla(evento) {
    if (evento.key === "Escape") fecharModal();
  }

  botaoFechar.addEventListener("click", fecharModal);
  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) fecharModal();
  });
  document.addEventListener("keydown", aoPressionarTecla);
  botaoFechar.focus();

  return { elemento: overlay, fechar: fecharModal };
};
