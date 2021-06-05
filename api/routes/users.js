const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// 유저 정보 변경
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("계정정보가 변경되었습니다.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("본인정보의 계정만 변경할 수 있습니다.");
  }
});

// 회원 탈퇴
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("정상적으로 회원 탈퇴 되었습니다.");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("본인정보의 계정만 탈퇴할 수 있습니다.");
  }
});

// 유저정보 조회
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//친구정보 조회
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 팔로우
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("팔로우 하였습니다.");
      } else {
        res.status(403).json("이미 팔로우하였습니다.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("자신을 팔로우 할 수 없습니다.");
  }
});

// 언팔로우
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("언팔로우 하였습니다.");
      } else {
        res.status(403).json("해당유저를 언팔로우 할수없습니다.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("자신을 언팔로우 할 수 없습니다.");
  }
});

module.exports = router;
