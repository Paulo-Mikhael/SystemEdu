const estiloTeste = document.createElement("style");
estiloTeste.textContent = `
  #teste-flutuante {
    position: fixed;
    left: 20px;
    bottom: 20px;
    z-index: 1000;
    padding: 12px 16px;
    border: 0;
    border-radius: 999px;
    background: #2563eb;
    color: #fff;
    font: 600 14px sans-serif;
    cursor: pointer;
    box-shadow: 0 4px 14px rgb(0 0 0 / 20%);
  }

  #painel-scripts {
    position: fixed;
    left: 20px;
    bottom: 76px;
    z-index: 1000;
    display: none;
    min-width: 220px;
    padding: 14px;
    border: 1px solid #dbe3ef;
    border-radius: 12px;
    background: #fff;
    color: #172033;
    font: 14px sans-serif;
    box-shadow: 0 8px 24px rgb(0 0 0 / 16%);
  }

  #painel-scripts.aberto { display: block; }
  #painel-scripts strong { display: block; margin-bottom: 8px; }
  #painel-scripts a { display: block; padding: 5px 0; color: #2563eb; }
`;
document.head.append(estiloTeste);

const botaoTeste = document.createElement("button");
botaoTeste.id = "teste-flutuante";
botaoTeste.type = "button";
botaoTeste.textContent = "Preencher Dados";
botaoTeste.setAttribute("aria-expanded", "false");
botaoTeste.setAttribute("aria-controls", "painel-scripts");
botaoTeste.addEventListener("click", preencherFormularioTeste);

const painelScripts = document.createElement("div");
painelScripts.id = "painel-scripts";
painelScripts.setAttribute("aria-label", "Scripts da página");
painelScripts.innerHTML = "<strong>Scripts carregados</strong>";

document.body.append(painelScripts, botaoTeste);

function preencherFormularioTeste() {
  const dadosTeste = {
    form_nome: "Ana Silva",
    form_data_nascimento: "2005-04-12",
    form_cpf: "12345678909",
    form_sexo: "feminino",
    form_email: "ana.silva@example.com",
    form_telefone: "92999998888",
    form_cep: "69000000",
    form_data_matricula: "2026-10-18",
  };

  for (const [id, valor] of Object.entries(dadosTeste)) {
    const campo = document.getElementById(id);
    if (!campo) continue;

    campo.value = valor;
    const tipoEvento = campo.tagName === "SELECT" ? "change" : "input";
    campo.dispatchEvent(new Event(tipoEvento, { bubbles: true }));
  }
}
