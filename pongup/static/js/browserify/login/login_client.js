import axios from 'axios'

export class LoginClient {

    fetch_User() {
        console.log('%cLogin client', 'background-color:red')
        console.log(this.fetch_user_profile())
        // var id = 1

        return axios.all([
            this.fetch_user_profile()/*,*/
            // this.fetch_venues_and_events()
        ])
    }

    fetch_user_profile() {
        var url = 'api/users/'
        var data = axios.get(url)
        console.log('client data')
        console.log(data)
        return axios.get(url)
    }

    create_user(post_params) {
        return axios.post('/api/users', {params: {username: post_params.username, email: post_params.email, is_staff: post_params.is_staff, password: post_params.password }})
    }
}