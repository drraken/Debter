let submit_box = document.getElementById('submit-box');
let login_page = document.getElementById('login-page');
let submit_debt = document.getElementById('submit-debt');
let add_button = document.getElementById('plusButton');
let logout_button = document.getElementById('logout-button');
let exit_add = document.getElementById('exit-add');
let add_debt_page = document.getElementById('add-debt-page');
let header = document.getElementById('header');
let home_page = document.getElementById('home-page');
let debt_page = document.getElementById('debt-page');
let history_page = document.getElementById('history-page');
let footer = document.getElementById('footer');
let getKey = sessionStorage.getItem('key');
let logged_user = document.getElementById('logged-user');
let user = sessionStorage.getItem('user');
let history_container = document.getElementById('history-container');
let balance = document.getElementById('balance');
let message = document.getElementById('message');
let homePageContainer = document.getElementById('HomePageContainer');
let clearSomeSection = document.getElementById('clearSomeSection');
let exitClearSome = document.getElementById('exit-clearSome');
let submitSubstractPart = document.getElementById('submitSubstractPart');
let amountOutOfRangeMessage = document.getElementById('amountOutOfRangeMessage');
let errorMessageAddingSection = document.getElementById('errorMessageAddingSection');
let errorMessageLoginSection = document.getElementById('errorMessageLoginSection');
let loadingOverlay = document.getElementById('LoadingOverlay');
logged_user.innerHTML = user;


if (getKey == '123') {
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
});
add_button.addEventListener('click', (e) => {
    e.preventDefault();
    add_debt_page.classList.remove("is-close");
});
exit_add.addEventListener('click', (e) => {
    e.preventDefault();
    add_debt_page.classList.add("is-close");
    errorMessageAddingSection.innerHTML = '';

});
exitClearSome.addEventListener('click', (e) => {
    e.preventDefault();
    clearSomeSection.classList.add("is-close");
    amountOutOfRangeMessage.innerHTML = '';

});
submit_debt.addEventListener('click', (e) => {
    e.preventDefault();
    loadingOverlay.classList.remove("is-close");
    let debtor = document.getElementById('debtor').value;
    let lendor = document.getElementById('lendor').value;
    let amount = document.getElementById('amount').value;
    let desc = document.getElementById('description').value;
    if (getKey == '123' && amount > 0 && amount < 500 && debtor != lendor) {
        addSomeNewData(debtor, lendor, amount, desc);
        add_debt_page.classList.add('is-close');
        ShowTheDebts();
    } else if(amount < 0 || amount > 500) {
      errorMessageAddingSection.innerHTML = 'Amount must be between 0 and 500';
      loadingOverlay.classList.add("is-close");
    }
    else if(debtor == lendor){
      errorMessageAddingSection.innerHTML = 'Debtor must be different then lender';
      loadingOverlay.classList.add("is-close");
    }
})
submit_box.addEventListener('click', (e) => {
    e.preventDefault();
    loadingOverlay.classList.remove("is-close");
    let login = document.getElementById('login_box').value.toLowerCase();
    let password = document.getElementById('password_box').value;
    CheckTheData(login, password);
    ShowTheDebts();    
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
        sessionStorage.setItem('key', key_value);
        sessionStorage.setItem('user', user_value);
        location.reload();
        login_page.classList.add("is-close");
        header.classList.remove("is-close");
        footer.classList.remove('is-close');
        home_page.classList.remove("is-close");
        debt_page.classList.remove('is-close');
        history_page.classList.remove('is-close');
        logged_user.innerHTML = user_value;
    } else {
        loadingOverlay.classList.add('is-close');
        errorMessageLoginSection.innerHTML = 'Wrong login data! Please try again.';
    }
}
//<----------ADDING NEW DEBTS------------------>
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
    setTimeout('window.location.reload();', 500);



}


/////////////////////////////////////////////////////////////////////////////////////////
//<------HISTORY PAGE RENDERING------>
function ShowTheDebts() {
    if (getKey == '123') {
        const url = "https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/myHistoryLambda";
        fetch(url)
            .then(response => response.json())
            .then(data => showData(JSON.parse(data.query)));
    } else {
        history_container.innerHTML = "YOU ARE NOT ALLOWED TO SEE THIS CONTENT";
    }
};

let containerMarkup = '';
let historyMap = [];

