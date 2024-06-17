document.addEventListener('DOMContentLoaded', function() {
    const dateForm = document.getElementById('date-form');
    const apodTitle = document.getElementById('apod-title');
    const apodDate = document.getElementById('apod-date');
    const apodImage = document.getElementById('apod-image');
    const apodExplanation = document.getElementById('apod-explanation');
    const saveFavoriteBtn = document.getElementById('save-favorite');
    const favoritesContainer = document.getElementById('favorites-container');

    // Function to fetch APOD data from NASA API
    async function fetchAPOD(date) {
        const apiKey = 'sxeOOPp5pW424mPaZR4chVNPwJmFlldrLQtID7j5'; // Replace with your own API key from NASA

        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching APOD:', error);
            return null;
        }
    }

    // Function to update the DOM with APOD data
    function updateDOM(apodData) {
        if (!apodData) {
            console.error('No APOD data available');
            return;
        }

        apodTitle.textContent = apodData.title;
        apodDate.textContent = apodData.date;
        apodImage.src = apodData.url;
        apodImage.alt = apodData.title;
        apodExplanation.textContent = apodData.explanation;
    }

    // Function to handle form submission
    dateForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const selectedDate = dateForm.elements.date.value;
        const apodData = await fetchAPOD(selectedDate);
        updateDOM(apodData);
    });

    // Function to save the current APOD as favorite
    saveFavoriteBtn.addEventListener('click', function() {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite');

        const favoriteContent = `
            <h3>${apodTitle.textContent}</h3>
            <p>Date: ${apodDate.textContent}</p>
            <img src="${apodImage.src}" alt="${apodImage.alt}">
            <p>${apodExplanation.textContent}</p>
            <button class="remove-favorite">Remove from Favorites</button>
        `;

        favoriteItem.innerHTML = favoriteContent;
        favoritesContainer.appendChild(favoriteItem);

        // Add event listener to remove favorite
        const removeFavoriteBtn = favoriteItem.querySelector('.remove-favorite');
        removeFavoriteBtn.addEventListener('click', function() {
            favoriteItem.remove();
        });
    });
});
