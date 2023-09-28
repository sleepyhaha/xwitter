const { Thoughts, Users } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find().sort({ createdAt: -1 });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const findThought = await Thoughts.findOne({
        _id: req.params.thoughtId,
      });
      if (!findThought) {
        return res
          .status(404)
          .json({ message: "This thought ID does not exist." });
      }
      res.json(findThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const newThought = await Thoughts.create(req.body);
      const updateUser = await Users.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      if (!updateUser) {
        return res.status(404).json({ message: "No user found with this ID " });
      }

      res.json({ message: "Thought created" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const update = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );

      if (!update) {
        return res.status(404).json({ message: "Thought ID not found" });
      }
      res.json({ message: "Thought updated." });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const delThought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!delThought) {
        return res.status(404).json({ message: "Thought ID not found" });
      }

      const updateUser = await Users.findOneAndUpdate(
        {
          thoughts: req.params.thoughtId,
        },
        {
          $addToSet: { reactions: req.body },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "No user found with this ID" });
      }
      res.json({ message: "Thought deleted." });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!reaction) {
        return res.status(404).json({ message: "ID does not exist" });
      }
      res.json({ message: "Reaction added" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const delReaction = await Thoughts.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!delReaction) {
        return res.status(404).json({ message: "ID does not exist" });
      }
      res.json({ message: "Reaction deleted" });
    } catch (err) {
      res.json(500).json(err);
    }
  },
};
