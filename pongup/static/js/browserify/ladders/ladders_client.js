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

    fetch_ladder_detail(id) {
        return axios.all([
            this.fetch_all_ladder_details(id)
        ])
    }

    fetch_all_ladder_details(id) {
        console.log('fetch_all_ladder_details/' + id)
        console.log(axios.get('/api/ladder/' + id))
        return axios.get('/api/ladder/' + id)
    }

    fetch_matches_detail(id) {
        return axios.all([
            this.fetch_all_match_details(id)
        ])
    }

    fetch_all_match_details(id) {
        console.log('fetch_all_match_details/' + id)
        console.log(axios.get('/api/ladders/' + id + '/matches/'))
        return axios.get('/api/ladders/' + id + '/matches/')
    }
}