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

    // Tillfällig utskrift för att kontrollera API-svaret / Felsökning
    console.log(data);

    messageElement.textContent = "";
  } catch (error) {
    console.error(error);
    messageElement.textContent =
      "Något gick fel när recepten skulle hämtas.";
  }
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