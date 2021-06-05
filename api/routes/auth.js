const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt"); // 5*

// 회원가입
router.post("/register", async (req, res) => {
  try {
    // 패스워드 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 필요 유저 정보
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // 데이터 저장 및 리스폰
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("회원가입이 되어있지 않은 이메일 입니다.");

    // 등록된 패스워드와 현재 입력 패스워드 비교
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("잘못된 패스워드입니다.");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
