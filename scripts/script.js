// Dog app object namespace
const dogApp = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Global variables//////////////////////////////////////////////
// Store the DOM element inside the dogApp object
dogApp.dogGifContainer = document.querySelector(".dog-gif");
dogApp.dogSearchContainer = document.querySelector(".dog-search-container");
dogApp.selectElement = document.querySelector(".dog-select");
dogApp.optionElements = document.querySelectorAll("option");
dogApp.searchInput = document.querySelector(".dog-name-search");
dogApp.searchButton = document.querySelector(".button-search");
dogApp.dogSearchButton = document.querySelector(".dog-search-button");
dogApp.dogGifButton = document.querySelector(".gif-button");
dogApp.dogSearchSection = document.getElementById("dog-search");
dogApp.dogGifSection = document.getElementById("dog-gif");
dogApp.errorGifContainer = document.querySelector(".error-gif-container");
dogApp.errorSearchContainer = document.querySelector(".error-search-container");

// Store the giphy API info in dogApp object
dogApp.giphyApiUrl = "https://api.giphy.com/v1/gifs/search";
dogApp.giphyApiKey = "wK0M8BDHxGDrY2EXflUHNYpjeRfpHXGZ";

// Store the dog API info in dogApp object
dogApp.dogApiUrl = "https://api.thedogapi.com/v1/breeds/";
dogApp.dogSearchApiUrl = "https://api.thedogapi.com/v1/breeds/search";
dogApp.dogImageApiUrl = "https://api.thedogapi.com/v1/images/";

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Functions//////////////////////////////////////////////////////

// Display the dog-search section and hide the GIF section when "DOG SEARCH" button is clicked
dogApp.openDogSearch = () => {
    dogApp.dogSearchButton.addEventListener("click", function (e) {
        dogApp.dogSearchSection.classList.remove("dog-search-toggle");
        dogApp.dogGifSection.classList.add("dog-gif-toggle");
    });
};

// Display the GIF section and hide the dog-search section when "GIF" button is clicked
dogApp.openGif = () => {
    dogApp.dogGifButton.addEventListener("click", function (e) {
        dogApp.dogSearchSection.classList.add("dog-search-toggle");
        dogApp.dogGifSection.classList.remove("dog-gif-toggle");
    });
};

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