function showData(data) {
    data.forEach((e) => {
        let temp = {};
        temp.id = e.idTransaction;
        temp.debtor = e.debtor;
        temp.lender = e.lender;
        temp.amount = e.amount;
        temp.desc = e.description;
        temp.date = e.CreationDate;
        historyMap.push(temp);
    });
    containerMarkup = `<ul class='history-class'>`;


    historyMap.forEach((u) => {
        containerMarkup += `<li class='history-li-class'> <p>ID:</p> ${u.id}  <p>Debtor:</p> ${u.debtor}  <p>Lender:</p> ${u.lender}  <p>Amount:</p> ${u.amount}<p>Desc:</p> ${u.desc}  <p>Date:</p> ${u.date}</li><br>`;
    });

    containerMarkup += '</ul>';
    history_container.innerHTML = containerMarkup;
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



//<------------HOME PAGE RENDERING----------->
function ShowTheHomePageDebt() {
    if (getKey == '123') {
        const url = " https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/transactionHistory";
        fetch(url)
            .then(response => response.json())
            .then(data => showHomeData(JSON.parse(data.query)));
    } else {
        home_page.innerHTML = "YOU ARE NOT ALLOWED TO SEE THIS CONTENT";
    }
};



let containerHomeMarkup = '';
let balanceMap = [];
let homeMap = [];
let balance_amount = 0;
let userPersonalizedBalance = [
    {
        user: 'arek',
        debts: [{
                name: 'wojtek',
                amount: 0
        },
            {
                name: 'daniel',
                amount: 0
        }, {
                name: 'kuba',
                amount: 0
        }, {
                name: 'krzychu',
                amount: 0
        }
                    ]
    }, {
        user: 'wojtek',
        debts: [{
                name: 'daniel',
                amount: 0
        },
            {
                name: 'arek',
                amount: 0
        }, {
                name: 'kuba',
                amount: 0
        }, {
                name: 'krzychu',
                amount: 0
        }
                    ]
    }, {
        user: 'kuba',
        debts: [{
                name: 'wojtek',
                amount: 0
        },
            {
                name: 'arek',
                amount: 0
        }, {
                name: 'daniel',
                amount: 0
        }, {
                name: 'krzychu',
                amount: 0
        }
                    ]
    }, {
        user: 'krzychu',
        debts: [{
                name: 'wojtek',
                amount: 0
        },
            {
                name: 'arek',
                amount: 0
        }, {
                name: 'kuba',
                amount: 0
        }, {
                name: 'daniel',
                amount: 0
        }
                    ]
    }, {
        user: 'daniel',
        debts: [{
                name: 'wojtek',
                amount: 0
        },
            {
                name: 'arek',
                amount: 0
        }, {
                name: 'kuba',
                amount: 0
        }, {
                name: 'krzychu',
                amount: 0
        }
                    ]
    }]

function showHomeData(data) {
    data.forEach((e) => {
        if (e.debtor == user.toLowerCase() && e.debtor != e.lender) {
            balance_amount -= e.amount;
        } else if (e.lender == user.toLowerCase() && e.debtor != e.lender) {
            balance_amount += e.amount;
        }
        let temp = [];
        let temp1 = [];
        temp.balance_amount = balance_amount;
        temp1.debtor = e.debtor;
        temp1.lender = e.lender;
        temp1.amount = e.amount;
        balanceMap.push(temp);
        homeMap.push(temp1);

    });
    var lastRowOfBalanceMap = balanceMap[balanceMap.length - 1];
    balance.innerHTML = lastRowOfBalanceMap.balance_amount;
    if (lastRowOfBalanceMap.balance_amount > 0) {
        message.innerHTML = "It looks like you lend someone yours money.."
    }
    if ((lastRowOfBalanceMap.balance_amount < 0)) {
        message.innerHTML = "It looks like you own some money to someone..."
    }
    if (lastRowOfBalanceMap.balance_amount == 0) {
        message.innerHTML = "It looks like you are fine with debts..."
    }


    userPersonalizedBalance.forEach((d) => {
        homeMap.forEach((h) => {
            if (h.lender == d.user) {
                d.debts.forEach((x) => {
                    if (x.name == h.debtor) {
                        x.amount += h.amount;
                    }
                })
            } else if (h.debtor == d.user) {
                d.debts.forEach((x) => {
                    if (x.name == h.lender) {
                        x.amount -= h.amount;
                    }
                })
            }
        })

    });


    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    containerHomeMarkup = `<li>`;
    const personalDebtList = document.querySelector('#personalDebtList');
    userPersonalizedBalance.forEach((i) => {
        if (i.user == user.toLowerCase()) {
            i.debts.forEach((d) => {
                containerHomeMarkup += `<div class='SingleBlockDebtContainer'><div class = 'user-container'><h2>${jsUcfirst(d.name)}</h2><p class='balance'><span><strong>${d.amount}</strong>zł</span></p> </div><div class='button-container'><a class="button">Clear</a><a class="buttonAll">Clear All</a></div></div>`;
            })

        }

    });

    containerHomeMarkup += '</li>';
    personalDebtList.innerHTML = containerHomeMarkup;
    
//<---------Clear buttons---------->
let buttonContainer = personalDebtList.querySelectorAll('.button-container');
    
function subtractDebt(debtor, lender, amount, desc) {
    const Equalizer = {
        debtor: debtor,
        lender: lender,
        amount: amount,
        desc: desc,
    }

    fetch('https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/myEraseFunction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Equalizer)
        })
        .then(response => {
            return response.json()
        });
    
    setTimeout('window.location.reload();', 500);
};
buttonContainer.forEach((e) => {
    e.firstChild.addEventListener('click', (event) => {        
        clearSomeSection.classList.remove("is-close");
        let currentDebt = Number( e.parentElement.childNodes[0].children[1].children[0].children[0].innerHTML);
        let lender = e.parentElement.children[0].firstChild.innerHTML.toLowerCase();
        submitSubstractPart.addEventListener('click', (event) => {
            loadingOverlay.classList.remove("is-close");
            let amountOfSubstract = Number(document.getElementById('amountOfSubstract').value);
            if (currentDebt > 0 && amountOfSubstract <= currentDebt && amountOfSubstract > 0) {
                subtractDebt(user.toLowerCase(), lender, amountOfSubstract, "Auto generated debt to subtract part of the debt");
                clearSomeSection.classList.add("is-close");
            } else if (currentDebt < 0 && amountOfSubstract <= -currentDebt && amountOfSubstract > 0) {
                subtractDebt(user.toLowerCase(), lender, -amountOfSubstract, "Auto generated debt to subtract part of the debt");
                clearSomeSection.classList.add("is-close");
            } else {
                amountOutOfRangeMessage.innerHTML = 'Amount out of the current debt range';
                loadingOverlay.classList.add("is-close");
            }            

        });
    })
});

buttonContainer.forEach((e) => {
    e.lastChild.addEventListener('click', (event) => {
        loadingOverlay.classList.remove("is-close");
        let lender = e.parentElement.children[0].firstChild.innerHTML.toLowerCase();
        let amount = e.parentElement.childNodes[0].children[1].children[0].children[0].innerHTML;
         subtractDebt(user.toLowerCase(), lender, amount, "Auto generated debt to equalize balance");     
    });
});

//<------------DEBT LIST---------->
const debtList = document.querySelector('#debt-list');
let listMarkup = '';


userPersonalizedBalance.forEach((u) => {
    let debtListBalance = 0;
    u.debts.forEach((d) => {
        debtListBalance += d.amount;
    })
    if (debtListBalance >= 0) {
        listMarkup += `<li>
                    <div class='accordion-header' >
                        <p>${jsUcfirst(u.user)}<span class="balance positive"> ${debtListBalance}zł</span></p>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-content" >
                            <p> Details: </p>
                            <ul class='inner-list'>`


    } else if (debtListBalance < 0) {
        listMarkup += `<li>
                    <div class='accordion-header'>
                        <p>${jsUcfirst(u.user)}<span class="balance negative"> ${debtListBalance}zł</span></p>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="accordion-content" >
                            <p> Details: </p>
                            <ul class='inner-list'>`

    }
    u.debts.forEach((relation) => {
        listMarkup += `<li>
                                    <div>
                                        <p>${jsUcfirst(relation.name)}</p>
                                        <p class="balance"><span>${relation.amount}zł</span></p>
                                    </div>
                                </li>`
    });
    listMarkup += `        </ul>
                        </div>
                    </li>`

});

debtList.innerHTML = listMarkup;
let accordionHeaders = debtList.querySelectorAll('.accordion-header');

accordionHeaders.forEach((e) => {
    e.addEventListener('click', (event) => {
        e.parentNode.childNodes[3].classList.toggle("isActive");
        e.childNodes[3].classList.toggle("fa-chevron-up");

    })
});
}

ShowTheHomePageDebt();

//arrowy + redesign adding window