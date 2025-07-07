let handleSearchByClick = document.getElementById("search-btn").addEventListener("click", () => {
    searchAction();
})

let searchAction = () => {
    let searchedItem = document.getElementById("search-box").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedItem}`)
        .then(res=>res.json())
        .then(data=>{
            let meals = data.meals;
            console.log(meals);
            let container = document.getElementById("card-container");
            meals.forEach(meal => {
                let div = document.createElement("div");
                div.classList = "col-12 col-md-4 col-lg-3 p-4";
                div.innerHTML = `
                    <div class="card">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h2 class="card-text text-center orange-text">${meal.strMeal}</h2>
                        </div>
                    </div>
                `
                container.appendChild(div);
            });
        });
}