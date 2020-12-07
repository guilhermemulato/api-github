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

function gerarTabAdic(
  login,
  bio,
  email,
  redeSocial,
  publicacoes,
  seguidores,
  dataCriacao,
  dataUpdate
) {
  let mainContent = document.querySelector("#tab-adicionais");
  mainContent.innerHTML = "";

  let list = document.createElement("ul");
  list.setAttribute("class", "collection");

  let liLogin = document.createElement("li");
  liLogin.setAttribute("class", "collection-item");
  let txtLogin = document.createTextNode(`Login: ${login}`);
  liLogin.appendChild(txtLogin);
  list.appendChild(liLogin);

  let liBio = document.createElement("li");
  liBio.setAttribute("class", "collection-item");
  let txtBio = document.createTextNode(`Bio: ${bio}`);
  liBio.appendChild(txtBio);
  list.appendChild(liBio);

  let liEmail = document.createElement("li");
  liEmail.setAttribute("class", "collection-item");
  let txtEmail = document.createTextNode(`Email: ${email}`);
  liEmail.appendChild(txtEmail);
  list.appendChild(liEmail);

  let liBlog = document.createElement("li");
  liBlog.setAttribute("class", "collection-item");
  let txtBlog = document.createTextNode(`Blog: ${redeSocial}`);
  liBlog.appendChild(txtBlog);
  list.appendChild(liBlog);

  let liPublic = document.createElement("li");
  liPublic.setAttribute("class", "collection-item");
  let txtPublic = document.createTextNode(`Publicações: ${publicacoes}`);
  liPublic.appendChild(txtPublic);
  list.appendChild(liPublic);

  let liSeguidores = document.createElement("li");
  liSeguidores.setAttribute("class", "collection-item");
  let txtSeguidores = document.createTextNode(`Seguidores: ${seguidores}`);
  liSeguidores.appendChild(txtSeguidores);
  list.appendChild(liSeguidores);

  let liCriacao = document.createElement("li");
  liCriacao.setAttribute("class", "collection-item");
  let txtCriacao = document.createTextNode(`Desde de: ${dataCriacao}`);
  liCriacao.appendChild(txtCriacao);
  list.appendChild(liCriacao);

  let liUpdate = document.createElement("li");
  liUpdate.setAttribute("class", "collection-item");
  let txtUpdate = document.createTextNode(`Ultimo Acesso: ${dataUpdate}`);
  liUpdate.appendChild(txtUpdate);
  list.appendChild(liUpdate);

  mainContent.appendChild(list);
}

//Tratar retorna da API
async function pesquisar(user) {
  const userResponse = await getUser(user);
  const repoResponse = await getRepo(user);
  const dataUser = await userResponse.json();
  const dataRepo = await repoResponse.json();

  let mainContent = document.querySelector("#tab-repo");
  mainContent.innerHTML = "";

  gerarCardUser(dataUser.name, dataUser.avatar_url, dataUser.html_url);

  dataRepo.forEach((ele) => {
    gerarCardRepo(ele.name, ele.description, ele.html_url, ele.created_at);
  });

  gerarTabAdic(
    dataUser.login,
    dataUser.bio,
    dataUser.email,
    dataUser.blog,
    dataUser.public_repos,
    dataUser.followers,
    dataUser.created_at,
    dataUser.updated_at
  );
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
