import axios from 'axios'

export class LaddersClient {

    fetch_ladders() {
        console.log('%cLadders client', 'background-color:red')
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