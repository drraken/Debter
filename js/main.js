let submit_button = document.getElementById('submit_box');
let login_page = document.getElementById('login_page');
let debt_page = document.getElementById('debt_page');
let add_page = document.getElementById('add_page');
let add_button = document.getElementById('add_button');
let logout_button = document.getElementById('logout_button');
let exit_add = document.getElementById('exit_add');
let add_debt = document.getElementById('add-debt');

logout_button.addEventListener('click', (e) => {
    e.preventDefault();
    login_page.classList.remove("is-close");
    debt_page.classList.remove("is-open");
    add_page.classList.remove("is-open");
    sessionStorage.removeItem('key');
})
add_button.addEventListener('click', (e) => {
    e.preventDefault();
    add_page.classList.add("is-open");
})
exit_add.addEventListener('click', (e) => {
    e.preventDefault();
    add_page.classList.remove("is-open");

})
add_debt.addEventListener('click',(e)=> {
    e.preventDefault();
    let debtor = document.getElementById('debtor').value;
    let lendor = document.getElementById('lendor').value;
    let amount = document.getElementById('amount').value;
    let desc = document.getElementById('description').value;    
    var validation = sessionStorage.getItem('key');
    if(validation == '123'){
    addSomeNewData(debtor,lendor,amount,desc);
    add_page.classList.remove('is-open');
        console.log('validation granted');
    }
})
submit_button.addEventListener('click', (e) => {
    e.preventDefault();
    let login = document.getElementById('login_box').value;
    let password = document.getElementById('password_box').value;
    CheckTheData(login, password);
})

function CheckTheData(l,p) {

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
            valid = true;
            key_value = element.key;
        }
    })
    if (valid) {
        alert('Hello ' + l);                
        login_page.classList.add("is-close");
        debt_page.classList.add("is-open");
        sessionStorage.setItem('key', key_value);


    } else {
        alert('Wrong login data!');
    }
}
//adding new debts to database
function addSomeNewData(debtor_val, lender_val, amount_val,desc_val) {

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
        })
        .then(data => console.log(data));
    
}


/////////////////////////////////////////////////////////////////////////////////////////

 
/*let data = [{
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
container.innerHTML = containerMarkup;*/
