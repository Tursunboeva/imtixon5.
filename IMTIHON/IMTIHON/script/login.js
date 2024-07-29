const $loginForm = document.querySelector(".login_form");
const $inputEmail = document.querySelector("#email");
const $inputPassword = document.querySelector("#password");



const ToastifyDisplay = (message,type) => {
    return  Toastify({
         className: type === "succes" ? "succes" : "error",
         text: message,  
         duration: 3000  
         })
 }

function User (email,password) {
    this.email = email,
    this.password = password
}


const loggedUser =  (e) => {
    e.preventDefault();
    var userEmail = $inputEmail.value;
    var userPassword = $inputPassword.value;

    let newUser = new User(userEmail,userPassword)
  

   fetch("https://blog-post-production-b61c.up.railway.app/api/v1/user/login" , {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body:JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.data.token)
        if (data && data.data.token) {
            localStorage.setItem("token", data.data.token)
            ToastifyDisplay("Access is granted", "succes").showToast()
            console.log(true)

            setTimeout(() => {
                location.replace( window.location.origin + "/src/pages/dashboard.html")
            },3000)
        }
    })
}




$loginForm.addEventListener("submit", loggedUser)



$loginForm.addEventListener("submit", loggedUser)