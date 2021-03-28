// Dog app object namespace
const dogApp = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Global variables//////////////////////////////////////////////
dogApp.dogGifContainer = document.querySelector(".dog-gif");
dogApp.dogSearchContainer = document.querySelector(".dog-search-container");
dogApp.selectElement = document.querySelector(".dog-select");
dogApp.optionElements = document.querySelectorAll("option");

dogApp.giphyApiUrl = "https://api.giphy.com/v1/gifs/search";
dogApp.giphyApiKey = "wK0M8BDHxGDrY2EXflUHNYpjeRfpHXGZ";

dogApp.dogApiUrl = "https://api.thedogapi.com/v1/breeds/";
dogApp.dogSearchApiUrl = "https://api.thedogapi.com/v1/breeds/search";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Functions//////////////////////////////////////////////////////
// Function to display dog gif result on the page
dogApp.dogGifsResults = (imageUrl, title) => {
    // Create the HTML elements for the dogGif object to display on the page
    const gifsToDisplay = `
    <div class="gif-container">
        <img src=${imageUrl} alt="${title}"/>
    </div>`;
    //   Append the dogGif in the body element
    dogApp.dogGifContainer.insertAdjacentHTML("beforeend", gifsToDisplay);
};

// Function to display dog search result on the page
dogApp.dogSearchResults = (
    imageUrl,
    dogName,
    dogOrigin,
    dogRole,
    dogTraits,
    dogWeight,
    dogLife
) => {
    // Create the HTML elements for the dogOrigin object to display on the page
    const originToDisplay = `
                <div class="dog-search-results">
                    <div class="dog-image">
                        <img src=${imageUrl} alt="${dogName}"/>
                    </div>
                    <div class="dog-info-container">
                        <h2>${dogName}</h2>
                        <p><span>Origin:</span> ${
                            dogOrigin ? dogOrigin : "N/A"
                        }</p>
                        <ul class="dog-info-list">
                            <li class="dog-list-item"><span>Role:</span> ${
                                dogRole ? dogRole : "N/A"
                            }</li>
                            <li class="dog-list-item"><span>Traits:</span> ${
                                dogTraits ? dogTraits : "N/A"
                            }</li>
                            <li class="dog-list-item"><span>Average weight:</span> ${
                                dogWeight ? dogWeight : "N/A"
                            } (kg)</li>
                            <li class="dog-list-item"><span>Life span:</span> ${
                                dogLife ? dogLife : "N/A"
                            }</li>
                        </ul>
                    </div>
                </div>`;
    //   Append the dogGif in the body element
    dogApp.dogSearchContainer.insertAdjacentHTML("beforeend", originToDisplay);
};

// Function to get the dog GIF's from API
dogApp.getGif = () => {
    // Make an API call for dogGifs from Giphy
    const giphyUrl = new URL(dogApp.giphyApiUrl);
    giphyUrl.search = new URLSearchParams({
        api_key: dogApp.giphyApiKey,
        q: "dog",
        limit: 10,
    });
    // Fetch the data from URL
    fetch(giphyUrl)
        .then((response) => {
            // Return the JSON object
            return response.json();
        })
        .then((gifsFromApi) => {
            // Get the array of data from gifsFromApi
            const dogGifs = gifsFromApi.data;
            // Loop the array of dogGifs
            dogGifs.forEach((dogGif) => {
                // Calling the dogApp.dogGifsResults function
                dogApp.dogGifsResults(dogGif.images.original.url, dogGif.title);
            });
        });
};

// Function to get the dog breed and name from API
dogApp.getDogBreed = () => {
    // Make API call from dog breed
    const dogBreedUrl = new URL(dogApp.dogApiUrl);
    // Limit the result of search up to 50 objects
    dogBreedUrl.search = new URLSearchParams({
        limit: 50,
    });
    // Fetch the data from dogBreedUrl
    fetch(dogBreedUrl)
        // Return JSON object
        .then((response) => response.json())
        .then((breedsFromApi) => {
            // loop through the object of breeds array
            breedsFromApi.forEach((breed) => {
                // test if origin match the select from UI
                if (
                    breed.origin !== undefined &&
                    breed.origin !== "" &&
                    breed.origin === "United Kingdom, England"
                ) {
                    // Calling the dogApp.dogSearchResult function
                    dogApp.dogSearchResults(
                        breed.image.url,
                        breed.name,
                        breed.origin,
                        breed["bred_for"],
                        breed.temperament,
                        breed.weight.metric,
                        breed["life_span"]
                    );
                }
                // test if country_code match the select from UI
                else if (
                    breed["country_code"] !== undefined &&
                    breed["country_code"] !== "" &&
                    breed["country_code"] === "US"
                ) {
                    // Calling the dogApp.dogSearchResult function
                    dogApp.dogSearchResults(
                        breed.image.url,
                        breed.name,
                        breed["country_code"],
                        breed["bred_for"],
                        breed.temperament,
                        breed.weight.metric,
                        breed["life_span"]
                    );
                }

                // test if the breed_name in the breed object is not undefined or empty and get the result to make the dogGroup API call
                if (breed.name !== undefined && breed.name !== "") {
                    const dogNameSearchUrl = new URL(dogApp.dogSearchApiUrl);
                    // Pass in the breed.name as the parameter for the dogNameSearchUrl search
                    dogNameSearchUrl.search = new URLSearchParams({
                        q: `${breed.name}`,
                    });
                    fetch(dogNameSearchUrl)
                        // Return the JSON object
                        .then((response) => response.json())
                        .then((dogGroupsFromApi) => {
                            // Filter the array of dogGroupsFromApi to check if the country_code match
                            dogGroupsFromApi.filter((dogGroup) => {
                                // console.log(dogGroup);
                            });
                        });
                }
            });
        });
};

dogApp.init = () => {
    dogApp.getDogBreed();
    dogApp.getGif();
};

dogApp.init();
