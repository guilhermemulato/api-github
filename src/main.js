// Buscar usuario na API e retorna promise
function getUser(user) {
  return fetch(`https://api.github.com/users/${user}`);
}

//Buscar repositorios na API e retorna promise
function getRepo(user) {
  return fetch(`https://api.github.com/users/${user}/repos`);
}

//Gerar card usuario perfil
function gerarCardUser(nome, url, link) {
  let mainContent = document.querySelector("#test-swipe-1");
  mainContent.innerHTML = "";

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");

  let divImage = document.createElement("div");
  divImage.setAttribute("class", "card-image");
  let img = document.createElement("img");
  img.setAttribute("src", url);
  img.setAttribute("alt", nome);
  divImage.appendChild(img);
  divCard.appendChild(divImage);

  let divStacked = document.createElement("div");
  divStacked.setAttribute("class", "card-stacked");
  let divContent = document.createElement("div");
  divContent.setAttribute("class", "card-content");
  let p = document.createElement("p");
  let pNome = document.createTextNode(nome);
  p.appendChild(pNome);
  divContent.appendChild(p);
  divStacked.appendChild(divContent);
  divCard.appendChild(divStacked);

  let divAction = document.createElement("div");
  divAction.setAttribute("class", "card-action");
  let a = document.createElement("a");
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");
  let aTxt = document.createTextNode("Acessar Perfil");
  a.appendChild(aTxt);
  divAction.appendChild(a);
  divCard.appendChild(divAction);

  mainContent.appendChild(divCard);
}

function gerarCardRepo(nome, descricao, link, dataCriacao) {
  let mainContent = document.querySelector("#tab-repo");

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");

  let divContent = document.createElement("div");
  divContent.setAttribute("class", "card-content");
  let spanContent = document.createElement("span");
  spanContent.setAttribute("class", "card-title");
  let txtSpan = document.createTextNode(nome);
  spanContent.appendChild(txtSpan);
  let pContent = document.createElement("p");
  let txtP = document.createTextNode(descricao);
  pContent.appendChild(txtP);
  divContent.appendChild(spanContent);
  divContent.appendChild(pContent);
  divCard.appendChild(divContent);

  let divAction = document.createElement("div");
  divAction.setAttribute("class", "card-action");
  let aActionCreate = document.createElement("a");
  let txtACreate = document.createTextNode(`CRIAÇÃO: ${dataCriacao}`);
  aActionCreate.appendChild(txtACreate);
  let aActionLink = document.createElement("a");
  aActionLink.setAttribute("href", link);
  aActionLink.setAttribute("target", "_blank");
  let txtALink = document.createTextNode("Acessar");
  aActionLink.appendChild(txtALink);
  divAction.appendChild(aActionCreate);
  divAction.appendChild(aActionLink);
  divCard.appendChild(divAction);

  mainContent.appendChild(divCard);
}

//Tratar retorna da API
async function pesquisar(user) {
  const userResponse = await getUser(user);
  const repoResponse = await getRepo(user);
  const dataUser = await userResponse.json();
  const dataRepo = await repoResponse.json();

  gerarCardUser(dataUser.name, dataUser.avatar_url, dataUser.html_url);

  let mainContent = document.querySelector("#tab-repo");
  mainContent.innerHTML = "";

  dataRepo.forEach((ele) => {
    gerarCardRepo(ele.name, ele.description, ele.html_url, ele.created_at);
  });
}

//  EVENTOS

//Evento de clique no pesquisar
const btn = document.querySelector("button[name=pesquisar]");
const inputText = document.querySelector("#input-user");

btn.onclick = (evento) => {
  if (inputText.value) {
    pesquisar(inputText.value);
    inputText.value = "";
  } else {
    alert("Digite um Usuário!");
  }
};

window.onload = function () {
  let aBtn = document.querySelectorAll(".collection-item");

  aBtn.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      aBtn.forEach((ele) => {
        ele.classList.remove("active");
      });

      this.classList.add("active");

      //toggle add e tira se nao tiver
    });
  });
};
