const formNome = document.querySelector("#form_nome");
const formDataNascimento = document.querySelector("#form_data_nascimento");
const formCpf = document.querySelector("#form_cpf");
const formSexo = document.querySelector("#form_sexo");
const formEmail = document.querySelector("#form_email");
const formTelefone = document.querySelector("#form_telefone");
const formCep = document.querySelector("#form_cep");
const formDataMatricula = document.querySelector("#form_data_matricula");

const cadastroForm = document.querySelector("#formCadastro");
const botaoCadastro = document.querySelector("#form_btn");
const botaoCancelarEdicao = document.querySelector("#cancelar-edicao");
const tituloFormulario = document.querySelector("#titulo-formulario");
const tableBody = document.querySelector("#students-table-body");

const contador = document.querySelector("#contadorAlunos");
const tableCount = document.querySelector("#table-count");

let registros = 0;
let linhaEmEdicao = null;
let atualizacaoConfirmada = false;

function atualizarContadores() {
  contador.textContent = `Mostrando ${registros} alunos`;
  tableCount.textContent = `(${registros})`;
}

function cancelarEdicao() {
  linhaEmEdicao = null;
  cadastroForm.reset();
  botaoCadastro.textContent = "Cadastrar Aluno";
  botaoCancelarEdicao.hidden = true;
  tituloFormulario.textContent = "Novo Aluno";
}

function escaparHtml(valor) {
  return valor.replace(
    /[&<>"']/g,
    (caractere) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[caractere],
  );
}

formCpf.addEventListener("input", () => {
  const digitos = formCpf.value.replace(/\D/g, "").slice(0, 11);
  formCpf.value = digitos
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

formCep.addEventListener("input", () => {
  const digitos = formCep.value.replace(/\D/g, "").slice(0, 8);
  formCep.value = digitos.replace(/(\d{5})(\d)/, "$1-$2");
});

formTelefone.addEventListener("input", () => {
  const digitos = formTelefone.value.replace(/\D/g, "").slice(0, 11);
  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);

  if (digitos.length <= 2) {
    formTelefone.value = ddd ? `(${ddd}` : "";
    return;
  }

  const partePrincipal = numero.slice(0, digitos.length > 10 ? 5 : 4);
  const parteFinal = digitos.length > 10 ? numero.slice(5) : numero.slice(4);
  formTelefone.value = `(${ddd}) ${partePrincipal}${parteFinal ? `-${parteFinal}` : ""}`;
});

tableBody.addEventListener("click", (evt) => {
  const botao = evt.target.closest("button");
  if (!botao) return;

  const linha = botao.closest("tr");
  if (!linha) return;

  if (botao.classList.contains("delete")) {
    if (linha === linhaEmEdicao) {
      cancelarEdicao();
    }
    linha.remove();
    registros--;
    atualizarContadores();
    return;
  }

  if (botao.classList.contains("edit")) {
    const celulas = linha.cells;
    formNome.value = celulas[0].querySelector("strong").textContent;
    formDataNascimento.value = celulas[1].textContent
      .trim()
      .split("/")
      .reverse()
      .join("-");
    formCpf.value = celulas[2].textContent.trim();
    formSexo.value = celulas[3].textContent.trim().toLowerCase();
    formEmail.value = celulas[4].textContent.trim();
    formTelefone.value = celulas[5].textContent.trim();
    formCep.value = celulas[6].textContent.trim();
    formDataMatricula.value = celulas[7].textContent
      .trim()
      .split("/")
      .reverse()
      .join("-");

    linhaEmEdicao = linha;
    botaoCadastro.textContent = "Salvar Alterações";
    botaoCancelarEdicao.hidden = false;
    tituloFormulario.textContent = "Atualizando Cadastro";
    formNome.focus();
  }
});

botaoCancelarEdicao.addEventListener("click", cancelarEdicao);

cadastroForm.addEventListener("submit", (evt) => {
  if (linhaEmEdicao && !atualizacaoConfirmada) {
    evt.preventDefault();
    let confirmacao;
    confirmacao = modal(
      "Confirmação",
      "Você está atualizando um registro. Deseja prosseguir?",
      [
        {
          title: "Atualizar cadastro",
          onClick: () => {
            confirmacao.fechar();
            atualizacaoConfirmada = true;
            cadastroForm.requestSubmit();
          },
        },
      ],
    );
    return;
  }

  atualizacaoConfirmada = false;
  evt.preventDefault();
  const inputs = [
    formNome,
    formDataNascimento,
    formCpf,
    formSexo,
    formEmail,
    formTelefone,
    formCep,
    formDataMatricula,
  ];

  const acoes = `
    <td>
      <div class="actions">
        <button type="button" class="edit" aria-label="Editar aluno">✎</button>
        <button type="button" class="delete" aria-label="Excluir aluno">♜</button>
      </div>
    </td>
  `;
  const perfil = `
    <td>
      <div class="student-name">
        <div class="student-avatar avatar-blue">${escaparHtml(inputs[0].value[0].toUpperCase())}</div>

        <strong>${escaparHtml(inputs[0].value)}</strong>
      </div>
    </td>
  `;

  let linha = "";

  for (let i = 0; i < inputs.length; i++) {
    const inputAtual = inputs[i];
    const texto = inputAtual.value;

    if (inputAtual == formNome) {
      linha += perfil;
      continue;
    }

    const cor = texto.toLowerCase() == "feminino" ? "female" : "male";
    if (inputAtual == formSexo) {
      linha += `
        <td>\
          <span class="gender ${cor}"> ${escaparHtml(texto)} </span>
        </td>
      `;
      continue;
    }

    if (inputAtual === formDataNascimento || inputAtual === formDataMatricula) {
      const dataFormatada = texto.split("-").reverse().join("/");
      linha += `<td>${escaparHtml(dataFormatada)}</td>`;
      continue;
    }

    linha += `<td>${escaparHtml(texto)}</td>`;
  }

  linha += acoes;

  linha = `<tr>${linha}</tr>`;

  const modeloLinha = document.createElement("template");
  modeloLinha.innerHTML = linha.trim();
  const novaLinha = modeloLinha.content.firstElementChild;

  if (linhaEmEdicao) {
    linhaEmEdicao.replaceWith(novaLinha);
  } else {
    tableBody.append(novaLinha);
    registros++;
  }

  atualizarContadores();
  cancelarEdicao();
});
