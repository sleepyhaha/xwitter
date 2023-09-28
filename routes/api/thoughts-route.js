const router = require("express").Router;
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getThoughts).post(createThought);

router
  .route("/thoughtsId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/thoughtsId/reactions").post(addReaction);

router.route("/thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
