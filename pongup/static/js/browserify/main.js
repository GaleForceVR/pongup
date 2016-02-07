global.pongup = require('./pongup/pongup');

var $ = require('jquery')

$(document).ready(function(){
    $("#id_username").attr('placeholder', 'Username');
    $("#id_password").attr('placeholder', 'Password');
    $("#id_old_password").attr('placeholder', 'Old password')
    $("#id_new_password1").attr('placeholder', 'New password')
    $("#id_new_password2").attr('placeholder', 'Confirm new password')
});