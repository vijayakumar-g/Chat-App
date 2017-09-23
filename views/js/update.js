function update() {
  var testform = document.getElementById('form1');
  $.ajax({
    url: '/updating',
    type: 'POST',
    data: {
      username: form1.name.value,
      password: form1.pwd.value
    }
  }).done(function(result) {
    console.log(result);
    if (result.data == "true") {
      document.getElementById('error-container').innerHTML = "Password Changed!";
      window.location.href = "index.html"
    }
    if (result.data == "false") {
      document.getElementById('error-container').innerHTML = "New User SignUp";
    }
  })
}

function pwd_validate() {
  var pwd = document.getElementById("pwd").value;
  var cnf_pwd = document.getElementById("cnf_pwd").value;
  var pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
  if (cnf_pwd != pwd) {
    document.getElementById("error-container").innerHTML = "Password Did Not Matched";
  } else if (pwd.length == 0) {
    document.getElementById("error-container").innerHTML = "Not valid password!";
  } else if (pwd.length < 6) {
    document.getElementById("error-container").innerHTML = "Password length minimum 6 characters!";
  } else if (!pattern.test(pwd)) {
    document.getElementById("error-container").innerHTML = "Password should contain atleast one number and one special character!";
  } else {
    update();
  }
}
