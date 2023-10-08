function fetchRandomImage() {
    const searchQuery = 'saturn'; // Your search query
    const apiUrl = `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Get a random image from the results
            const randomIndex = Math.floor(Math.random() * data.collection.items.length);
            const randomImage = data.collection.items[randomIndex];

            // Extract the image title and URL
            const title = randomImage.data[0].title;
            const imageUrl = randomImage.links[0].href;
            const description = randomImage.data[0].description;

            // Display the image and title
            const nasaImage = document.getElementById('nasaImage');
            nasaImage.src = imageUrl;
            const imageTitle = document.getElementById('imageTitle');
            imageTitle.textContent = title;
            const imageDescription = document.getElementById('imageDescription');
            imageDescription.textContent = description;
        })
        .catch(error => {
            console.error(error);
        });
}

// Call the function to fetch and display a random image when the page loads
window.addEventListener('load', fetchRandomImage);

export {fetchRandomImage};