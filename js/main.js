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

// Hämtar recept från API @param {string} searchTerm
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

    // Tillfällig utskrift för att kontrollera API-svaret / Felsökning
    console.log(recipe);
    

    messageElement.textContent = "";
  } catch (error) {
    console.error(error);
    messageElement.textContent =
      "Något gick fel när recepten skulle hämtas.";
  }
}

// Visar receptet på webbsidan
function displayRecipe(recipe) {
  // Tar bort ett tidigare visat recept
  recipeSection.innerHTML = "";

  // Skapar receptets HTML-element
  const article = document.createElement("article");
  const heading = document.createElement("h3");
  const image = document.createElement("img");

  // Lägger in receptets information
  heading.textContent = recipe.name;
  image.src = recipe.image;
  image.alt = recipe.name;

  // Lägger elementen i artikeln
  article.appendChild(heading);
  article.appendChild(image);

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