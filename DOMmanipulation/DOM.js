
document.addEventListener("DOMContentLoaded", () => {
  filterArticles();
});

function isShown(el) {
  return el.style.display !== "none";
}

function showElement(el, displayType = "block") {
  el.style.display = displayType;
}

function hideElement(el) {
  el.style.display = "none";
}

function toggleElement(el, displayType = "block") {
  if (getComputedStyle(el).display === "none") {
    showElement(el, displayType);
  } else {
    hideElement(el);
  }
}

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (getComputedStyle(newForm).display !== "none") {
    hideElement(newForm);
  }

  toggleElement(filterForm, "block");
}

function showAddNew() {
  const newForm = document.getElementById("newContent");
  const filterForm = document.getElementById("filterContent");

  if (getComputedStyle(filterForm).display !== "none") {
    hideElement(filterForm);
  }

  toggleElement(newForm, "flex");
}

function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  document.querySelectorAll("#articleList article").forEach((article) => {
    if (article.classList.contains("opinion")) {
      article.style.display = showOpinion ? "" : "none";
    } else if (article.classList.contains("recipe")) {
      article.style.display = showRecipe ? "" : "none";
    } else if (article.classList.contains("update")) {
      article.style.display = showUpdate ? "" : "none";
    }
  });
}

function addNewArticle() {
  const titleEl = document.getElementById("inputHeader");
  const textEl = document.getElementById("inputArticle");

  const title = titleEl.value.trim();
  const text = textEl.value.trim();

  let type = null;
  if (document.getElementById("opinionRadio").checked) type = "opinion";
  if (document.getElementById("recipeRadio").checked) type = "recipe";
  if (document.getElementById("lifeRadio").checked) type = "update"; 

  if (!title || !text || !type) {
    alert("Please enter a title, choose a type, and write text before adding.");
    return;
  }

  const articleList = document.getElementById("articleList");

  const nextId = "a" + (articleList.querySelectorAll("article").length + 1);

  const article = document.createElement("article");
  article.classList.add(type);
  article.id = nextId;

  const marker = document.createElement("span");
  marker.className = "marker";
  marker.textContent =
    type === "opinion" ? "Opinion" : type === "recipe" ? "Recipe" : "Update";

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const a = document.createElement("a");
  a.href = "moreDetails.html";
  a.textContent = "Read more...";
  pLink.appendChild(a);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  articleList.appendChild(article);

  titleEl.value = "";
  textEl.value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;

  hideElement(document.getElementById("newContent"));

  filterArticles();
}