const close = document.querySelector(".close");
const open = document.querySelector(".ham");
const menu = document.querySelector(".menu");
close.addEventListener("click", () => {
  menu.style.visibility = "hidden";
});
open.addEventListener("click", () => {
  menu.style.visibility = "visible";
});

const ticker = document.getElementById('ticker');

// function getRandomColor() {
//   const colors = ['#00f', '#f00', '#0f0', '#ff0']; // Add more colors as needed
//   return colors[Math.floor(Math.random() * colors.length)];
// }

ticker.addEventListener('animationiteration', (event) => {
  const newNotifications = event.target.querySelectorAll('.new-notification');
  newNotifications.forEach((notification) => {
    notification.style.backgroundColor = getRandomColor();
    notification.classList.add('sparkling-light');
  });
});



document.addEventListener('DOMContentLoaded', function () {
    // Get the splash screen and main content elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
  
    // Add a click event listener to the splash screen
    splashScreen.addEventListener('click', function () {
      // Hide the splash screen
      splashScreen.style.display = 'none';
  
      // Display the main content
      mainContent.style.display = 'block';
    });
  });

  
  // document.addEventListener("DOMContentLoaded", function () {
  //   const backToTopButton = document.querySelector(".back-to-top");
  
  //   // Show the button when scrolling down
  //   window.addEventListener("scroll", function () {
  //     if (window.scrollY > 300) {
  //       backToTopButton.classList.add("show");
  //     } else {
  //       backToTopButton.classList.remove("show");
  //     }
  //   });
  
  //   // Scroll to top when the button is clicked
  //   backToTopButton.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   });
  // });
  
  document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const searchTerm = document.getElementById('search-term').value;

    try {
      const latitudeLongitude = await fetchLatitudeLongitude(location);
      const placesNearLocation = await fetchPlacesNearLocation(location, searchTerm);
      displayResult(latitudeLongitude, placesNearLocation);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function fetchLatitudeLongitude(location) {
    const response = await fetch('/get_latitude_longitude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `location=${encodeURIComponent(location)}`,
    });
    const data = await response.json();
    return data;
  }

  async function fetchPlacesNearLocation(location, searchTerm) {
    const response = await fetch('/get_places_near_location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `location=${encodeURIComponent(location)}&search_term=${encodeURIComponent(searchTerm)}`,
    });
    const data = await response.json();
    return data;
  }

  function displayResult(latitudeLongitude, placesNearLocation) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';

    // Display latitude and longitude
    const latLongElement = document.createElement('p');
    latLongElement.textContent = `Latitude: ${latitudeLongitude.latitude}, Longitude: ${latitudeLongitude.longitude}`;
    resultContainer.appendChild(latLongElement);

    // Display places near the location
    const placesElement = document.createElement('div');
    for (const place of placesNearLocation) {
      const placeElement = document.createElement('p');
      placeElement.textContent = place.display_name;
      placesElement.appendChild(placeElement);
    }
    resultContainer.appendChild(placesElement);

    
  }

  document.getElementById('location-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const searchTerm = document.getElementById('search-term').value;
  
    try {
      const latitudeLongitude = await fetchLatitudeLongitude(location);
      const placesNearLocation = await fetchPlacesNearLocation(location, searchTerm);
      displayResult(latitudeLongitude, placesNearLocation);
    } catch (error) {
      console.error('Error:', error);
    }
  });

 // JavaScript to hide the splash screen and show the main content when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
  // Hide the splash screen after 2 seconds
  const splashScreen = document.querySelector('.splash-screen');
  const mainContent = document.querySelector('.main-content');

  setTimeout(function () {
    splashScreen.style.display = 'none';
    mainContent.style.display = 'flex'; // Use 'flex' to display the main content
  }, 2000); // 2000 milliseconds (2 seconds) delay
});

var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',()=>{
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  },610)
})


// Function to open the modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// Automatically open the modal on page load
window.onload = function () {
  openModal();
};


