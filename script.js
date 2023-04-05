let isedit = false, table , indexvalue;

let employeedata;
const employee = {};


// function for enable district button

function enable_district() {  // in the select always will use onchenge event
  document.getElementById("enable").removeAttribute("disabled")
}


//function for add and update data of employees

function upsertEmployee() {

  event.preventDefault();

  if (isedit) {
    if (validateform() == true) {

      document.getElementsByClassName("btn")[2].type = "submit";

      employeedata[indexvalue].name = document.getElementsByTagName("input")[1].value

      employeedata[indexvalue].dob = document.getElementById("DOB").value

      employeedata[indexvalue].state = document.getElementById("select").value

      employeedata[indexvalue].district = document.getElementById("enable").value

      employeedata[indexvalue].email = document.getElementById("exampleInputEmail1").value

      employeedata[indexvalue].joiningdate = document.getElementById("Joining").value

      if (document.getElementById("flexRadioDefault1").checked) {
        employeedata[indexvalue].gender = document.getElementById("flexRadioDefault1").value
      } else if (document.getElementById("flexRadioDefault2").checked) {
        employeedata[indexvalue].gender = document.getElementById("flexRadioDefault2").value
      }
      else if (document.getElementById("flexRadioDefault3").checked) {
        employeedata[indexvalue].gender = document.getElementById("flexRadioDefault3").value
      }

      if (document.getElementById("intern1").checked) {
        employeedata[indexvalue].interntype = document.getElementById("intern1").value
      } else if (document.getElementById("intern2").checked) {
        employeedata[indexvalue].interntype = document.getElementById("intern2").value
      }
      localStorage.setItem("users", JSON.stringify(employeedata)) // again sending refreshing data with new data into local storage
    }
   
 
  }else{

    if (validateform() == true) {

      document.getElementsByClassName("btn")[2].type = "submit";
  
      if (localStorage.getItem("users") == null) {
        employeedata = []
      } else {
        employeedata = JSON.parse(localStorage.getItem("users")) // 
      }
  
      employee.uniqueId = new Date().getTime();
      employee.name = document.getElementsByTagName("input")[1].value;
  
      if (document.getElementById("flexRadioDefault1").checked) {
        employee.gender = document.getElementById("flexRadioDefault1").value
      } else if (document.getElementById("flexRadioDefault2").checked) {
        employee.gender = document.getElementById("flexRadioDefault2").value
      }
      else if (document.getElementById("flexRadioDefault3").checked) {
        employee.gender = document.getElementById("flexRadioDefault3").value
      }
      employee.dob = document.getElementById("DOB").value
  
      employee.state = document.getElementById("select").value
  
      employee.district = document.getElementById("enable").value
  
      employee.email = document.getElementById("exampleInputEmail1").value
  
      if (document.getElementById("intern1").checked) {
        employee.interntype = document.getElementById("intern1").value
      } else if (document.getElementById("intern2").checked) {
        employee.interntype = document.getElementById("intern2").value
      }
      employee.joiningdate = document.getElementById("Joining").value
  
      employeedata.push(employee);
  
      localStorage.setItem("users", JSON.stringify(employeedata))
    }
  }
  showdata();
}


//Function for bind data on table..

function showdata() {

  employeedata = JSON.parse(localStorage.getItem("users"))
  table = document.getElementById("tBody")
  table.innerHTML = ""

  if (employeedata !== null) {
    employeedata.forEach((value, index) => {
      table.innerHTML +=
        ` <tr class = "delete">
       <td>${value.uniqueId}</td>
       <td>${value.name}</td>
       <td>${value.gender}</td>
       <td>${value.dob}</td>
       <td>${value.state}</td>
       <td>${value.district}</td>
       <td>${value.email}</td>
       <td>${value.interntype}</td>
       <td>${value.joiningdate}</td>
       <td><i class="bi bi-pencil me-2 clip" onclick="editdata(${index})"></i> <i class="bi bi-trash3 clip" onclick="deletedata(${index})"></i></td>
     </tr>`
    });
  }
}


// function for delete data

function deletedata(index) {

  employeedata = JSON.parse(localStorage.getItem("users"))
  let agree = confirm("Are you sure to delete")

  if (agree) {
    employeedata.splice(index, 1)
    localStorage.setItem("users", JSON.stringify(employeedata))
    document.getElementsByClassName("delete")[index].remove()
  }

}



// Function of binding input values.


function editdata(index) {
  document.getElementsByTagName("input")[1].value = employeedata[index].name

  document.getElementById("DOB").value = employeedata[index].dob

  document.getElementById("select").value = employeedata[index].state

  document.getElementById("enable").value = employeedata[index].district

  document.getElementById("exampleInputEmail1").value = employeedata[index].email

  document.getElementById("Joining").value = employeedata[index].joiningdate

  console.log(employeedata[index].joiningdate);

  if ((document.getElementById("flexRadioDefault1").value) == employeedata[index].gender) {
    document.getElementById("flexRadioDefault1").checked = true
  } else if (document.getElementById("flexRadioDefault2").value == employeedata[index].gender) {
    document.getElementById("flexRadioDefault2").checked = true
  }
  else if (document.getElementById("flexRadioDefault3").value == employeedata[index].gender) {
    document.getElementById("flexRadioDefault3").checked = true
  }
  //district button
  document.getElementById("enable").removeAttribute("disabled")

  if (document.getElementById("intern1").value == employeedata[index].interntype) {
    document.getElementById("intern1").checked = true
  } else if (document.getElementById("intern2").value == employeedata[index].interntype) {
    document.getElementById("intern2").checked = true
  }

  isedit = true;
  indexvalue = index;
  window.scrollTo(0 , 50);
}




// //Function for validation of form..

function validateform() {

  if (document.getElementsByTagName("input")[1].value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
   <strong>Name is Missing!</strong> Please enter you name
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("exampleInputEmail1").value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
   <strong>Email is Missing!</strong> Please enter you email
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("select").value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>State is Missing!</strong> Please select your state
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("enable").value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>District is Missing!</strong> Please select your district
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("DOB").value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>Dob is Missing!</strong> Please enter your date of birth
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if ((document.getElementById("flexRadioDefault1").checked || document.getElementById("flexRadioDefault2").checked || document.getElementById("flexRadioDefault3").checked) == false) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>Gender is Missing!</strong> Please select your gender.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if ((document.getElementById("intern1").checked || document.getElementById("intern2").checked) == false) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>Missing Intern type!</strong> Please select your type.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("Joining").value == "") {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>Joining date is Missing!</strong> Please enter your joining date.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }
  else if (document.getElementById("exampleCheck1").checked == false) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
    <strong>Please check the confirmation Box!</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
    window.scrollTo(0, 0);
    return false
  }

  return true
}

document.onload = showdata();