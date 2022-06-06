// document.getElementById("logout").onclick = function () {
//     location.href = "index.html";
// };
document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};


fetch("/admin/allusers")
.then(function(response){
    return response.json();
})
.then(function(users){
    let out1 ="";
    let out2 ="";
    let placeholder1 = document.querySelector("#studentDisplay");
    let placeholder2 = document.querySelector("#teacherDisplay");
    
    for(let user of users){
        if(user.position === "Student"){
            out1 += `
            <tr>
                <td>${user.login}</td>
                <td class="pass hidden">${user.password}</td>
                <td>${user.mail}</td>
                <td>${user.position}</td>
                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user.login}">
                <input type="submit" value="delete" id="deleted">
            </form></td>
            <tr>
            `
        } 
    }
    placeholder1.innerHTML = out1;
});

// document.addEventListener("DOMContentLoaded", () => {
//     const checkbox = document.getElementById('showPass');
//     var showMe = document.querySelectorAll('.pass');
//     console.log(showMe[1].classList);
//     checkbox.addEventListener('change', ev => {
//     if (ev.currentTarget.checked) {
//         // ev.preventDefault();
//         [].foreach.call(function(item) { console.log(item);});
//     } else {  
//         // ev.preventDefault();
//         [].foreach.call(function(item) { item.classList.add("hidden");});
//     }
//     });


// })
// document.addEventListener("DOMContentLoaded", () => {
//     const studentDisplay = document.querySelector("#studentsDisp");
//     const teacherDisplay = document.querySelector("#teacherDisp")

//     document.querySelector("#teachers").addEventListener("click", ev => {
//         ev.preventDefault();
//         studentDisplay.classList.add("hidden");
//         teacherDisplay.classList.remove("hidden");
//     });

//     document.querySelector("#students").addEventListener("click", ev => {
//         ev.preventDefault();
//         studentDisplay.classList.remove("hidden");
//         teacherDisplay.classList.add("hidden");
//     });

// });