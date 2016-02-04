import axios from 'axios'

export class PongupHomeClient {

    fetch_user_data() {

        return axios.all([
            this.fetch_user_profile()/*,*/
            // this.fetch_venues_and_events()
        ])
    }

    fetch_user_profile() {
        var url = 'api/users/'
        var data = axios.get(url)
        return axios.get(url)
    }
}