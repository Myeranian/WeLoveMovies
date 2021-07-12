const knex = require("../db/connection");


function list() {
    return knex("movies").select("*");
}

function listIsShowing() {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id", "m.title" ,"m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
      .where({ "mt.is_showing": true });
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
      .where({ movie_id: movieId })
      .then((result) => transformResult(result));
}

function transformResult(result) {
    return result.map((review) => mapCriticToReview(review));
}

function mapCriticToReview(review) {
    return {
        review_id: review.review_id,
        content: review.content,
        score: review.score,
        movie_id: review.movie_id,
        critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
        }
    };
}

module.exports = {
    list,
    listIsShowing,
    read,
    readTheaters,
    readReviews,
};