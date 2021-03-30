// Dog app object namespace
const dogApp = {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Global variables//////////////////////////////////////////////
// Store the DOM element inside the dogApp object
dogApp.dogGifContainer = document.querySelector(".dog-gif");
dogApp.dogSearchContainer = document.querySelector(".dog-search-container");
dogApp.selectElement = document.querySelector(".dog-select");
dogApp.searchInput = document.querySelector(".dog-name-search");
dogApp.searchButton = document.querySelector(".button-search");
dogApp.dogSearchButton = document.querySelector(".dog-search-button");
dogApp.dogGifButton = document.querySelector(".gif-button");
dogApp.logoButton = document.querySelector(".logo-button");
dogApp.dogSearchSection = document.querySelector(".dog-search");
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
// Function to go to GIF section
dogApp.sectionEvent = () => {
  // Empty the innerHTML of dogApp.errorSearchContainer before displaying the new results
  dogApp.errorSearchContainer.innerHTML = "";
  dogApp.dogSearchSection.classList.add("dog-search");
  dogApp.dogGifContainer.classList.remove("dog-gif-toggle");
};

// Go back to GIF page when logo is clicked
dogApp.logoHeaderButton = () => {
  dogApp.logoButton.addEventListener("click", function () {
    dogApp.errorGifContainer.innerHTML = "";
    dogApp.sectionEvent();
  });
};

// Display the dog-search section and hide the GIF section when "DOG SEARCH" button is clicked
dogApp.openDogSearch = () => {
  dogApp.dogSearchButton.addEventListener("click", function () {
    // Empty the innerHTML of dogApp.errorGifContainer before displaying the new results
    dogApp.errorGifContainer.innerHTML = "";
    dogApp.dogSearchSection.classList.remove("dog-search");
    dogApp.dogGifContainer.classList.add("dog-gif-toggle");
  });
};

// Display the GIF section and hide the dog-search section when "GIF" button is clicked
dogApp.openGif = () => {
  dogApp.dogGifButton.addEventListener("click", function () {
    dogApp.sectionEvent();
  });
};

// Function to display dog gif result on the page
dogApp.dogGifsResults = (arrayOfGifs) => {
  // Empty the innerHTML of dogApp.errorGifContainer before displaying the new results
  dogApp.errorGifContainer.innerHTML = "";
  // Loop the array of arrayOfGifs
  arrayOfGifs.forEach((dogGif) => {
    // Create the HTML elements for the dogGif object to display on the page
    const gifsToDisplay = `
            <div class="gif-container">
                <img src=${dogGif.images.original.url} alt="${dogGif.title}"/>
            </div>`;
    //   Append the dogGif in the body element
    dogApp.dogGifContainer.insertAdjacentHTML("beforeend", gifsToDisplay);
  });
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
  // Empty the innerHTML of dogApp.errorSearchContainer before displaying the new results
  dogApp.errorSearchContainer.innerHTML = "";
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
dogApp.errorMessage = (position, message) => {
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
      if (!response.ok) {
        // throw the error to catch the status of the response
        throw new Error(`Something went wrong ${response.status} error!`);
      }
      // Return the JSON object if the data is fetched successfully
      return response.json();
    })
    .then((gifsFromApi) => {
      // Calling dogApp.dogGifResults function
      dogApp.dogGifsResults(gifsFromApi.data);
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
      if (!response.ok) {
        // throw the error to catch the status of the response
        throw new Error(`Something went wrong ${response.status} error`);
      }
      // Return the JSON object if the data is fetched successfully
      return response.json();
    })
    .then((breedsFromApi) => {
      // Calling dogApp.dogOriginEvent function
      dogApp.dogOriginEvent(breedsFromApi);
    })
    // Catch the error and display the message to the UI
    .catch((error) =>
      dogApp.errorMessage(
        dogApp.errorSearchContainer,
        ` ${error.message} Try again!`
      )
    );
};

// Function to make API call for searching dog image
dogApp.getDogImages = (arrayOfDog) => {
  // Check if the arrayOfDog returns is empty
  if (arrayOfDog.length !== 0) {
    arrayOfDog.forEach((dogGroup) => {
      // Make nested API call to fetch the dogImageUrl from the image_id of the arrayOfDog objects
      fetch(`${dogApp.dogImageApiUrl}${dogGroup["reference_image_id"]}`)
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
    // If the arrayOfDog is empty, display the error message
  } else {
    dogApp.errorMessage(
      dogApp.errorSearchContainer,
      "Your search not found! Try again!"
    );
  }
};

// Function to make an API call to search for the dog based on user input
dogApp.getDogInfo = (query) => {
  // Make an dogNameSearchUrl API call base
  const dogNameSearchUrl = new URL(dogApp.dogSearchApiUrl);
  // Pass in the breed.name as the parameter for the dogNameSearchUrl search
  dogNameSearchUrl.search = new URLSearchParams({
    q: query,
  });
  fetch(dogNameSearchUrl)
    .then((response) => {
      // Test if there is any error when fetching the data
      if (!response.ok) {
        // throw the error to catch the status of the response
        throw new Error(`Something went wrong ${response.status} error`);
      }
      // Return the JSON object if the data is fetched successfully
      return response.json();
    })
    .then((dogGroupsFromApi) => {
      // Calling the dogApp.getDogImages function
      dogApp.getDogImages(dogGroupsFromApi);
    })
    // Catch the error and display the message to the UI
    .catch((error) =>
      dogApp.errorMessage(
        dogApp.errorSearchContainer,
        ` ${error.message} Try again!`
      )
    );
};

// Function to listen to the change event from options of select
dogApp.dogOriginEvent = (arrayOfDog) => {
  dogApp.selectElement.addEventListener("change", function () {
    // Empty dogApp.dogSearchContainer content
    dogApp.dogSearchContainer.innerHTML = "";
    // loop through the object of dog array
    arrayOfDog.forEach((dog) => {
      // Store the properties of the dog object in variables by destructuring assigment
      const {
        image: { url },
        name,
        origin,
        country_code: country,
        bred_for: role,
        temperament: traits,
        weight: { metric: weight },
        life_span: age,
      } = dog;
      // test if origin match the select from UI
      if (origin !== undefined && origin !== "" && origin === this.value) {
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
        country === this.value
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
  });
};

// Function to trigger the search button click event
dogApp.searchDogEvent = () => {
  dogApp.searchButton.addEventListener("click", function (e) {
    // Prevent the page from refeshing
    e.preventDefault();
    // Empty the innerHTML of dogApp.errorSearchContainer before displaying the new results
    dogApp.errorSearchContainer.innerHTML = "";
    // Empty the innerHTML of dogSearchContainer before displaying the new results
    dogApp.dogSearchContainer.innerHTML = "";
    // Calling function dogApp.getDogInfo function
    dogApp.getDogInfo(dogApp.searchInput.value);
    // Empty the input value when click the search button
    dogApp.searchInput.value = "";
  });
};

// Function init to kick off the app
dogApp.init = () => {
  // Calling the logoHeaderButton function
  dogApp.logoHeaderButton();
  // Calling the openDogSearch function
  dogApp.openDogSearch();
  // Calling the openGif function
  dogApp.openGif();
  // Calling the getDogBreed API call function
  dogApp.getDogBreed();
  // Calling the getGif API call function
  dogApp.getGif();
  // Calling the serachDogEvent function
  dogApp.searchDogEvent();
};

dogApp.init();
