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

// ACCESS_TOKEN_SECRET=cfe0a575326b0b4b07c0f72912b28a38e42e917b1283da8798abf80caf8adbb21b35f33a3306f6bf13bac1082ad535996fcada713e282346c6bc738d0993fa6e