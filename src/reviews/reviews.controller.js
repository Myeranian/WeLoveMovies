const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId;
    const foundReview = await service.read(reviewId);
    if (foundReview) {
        res.locals.review = foundReview;
        return next();
    }
    return next({ status: 404, message: `Review cannot be found: ${reviewId}` });
}

async function update(req, res, next) {
    const { content, score } = req.body.data;
    const review = res.locals.review;
    review.content = content;
    review.score = score;
    const updatedResult = await service.update(review);
    const readUpdatedResult = await service.readUpdatedResult(req.params.reviewId);
    console.log(readUpdatedResult);
    res.json({ data: readUpdatedResult[0] });
}

async function destroy(req, res, next) {
    const reviewId = res.locals.review.review_id;
    await service.destroy(reviewId);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), update],
    delete: [asyncErrorBoundary(reviewExists), destroy],

};