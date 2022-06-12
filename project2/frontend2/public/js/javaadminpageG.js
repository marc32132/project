document.getElementById("logoutLink").onclick = function () {
    document.getElementById("logout").submit();
  };


  document.addEventListener("DOMContentLoaded", () => {
    const showTable = document.querySelector("#show");
    const addTable = document.querySelector("#add");

    document.querySelector("#showSt").addEventListener("click", ev => {
        ev.preventDefault();
        showTable.classList.add("hidden");
        addTable.classList.remove("hidden");
    });

    document.querySelector("#addSt").addEventListener("click", ev => {
        ev.preventDefault();
        showTable.classList.remove("hidden");
        addTable.classList.add("hidden");
    });

    });


  
  var user;
  fetch("/currentUser")
  .then(res => res.json())
  .then(data => user = data)
  .then(() => console.log(user))
  
  /*
    class fetch
  */
  fetch("/class/allclasses")
  .then(function(response){
      return response.json();
  })
  .then(function(classeOs){
      
      let out2 ="";
      
      let i = 0;
      let j=0;
      let placeholder2 = document.querySelector("#classDisplay2");
      let placeholder3 = document.querySelector("#classDisplay3");
      
      for(let classO of classeOs){
        let out3 ="";
        let out4 ="";
        let out5 ="";
  
        /*
            users fetch
        */
        fetch("/admin/allusers")
        .then(function(response){
            return response.json();
        })
        .then(function(users){
            let x = 0;
            for(let user of users){
                if(user.position === "Student"){
                    if(classO.participants.includes(user.login) ){
                        continue;
                    }
                    out5 += `<tr>
                    <td>${user.login}</td>
                    <td><form action="/class/updateClass" method="post">
                    <input class="hidden" type="text" name="className" value="${classO.className}">
                    <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                    <input class="hidden" type="text" name="participants" placeholder="name" value="${user.login}">
                    <input class="btn btn-secondary" type="submit" value="add">
                    </form></td>
                        </tr>`
                    x++;
                }   
            }
            out4 += `
                <tr >
                    <td>${classO.className}</td>
                    <td>${classO.groupNumber}</td>
                    <td>
                      <a style="width:100%" class="btn btn-secondary" data-bs-toggle="collapse" href="#add_${j}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                      ${x} </a>
                    </td>
                    
                  </tr>
                  <tr id="add_${j}" class="collapse partic"><td colspan="3">
                      <table style="margin-top: 5px;"><tr><th colspan="2">Add Participants</th></tr>
                      ${out5}
                      </table>
                  </td></tr>
                `
                placeholder3.innerHTML += out4;
                j++;
        }).then(()=>console.log("ok"));
        console.log(out4);

        //end of users fetch

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
                    <a style="width:50%" class="btn btn-secondary" data-bs-toggle="collapse" href="#clas_${i}" role="button" aria-expanded="false" aria-controls="clas_${i}">
                    ${classO.participants.length} </a>
                  </td>
                  <td><form action="/class/allclassesDel" method="post">
                  <input class="hidden" type="text" name="className" value="${classO.className}">
                  <input class="hidden" type="text" name="groupNumber" value="${classO.groupNumber}">
                  <input class="btn btn-secondary" type="submit" value="remove">
                  </form>
                  </td>
                  
              </tr>
              <tr id="clas_${i}" class="collapse partic"><td colspan="4">
              <table style="margin-top: 5px;"><tr><th colspan="2">Participants</th></tr>
              ${out3}
              </table>
              </td></tr>
              `
              
        i++;
      }
      console.log(user.name);
      placeholder2.innerHTML = out2;
      
  });