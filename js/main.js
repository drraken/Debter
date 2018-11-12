let users = [{
    login: 'admin',
    password: 'nimda',
    key: '1234567890'
}];
let debt =[{
   debtor: 'arek',
   lender: 'krzychu',
   amount: 18.44
    },{
   debtor: 'daniel',
   lender: 'krzychu',
   amount: 27
    },{
   debtor: 'kuba',
   lender: 'wojtek',
   amount: 555
    },{
   debtor: 'arek',
   lender: 'wojtek',
   amount: 4
    }];


let submit_button = document.getElementById('submit_box');
let login_page = document.getElementById('login_page');
let debt_page = document.getElementById('debt_page');
let add_page = document.getElementById('add_page');
let add_button = document.getElementById('add_button');
let logout_button = document.getElementById('logout_button');
let exit_add = document.getElementById('exit_add');

let arek = document.getElementById('arek');
let kuba = document.getElementById('kuba');
let krzychu = document.getElementById('krzychu');
let wojtek = document.getElementById('wojtek');
let daniel = document.getElementById('daniel');

let arek_wojtek = document.getElementById('arek_wojtek');
let arek_kuba = document.getElementById('arek_kuba');
let arek_krzychu = document.getElementById('arek_krzychu');
let arek_daniel = document.getElementById('arek_daniel');

let kuba_wojtek = document.getElementById('kuba_wojtek');
let kuba_arek = document.getElementById('kuba_arek');
let kuba_krzychu = document.getElementById('kuba_krzychu');
let kuba_daniel = document.getElementById('kuba_daniel');

let krzychu_wojtek = document.getElementById('krzychu_wojtek');
let krzychu_kuba = document.getElementById('krzychu_kuba');
let krzychu_arek = document.getElementById('krzychu_arek');
let krzychu_daniel = document.getElementById('krzychu_daniel');

let wojtek_arek = document.getElementById('wojtek_arek');
let wojtek_kuba = document.getElementById('wojtek_kuba');
let wojtek_krzychu = document.getElementById('wojtek_krzychu');
let wojtek_daniel = document.getElementById('wojtek_daniel');

let daniel_wojtek = document.getElementById('daniel_wojtek');
let daniel_kuba = document.getElementById('daniel_kuba');
let daniel_krzychu = document.getElementById('daniel_krzychu');
let daniel_arek = document.getElementById('daniel_arek');






submit_button.addEventListener('click', (e) => {
            e.preventDefault();
            let login = document.getElementById('login_box').value;
            let password = document.getElementById('password_box').value;                      
            CheckTheData(login, password);           
        })

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
/////////////////////////////////////////////////////////////////////////////////////////


let sessionVar = sessionStorage.getItem('login');
if (sessionVar == 'true') {    
    
   
}

function CheckTheData(l, p) {
    sendData(users, l, p);
}

//funckja sprawdzajaca czy dane zgadzaja sie ze soba
function sendData(thing1, l, p) {
    let valid = false;
    thing1.forEach(element => {
        if (element.login == l && element.password == p) {
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

debt.forEach(element =>{
    if(element.debtor == 'arek' && element.lender == 'wojtek' ){
        arek_wojtek.innerHTML = -element.amount + ' ZŁ';
        wojtek_arek.innerHTML = element.amount + ' ZŁ';
    }
})


