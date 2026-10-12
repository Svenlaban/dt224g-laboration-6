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

  // Log för felsökning / testa att den faktiskt fungerar
  console.log("Söker efter:", searchTerm);
});