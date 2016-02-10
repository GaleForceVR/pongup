import axios from 'axios'


export class PongupClient {

    fetch_user_data() {
        return axios.all([
            this.fetch_user_profile()/*,*/
            // this.fetch_venues_and_events()
        ])
    }

    fetch_user_profile() {
        var url = '/api/users/'
        var data = axios.get(url)
        console.log('hit api in PongupClient')
        console.log(data)
        return axios.get(url)
    }
}

// export class LaddersClient {
//     fetch_ladders() {
//         return axios.all([
//             this.fetch_all_ladders()
//         ])
//     }

//     fetch_all_ladders() {
//         return axios.get('/api/ladders/')
//     }
// }

