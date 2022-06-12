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
        if(user.position == "Teacher"){
            out2 += `
            <tr>
                <td>${user.login}</td>
                <td class="hidden">${user.password}</td>
                <td>${user.mail}</td>
                <td><form action="/admin/userPosition" method="post">
                <input class="hidden" type=text name="login" value="${user.login}">
                <select name="position" size="1" onchange="this.form.submit()">
                <option>${user.position}</option>
                <option>${user.position == "Student"?"Teacher":"Student"}</option>
                </select>
                </form></td>
                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user.login}">
                <input class="btn btn-secondary" type="submit" value="delete">
              </form></td>
            <tr>
            `
        } else if(user.position === undefined){
            out2 += `
            <tr>
                <td>${user.login}</td>
                <td class="hidden">${user.password}</td>
                <td>${user.mail}</td>
                <td>
                    <form action="/admin/userPosition" method="post">
                        <input class="hidden" type=text name="login" value="${user.login}">
                        <select name="position" size="1" onchange="this.form.submit()">
                            <option>${user.position}</option>
                            <option>Student</option>
                            <option>Teacher</option>
                        </select>
                    </form>
                </td>
                <td><form action="/admin/allusersDel" method="post">
                <input class="hidden" type="text" name="login" value="${user.login}">
                <input class="btn btn-secondary" type="submit" value="delete">
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