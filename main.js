const loadUniverse = () => {
    document.getElementById('btn-loading').classList.remove('hidden')
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            displayUniverse(data.data.tools)
            document.getElementById('btn-loading').classList.add('hidden');
        });
}

const displayUniverse = (data) => {
    console.log(data);
    const universeContainer = document.getElementById('universe-container');

    const seeMore = document.getElementById('see-more');
    if (data.length > 6) {
        data = data.slice(0, 6);
        seeMore.classList.remove('hidden');
    }
    else {
        seeMore.classList.add('hidden');
    }

    data.forEach(allData => {
        universeContainer.innerHTML += `
            <div class="card bg-base-100 shadow-xl p-2">
                <figure><img src="${allData.image}" alt="Cart" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-3xl">Feature</h2>
                    <ol class="list-decimal ml-4">
                        <li>${allData.features[0]}</li>
                        <li>${allData.features[1]}</li>
                        <li>${allData.features[2]}</li>
                    </ol>
                    <div class="mt-6"> <hr/>
                        <h2 class="card-title mt-4 text-2xl">${allData.name}</h2>
                        <div class='flex justify-between'>
                            <div class="flex mt-4">
                                <i class="fa-regular fa-calendar-days mt-1 mr-2"></i>
                                <p>${allData.published_in}</p>
                            </div>
                            <button><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
}

document.getElementById('see-more').addEventListener('click', function () {
    console.log('clicked');
})

const dataLoadById = (featureId) => {
    console.log(featureId);

}

loadUniverse();