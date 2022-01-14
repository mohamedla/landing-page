/* build link menu by taking 
    navigation->the section that will hold menu containercontainer
    sectionList->the list of sections that need to pe linked in menu
    container->container that hold links and will be appended by navigation
*/
function buildMenu(navigation,sectionList,container) {
    for (const section of sectionList) {
        const newSpan = document.createElement('li');
        newSpan.textContent = section.getAttribute('data-nav');
        newSpan.setAttribute('id',section.getAttribute('id')+'_link')
        // Scroll to section on link click
        newSpan.addEventListener('click',()=>{
            section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        });
        container.append(newSpan);
    }
    navigation.append(container);
}

// Global variables for multi use
const navMenu = document.querySelector('.navbar__menu');
const sections = document.querySelectorAll('section');
const navBar = document.createElement('ul');

// Build menu
buildMenu(navMenu,sections,navBar);

// making the frist section link active by default
const navItems = navBar.querySelectorAll('li'); //global var but need to declar after building list
navItems[0].classList.add('active');

// control the menu diplay in small width
    // function to toggle between 2 values to the same property
    function toggleCssProp(element,prop,style1,style2) {
        element.style[prop] = (element.style[prop] === style1)?style2:style1;
    }
// make the menuTriger toggle the navBar between viewed and hidden on click
const menuTriger = document.querySelector('svg.menu_icon');
menuTriger.addEventListener('click',()=>{
    toggleCssProp(navBar,'display','block','none');
});

// on resize the page the nav menu cuz the menu triger may case some conflict with the style we want to diaplay
window.addEventListener('resize',()=>{
    if (window.innerWidth > 480) {
        navBar.style.display = 'block';
    } else {
        navBar.style.display = 'none';
    }
});

// determine the closest section of the sectionList to the top of the viewport
function topClosest(sectionList) {
    let theClosest;
    let topDistance;
    for (const section of sectionList) {
        // the value still have no value
        if (topDistance == undefined) {
            theClosest = section;
            topDistance = section.getBoundingClientRect().top;
        }else if((topDistance >= 0 && section.getBoundingClientRect().top >= 0) && (section.getBoundingClientRect().top < topDistance)){
        // the 2 values are positive && the section closer to top that the one register in theClosest
            theClosest = section;
            topDistance = section.getBoundingClientRect().top;
        }else if(topDistance < 0 && (-(topDistance) >= ((theClosest.getBoundingClientRect().height)*2.5/3))){
            // the value in the topDistance is nigative && the topDistance greater than the hieght mean that the section is out in viewport 
            // (note 2.5/3 of the height represent the content height as height represent the (content height + boder + padding))
            theClosest = section;
            topDistance = section.getBoundingClientRect().top;
        }
    }
    return theClosest;
}
// make the given theSection and its link active and unactivate the other section and its links in  sectionList linkList
function makeActive(theSection, sectionList, linkList) {
    if (!theSection.classList.contains('active')) {
        // remove active class from all section
        for (const section of sectionList) {
            section.classList.remove('active');
        }
        for (const item of linkList) {
            item.classList.remove('active');
        }
        // add active class to viewport section and its link
        theSection.classList.add('active');
        navBar.querySelector('li#'+theSection.getAttribute('id')+'_link').classList.add('active');
    }
}
// Set the closest to top sections as active on scrolling
window.addEventListener('scroll',()=>{
    makeActive(topClosest(sections),sections,navItems);
});
