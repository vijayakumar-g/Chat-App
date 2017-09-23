/* onclick respective button id call respective the functions */
$('#signup').click(validate);

/**function is used to sign up new user if the user doesnot exists in the database **/
function signup() {
  var testform = document.getElementById('form1');
  $.ajax({
    url: '/logging',
    type: 'POST',
    data: {
      username: form1.name.value,
      password: form1.pwd.value
    }
  }).done(function(result) {
    console.log(result);
    if (result.data == "false") {
      document.getElementById('error-container').innerHTML = "User Already Registered";
    } else {
      document.getElementById('error-container').innerHTML = "Registered Successfully";
    }
  })
}

function validate() {
  var name = document.getElementById("name").value;
  var pwd = document.getElementById("pwd").value;
  var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
  if (name.length == 0) {
    document.getElementById("error-container").innerHTML = "Not valid user name! ";
  } else if (name.length < 5) {
    document.getElementById("error-container").innerHTML = "Username should contain 5 Characters!";
  } else if (/^[a-zA-Z0-9- ]*$/.test(name) == false) {
    document.getElementById("error-container").innerHTML = "Username contains illegal characters!";
  } else if (pwd.length == 0) {
    document.getElementById("error-container").innerHTML = "Not valid password!";
  } else if (pwd.length < 6) {
    document.getElementById("error-container").innerHTML = "Password length minimum 6 characters!";
  } else if (!pattern.test(pwd)) {
    document.getElementById("error-container").innerHTML = "Password should contain atleast one number and one special character!";
  } else {
    signup();
  }
}