// Function to display dog result on the page
dogApp.dogSearchResults = (
    imageUrl,
    dogName,
    dogOrigin,
    dogGroup,
    dogRole,
    dogTraits,
    dogWeight,
    dogLife
) => {
    // Create the HTML elements for to display the resuls on the page
    const dogResultsToDisplay = `
                <div class="dog-search-results">
                    <div class="dog-image">
                        <img src=${imageUrl} alt="${dogName}"/>
                    </div>
                    <div class="dog-info-container">
                        <h2>${dogName}</h2>
                        <p><span>Origin:</span> ${
                            dogOrigin ? dogOrigin : "N/A"
                        }</p>
                        <p><span>Group:</span> ${
                            dogGroup ? dogGroup : "N/A"
                        }</p>
                        <p>-----------</p>
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
    dogApp.dogSearchContainer.insertAdjacentHTML(
        "beforeend",
        dogResultsToDisplay
    );
};

// Function to display the error message to UI
dogApp.errorMessage = function (position, message) {
    const errorToDisplay = `
    <p class="error-message">${message}</p>
    `;
    position.insertAdjacentHTML("beforeend", errorToDisplay);
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
            // Test if there is any error when fetching the data
            if (!response.ok)
                // throw the error to catch the status of the response
                throw new Error(
                    `Something went wrong ${response.status} error!`
                );
            // Return the JSON object if the data is fetched successfully
            return response.json();
        })
        .then((gifsFromApi) => {
            // Empty the innerHTML of errorGifContainer before displaying the new results
            dogApp.errorGifContainer.innerHTML = "";
            // Get the array of data from gifsFromApi
            const dogGifs = gifsFromApi.data;
            // Loop the array of dogGifs
            dogGifs.forEach((dogGif) => {
                // Calling the dogApp.dogGifsResults function
                dogApp.dogGifsResults(dogGif.images.original.url, dogGif.title);
            });
        })
        // Catch the error and display the message to the UI
        .catch((error) =>
            dogApp.errorMessage(
                dogApp.errorGifContainer,
                ` ${error.message} Try again!`
            )
        );
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
        .then((response) => {
            // Test if there is any error when fetching the data
            if (!response.ok)
                // throw the error to catch the status of the response
                throw new Error(
                    `Something went wrong ${response.status} error`
                );
            // Return the JSON object if the data is fetched successfully
            return response.json();
        })
        .then((breedsFromApi) => {
            // loop through the object of breeds array
            breedsFromApi.forEach((breed) => {
                // Store the properties of the breed object in variables by destructuring assigment
                const {
                    image: { url },
                    name,
                    origin,
                    country_code: country,
                    bred_for: role,
                    temperament: traits,
                    weight: { metric: weight },
                    life_span: age,
                } = breed;
                // test if origin match the select from UI
                if (
                    origin !== undefined &&
                    origin !== "" &&
                    origin === "United Kingdom, England"
                ) {
                    // Calling the dogApp.dogOriginResult function
                    dogApp.dogSearchResults(
                        url,
                        name,
                        origin,
                        null,
                        role,
                        traits,
                        weight,
                        age
                    );
                }
                // test if country_code match the select from UI
                else if (
                    country !== undefined &&
                    country !== "" &&
                    country === "US"
                ) {
                    // Calling the dogApp.dogOriginResult function
                    dogApp.dogSearchResults(
                        url,
                        name,
                        country,
                        null,
                        role,
                        traits,
                        weight,
                        age
                    );
                }
            });
        })
        // Catch the error and display the message to the UI
        .catch((error) =>
            dogApp.errorMessage(
                dogApp.errorSearchContainer,
                ` ${error.message} Try again!`
            )
        );
};

// Function to make API call for searching dog info from user input
dogApp.getDogName = (url) => {
    fetch(url)
        .then((response) => {
            // Test if there is any error when fetching the data
            if (!response.ok)
                // throw the error to catch the status of the response
                throw new Error(
                    `Something went wrong ${response.status} error`
                );
            // Return the JSON object if the data is fetched successfully
            return response.json();
        })
        .then((dogGroupsFromApi) => {
            if (dogGroupsFromApi.length !== 0) {
                dogGroupsFromApi.forEach((dogGroup) => {
                    // Make API call to fetch the dogImageUrl
                    fetch(
                        `${dogApp.dogImageApiUrl}${dogGroup["reference_image_id"]}`
                    )
                        .then((response) => response.json())
                        .then((dogImages) => {
                            // Store the properties of the dogGroup object in variables by destructuring assigment
                            const {
                                name,
                                breed_group: group,
                                bred_for: role,
                                temperament: traits,
                                weight: { metric: weight },
                                life_span: age,
                            } = dogGroup;
                            // Calling the dogApp.dogOriginResult function
                            dogApp.dogSearchResults(
                                dogImages.url,
                                name,
                                null,
                                group,
                                role,
                                traits,
                                weight,
                                age
                            );
                        });
                });
            } else {
                dogApp.errorMessage(
                    dogApp.errorSearchContainer,
                    "Your search not found! Try again!"
                );
            }
        })
        // Catch the error and display the message to the UI
        .catch((error) =>
            dogApp.errorMessage(
                dogApp.errorSearchContainer,
                ` ${error.message} Try again!`
            )
        );
};

// Function to trigger the search button click event
dogApp.searchDogEvent = () => {
    dogApp.searchButton.addEventListener("click", function (e) {
        // Prevent the page from refeshing
        e.preventDefault();
        // Empty the innerHTML of errorSearchContainer before displaying the new results
        dogApp.errorSearchContainer.innerHTML = "";
        // Empty the innerHTML of dogSearchContainer before displaying the new results
        dogApp.dogSearchContainer.innerHTML = "";
        // Make an dogNameSearchUrl API call base
        const dogNameSearchUrl = new URL(dogApp.dogSearchApiUrl);
        // Pass in the breed.name as the parameter for the dogNameSearchUrl search
        dogNameSearchUrl.search = new URLSearchParams({
            q: `${dogApp.searchInput.value}`,
        });
        // Calling the dogApp.getDogName API call function
        dogApp.getDogName(dogNameSearchUrl);
        // Empty the input value when click the search button
        dogApp.searchInput.value = "";
    });
};

// Function init to kick off the app
dogApp.init = () => {
    // Calling the getGif API call function
    dogApp.getGif();
    // Calling the getDogBreed API call function
    dogApp.getDogBreed();
    // Calling the serachDogEvent function
    dogApp.searchDogEvent();
    // Calling the openDogSearch function
    dogApp.openDogSearch();
    // Calling the openGif function
    dogApp.openGif();
};

dogApp.init();
