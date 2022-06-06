document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};
// document.addEventListener("DOMContentLoaded", () => {
//     const glowaForm = document.querySelector("#container");
//     const wiadoForm = document.querySelector("#wiadom")

//     document.querySelector(".wiado").addEventListener("click", ev => {
//         ev.preventDefault();
//         glowaForm.classList.add("hidden");
//         wiadoForm.classList.remove("hidden");
//     });

//     document.querySelector(".glowa").addEventListener("click", ev => {
//         ev.preventDefault();
//         glowaForm.classList.remove("hidden");
//         wiadoForm.classList.add("hidden");
//     });

//     // document.querySelector("#submitlog").addEventListener("click", ev => {
//     //     ev.preventDefault();
//     //     location.href = "page.html";
//     // });
    
// });
Promise.all([
    fetch("/class/allclasses"),
    fetch("/user/currentUser")
])
.then(function(response){
    return response[0].json(), response[1].json;
    
})
.then(function(classeOs, user){
    let out ="";
    
    let placeholder = document.querySelector("#classDisplay");
    
    
    for(let classO of classeOs){
            out += `
            <tr>
                <td>${classO.className}</td>
                <td>${classO.groupNumber}</td>
                <td><form action="/class/updateClass" method="post">
                <input class="hidden" type="text" name="className" value="${classO.className}">
                <input type="text" name="participants" placeholder="name" value="${user.name}">
                <input type="submit" value="join">
              </form></td>
            <tr>
            `
          
        }
    
    placeholder.innerHTML = out;
});