import axios from 'axios'

export class PongupHomeClient {

    fetch_user_data() {
        console.log('client')
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
}