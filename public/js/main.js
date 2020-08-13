const recipes = document.querySelectorAll('.card');

for (let recipe of recipes) {
  recipe.addEventListener("click", () => {
    const recipeIndex = recipe.getAttribute("id");
    window.location.href = `/recipe/${recipeIndex}`;
  });
}

const showHides = document.getElementsByClassName('topic');

for (let showHide of showHides) {
  const buttonSpan = showHide.querySelector('span');

  buttonSpan.addEventListener('click', () => {
    if (buttonSpan.innerHTML == "ESCONDER") {
      showHide.querySelector('.topic-content').classList.add('hidden');
      buttonSpan.innerHTML = "MOSTRAR"   
    } else {
      showHide.querySelector('.topic-content').classList.remove('hidden');
      buttonSpan.innerHTML = "ESCONDER"
    }
  });
}

// Add button
function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient);

function addPrepare() {
  const prepares = document.querySelector("#prepare");
  const fieldContainer = document.querySelectorAll(".prepareField");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  prepares.appendChild(newField);
}
document.querySelector(".add-prepare").addEventListener("click", addPrepare);