let submit_box = document.getElementById('submit-box');
let login_page = document.getElementById('login-page');
let submit_debt = document.getElementById('submit-debt');
let add_button = document.getElementById('add-button');
let logout_button = document.getElementById('logout-button');
let exit_add = document.getElementById('exit-add');
let add_debt_page = document.getElementById('add-debt-page');
let header = document.getElementById('header');
let home_page = document.getElementById('home-page');
let debt_page = document.getElementById('debt-page');
let history_page = document.getElementById('history-page');
let footer = document.getElementById('footer');
let stayLogIn = sessionStorage.getItem('key');
let logged_user = document.getElementById('logged-user');
let user = sessionStorage.getItem('user');
let history_container = document.getElementById('history-container');
logged_user.innerHTML = user;

if (stayLogIn == '123') {
    login_page.classList.add("is-close");
    header.classList.remove("is-close");
    footer.classList.remove('is-close');
    home_page.classList.remove("is-close");
    debt_page.classList.remove('is-close');
    history_page.classList.remove('is-close');
}

logout_button.addEventListener('click', (e) => {
    e.preventDefault();
    login_page.classList.remove("is-close");    
    add_debt_page.classList.add("is-close");
    header.classList.add('is-close');
    footer.classList.add('is-close');
    home_page.classList.add("is-close");
    debt_page.classList.add('is-close');
    history_page.classList.add('is-close');
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('user');
})
add_button.addEventListener('click', (e) => {
    e.preventDefault();
    add_debt_page.classList.remove("is-close");
})
exit_add.addEventListener('click', (e) => {
    e.preventDefault();
    add_debt_page.classList.add("is-close");

})
submit_debt.addEventListener('click', (e) => {
    e.preventDefault();
    let debtor = document.getElementById('debtor').value;
    let lendor = document.getElementById('lendor').value;
    let amount = document.getElementById('amount').value;
    let desc = document.getElementById('description').value;
    var validation = sessionStorage.getItem('key');
    if (validation == '123') {
        addSomeNewData(debtor, lendor, amount, desc);
        add_debt_page.classList.add('is-close');        


    }
})
submit_box.addEventListener('click', (e) => {
    e.preventDefault();
    let login = document.getElementById('login_box').value.toLowerCase();
    let password = document.getElementById('password_box').value;
    CheckTheData(login, password);
})

function CheckTheData(l, p) {

    const url = "https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/users";
    fetch(url)
        .then(response => response.json())
        .then(data => sendData(JSON.parse(data.query), l, p));

};
//checking if all parameters are correct
function sendData(data, l, p) {
    let valid = false;
    data.forEach(element => {
        if (element.Login == l && element.Password == p) {
            console.log(element);
            valid = true;
            key_value = element.key;            
            user_value = element.Login.toUpperCase();
        }
    })
    if (valid) {
        alert('Hello ' + l.toUpperCase());
        login_page.classList.add("is-close");
        header.classList.remove("is-close");
        footer.classList.remove('is-close');
        home_page.classList.remove("is-close");
        debt_page.classList.remove('is-close');
        history_page.classList.remove('is-close');
        sessionStorage.setItem('key', key_value);
        sessionStorage.setItem('user',user_value);        
        logged_user.innerHTML = user_value;
        
        
        


    } else {
        alert('Wrong login data!');
    }
}
//adding new debts to database
function addSomeNewData(debtor_val, lender_val, amount_val, desc_val) {

    const Debt = {
        debtor: debtor_val,
        lender: lender_val,
        amount: amount_val,
        desc: desc_val,
    }

    console.log(Debt);

    fetch('https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/myPostLambda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Debt)
        })
        .then(response => {
            return response.json()
        });




}


/////////////////////////////////////////////////////////////////////////////////////////
function ShowTheDebts() {

        const url = "https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/myHistoryLambda";
        fetch(url)
            .then(response => response.json())
            .then(data => showData(JSON.parse(data.query)));
            
    };
//<------HISTORY PAGE RENDERING------>
let containerMarkup = '';
let historyMap = [];
function showData(data){
data.forEach((e) => {
    let temp = {};
    temp.id = e.idTransaction;
    temp.debtor = e.debtor;
    temp.lender = e.lender;
    temp.amount = e.amount;
    temp.desc = e.description;
    temp.date = e.CreationDate;
    historyMap.push(temp);
    console.log(temp);
});
containerMarkup = `<ul class='history-class'>`;
 
    
historyMap.forEach((u) => {
  containerMarkup += `<li class='history-li-class'> <p>ID:</p> ${u.id}  <p>Debtor:</p> ${u.debtor}  <p>Lender:</p> ${u.lender}  <p>Amount:</p> ${u.amount}<br><p>Desc:</p> ${u.desc}  <p>Date:</p> ${u.date}</li>` ;
     console.log(u);
});

containerMarkup += '</ul>';
history_container.innerHTML = containerMarkup;
console.log(containerMarkup);
}
ShowTheDebts();

//<--------BOTTOM NAVIGATION-------->
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
