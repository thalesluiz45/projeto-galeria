var galeria = document.getElementById("galeria");
var modal = document.getElementById("modal");
var imgModal = document.getElementById("imgModal");
var fechar = document.getElementById("fechar");
var uploadInput = document.getElementById("upload");

function abrirModal(src) {
  modal.style.display = "block";
  imgModal.src = src;
}

fechar.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function criarContainerImagem(src, salvar, index) {
  var container = document.createElement("div");
  container.className = "imagem-container";

  var img = document.createElement("img");
  img.src = src;
  img.alt = "Imagem";

  img.addEventListener("click", function () {
    abrirModal(img.src);
  });

  var btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "btn-remover";

  btnRemover.addEventListener("click", function (e) {
    e.stopPropagation();
    container.remove();
    if (index !== null) {
      removerImagemDoLocalStoragePorIndice(index);
      recarregarGaleria();
    }
  });

  container.appendChild(img);
  container.appendChild(btnRemover);
  galeria.appendChild(container);

  if (salvar !== false) {
    salvarImagemNoLocalStorage(src);
  }
}

uploadInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (e) {
    salvarImagemNoLocalStorage(e.target.result);
    recarregarGaleria();
  };
  reader.readAsDataURL(file);
});

function salvarImagemNoLocalStorage(src) {
  var imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  imagens.push(src);
  localStorage.setItem("galeriaImagens", JSON.stringify(imagens));
}

function removerImagemDoLocalStoragePorIndice(index) {
  var imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  imagens.splice(index, 1);
  localStorage.setItem("galeriaImagens", JSON.stringify(imagens));
}

function recarregarGaleria() {
  galeria.innerHTML = "";
  var imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  for (var i = 0; i < imagens.length; i++) {
    criarContainerImagem(imagens[i], false, i);
  }
}

// Inicializa
recarregarGaleria();
