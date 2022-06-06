document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
};
fetch("/admin/allusers")
.then(function(response){
    return response.json();
})
.then(function(users){
    let out2 ="";
    let placeholder2 = document.querySelector("#teacherDisplay");
    
    for(let user of users){
        if(user.position !== "Student"){
            out2 += `
            <tr>
                <td>${user.login}</td>
                <td class="hidden">${user.password}</td>
                <td>${user.mail}</td>
                <td>${user.position}</td>
                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user.login}">
                <input type="submit" value="delete">
              </form></td>
            <tr>
            `
        }
    }
    placeholder2.innerHTML = out2;
});
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