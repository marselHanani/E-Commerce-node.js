const {
    createReview,
    deleteReview,
    getReviews,
    updateReview,
  } = require("../controllers/review.controller");
  const {
    createReviewValidator,
    deleteReviewValidator,
    getReviewValidator,
    updateReviewValidator,
  } = require("../shared/validation/review.validator");
  
  const express = require("express");
  const router = express.Router();
  
  router.route("/").get(getReviews).post(createReviewValidator, createReview);
  router.route("/:id").put(updateReviewValidator, updateReview).delete(deleteReviewValidator, deleteReview);
  
  module.exports = router;