import { Movies , getMovie , getYTSMovies } from "./db";


const resolvers = {
    Query : {
        movies : async() =>{
            return await Movies.all()
        },
        movie : async(_,{id}) => {
            return await Movies.findOne({
                where : { id : id}
            })
        },
        ytsmovies : async(_,{limit , rating}) => {
            return await getYTSMovies(limit,rating)
        }
    },
    Mutation : {
        CreateMovie : async (_,{id}) => {
            let movieData = getMovie(id)
            let movie;
            await movieData.then((result) => {
                movie = Movies.create({
                    name : result.title,
                    rating : result.rating
                })
            })
            return movie
        },
        DeleteMovie : async (_,{id}) => {
            await Movies.destroy({
                where : {id : id}
            })
            return Movies.all()
        },
        UpdateMovie : async (_,{id , rating}) => {
            await Movies.update({rating : rating}, {
                where : { id : id}
            })
            return Movies.findOne({
                where : { id : id}
            })
        }
    }
}


export default resolvers