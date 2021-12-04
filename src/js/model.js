import { API_URL } from "./config";
import { getJSON } from "./views/helpers";


export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
    }
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
        console.log(recipe);
    }
    catch (err) {
        throw err;
    }
};

export const loadSearchRessults = async function (query) {
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
        console.log(data);
    }
    catch (err) {
        throw err;
    }
}