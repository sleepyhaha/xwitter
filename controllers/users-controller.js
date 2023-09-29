const { Users, Thoughts } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await Users.find().sort({ createdAt: -1 });
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await Users.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");
      if (!user) {
        return res.status(404).json({ message: "No User found" });
      }
      res.json(user);
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const create = await Users.create(req.body);
      res.json(create);
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const update = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!update) {
        return res.json(404).json({ message: "No user found" });
      }
      res.json({ message: "User updated" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async removeUser(req, res) {
    try {
      const remove = await Users.findOneAndRemove({ _id: req.params.userId });
      if (!remove) {
        return res.json(404).json({ message: "No user found" });
      }
      res.json({ message: "User removed" });
    } catch (err) {
      res.json(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const add = await Users.findOneAndUpdate(
        { _id: req.params.usersId },
        { $addToSet: { tags: req.body } },
        {
          runvalidators: true,
          new: true,
        }
      );
      if (!add) {
        return res.json(404).json({ message: "No user found" });
      }
      res.json({ message: "Friend added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const remove = await Users.findOneAndUpdate(
        { _id: req.params.usersId },
        { $pull: { friends: { friendsId: req.params.friendsId } } },
        {
          runValidators: true,
          new: true,
        }
      );
      if (!remove) {
        return res.json(404).json({ message: "No user found" });
      }

      res.json({ message: "Friend removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
