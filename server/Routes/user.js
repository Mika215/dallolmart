const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../Middleware/verifyToken");

const sendMail = require("../dallolEmail");

//signup email verification
router.post("/change back  this to register signup", async (req, res) => {
  const {firstName, lastName, username, email, password} = req.body;
  User.findOne({email}).exec((err, user) => {
    if (user) {
      console.log(err);
      return res.status(400).send({
        err: "User with this email already exists.Signup using other email account",
      });
    } else {
      //TODO: passward should be hashed from the very begining to avoid security voulnerability
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      const emailActivationToken = jwt.sign(
        {firstName, lastName, username, email, password},
        process.env.JWT_EMAIL_ACT_SEC_KEY,
        {expiresIn: "20m"}
      );

      const msg = {
        from: "noreplay@dallolmart.com || <mikacodes@gmail.com>",
        to: `${email}`,
        subject: "Email Activation",
        text: `Please Activate your dallolmart account,copy and paste the following link into your browser ${process.env.CLIENT_URL}/register/activation/${emailActivationToken} `,
        html: `<h3>Please Activate your dallolmart account</h3>
    
      <p><Strong>Click the given link to redirect to the <a href=${process.env.CLIENT_URL}/register/activation/${emailActivationToken}>account activation page.</a> </strong></p>
    `,
      };
      sendMail(msg)
        .then((result) => console.log("Emailsent...", result))
        .catch((err) => console.log(error.message));
      console.log(email);
      res
        .status(200)
        .send(
          "account activation link has been sent to your email,\nplease check your inbox or spam box"
        );
    }
  });
});

//!tempo registration or for the admin only can create user using this route

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    dateOfBirth,
    gender,
    company,
    street,
    postalCode,
    city,
    country,
    postalService,
    image
  } = req.body;
  User.findOne({email}).exec((err, user) => {
    if (user) {
      console.log(err);
      return res.status(400).send({
        err: "User with this email already exists.Signup using other email account",
      });
    }
  });

  // const {firstName, lastName, username, email, password} = decodedToken;
  //!hash pasword
  //TODO: passward should be compared and if it turns to be matching then procced check the registration route password is not hashed
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //!create a new user with Mongoose model
  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: hashedPassword,
    phone: phone,
    dateOfBirth: dateOfBirth,
    gender: gender,
    company: company,
    street: street,
    postalCode: postalCode,
    city: city,
    country: country,
    postalService: postalService,
    image:image
  });

  const savedUser = await newUser.save();
  res
    .status(200)
    .send(`new user saved sucsessfully! => : ${savedUser.firstName}`);
  console.log(savedUser);
});

//account activation
router.post("/activation", async (req, res) => {
  const activationHeader = req.headers.token;

  if (activationHeader) {
    const token = activationHeader.split(" ")[1];

    try {
      //!verify if the activationToken is a valid one
      const decodedToken = await jwt.verify(
        token,
        process.env.JWT_EMAIL_ACT_SEC_KEY,
        (err, decodedToken) => {
          if (err) {
            return res.status(400).send({error: "Incorrect or expired link."});
          }

          return decodedToken;
        }
      );

      //!Extracting the user detailes from the activationToken
      const {firstName, lastName, username, email, password} = decodedToken;
      //!hash pasword
      //TODO: passward should be compared and if it turns to be matching then procced check the registration route password is not hashed
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //!create a new user with Mongoose model
      const newUser = new User({
        username: username,
        password: hashedPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
      });

      const savedUser = await newUser.save();
      res
        .status(200)
        .send(`new user saved sucsessfully! => : ${savedUser.firstName}`);
      console.log(savedUser);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).send("Something went wrong");
  }
});

//register new user
// ! generator console.log(require('crypto').randomBytes(64).toString('hex'))
// router.post("/register", async (req, res) => {
//   const{name,email,password}=req.body;
//   User.findOne({email}).exec((err,user)=>{
//     if(user){
//       console.log(err)
//       return res.status(400).send({err:"User with this email already exists.Signup using other email account"})

//     }
//   })
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     const newUser = new User({
//       username: req.body.username,
//       password: hashedPassword,
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//     });
//     const savedUser = await newUser.save();
//     res
//       .status(200)
//       .send(`new user saved sucsessfully! => : ${savedUser.firstName}`);
//     console.log(savedUser);
//   } catch (err) {
//     res.status(500).send(err);
//     console.log(err);
//   }
// });

//login
router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (user === null) {
    res.status(404).send("can not find user");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        {id: user.id, username: user.username, isAdmin: user.isAdmin},
        process.env.JWT_SEC_KEY,
        {expiresIn: "1h"}
      );

      const {password, ...others} = user._doc; // !this returns us back only the user without password /cause mongoDB stores the infor inside _doc
      res.status(200).send({...others, accessToken});
      // .send(` ${user.username}: loged in suceess! ${token}`);
      console.log({...others, accessToken});
    } else {
      res.status(403).send("username and password doesn't match!");
    }
  } catch (error) {
    console.log(error);
  }
});

//TODO: logout
router.post("/logout", async (req, res) => {
  const authHeader = req.headers.token;
  try {
    // console.log(req.user);
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      //!i was planning to decode the token recieved from the headers and to verify it is a valid token
      //!but it does not give sense to verify this, plus it throws an error" Cannot set headers after they are sent to the client"

      // const decodedToken = await jwt.verify(
      //   token,
      //   process.env.JWT_EMAIL_ACT_SEC_KEY,
      //   (err, decodedToken) => {
      //     if (err) {
      //       return res.status(400).send({error: "Incorrect or expired link."});
      //     }

      //     return decodedToken;
      //   }
      // );
      // const {id} = decodedToken;
      const accessToken = await jwt.sign({data: " "}, process.env.JWT_SEC_KEY, {
        expiresIn: "2s",
      });

      res.status(200).send(accessToken);
      console.log(accessToken);
    } else if (!authHeader) {
      res.status(404).send("Auth header not found");
    } else {
      res.status(401).send("Something went wrong");
    }
  } catch (err) {
    console.log(err);
  }
});

//update user
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new: true}
    );
    res.status(200).send(updatedUser);
    console.log(updatedUser);
    console.log(`${updatedUser.username} : edited`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete user

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send(`user permanently deleted..`);
  } catch (err) {
    res.status(500).send(err);
  }
});

//find user by id

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const {password, ...others} = user._doc;
    res.status(200).send(others);
  } catch (err) {
    res.status(500).send(err);
  }
});
//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    //! we can search users based on query if there is no query then it returns all users in the db.
    const users = query
      ? await User.find().sort({_id: -1}).limit(5) //! this returns the five newest users only
      : await User.find();

    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get user statistics

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  console.log(lastYear);
  try {
    const data = await User.aggregate([
      {$match: {createdAt: {$gte: lastYear}}},
      {
        $project: {
          month: {$month: "$createdAt"},
        },
      },
      {
        $group: {
          _id: "$month",
          total: {$sum: 1},
        },
      },
    ]);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
