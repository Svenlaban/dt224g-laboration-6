"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Micael Huczkowski
 */

// Hämtar HTML element
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorElement = document.querySelector("#error");
const messageElement = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");

/**
 * Hämtar recept från API:t.
 * @param {string} searchTerm
 */
async function searchRecipes(searchTerm) {
  // Visar att sökningen har startat
  messageElement.textContent = "Söker efter recept...";

  try {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`
    );

    // Genererar ett felmeddelande om servern inte svarar korrekt
    if (!response.ok) {
      throw new Error("API-anropet misslyckades.");
    }

    // Omvandlar JSON-svaret till ett JavaScript-objekt
    const data = await response.json();

    // Kollar om sökningen gav några recept
    if (data.recipes.length === 0) {
      messageElement.textContent = "Inga recept hittades.";
      recipeSection.innerHTML = "";
      return;
    }

    // Hämtar det första receptet i sökningen
    const recipe = data.recipes[0];

    // Visar receptet
    displayRecipe(recipe);

    messageElement.textContent = "";
  } catch (error) {
    console.error(error);
    recipeSection.innerHTML = "";
    messageElement.textContent =
      "Något gick fel när recepten skulle hämtas.";
  }
}

/**
 * Skapar och visar ett recept på webbsidan.
 * @param {object} recipe
 */
function displayRecipe(recipe) {
  // Tar bort ett tidigare visat recept
  recipeSection.innerHTML = "";

  // Skapar receptets HTML-element
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const image = document.createElement("img");
  const recipeInfo = document.createElement("div");

  // Ger inforutan samma klass som finns i CSS-filen
  recipeInfo.classList.add("recipe-info");

  // Lägger in receptets information
  heading.textContent = recipe.name;
  image.src = recipe.image;
  image.alt = recipe.name;

  // Skapar information om receptet
  const servings = document.createElement("p");
  const prepTime = document.createElement("p");
  const cookTime = document.createElement("p");
  const difficulty = document.createElement("p");

  servings.innerHTML = "<strong>Servings:</strong> " + recipe.servings;

  prepTime.innerHTML =
    "<strong>Prep time:</strong> " +
    recipe.prepTimeMinutes +
    " minutes";

  cookTime.innerHTML =
    "<strong>Cooking time:</strong> " +
    recipe.cookTimeMinutes +
    " minutes";

  difficulty.innerHTML =
    "<strong>Difficulty:</strong> " + recipe.difficulty;

  // Lägger informationen i informationsrutan
  recipeInfo.appendChild(servings);
  recipeInfo.appendChild(prepTime);
  recipeInfo.appendChild(cookTime);
  recipeInfo.appendChild(difficulty);

  // Skapar rubrik och lista för ingredienser
  const ingredientsHeading = document.createElement("h4");
  const ingredientsList = document.createElement("ul");

  ingredientsHeading.textContent = "Ingredients";

  // Skapar ett listelement för varje ingrediens
  for (let index = 0; index < recipe.ingredients.length; index++) {
    const listItem = document.createElement("li");
    listItem.textContent = recipe.ingredients[index];
    ingredientsList.appendChild(listItem);
  }

  // Skapar rubrik och lista för instruktionerna
  const instructionsHeading = document.createElement("h4");
  const instructionsList = document.createElement("ol");

  instructionsHeading.textContent = "Instructions";

  // Skapar ett listelement för varje instruktion
  for (let index = 0; index < recipe.instructions.length; index++) {
    const listItem = document.createElement("li");
    listItem.textContent = recipe.instructions[index];
    instructionsList.appendChild(listItem);
  }

  // Lägger elementen i artikeln
  article.appendChild(heading);
  article.appendChild(image);
  article.appendChild(recipeInfo);
  article.appendChild(ingredientsHeading);
  article.appendChild(ingredientsList);
  article.appendChild(instructionsHeading);
  article.appendChild(instructionsList);

  // Lägger artikeln i receptsektionen
  recipeSection.appendChild(article);
}

// Hanterar formuläret för receptsökning
searchForm.addEventListener("submit", function (event) {
  // Förhindrar att sidan laddas om när formuläret skickas
  event.preventDefault();

  // Tar bort tidigare felmeddelanden och meddelanden
  errorElement.textContent = "";
  messageElement.textContent = "";

  // Hämtar sökordet och tar bort mellanslag runt texten
  const searchTerm = searchInput.value.trim();

  // Ger felmeddelande om fältet är tomt
  if (searchTerm === "") {
    errorElement.textContent = "Du måste ange ett recept att söka efter.";
    return;
  }

  searchRecipes(searchTerm);
});