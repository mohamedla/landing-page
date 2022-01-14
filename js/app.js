// window load event is to check if the page is fully loaded before do any thing
// that enable me to link the js file to the head tag
window.addEventListener('load',()=>{
    /* 
        build link menu by taking 
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
                /* the value in the topDistance is nigative && the topDistance greater than the hieght mean that the section is out in viewport 
                 (note 2.5/3 of the height represent the content height as height represent the (content height + boder + padding))*/
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
    let notScrolling;
    let lastScroll = 0;
    window.addEventListener('scroll',()=>{
        makeActive(topClosest(sections),sections,navItems);
        /*
            Suggested
            hide fixed nav bar while not scrolling
            adding event on scroll mean that the user is scrolling and using 
            the setTimeout is for checking if the user stop scrolling the main idea is that 
                - when user is scrolling the Event is keep happend
                - every time the event happed it clear the timeout fnction so the time need to fire the timeout will not pass.
                - and when the scrolling stop the time out will not be cleared  so the time will pass and the function will be fire
            the nav bar will be visible on load
        */
        navMenu.classList.remove('hidden');
        if (notScrolling !== undefined) {
            clearTimeout(notScrolling);
        }
        notScrolling = setTimeout(() => {
            navMenu.classList.add('hidden');
        }, 100);
        /*
            here detect the scroll to to or down using window.pageYOffset'build in function' and lastScroll that store last scroll'window.pageYOffset'
            window.pageYOffset return the distance from the top of the page
            and by comparing lastScroll and current window.pageYOffset if lastScroll is greater then the user went up as the distance to the top become smaler and if lastScroll is leas then it went down as the distance top increase
        */
        if (window.pageYOffset > lastScroll) {
            toTopBtn.classList.remove('hidden');
        } else {
            toTopBtn.classList.add('hidden');
        }
        lastScroll = window.pageYOffset;
    });
    // suggested
        //  make section collapside on click
    const sectColls = document.querySelectorAll('section .collapside');
    for (const collap of sectColls) {
        collap.addEventListener('click',()=>{
            const sectionContent = collap.parentElement.querySelector('.landing__container');
            collap.innerHTML = (sectionContent.classList.contains('hidden'))?`<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>`:`<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg> <h3>${sectionContent.querySelector('h2').innerText}</h3>`;
            sectionContent.classList.toggle('hidden');
        });
    }
    
    // to top button
        // add event to toTopBtn to scroll smothly to the top of the page on click
    const toTopBtn = document.querySelector('button#scroll_top');
    toTopBtn.addEventListener('click',()=>{
        window.scroll({top:0,behavior: "smooth"});
    });
    
    
});
