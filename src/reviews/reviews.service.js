const knex = require("../db/connection");

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first(); 
}

function update(review) {
    return knex("reviews as r")
      //.join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ review_id: review.review_id })
      .update({ content: review.content, score: review.score });
      //.then((result) => mapCriticToReview(result));
}

function readUpdatedResult(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    //.select("r.review_id", "r.content", "r.score", "r.created_at", "r.updated_at", "r.critic_id", "r.movie_id", "c.preferred_name", "c.surname", "c.organization_name")
    .where({ 'r.review_id': reviewId })
    .then((result) => transformResult(result));
}

function destroy(reviewId) {
  return knex("reviews")
    .where({ review_id: reviewId})
    .del();

}

function transformResult(result) {
  return result.map((review) => mapCriticToReview(review));
}

function mapCriticToReview(review) {
  return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      created_at: review.create_at,
      updated_at: review.updated_at,
      critic_id: review.critic_id,
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
    read,
    update,
    readUpdatedResult,
    destroy,

};