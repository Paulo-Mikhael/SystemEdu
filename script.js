const formNome = document.querySelector("#form_nome");
const formDataNascimento = document.querySelector("#form_data_nascimento");
const formCpf = document.querySelector("#form_cpf");
const formSexo = document.querySelector("#form_sexo");
const formEmail = document.querySelector("#form_email");
const formTelefone = document.querySelector("#form_telefone");
const formCep = document.querySelector("#form_cep");
const formDataMatricula = document.querySelector("#form_data_matricula");

const formButton = document.querySelector("#form_btn");
const tableBody = document.querySelector("#students-table-body");

const contador = document.querySelector("#contadorAlunos");
const tableCount = document.querySelector("#table-count");

let registros = 0;

formButton.addEventListener("click", (evt) => {
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
        <button class="edit">✎</button>
        <button class="delete">♜</button>
      </div>
    </td>
  `;
  const perfil = `
    <td>
      <div class="student-name">
        <div class="student-avatar avatar-blue">${inputs[0].value[0].toUpperCase()}</div>

        <strong>${inputs[0].value}</strong>
      </div>
    </td>
  `;

  let linha = "";

  for (let i = 0; i < inputs.length; i++) {
    inputAtual = inputs[i];
    texto = inputAtual.value;

    if (inputAtual == formNome) {
      linha += perfil;
      continue;
    }

    const cor = texto.toLowerCase() == "feminino" ? "female" : "male";
    if (inputAtual == formSexo) {
      linha += `
        <td>\
          <span class="gender ${cor}"> ${texto} </span>
        </td>
      `;
      continue;
    }

    linha += `<td>${texto}</td>`;
  }

  linha += acoes;

  linha = `<tr>${linha}</tr>`;

  tableBody.innerHTML += linha;
  registros++;

  contador.textContent = `Mostrando ${registros} alunos`;
  tableCount.textContent = `(${registros})`;
});
