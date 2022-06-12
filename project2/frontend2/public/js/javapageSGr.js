// const { find } = require("../../../backend/models/classmodel");

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
 // let placeholder = document.querySelector("#classDisplay");
 var user;
 fetch("/currentUser")
 .then(res => res.json())
 .then(data => user = data)
 .then(() => console.log(user))

    fetch("/class/allclasses")
    .then(function(response){
        return response.json();
    })
    .then(function(classeOs){
        let out ="";
        let placeholder = document.querySelector("#classDisplayStudent");
        // let students;
        
        for(let classO of classeOs){
                // classO.participants.forEach(student => {
                //     if(student != user.name) {
                        
                //         return;}})
                    // students = classO.participants;
                    // students.forEach
                    if(classO.participants.includes(user.name) ) {
                        console.log("username: ", user.name);
                    out += `
                    <tr>
                        <td>${classO.className}</td>
                        <td>${classO.groupNumber}</td>
                        <td><form action="/class/removeParticipant" method="post">
                        <input class="hidden" type="text" name="className" value="${classO.className}">
                        <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                        <input class="hidden" type="text" name="student" placeholder="student" value="${user.name}">
                        <input class="btn btn-secondary" type="submit" value="leave">
                        
                        </td>
                    <tr>
                    `
                    }
              
            }
        
        
        let nameOfUser = document.querySelector("#nameTagUser");
        nameOfUser.innerHTML = `Welcome  ${user.name}`; 
        placeholder.innerHTML = out;
    });
   