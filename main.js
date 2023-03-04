let dataContainer = [];
const loadUniverse = (dataLimit = 12) => {
    document.getElementById('btn-loading').classList.remove('hidden')
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => {
            displayUniverse(data.data.tools, dataLimit)
            document.getElementById('btn-loading').classList.add('hidden');
        });
}

const displayUniverse = (data, dataLimit) => {
    const universeContainer = document.getElementById('universe-container');
    const seeMore = document.getElementById('see-more');
    if (dataLimit && data.length > 6) {
        data = data.slice(0, 6);
        seeMore.classList.remove('hidden');
    }
    else {
        seeMore.classList.add('hidden');
    }

    universeContainer.innerHTML = '';
    dataContainer = data;

    data.forEach(allData => {
        const { } = allData;
        universeContainer.innerHTML += `
            <div class="card bg-base-100 shadow-xl p-2">
                <figure><img src="${allData.image}" alt="Cart" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-3xl">Feature</h2>
                    <ol class="list-decimal ml-4">
                        <div>${allData.features[0] ? `<li>${allData.features[0]}</li>` : ''}</div>
                        <div>${allData.features[1] ? `<li>${allData.features[1]}</li>` : ''}</div>
                        <div>${allData.features[2] ? `<li>${allData.features[2]}</li>` : ''}</div>
                        <div>${allData.features[3] ? `<li>${allData.features[3]}</li>` : ''}</div>
                        <div>${allData.features[4] ? `<li>${allData.features[4]}</li>` : ''}</div>
                    </ol >
                    <div class="mt-6"> <hr />
                        <h2 class="card-title mt-4 text-2xl">${allData.name}</h2>
                        <div class='flex justify-between'>
                            <div class="flex mt-4">
                                <i class="fa-regular fa-calendar-days mt-1 mr-2"></i>
                                <p>${allData.published_in}</p>
                            </div>
                            <label onclick="dataLoadById('${allData.id}')" for="modal-universe" class="btn gap-2 btn-outline btn-info">
                                <i class="fa-solid fa-arrow-right mx-8"></i>
                            </label>
                        </div>
                    </div>
                </div >
            </div >
        `
    });
}

document.getElementById('btn-see-more').addEventListener('click', function () {
    loadUniverse(0);
});

const dataLoadById = (featureId) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${featureId}`
    fetch(url)
        .then(res => res.json())
        .then(data => detailsInfo(data.data));
}

const detailsInfo = (data) => {
    console.log(data);
    const modal = document.getElementById('modal');
    modal.innerHTML = "";
    modal.innerHTML += `
                <div class="modal-box w-7/12 max-w-full">
                    <div class="hero">
                        <div class="hero-content flex-cols lg:flex grid-cols-2">
                            <div class="card flex-shrink-0 lg:max-w-md shadow-xl">
                                <div class="card-body border-solid border-2 border-red-500 rounded-xl bg-base-200">
                                    <h1 class="text-xl font-bold">${data.description ? data.description : 'Not Data Found'}</h1>
                                    <div class="grid grid-cols-3 gap-3 text-center">
                                        <div class="bg-base-100 p-2 font-bold text-[#03A30A] rounded-lg my-auto">
                                            <div class="">${data.pricing?.[0].price == 0 || data.pricing?.[0].price == null || data.pricing?.[0].price == 'No cost' ? 'Free of cost' : data.pricing?.[0].price}</div>
                                            <div class="">${data.pricing?.[0].plan ? data.pricing[0].plan : 'Basic'}</div>
                                        </div>
                                        <div class="bg-base-100 p-2 font-bold text-[#d97706] rounded-lg my-auto">
                                            <div class="">${data.pricing?.[1].price ? data.pricing[1].price : 'Free of cost'}</div>
                                            <div class="">${data.pricing?.[1].plan ? data.pricing[1].plan : 'Pro'}</div>
                                        </div>
                                        <div class="bg-base-100 p-2 font-bold text-[#03A30A] rounded-lg my-auto">
                                            <div class="">${data.pricing?.[2].price ? data.pricing[2].price : 'Free of cost'}</div>
                                            <div class="">${data.pricing?.[2].plan ? data.pricing[2].plan : 'Enterprise'}</div>
                                        </div>
                                    </div>
                                    <div class="flex justify-between mt-4">
                                        <div>
                                            <h1 class="text-2xl font-semibold">Features</h1>
                                            <ul id="myList" class="list-disc">
                                                <div>${data?.features?.[1]?.feature_name ? `<li>${data?.features?.[1]?.feature_name}</li>` : ''}</div>
                                                <div>${data?.features?.[2]?.feature_name ? `<li>${data?.features?.[2]?.feature_name}</li>` : ''}</div>
                                                <div>${data?.features?.[3]?.feature_name ? `<li>${data?.features?.[3]?.feature_name}</li>` : ''}</div>
                                                <div>${data?.features?.[4]?.feature_name ? `<li>${data?.features?.[4]?.feature_name}</li>` : ''}</div>
                                            </ul>
                                        </div>
                                        <div>
                                            <h1 class="text-2xl font-semibold">Integrations</h1>
                                            <ul id="myList" class="list-disc">
                                                <div>${data?.integrations?.[0] ? `<li>${data?.integrations?.[0]}</li>` : 'No data Found'}</div>
                                                <div>${data?.integrations?.[1] ? `<li>${data?.integrations?.[1]}</li>` : ''}</div>
                                                <div>${data?.integrations?.[2] ? `<li>${data?.integrations?.[2]}</li>` : ''}</div>
                                                <div>${data?.integrations?.[3] ? `<li>${data?.integrations?.[3]}</li>` : ''}</div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                        </div>
                            <div class="text-center lg:text-left image-full">
                                <div class="accuracy">
                                    <img class="w-full rounded-lg" src="${data.image_link[0]}" />
                                    <div>${data.accuracy.score ? `<span class="accuracy-text">${data.accuracy.score * 100}% accuracy</span>` : ''}</div>
                                </div>
                                <h1 class="text-center text-2xl font-semibold my-3">${data.input_output_examples?.[0].input ? data.input_output_examples[0].input : 'Can you give any example?'}</h1>
                                    <p class="text-center">${data.input_output_examples?.[0].output ? data.input_output_examples?.[0].output : 'No! Not Yet! Take a break!!!'}</p>
                            </div >
                        </div >
                    </div >
                    <div class="modal-action">
                        <label for="modal-universe" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    </div>
                </div >
            `
}

const sortDate = () => {
    sortedDate(dataContainer);
}

const sortedDate = (data) => {
    data.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);

        if (dateA > dateB) {
            return -1;
        }
        else if (dateB > dateA) {
            return 1;
        }
        return 0;
    });
    displayUniverse(data);
    const seeMore = document.getElementById('see-more');
    seeMore.classList.remove('hidden');
}

loadUniverse(6);