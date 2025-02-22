const factory = require('./handlers');
const Review = require('../models/Review.model');

// @desc get all Reviews
// @Route GET /api/v1/reviews
// @access public
exports.getReviews = factory.apiGetAll(Review,"Reviews",["product","user"]);

// @desc create a Review
// @Route POST /api/v1/reviews
// @access public
exports.createReview = factory.apiCreateOne(Review);

// @desc update a Review
// @Route PUT /api/v1/reviews/:id
// @access public
exports.updateReview = factory.apiUpdateOne(Review);

// @desc delete a Review
// @Route DELETE /api/v1/reviews/:id
// @access public
exports.deleteReview = factory.apiDeleteOne(Review);
