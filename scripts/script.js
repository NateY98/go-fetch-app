// Make an API call for dogGifs from Giphy
const proxiedUrl = "https://api.giphy.com/v1/gifs/search";
// Create the proxy server and pass in parameters for the URL
const url = new URL("http://proxy.hackeryou.com");
url.search = new URLSearchParams({
    reqUrl: proxiedUrl,
    "params[api_key]": "wK0M8BDHxGDrY2EXflUHNYpjeRfpHXGZ",
    "params[q]": "dog",
    "params[limit]": 10,
});
// Fetch the data from URL
fetch(url)
    .then((response) => {
        // Return the JSON object
        return response.json();
    })
    .then((gifsFromApi) => {
        // Get the array of data from gifsFromApi
        const dogGifs = gifsFromApi.data;
        // Loop the array of dogGifs
        dogGifs.forEach((dogGif) => {
            // Create the HTML elements for the dogGif object to display on the page
            const gifsToDisplay = `<div class="gif-container">
                      <img src=${dogGif.images.original.url} alt="${dogGif.title}"/>
                      </div>`;
            //   Append the dogGif in the body element
            document
                .querySelector(".dog-gif")
                .insertAdjacentHTML("beforeend", gifsToDisplay);
        });
    });
// Make API call from dog breed
const urlBreeds = new URL("https://api.thedogapi.com/v1/breeds/");
// Limit the result of search up to 50 objects
urlBreeds.search = new URLSearchParams({
    limit: 50,
});
// Fetch the data from urlBreeds
fetch(urlBreeds)
    // Return JSON object
    .then((response) => response.json())
    .then((breedsFromApi) => {
        // loop through the object of breeds array
        breedsFromApi.forEach((breed) => {
            // test if origin or country_code is not undefined
            if (
                breed.origin !== undefined &&
                breed.origin !== "" &&
                breed.origin === "United Kingdom, England"
            ) {
                console.log(breed);
                // Create the HTML elements for the dogOrigin object to display on the page
                const originToDisplay = `
                <div class="dog-search-results">
                    <div class="dog-image">
                        <img src=${breed.image.url} alt="${breed.name}"/>
                    </div>
                    <div class="dog-info-container">
                        <h3>${breed.name}</h3>
                        <p>Origin: ${breed.origin}</p>
                        <ul class="dog-info-list">
                           <li class="dog-list-item">Role: ${breed["bred_for"]}</li>
                            <li class="dog-list-item">Traits: ${breed.temperament}</li>
                            <li class="dog-list-item">Average weight: ${breed.weight.metric} (kg)</li>
                            <li class="dog-list-item">Life span: ${breed["life_span"]}</li>
                        </ul>
                    </div>
                </div>`;
                //   Append the dogGif in the body element
                document
                    .querySelector(".dog-search-container")
                    .insertAdjacentHTML("beforeend", originToDisplay);
            }

// ---------------------
            else if (
                breed["country_code"] !== undefined &&
                breed["country_code"] !== "" &&
                breed["country_code"] === "US"
            ) {
                console.log(breed);
                // document
                // .querySelector(".dog-search-container").innerHTML = "";
                
                // Create the HTML elements for the dogOrigin object to display on the page
                const originToDisplay = `
                <div class="dog-search-results">
                    <div class="dog-image">
                        <img src=${breed.image.url} alt="${breed.name}"/>
                    </div>
                    <div class="dog-info-container">
                        <h3>${breed.name}</h3>
                        <p>Origin: ${breed["country_code"]}</p>
                        <ul class="dog-info-list">
                           <li class="dog-list-item">Role: ${breed["bred_for"]}</li>
                            <li class="dog-list-item">Traits: ${breed.temperament}</li>
                            <li class="dog-list-item">Average weight: ${breed.weight.metric} (kg)</li>
                            <li class="dog-list-item">Life span: ${breed["life_span"]}</li>
                        </ul>
                    </div>
                </div>`;
                //   Append the dogGif in the body element
                document
                    .querySelector(".dog-search-container")
                    .insertAdjacentHTML("beforeend", originToDisplay);
            }
            // test if the breed_name in the breed object is not undefined or empty and get the result to make the dogGroup API call
            if (breed.name !== undefined && breed.name !== "") {
                const urlDogGroup = new URL(
                    "https://api.thedogapi.com/v1/breeds/search"
                );
                // Pass in the breed.name as the parameter for the urlDogGroup search
                urlDogGroup.search = new URLSearchParams({
                    q: `${breed.name}`,
                });
                fetch(urlDogGroup)
                    // Return the JSON object
                    .then((response) => response.json())
                    .then((dogGroupsFromApi) => {
                        // Filter the array of dogGroupsFromApi to check if the country_code match
                        dogGroupsFromApi.filter((dogGroup) => {
                            if (dogGroup["country_code"] === "US") {
                                // console.log(dogGroup);
                            }
                        });
                    });
            }
        });
    });