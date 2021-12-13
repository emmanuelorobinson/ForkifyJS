import { API_URL } from "./config";
import { getJSON } from "./views/helpers";
import { RES_PER_PAGE } from "./config";


export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function (id) {
    try {

        const data = await getJSON(`${API_URL}/${id}`);

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourcerUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        }
        else {
            state.recipe.bookmarked = false;
        }
        console.log(state.recipe);
    }
    catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        const { recipes } = data.data;

        state.search.results = recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url
            }
        });
        state.search.page = 1;
    }
    catch (err) {
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * RES_PER_PAGE;
    const end = start + RES_PER_PAGE;

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {

    state.recipe.ingredients.forEach((ingredient) => {
        ingredient.quantity = ingredient.quantity * (newServings / state.recipe.servings);
    });

    state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id == state.recipe.id) state.recipe.bookmarked = true;

    //localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

export const removeBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);

    state.bookmarks.splice(index, 1);

    if (id == state.recipe.id) state.recipe.bookmarked = false;

}