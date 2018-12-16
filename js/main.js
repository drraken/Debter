
let submit_button = document.getElementById('submit_box');
let login_page = document.getElementById('login_page');
let debt_page = document.getElementById('debt_page');
let add_page = document.getElementById('add_page');
let add_button = document.getElementById('add_button');
let logout_button = document.getElementById('logout_button');
let exit_add = document.getElementById('exit_add');
let add_debt = document.getElementById('add-debt');
////
let arek_wojtek = document.getElementById('arek_wojtek');
let arek_kuba = document.getElementById('arek_kuba');
let arek_krzychu = document.getElementById('arek_krzychu');
let arek_daniel = document.getElementById('arek_daniel');
let kuba_wojtek = document.getElementById('kuba_wojtek');
let kuba_arek = document.getElementById('kuba_arek');
let kuba_krzychu = document.getElementById('kuba_krzychu');
let kuba_daniel = document.getElementById('kuba_daniel');
let krzychu_wojtek = document.getElementById('krzychu_wojtek');
let krzychu_arek = document.getElementById('krzychu_arek');
let krzychu_kuba = document.getElementById('krzychu_kuba');
let krzychu_daniel = document.getElementById('krzychu_daniel');
let wojtek_kuba = document.getElementById('wojtek_kuba');
let wojtek_arek = document.getElementById('wojtek_arek');
let wojtek_krzychu = document.getElementById('wojtek_krzychu');
let wojtek_daniel = document.getElementById('wojtek_daniel');
let daniel_wojtek = document.getElementById('daniel_wojtek');
let daniel_arek = document.getElementById('daniel_arek');
let daniel_krzychu = document.getElementById('daniela_krzychu');
let daniel_kuba = document.getElementById('daniela_kuba');

var stayLogIn = sessionStorage.getItem('key');
if(stayLogIn == '123'){
    login_page.classList.add("is-close");
    debt_page.classList.add("is-open");
}

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
            console.log(element);
            valid = true;
            key_value = element.key;
        }
    })
    if (valid) {
        alert('Hello ' + l);                
        login_page.classList.add("is-close");
        debt_page.classList.add("is-open");
        sessionStorage.setItem('key', key_value);
        ShowTheDebts();


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
        .then(data => console.log(data))
        .then(window.location.reload());
        
        
    
}


/////////////////////////////////////////////////////////////////////////////////////////
function ShowTheDebts() {

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
}
ShowTheDebts()
//logi w ten sposób
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
