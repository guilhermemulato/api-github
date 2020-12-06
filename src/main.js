// Buscar usuario na API e retorna promise
function getUser(user) {
  return fetch(`https://api.github.com/users/${user}`);
}

//Gerar card
function gerarCard(nome, url, link) {
  let mainContent = document.querySelector(".main-content");

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
//Tratar retorna da API
async function pesquisar(user) {
  const userResponse = await getUser(user);
  const data = await userResponse.json();

  gerarCard(data.name, data.avatar_url, data.html_url);
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
