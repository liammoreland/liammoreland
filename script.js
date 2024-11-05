document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");

    // Check if the user has already visited during this session
    if (!sessionStorage.getItem("hasVisited")) {
        // Set the flag in sessionStorage to mark the first visit in this session
        sessionStorage.setItem("hasVisited", "true");

        // Initial delay before starting the fade
        setTimeout(() => {
            let opacity = 1; // Start with full opacity
            let maskPosition = 0; // Start with the mask at the top
            const fadeDuration = 1200; // Fade-out duration in milliseconds (1.2 seconds)
            const interval = 10; // Interval in milliseconds for gradual change
            const fadeStep = interval / fadeDuration; // Calculate fade step

            // Set up the initial mask style for the curtain effect
            loadingScreen.style.backgroundImage = "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))";
            loadingScreen.style.backgroundSize = "100% 200%";
            loadingScreen.style.backgroundPosition = "top";

            const fadeOut = setInterval(() => {
                opacity -= fadeStep; // Gradually reduce opacity
                maskPosition += 2; // Move mask downwards for the curtain effect

                if (opacity <= 0) {
                    clearInterval(fadeOut); // Stop interval when opacity is fully gone
                    loadingScreen.style.display = "none"; // Hide the loading screen
                } else {
                    loadingScreen.style.opacity = opacity; // Update opacity
                    loadingScreen.style.backgroundPosition = `0 ${maskPosition}%`; // Move the gradient mask down
                }
            }, interval);
        }, 1100); // Initial delay of 1.5 seconds
    } else {
        // Immediately hide the loading screen if not the first visit in this session
        loadingScreen.style.display = "none";
    }
});


// SMOOTH SCROLL //
const myWorkLink = document.querySelector('a[href="#work"]');
const workSection = document.getElementById("work");

if (myWorkLink) {
    myWorkLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default anchor behavior

        // Check if we're on index.html
        if (workSection) {
            // Smooth scroll to the section on the same page
            workSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            console.log("Scrolling initiated to #work section.");
        } else {
            // Redirect to index.html#work if not already there
            window.location.href = "index.html#work";
        }
    });
} else {
    console.warn("The 'My Work' link is missing.");
}



document.addEventListener("DOMContentLoaded", function () {
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const currentActive = document.querySelector(".accordion-item.active");
            const currentContent = currentActive ? currentActive.querySelector(".accordion-content") : null;

            // Close current active item if any
            if (currentActive && currentActive !== this.parentElement) {
                currentActive.classList.remove("active");
                currentContent.style.maxHeight = 0;
            }

            // Toggle the current item
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;

            if (accordionItem.classList.contains("active")) {
                accordionItem.classList.remove("active");
                accordionContent.style.maxHeight = 0;
            } else {
                accordionItem.classList.add("active");
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            }
        });
    });

    // Automatically open the "Introduction" accordion on page load
    const firstAccordionItem = document.querySelector(".accordion-item");  // Select the first accordion item (Introduction)
    const firstAccordionContent = firstAccordionItem.querySelector(".accordion-content");

    if (firstAccordionItem && firstAccordionContent) {
        firstAccordionItem.classList.add("active");  // Add active class
        firstAccordionContent.style.maxHeight = firstAccordionContent.scrollHeight + "px";  // Set maxHeight to expand
    }

    // Smooth Scrolling Functionality
    const sections = document.querySelectorAll("section");
    let isScrolling = false;

    function smoothScrollToSection(section) {
        isScrolling = true;
        section.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // Adjust the timeout depending on the scroll speed/duration
    }

    window.addEventListener("wheel", function (e) {
        if (isScrolling) return;

        const currentSection = [...sections].find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= -1 && rect.top <= 1;
        });

        if (e.deltaY > 0) {
            // Scrolling down
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === "SECTION") {
                smoothScrollToSection(nextSection);
            }
        } else {
            // Scrolling up
            const previousSection = currentSection.previousElementSibling;
            if (previousSection && previousSection.tagName === "SECTION") {
                smoothScrollToSection(previousSection);
            }
        }
    });

    // Overlay Functionality
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
        <div class="overlay-content">
            <span class="close-overlay">&times;</span>
            <div class="overlay-images"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    const overlayImagesContainer = overlay.querySelector(".overlay-images");
    const closeOverlay = overlay.querySelector(".close-overlay");

    // Gather all the images for the overlay and place them inside the overlay-images container
    document.querySelectorAll(".overlay-trigger").forEach(image => {
        const imgClone = document.createElement("img");
        imgClone.src = image.getAttribute("data-image");
        imgClone.className = "overlay-image"; // Assign a class for styling
        overlayImagesContainer.appendChild(imgClone);
    });

    // Handle opening the overlay
    document.querySelectorAll(".overlay-trigger").forEach(image => {
        image.addEventListener("click", function () {
            const imageSrc = this.getAttribute("data-image");

            // Set the overlay to be visible
            overlay.classList.add("visible");

            // Scroll to the clicked image inside the overlay
            const selectedImage = [...overlayImagesContainer.children].find(img => img.src.includes(imageSrc));
            if (selectedImage) {
                selectedImage.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    // Handle closing the overlay
    closeOverlay.addEventListener("click", function () {
        overlay.classList.remove("visible");
    });

    // Close the overlay when clicking outside of an image
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay || e.target === overlayImagesContainer) {
            overlay.classList.remove("visible");
        }
    });
});


