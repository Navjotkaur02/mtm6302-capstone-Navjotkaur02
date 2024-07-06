document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the 'Get Started' button
    document.getElementById('get-started-btn').addEventListener('click', fetchAPOD);

    // Event listener for the newsletter form submission
    document.getElementById('newsletter-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
    });

    // Event listener for the contact form submission
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for contacting us!');
    });
});

// Function to fetch Astronomy Picture of the Day (APOD) from NASA's API
function fetchAPOD() {
    const apodContent = document.getElementById('apod-content');
    const apiKey = 'sxeOOPp5pW424mPaZR4chVNPwJmFlldrLQtID7j5'; // Replace with your NASA API key
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the APOD content
            apodContent.innerHTML = `
                <h3>${data.title}</h3>
                <img src="${data.url}" alt="${data.title}" style="max-width: 100%; height: auto;">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => {
            apodContent.innerHTML = `<p>Sorry, we couldn't retrieve the Astronomy Picture of the Day. Please try again later.</p>`;
            console.error('Error fetching APOD:', error);
        });
}
