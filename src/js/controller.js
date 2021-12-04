import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Get the recipe from the API
const getRecipe = async function (recipeId) {
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

    alert(error);

  }
};

getRecipe();

['hashchange', 'load'].forEach(event => window.addEventListener(event, getRecipe));
