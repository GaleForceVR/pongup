import axios from 'axios'


export class PongupClient {

    fetch_user_data() {
        return axios.all([
            this.fetch_user_profile()/*,*/
            // this.fetch_venues_and_events()
        ])
    }

    fetch_user_profile() {
        return axios.get('/api/user_profile')
    }

    // fetch_venues_and_events() {
    //     return axios.get('/api/venues-and-events')
    // }

    // fetch_unread_count(req_params) {
    //     console.log(req_params)
    //     return axios.get('/api/unread-counts/', {params: req_params})
    // }
}