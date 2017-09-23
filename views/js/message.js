var socket = io();
var currentdate = new Date();

/**function used to send the message to the database
and also broadcast the msg using socket broadcast**/

function sendMessage()
{
  var uname = localStorage.getItem("uname");
  var txtmsg = document.getElementById('btn-input').value;
  $('#btn-input').val('');
  console.log(txtmsg);
  $.ajax({
   url: '/encode',
   type: 'POST',
   data:
   {
     message:txtmsg
   }
 }).done(function(data)
 {
   if(data.msg)
   {
     var hours = currentdate.getHours();
     var minutes = currentdate.getMinutes();
     var ampm = hours >= 12 ? 'pm' : 'am';
     hours = hours % 12;
     hours = hours ? hours : 12;
     minutes = minutes < 10 ? '0' + minutes : minutes;
     var Time = hours + ':' + minutes + ' ' + ampm;
       socket.emit('msg', {
         message: data.msg,
         user: uname,
         time: Time
       });
   }
});
}
/* socket which is reading the message from the user**/
socket.on('messages', function(data) {
  if (data.message) {
    document.getElementById('message-container').innerHTML += '<div>' + data.message + '</div>'
  }
})

/**broadcasting the message to everyone**/
socket.on('newmsg', function(data)
{
  var uname = localStorage.getItem("uname");
  if (data.message) {
    if (data.user == uname) {
      document.getElementById('history').innerHTML += '<div class="well well-sm" id="setcolor" ><span class="chat-img pull-right">\
          <img src="../icons/icons8-Circled User Male Skin Type 1 2-80.png" title="Circled User Male Skin Type 1 2" width="40" height="40" alt="User Avatar" class="img-circle" />\
      </span>\
          <div class="chat-body clearfix">\
              <div class="header">\
                   <small class="text-muted"><span class="glyphicon glyphicon-time"></span>' + data.time + '</small>\
              </div>\
              <div class="pull-right primary-font" ><p>' + data.message + '</p><div>\
          </div></div><br>'
    } else {
      document.getElementById('history').innerHTML += '<div class="well well-sm"><span class="chat-img pull-left">\
        <img src="../icons/icons8-Circled User Male Skin Type 3-80.png" title="Circled User Male Skin Type 1 2" width="40" height="40" alt="User Avatar" class="img-circle" />\
      </span>\
        <div class="chat-body clearfix">\
            <div class="header">\
                    <strong class="primary-font">' + data.user + '</strong> <small class="pull-right text-muted">\
                    <span class="glyphicon glyphicon-time"></span>' + data.time + '</small>\
            </div>\
            <p>' + data.message + '</p>\
        </div></div><br>'
    }

  }
})

function database() {
  $.ajax({
    url: '/history',
    type: 'GET'
  }).done(function(data)
  {
    var name = localStorage.getItem("uname");
    if (name == null)
    {
        window.location.href = "index.html";
    }
    var sname = name[0].toUpperCase() + name.slice(1);
    var userslen = data.users.length;
    for (i = 0; i < userslen; i++) {
      document.getElementById("contact-list").innerHTML += '  <li class="list-group-item"><div class="col-xs-12 col-sm-3">\
            <img src="../icons/icons8-Checked User Male-96.png" alt="User Avatar" class="img-responsive img-circle" />\
        </div>\
        <div class="col-xs-12 col-sm-9">\
            <span  class="name">' + data.users[i] + '</span><br/>\
        </div>\
        <div class="clearfix"></div> </li><br>'
    }
    document.getElementById('status').innerHTML += name + '<br>&emsp;&ensp;&nbsp;&nbsp;&nbsp;Online';
    var len = data.db.length;
    for (i = 0; i < len; i++) {

      if (data.db[i].user == name) {
        var newElement = document.createElement('div');
        newElement.innerHTML = '<div class="well well-sm" id="setcolor"> <span class="chat-img pull-right">\
        <img src="../icons/icons8-Circled User Male Skin Type 1 2-80.png" title="Circled User Male Skin Type 1 2" width="40" height="40" alt="User Avatar" class="img-circle" />\
    </span>\
        <div class="chat-body clearfix">\
            <div class="header">\
                 <small class="text-muted"><span class="glyphicon glyphicon-time"></span>' + data.db[i].time + '</small>\
            </div>\
            <div class="pull-right primary-font"><p>' + data.db[i].message + '</p><div>\
        </div><div>'
        document.getElementById('history').appendChild(newElement);
      } else {
        var newElement = document.createElement('div');
        newElement.innerHTML = '<div class="well well-sm"><span class="chat-img pull-left">\
          <img src="../icons/icons8-Circled User Male Skin Type 3-80.png" title="Circled User Male Skin Type 1 2" width="40" height="40" alt="User Avatar" class="img-circle" />\
        </span>\
          <div class="chat-body clearfix">\
              <div class="header">\
                      <strong class="primary-font">' + data.db[i].user + '</strong>\
                      <small class="pull-right text-muted">\
                      <span class="glyphicon glyphicon-time"></span>' + data.db[i].time + '</small>\
              </div>\
              <p>' + data.db[i].message + '</p>\
          </div></div>'
        document.getElementById('history').appendChild(newElement);
      }

    }

  });
}

function logout()
{
  var promise = $.ajax({
  url: '/logout',
  type: 'POST',
  data: {
    username: localStorage.getItem("uname")
      }
  }).done(function(data)
  {
    if (data.status == true) {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}
