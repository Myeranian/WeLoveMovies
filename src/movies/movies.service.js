const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");


function list() {
    return knex("movies").select("*");
}

function listShowingTrue() {
    
}

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
    return knex("theaters as t")
      .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .select("*")
      .where({ movie_id: movieId, is_showing: true });
}

function readReviews(movieId) {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ movie_id: movieId });
      //use mapProperties to list critic details under critic key for each review 
}

module.exports = {
    list,
    read,
    readTheaters,
    readReviews,

};