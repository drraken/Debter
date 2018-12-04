let submit_button = document.getElementById('submit_box');
let login_page = document.getElementById('login_page');
let debt_page = document.getElementById('debt_page');
let add_page = document.getElementById('add_page');
let add_button = document.getElementById('add_button');
let logout_button = document.getElementById('logout_button');
let exit_add = document.getElementById('exit_add');


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
let sessionVar = sessionStorage.getItem('login');
if (sessionVar == 'true') {

}

function CheckTheData(l,p) {

        const url = "https://7kkvlvmf39.execute-api.eu-central-1.amazonaws.com/development/users";
        fetch(url)
            .then(response => response.json())
            .then(data => sendData(JSON.parse(data.query), l, p));
            
    };
//funkcja sprawdzajaca czy dane zgadzaja sie ze soba
function sendData(data, l, p) {
    let valid = false;
    data.forEach(element => {      
        console.log(element,l,p);
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
submit_button.addEventListener('click', (e) => {
    e.preventDefault();
    let login = document.getElementById('login_box').value;
    let password = document.getElementById('password_box').value;
    CheckTheData(login, password);
})

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
