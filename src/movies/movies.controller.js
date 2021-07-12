const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie id not found: ${movieId}`});
}

async function list(req, res, next) {  
    const isShowing = req.query;
    if (isShowing) {
      const data = await service.listIsShowing();
      res.json({ data });
    }
    const data = await service.list();
    res.json({ data });
}

async function read(req, res, next) {
    const movie = res.locals.movie;
    res.json({ data: movie });
}

async function readMoviesTheaters(req, res, next) {
    const { movieId } = req.params;
    const result = await service.readTheaters(movieId);
    res.json({ data: result });
}

async function readMoviesReviews(req, res, next) {
    const { movieId } = req.params;
    const result = await service.readReviews(movieId);
    res.json({ data: result });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    readMoviesTheaters: [asyncErrorBoundary(movieExists), readMoviesTheaters],
    readMoviesReviews: [asyncErrorBoundary(movieExists), readMoviesReviews],

};