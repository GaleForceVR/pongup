global.pongup = require('./pongup/pongup');

var $ = require('jquery')

$(document).ready(function(){
    $("#id_username").attr('placeholder', 'Username');
    $("#id_password").attr('placeholder', 'Password');
    $("#id_old_password").attr('placeholder', 'Old password')
    $("#id_new_password1").attr('placeholder', 'New password')
    $("#id_new_password2").attr('placeholder', 'Confirm new password')
    $("#id_password1").attr('placeholder', 'Password')
    $("#id_password2").attr('placeholder', 'Confirm password')
    $("#id_email").attr('placeholder', 'Email')

    var showDropdown = false

    var toggleDropdown = function() {
    	showDropdown = !showDropdown

    	if (showDropdown) {
    		$("#dropdown").css("display", "block")
    	} else {
    		$("#dropdown").css("display", "none")
    	}
    }

    $("#dropdown-toggle").on("click", function(e) {
    	e.preventDefault()
    	console.log('clicked')
    	toggleDropdown()
    })

    $("#dropdown-container").on("mouseleave", function(e) {
    	// e.preventDefault()
    	console.log('mouseleave')
    	if (showDropdown) {
	    	toggleDropdown()
	    }
    })

    $("#dropdown-close").on("click", function(e) {
    	e.preventDefault()
    	toggleDropdown()
    	// console.log('mouseleave')
    	// if (showDropdown) {
	    // 	toggleDropdown()
	    // }
    })


});