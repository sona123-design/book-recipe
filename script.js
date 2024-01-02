document.addEventListener('DOMContentLoaded', function () {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const recipeList = document.getElementById('recipe-list');
    const recipeForm = document.getElementById('recipe-form');
    const titleInput = document.getElementById('title');
    const ingredientsInput = document.getElementById('ingredients');
    const instructionsInput = document.getElementById('instructions');
    let editingRecipeId = null;

    function saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function displayRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h3>${recipe.title}</h3>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="editRecipe(${recipe.id})">Edit</button>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            `;
            recipeList.appendChild(recipeCard);
        });
    }

    window.addEditRecipe = function () {
        const title = titleInput.value.trim();
        const ingredients = ingredientsInput.value.trim();
        const instructions = instructionsInput.value.trim();

        if (title && ingredients && instructions) {
            if (editingRecipeId !== null) {
                // Editing existing recipe
                const index = recipes.findIndex(recipe => recipe.id === editingRecipeId);
                recipes[index] = { id: editingRecipeId, title, ingredients, instructions };
                editingRecipeId = null;
            } else {
                // Adding new recipe
                const newRecipe = { id: recipes.length + 1, title, ingredients, instructions };
                recipes.push(newRecipe);
            }

            saveRecipes();
            displayRecipes();

            // Clear the form inputs after adding/editing
            titleInput.value = '';
            ingredientsInput.value = '';
            instructionsInput.value = '';
        } else {
            alert('Please fill out all fields before saving.');
        }
    }

    window.editRecipe = function (recipeId) {
        // Find the recipe to edit
        const recipeToEdit = recipes.find(recipe => recipe.id === recipeId);

        // Set form inputs with the selected recipe's details for editing
        titleInput.value = recipeToEdit.title;
        ingredientsInput.value = recipeToEdit.ingredients;
        instructionsInput.value = recipeToEdit.instructions;

        // Set the editingRecipeId to track the recipe being edited
        editingRecipeId = recipeId;
    }

    window.deleteRecipe = function (recipeId) {
        // Remove the recipe from the recipes array
        recipes = recipes.filter(recipe => recipe.id !== recipeId);

        // If the deleted recipe was being edited, clear the form inputs
        if (editingRecipeId === recipeId) {
            editingRecipeId = null;
            titleInput.value = '';
            ingredientsInput.value = '';
            instructionsInput.value = '';
        }

        saveRecipes();
        displayRecipes();
    }

    // Initial display
    displayRecipes();
});





