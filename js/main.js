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
var stayLogIn = sessionStorage.getItem('key');
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
    //debt_page.classList.remove("is-close");
    add_debt_page.classList.add("is-close");
    header.classList.add('is-close');
    footer.classList.add('is-close');
    home_page.classList.add("is-close");
    debt_page.classList.add('is-close');
    history_page.classList.add('is-close');
    sessionStorage.removeItem('key');
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
        console.log('validation granted');


    }
})
submit_box.addEventListener('click', (e) => {
    e.preventDefault();
    let login = document.getElementById('login_box').value;
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
        }
    })
    if (valid) {
        alert('Hello ' + l);
        login_page.classList.add("is-close");
        header.classList.remove("is-close");
        footer.classList.remove('is-close');
        home_page.classList.remove("is-close");
        debt_page.classList.remove('is-close');
        history_page.classList.remove('is-close');
        sessionStorage.setItem('key', key_value);


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
/*function ShowTheDebts() {

        const url = " https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/transactionHistory";
        fetch(url)
            .then(response => response.json())
            .then(data => showData(JSON.parse(data.query)));
            
    };


function showData(data) {    
    data.forEach(element => {           
      console.log(element);
        if(element.debt == 'arek-wojtek'){
           arek_wojtek.innerHTML = Number(arek_wojtek.innerHTML) - Number(element.amount); 
           wojtek_arek.innerHTML = Number(wojtek_arek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'arek-kuba'){
           arek_kuba.innerHTML = Number(arek_kuba.innerHTML) - Number(element.amount); 
           kuba_arek.innerHTML = Number(kuba_arek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'arek-krzychu'){
           arek_krzychu.innerHTML = Number(arek_krzychu.innerHTML) - Number(element.amount); 
           krzychu_arek.innerHTML = Number(krzychu_arek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'arek-daniel'){
           arek_daniel.innerHTML = Number(arek_daniel.innerHTML) - Number(element.amount); 
           daniel_arek.innerHTML = Number(daniel_arek.innerHTML) + Number(element.amount);
        }
        //////////////////
        if(element.debt == 'kuba-wojtek'){
           kuba_wojtek.innerHTML = Number(kuba_wojtek.innerHTML) - Number(element.amount); 
           wojtek_kuba.innerHTML = Number(wojtek_kuba.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-arek'){
           kuba_arek.innerHTML = Number(kuba_arek.innerHTML) - Number(element.amount); 
           arek_kuba.innerHTML = Number(arek_kuba.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-krzychu'){
           kuba_krzychu.innerHTML = Number(kuba_krzychu.innerHTML) - Number(element.amount); 
           krzychu_kuba.innerHTML = Number(krzychu_kuba.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-daniel'){
           kuba_daniel.innerHTML = Number(kuba_daniel.innerHTML) - Number(element.amount); 
           daniel_kuba.innerHTML = Number(daniel_kuba.innerHTML) + Number(element.amount);
        }
        /////////////////
         if(element.debt == 'krzychu-wojtek'){
           krzychu_wojtek.innerHTML = Number(krzychu_wojtek.innerHTML) - Number(element.amount); 
           wojtek_krzychu.innerHTML = Number(wojtek_krzychu.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'krzychu-arek'){
           krzychu_arek.innerHTML = Number(krzychu_arek.innerHTML) - Number(element.amount); 
           arek_krzychu.innerHTML = Number(arek_krzychu.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'krzychu-kuba'){
           krzychu_kuba.innerHTML = Number(krzychu_kuba.innerHTML) - Number(element.amount); 
           kuba_krzychu.innerHTML = Number(kuba_krzychu.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'krzychu-daniel'){
           krzychu_daniel.innerHTML = Number(krzychu_daniel.innerHTML) - Number(element.amount); 
           daniel_krzychu.innerHTML = Number(daniel_krzychu.innerHTML) + Number(element.amount);
        }
        ////////////////
         if(element.debt == 'wojtek-kuba'){
           wojtek_kuba.innerHTML = Number(wojtek_kuba.innerHTML) - Number(element.amount); 
           kuba_wojtek.innerHTML = Number(kuba_wojtek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-arek'){
           wojtek_arek.innerHTML = Number(wojtek_arek.innerHTML) - Number(element.amount); 
           arek_wojtek.innerHTML = Number(arek_wojtek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-krzychu'){
           wojtek_krzychu.innerHTML = Number(wojtek_krzychu.innerHTML) - Number(element.amount); 
           krzychu_wojtek.innerHTML = Number(krzychu_wojtek.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'kuba-daniel'){
           wojtek_daniel.innerHTML = Number(wojtek_daniel.innerHTML) - Number(element.amount); 
           daniel_wojtek.innerHTML = Number(daniel_wojtek.innerHTML) + Number(element.amount);
        }
        /////////////
         if(element.debt == 'daniel-wojtek'){
           daniel_wojtek.innerHTML = Number(daniel_wojtek.innerHTML) - Number(element.amount); 
           wojtek_daniel.innerHTML = Number(wojtek_daniel.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'daniel-arek'){
           daniel_arek.innerHTML = Number(daniel_arek.innerHTML) - Number(element.amount); 
           arek_daniel.innerHTML = Number(arek_daniel.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'daniel-krzychu'){
           daniel_krzychu.innerHTML = Number(daniel_krzychu.innerHTML) - Number(element.amount); 
           krzychu_daniel.innerHTML = Number(krzychu_daniel.innerHTML) + Number(element.amount);
        }
        if(element.debt == 'daniel-kuba'){
           daniel_kuba.innerHTML = Number(daniel_kuba.innerHTML) - Number(element.amount); 
           kuba_daniel.innerHTML = Number(kuba_daniel.innerHTML) + Number(element.amount);
        }
    })    
}*/
/*ShowTheDebts()
//logi w ten sposób
let data = [{
  name: "test 1",
  surname :"test 123"
},{
  name: "test 1",
  surname : "test 123"
}];

let container = document.querySelector('#container');
let containerMarkup = <ul>;

data.forEach((e)=>{
  containerMarkup += <li> Name: ${e.name} | Surname ${e.surname} </li> ;
});

containerMarkup += </ul>;
console.log(containerMarkup);
container.innerHTML = containerMarkup;
// Navigate beetwen pages*/

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
