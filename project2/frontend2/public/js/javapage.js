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
fetch("/class/allclasses")
.then(function(response){
    return response.json();
})
.then(function(classeOs){
    let out ="";
    
    let placeholder = document.querySelector("#classDisplay");
    
    
    for(let classO of classeOs){
            out += `
            <tr>
                <td>${classO.className}</td>
                <td>${classO.groupNumber}</td>
                <td><form action="/class/updateClass" method="post">
                <input class="hidden" type="text" name="className" value="${classO.className}">
                <input type="text" name="participants" placeholder="name">
                <input type="submit" value="join">
              </form></td>
            <tr>
            `
          
        }
    
    placeholder.innerHTML = out;
});