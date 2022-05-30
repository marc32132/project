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
    
    let out2 ="";

    let placeholder2 = document.querySelector("#classDisplay2");
    
    for(let classO of classeOs){
           
            out2 += `
            <tr>
                <td>${classO.className}</td>
                <td>${classO.groupNumber}</td>
                <td>
                  <p>${classO.participants}</p>
                </td>
            <tr>
            `
        }
    
   
    placeholder2.innerHTML = out2;
});
{
    var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}
{/* <button type="button" class="collapsible">Participants</button>
                <div class="content"></div></div> */}