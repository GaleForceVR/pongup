import axios from 'axios'

export class LaddersClient {

    fetch_ladders() {
        return axios.all([
            this.fetch_all_ladders()
        ])
    }

    fetch_all_ladders() {
        return axios.get('/api/ladders/')
    }
}