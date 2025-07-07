let handleSearchByClick = document.getElementById("search-btn").addEventListener("click", () => {
    searchAction();
})

let searchAction = () => {
    let searchedItem = document.getElementById("search-box").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedItem}`)
        .then(res=>res.json())
        .then(data=>{
            let meals = data.meals;
            let container = document.getElementById("card-container");
            container.innerHTML = "";
            if(!meals){
                let p = document.createElement("p");
                p.innerText = "Nothing to Show";
                p.classList = "fs-1 text-center"
                container.appendChild(p);
                return;
            }
            meals.forEach(meal => {
                let div = document.createElement("div");
                div.classList = "col-12 col-md-4 col-lg-3 p-4";
                div.innerHTML = `
                    <div class="card" role="button" onclick="showDetails('${meal.idMeal}')">
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

let showDetails = (id) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
        let detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = "";

        let div = document.createElement("div");
        let ul = document.createElement("ul");
        for(let i=1; i<=20; i++){
            let ing = `strIngredient${i}`;
            if(data.meals[0][ing]){
                let li = document.createElement("li");
                li.innerText = data.meals[0][ing];
                ul.appendChild(li);
            }
            else break;
        }

        div.innerHTML = `
        <div class="card m-auto" style="width: 18rem;">
            <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title fw-bold mb-6">${data.meals[0].strMeal}</h4>
                <p class="fw-bold my-6">Ingredients</p>
                <div id="ul-placeholder">
                </div>
            </div>
        </div>
        `

        detailsContainer.appendChild(div);
        document.getElementById("ul-placeholder").appendChild(ul);
    })
}