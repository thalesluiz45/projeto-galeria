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

uploadInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (e) {
    var container = document.createElement("div");
    container.className = "imagem-container";

    var img = document.createElement("img");
    img.src = e.target.result;
    img.alt = "Imagem";

    img.addEventListener("click", function () {
      abrirModal(img.src);
    });

    container.appendChild(img);
    galeria.appendChild(container);
  };
  reader.readAsDataURL(file);
});
