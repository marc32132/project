document.getElementById("logout").onclick = function () {
    location.href = "index.html";
};
document.addEventListener("DOMContentLoaded", () => {
    const glowaForm = document.querySelector("#container");
    const wiadoForm = document.querySelector("#wiadom")

    document.querySelector(".wiado").addEventListener("click", ev => {
        ev.preventDefault();
        glowaForm.classList.add("hidden");
        wiadoForm.classList.remove("hidden");
    });

    document.querySelector(".glowa").addEventListener("click", ev => {
        ev.preventDefault();
        glowaForm.classList.remove("hidden");
        wiadoForm.classList.add("hidden");
    });

    // document.querySelector("#submitlog").addEventListener("click", ev => {
    //     ev.preventDefault();
    //     location.href = "page.html";
    // });
});
