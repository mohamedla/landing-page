/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

const navMenu = document.querySelector('.navbar__menu');
const navBar = document.createElement('ul');
const sections = document.querySelectorAll('section');
for (const section of sections) {
    const title = section.querySelector('h2');
    const newSpan = document.createElement('li');
    newSpan.textContent = title.innerText;
    newSpan.addEventListener('click',()=>{
        section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
    navBar.append(newSpan);
}
navMenu.append(navBar);