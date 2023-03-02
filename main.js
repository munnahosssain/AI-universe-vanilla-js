const loadUniverse = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayUniverse(data.data.tools))
}

const displayUniverse = (data) => {
    console.log(data);
    let universeContainer = document.getElementById('universe-container');
    data.forEach(allData => {
        universeContainer.innerHTML += `
            <div class="card bg-base-100 shadow-xl">
                <figure><img src="${allData.image}" alt="Cart" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${allData.name}</h2>
                    <ol class="list-decimal ml-4">
                        <li>${allData.features[0]}</li>
                        <li>${allData.features[1]}</li>
                        <li>${allData.features[2]}</li>
                    </ol>
                    <div class="">
                        <h2 class="card-title">${allData.name}</h2>
                        <div class="flex mt-4">
                            <i class="fa-regular fa-calendar-days mt-1 mr-2"></i>
                            <p>11/01/2022</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

loadUniverse();