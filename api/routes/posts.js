const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// 게시글 쓰기
router.post("/", async (req, res) => {
  const currentUser = await User.findById(req.body.userId);
  const addInfo = {
    ...req.body,
    username: currentUser.username,
    profilePicture: currentUser.profilePicture,
  };
  const newPost = new Post(addInfo);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 수정
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("게시글이 수정되었습니다.");
    } else {
      res.status(403).json("자신의 게시글만 수정할 수 있습니다.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("게시글이 삭제되었습니다.");
    } else {
      res.status(403).json("자신의 게시글만 삭제할 수 있습니다.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 좋아요/해제
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("게시글에 좋아요를 했습니다.");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("게시글에 좋아요를 해제 했습니다.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 게시글 조회
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 연관 게시글 조회(내꺼포함)
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// 특정 유저 게시글 조회
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
