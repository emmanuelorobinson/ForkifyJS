import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

if (module.hot) {
  module.hot.accept();
}

//Get the recipe from the API
const getRecipe = async function () {
  try {

    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading receipe
    await model.loadRecipe(id);

    // 2. Render recipe
    recipeView.render(model.state.recipe);

    // 3. Render ingredients
  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchRessults(query);
    
    resultsView.render(model.state.search.results);
  }
  catch (error) {
    console.log(error);
  };
};

const init = function () {
  recipeView.addHandlerRender(getRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
