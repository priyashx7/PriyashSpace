document.addEventListener("DOMContentLoaded", function() {   
    

    /* to add scrolling functionlaity while tapping the navigating words */ 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
            behavior: 'smooth'
            });
        }
        });
    });
    
    /* For deiciding what to show image or video on cover based on internet speed of the user */
    const video = document.getElementById("background-video");
    const image = document.getElementById("background-image");

    if ('connection' in navigator) {
        let speed = navigator.connection.downlink; // Get network speed in Mbps
        console.log("Network Speed:", speed + " Mbps");

        if (speed < 1) {  // If speed is less than 1Mbps, show image
            video.style.display = "none";
            image.style.display = "block";
        } else { // If speed is good, show video
            image.style.display = "none";
            video.style.display = "block";
        }
    } else {
        console.log("Network API not supported, defaulting to video.");
    }


    /* for adding the hamburger fuctionality of toggling down while clicking onto it */
    document.querySelector('.hamburger-menu').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    /* to add fuctionality in navigation bar */     
    var navbar = document.querySelector('.navbar');
    var lastScrollTop = 0; // Variable to keep track of the last scroll position
    var scrollThreshold = 100; // Adjust as needed for changing color

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Hide/Show navbar on scroll direction
        if (currentScroll > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling

        // Change navbar color based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });





    function adjustSectionPositions() {
        // Calculate the height of the hero section and store it in x
        var x = document.querySelector('.hero-section').offsetHeight;
        
        
        //  also find the variable heigh of the experience section as well


        // Check if the current screen is mobile
        var isMobile = window.matchMedia("(max-width: 768px)").matches; // Example breakpoint for mobile
        // Check if the current screen is tablet
        var isTablet = window.matchMedia("(min-width: 769px) and (max-width: 1200px)").matches;

        if (isMobile) {
            // Top values for mobile layout
            document.querySelector('.about-section').style.top = (x + 20) + 'px';  // Example value for mobile
            document.querySelector('.experience-section').style.top = (x + 800) + 'px';
            document.querySelector('.project-section').style.top = (x + 2200) + 'px';
            document.querySelector('.skill-section').style.top = (x + 3350) + 'px';
            document.querySelector('.blog-section').style.top = (x + 3900) + 'px';
            document.querySelector('.connect-section').style.top = (x + 5200) + 'px';
            // ... Repeat for other sections and adjust as needed for mobile ...
        } else if (isTablet) {
            // Top values for tablet layout
            document.querySelector('.about-section').style.top = (x + 80) + 'px';  // Example values for tablet
            document.querySelector('.experience-section').style.top = (x + 950) + 'px';
            document.querySelector('.project-section').style.top = (x + 1750) + 'px';
            document.querySelector('.skill-section').style.top = (x + 2650) + 'px';
            document.querySelector('.blog-section').style.top = (x + 3200) + 'px';
            document.querySelector('.connect-section').style.top = (x + 3950) + 'px';
            // ... Adjust and repeat for other sections as needed for tablet ...
        }else {
            // Top values for desktop layout
            document.querySelector('.about-section').style.top = (x + 200) + 'px';
            document.querySelector('.experience-section').style.top = (x + 600) + 'px';
            document.querySelector('.project-section').style.top = (x + 1400) + 'px';
            document.querySelector('.skill-section').style.top = (x + 2400) + 'px';
            document.querySelector('.blog-section').style.top = (x + 3000) + 'px';
            document.querySelector('.connect-section').style.top = (x + 3816) + 'px';
            // ... Repeat for other sections and adjust as needed for desktop ...
        }
        // Repeat this for other sections
    }
    // Call adjustSectionPositions on page load and window resize
    window.addEventListener('resize', adjustSectionPositions);
    window.addEventListener('load', adjustSectionPositions);


    // for the project menu catalogue
    const tabs = document.querySelectorAll(".tab-item");
    const contents = document.querySelectorAll(".menu-content");

    // Ensure initial active state
    document.querySelector(".tab-item.active-tab").classList.add("active-tab");
    document.querySelector(".menu-content.active").classList.add("active");

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Remove 'active' class from all tabs and contents
            tabs.forEach(t => t.classList.remove("active-tab"));
            contents.forEach(content => content.classList.remove("active"));

            // Add 'active' class to the clicked tab and corresponding content
            this.classList.add("active-tab");
            const targetId = this.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            targetContent.classList.add("active");
        });
    });

    // for adding the aniamtion in the section while they come into view
    const sections = document.querySelectorAll('.section');

    function checkVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Check if the section is in the viewport
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Add the 'visible' class only when the section is in the viewport
                if (!section.classList.contains('visible')) {
                    section.classList.add('visible');
                }
            } else {
                // Optionally remove the 'visible' class when the section is out of the viewport
                if (section.classList.contains('visible')) {
                    section.classList.remove('visible');
                }
            }
        });
    }

    // Trigger visibility check when scrolling
    window.addEventListener('scroll', checkVisibility);

    // Avoid triggering animation when page initially loads
    // Only check visibility if the user has scrolled
    window.addEventListener('load', function() {
        setTimeout(checkVisibility, 100);  // Delayed execution to allow initial load of page
    });

    // Initial trigger of visibility check to account for sections already visible (if scrolled to)
    checkVisibility();

    // Once all positioning is done, hide the loading overlay
    window.onload = function() {
        // Call adjustSectionPositions
        adjustSectionPositions();
    
        // Hide the loading overlay
        document.getElementById('loading-overlay').style.display = 'none';
        };



});
