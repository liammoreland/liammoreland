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