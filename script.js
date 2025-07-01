const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const imgModal = document.getElementById("imgModal");
const fechar = document.getElementById("fechar");
const uploadInput = document.getElementById("upload");

function abrirModal(src) {
  modal.style.display = "block";
  imgModal.src = src;
}

fechar.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Criar imagem com botão de remoção
function criarContainerImagem(src, salvar = true, index = null) {
  const container = document.createElement("div");
  container.classList.add("imagem-container");

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Imagem";
  img.addEventListener("click", () => abrirModal(img.src));

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("btn-remover");
  btnRemover.addEventListener("click", (e) => {
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

  if (salvar) salvarImagemNoLocalStorage(src);
}

// Upload de imagem
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    salvarImagemNoLocalStorage(e.target.result);
    recarregarGaleria();
  };
  reader.readAsDataURL(file);
});

// LocalStorage
function salvarImagemNoLocalStorage(src) {
  let imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  imagens.push(src);
  localStorage.setItem("galeriaImagens", JSON.stringify(imagens));
}

function removerImagemDoLocalStoragePorIndice(index) {
  let imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  imagens.splice(index, 1);
  localStorage.setItem("galeriaImagens", JSON.stringify(imagens));
}

function recarregarGaleria() {
  galeria.innerHTML = ""; // limpa a galeria inteira
  const imagens = JSON.parse(localStorage.getItem("galeriaImagens")) || [];
  imagens.forEach((src, index) => criarContainerImagem(src, false, index));
}

// Inicializa
recarregarGaleria();
