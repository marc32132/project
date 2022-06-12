document.getElementById("logoutLink").onclick = function () {
  document.getElementById("logout").submit();
};
function showHideTables(){
  var tablerows = document.querySelector(".participants");
  tablerows.classList.toggle("hidden");
}
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
    
    let out2 ="";
    let i = 0;
    let placeholder2 = document.querySelector("#classDisplay2");
    
    for(let classO of classeOs){
      let out3 ="";
      classO.participants.forEach(student => {
        console.log(student);
        out3 += `
        
            <tr>
            <td width="40%">${student}</td>
            <td width="40%"><form action="/class/removeParticipant" method="post">
            <input class="hidden" type="text" name="className" value="${classO.className}">
            <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
            <input class="hidden" type="text" name="student" placeholder="student" value="${student}">
            <input class="btn btn-secondary" type="submit" value="remove">
            </form>
            
            </tr>
            </td>
        `
      })
            out2 += `
            <tr >
                <td>${classO.className}</td>
                <td>${classO.groupNumber}</td>
                <td>
                  <a style="width:100%" class="btn btn-secondary" data-bs-toggle="collapse" href="#clas_${i}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                  ${classO.participants.length} </a>
                </td>
                
            </tr>
            <tr id="clas_${i}" class="collapse partic"><td colspan="3">
            <table style="margin-top: 5px;"><tr><th colspan="2">Participants</th></tr>
            ${out3}
            </table>
            </td></tr>
            `
      i++;
    }
    console.log(user.name);
    placeholder2.innerHTML = out2;
    let nameOfUser = document.querySelector("#nameTagUser");
    nameOfUser.innerHTML = `Welcome ${user.name}`;
});
// {
//     var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }
// }
{/* <button type="button" class="collapsible">Participants</button>
                <div class="content"></div></div> */}