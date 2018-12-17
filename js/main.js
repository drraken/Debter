// Navigate beetwen pages

let bottomNavigation = document.querySelectorAll('footer nav ul li');
let pages = document.querySelectorAll('div.page');

bottomNavigation.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        changeNavigationState(bottomNavigation, index);
    })
});

function changeNavigationState(links, activeIndex) {
    bottomNavigation.forEach((link, index) => {
        if (index == activeIndex) {
            link.classList.add('is-active');
            pages[index].classList.add('is-active');
        } else {
            link.classList.remove('is-active');
            pages[index].classList.remove('is-active');
        }
    });
}


// Users

//This data should be fetched
const users = ['Arek', 'Kuba', 'Krzychu', 'Wojtek', 'Daniel'];

const debtList = document.querySelector('#debt-list');
let listMarkup = '';

let userMap = [];

users.forEach((user, index) => {
    let temp = {};
    temp.user = user;
    temp.relations = users.filter((e, i) => {
        return index != i;
    });
    userMap.push(temp);
});


userMap.forEach((u) => {
    console.log(u);
    listMarkup += `<li>
                    <div class='accordion-header'>
                        <p>${u.user}<span class="balance positive"> 0.00$</span></p>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-content">
                            <p> Details: </p>
                            <ul class='inner-list'>`                 
                            u.relations.forEach((relation) => {
                                listMarkup += `<li>
                                    <div>
                                        <p>${relation}</p>
                                        <p class="balance"><span>0.00</span>$</p>
                                    </div>
                                </li>`         
                            });
    listMarkup += `        </ul>
                        </div>
                    </li>`
});

debtList.innerHTML = listMarkup;