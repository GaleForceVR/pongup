import axios from 'axios'

export class LaddersClient {

    fetch_ladders() {
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