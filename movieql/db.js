import  Sequelize  from "sequelize";
import axios from "axios"

const sequelize = new Sequelize('movieql','movieql','1111',{
    host:'localhost',
    dialect:'postgres'
})

export const Movies = sequelize.define("movieql",{
        id: { 
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name: {
            type : Sequelize.STRING,
            allowNull : false
        },
        rating: {
            type : Sequelize.FLOAT,
            allowNull : false
        }
    },
    {
        timestamps : false,
        tableName : "movieql"
    }
)

Movies.sync({
    force : true
})
.then(() => Movies.create({
    name: 'Home Alone',
    rating: 9.5
}))
.then(() => Movies.create({
    name: 'Avgengers',
    rating: 6
}))

const URL_API = "https://yts.am/api/v2/list_movies.json"
const URL_API2 = "https://yts.am/api/v2/movie_details.json"


export const getMovie = async (id) => {
    const {
        data : {
            data : {movie}
        }
    } = await axios(URL_API2, {
        params : {
            movie_id : id
        }
    })
    return movie
}

export const getYTSMovies = async (limit , rating) => {
    const {
        data : {
            data : {movies}
        }
    } = await axios(URL_API,{
        params : {
            limit : limit,
            minimum_rating : rating
        }
    })
    return movies
}