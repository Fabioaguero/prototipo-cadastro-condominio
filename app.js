// ===== LocalStorage helpers =====
function getMoradores() {
  return JSON.parse(localStorage.getItem("moradores") || "[]");
}

function saveMorador(morador) {
  const lista = getMoradores();
  lista.push(morador);
  localStorage.setItem("moradores", JSON.stringify(lista));
}

// ===== Adicionar Pet =====
function addPet() {
  const div = document.createElement("div");
  div.className = "section pet-item";
  div.innerHTML = `
    <input placeholder="Tipo do Pet" class="tipo">
    <input placeholder="Raça" class="raca">
    <input placeholder="Quantidade" type="number" class="quantidade">
  `;
  document.getElementById("pets").appendChild(div);
}

// ===== Adicionar Carro =====
function addCarro() {
  const div = document.createElement("div");
  div.className = "section carro-item";
  div.innerHTML = `
    <input placeholder="Marca" class="marca">
    <input placeholder="Modelo" class="modelo">
    <input placeholder="Placa" class="placa">
    <input placeholder="Cor" class="cor">
  `;
  document.getElementById("carros").appendChild(div);
}

// ===== Cadastro =====
function cadastrar(e) {
  e.preventDefault();

  const morador = {
    nome: nome.value,
    apartamento: apartamento.value,
    bloco: bloco.value,
    pets: [],
    carros: []
  };

  document.querySelectorAll(".pet-item").forEach(p => {
    morador.pets.push({
      tipo: p.querySelector(".tipo").value,
      raca: p.querySelector(".raca").value,
      quantidade: p.querySelector(".quantidade").value
    });
  });

  document.querySelectorAll(".carro-item").forEach(c => {
    morador.carros.push({
      marca: c.querySelector(".marca").value,
      modelo: c.querySelector(".modelo").value,
      placa: c.querySelector(".placa").value,
      cor: c.querySelector(".cor").value
    });
  });

  saveMorador(morador);
  alert("Cadastrado (protótipo)!");
  e.target.reset();
}

// ===== Login fake =====
function login(e) {
  e.preventDefault();
  if (email.value === "admin" && senha.value === "123") {
    localStorage.setItem("logado", "sim");
    window.location = "admin.html";
  } else {
    alert("Login inválido");
  }
}

// ===== Listagem Admin =====
function carregarTabela() {
  if (localStorage.getItem("logado") !== "sim") {
    window.location = "login.html";
  }

  const tabela = document.getElementById("tabela");
  const moradores = getMoradores();

  moradores.forEach(m => {
    const pets = m.pets.map(p => `${p.tipo} (${p.raca}) x${p.quantidade}`).join(", ");
    const carros = m.carros.map(c => `${c.marca} ${c.modelo} - ${c.placa}`).join(", ");

    tabela.innerHTML += `
      <tr>
        <td>${m.nome}</td>
        <td>${m.apartamento}</td>
        <td>${m.bloco}</td>
        <td>${pets}</td>
        <td>${carros}</td>
      </tr>
    `;
  });
}
