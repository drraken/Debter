function testAlert(){console.log("Test js")}testAlert();
let submit_button = document.getElementById('submit_box');
let login_page = document.getElementById('login_page');
let debt_page = document.getElementById('debt_page');
let add_page = document.getElementById('add_page');
let add_button = document.getElementById('add_button');
let logout_button = document.getElementById('logout_button');
let exit_add = document.getElementById('exit_add');

submit_button.addEventListener('click', (e) => {
            e.preventDefault();
            let login = document.getElementById('login_box').value;
            let password = document.getElementById('password_box').value;
            console.log('login_button is working fine');
            login_page.classList.add("is-close");
            debt_page.classList.add("is-open");
            //CheckTheData(login, password);
            //add token
        })

logout_button.addEventListener('click', (e) => {
            e.preventDefault();           
            console.log('logout_button is working fine');
            login_page.classList.remove("is-close");
            debt_page.classList.remove("is-open");
            add_page.classList.remove("is-open");
            //delete token
        })
add_button.addEventListener('click', (e) => {
            e.preventDefault();           
            console.log('add_button is working fine');            
            add_page.classList.add("is-open");
            //delete token
        })
exit_add.addEventListener('click', (e) => {
            e.preventDefault();           
            console.log('exit_add is working fine');            
            add_page.classList.remove("is-open");
            //delete token
        })