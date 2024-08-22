document.getElementById('searchButton').addEventListener('click', function () {
    const ingredients = document.getElementById('ingredients').value;
    if (ingredients) {
        fetchRecipes(ingredients);
    } else {
        alert('Please enter some ingredients');
    }
});

function fetchRecipes(ingredients) {
    const appId = 'dfed77bf';  
    const appKey = 'cacba161c6357bf5e483e08bc6250fd9';
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id=${appId}&app_key=${appKey}&to=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayRecipes(data.hits))
        .catch(error => console.error('Error fetching the recipes:', error));
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';
    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.className = 'recipe';
        recipeElement.innerHTML = `
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Calories:</strong> ${recipe.calories.toFixed(2)}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}
