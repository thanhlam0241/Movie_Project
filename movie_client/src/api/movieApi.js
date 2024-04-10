import api from './config'

class MovieApi {
    async getMovies() {
        try {
            const { data } = await api.get('/movie/popular')
            return data
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async getMovieDetail(id) {
        try {
            const { data } = await api.get(`/movie/${id}`)
            return data
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async getMovieDetailVideoOfficials(id) {
        try {
            const { data } = await api.get(`/movie/${id}/videos`)
            return data
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async getMovieDetailCredits(id) {
        try {
            const { data } = await api.get(`/movie/${id}/credits`)
            return data
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

export default new MovieApi()