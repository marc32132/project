document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const changePasswordForm = document.querySelector("#changePassword")

    document.querySelector("#createAcc").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.add("hidden");
        createAccountForm.classList.remove("hidden");
        changePasswordForm.classList.add("hidden");
    });

    document.querySelector("#signIn").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.remove("hidden");
        createAccountForm.classList.add("hidden");
        changePasswordForm.classList.add("hidden")
    });

    document.querySelector("#getPassword").addEventListener("click", ev => {
        ev.preventDefault();
        loginForm.classList.add("hidden");
        createAccountForm.classList.add("hidden");
        changePasswordForm.classList.remove("hidden")
    });

    // document.querySelector("#submitlog").addEventListener("click", ev => {
    //     ev.preventDefault();
    //     location.href = "page.html";
    // });
});
