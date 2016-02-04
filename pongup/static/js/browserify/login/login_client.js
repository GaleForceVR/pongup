import axios from 'axios'

export function getTheCookie() {
    var cookieValue = null;
    var name = 'csrftoken';
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
   return cookieValue;
};

export class LoginClient {

    fetch_User() {
        return axios.all([
            this.fetch_user_profile()/*,*/
            // this.fetch_venues_and_events()
        ])
    }

    fetch_user_profile() {
        var url = 'api/users/'
        return axios.get(url)
    }

    create_user(post_params) {
        return axios.post('/api/users', {username: post_params.username, email: post_params.email, is_staff: "false", password: post_params.password })
    }
}