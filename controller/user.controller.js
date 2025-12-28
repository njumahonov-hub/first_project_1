const UserSchema = require("../schema/user.schema");
const CustomErrorHandle = require("../utils/custom-errorhandle");
const bcryptjs = require("bcryptjs");
const { accesstoken, refreshtoken } = require("../utils/token");
const emailSender = require("../utils/email-sender");

const registr = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw CustomErrorHandle.UnAuhtorized(
        "Username, email, password are required!"
      );
    }

    const foundedEmail = await UserSchema.findOne({ email });

    if (foundedEmail) {
      throw CustomErrorHandle.BadRequest("Email alredy exist!");
    }

    const foundedusername = await UserSchema.findOne({ username });

    if (foundedusername) {
      throw CustomErrorHandle.BadRequest("Username already exist!");
    }

    const hash = await bcryptjs.hash(password, 12);

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 120000;

    await UserSchema.create({
      username,
      email,
      password: hash,
      otp: randomNumbers,
      otpTime: time,
    });

    await emailSender(randomNumbers, email);

    res.status(201).json({
      message: "Registration successful!",
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundedUser = await UserSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandle.UnAuhtorized("User not found!");
    }

    const time = Date.now();

    if (foundedUser.otpTime < time) {
      throw CustomErrorHandle.BadRequest("otp time expired");
    }

    if (foundedUser.otp !== otp) {
      throw CustomErrorHandle.BadRequest("Wrong verification code");
    }

    await UserSchema.findByIdAndUpdate(foundedUser._id, {
      isVerified: true,
    });

    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id,
    };

    const access_token = accesstoken(payload);
    const refresh_token = refreshtoken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 15,
    });

    res.status(200).json({
      message: "Succesful",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw CustomErrorHandle.UnAuhtorized("Email, password are required!");
    }

    const foundedUser = await UserSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandle.BadRequest("Email or password is incorrect!");
    }

    const decode = await bcryptjs.compare(password, foundedUser.password);

    if (decode && foundedUser.isVerified) {
      const payload = {
        username: foundedUser.username,
        email: foundedUser.email,
        role: foundedUser.role,
        id: foundedUser._id,
      };
      const access_token = accesstoken(payload);
      const refresh_token = refreshtoken(payload);

      res.cookie("access_token", access_token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      });
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        maxAge: 3600 * 1000 * 24 * 15,
      });

      res.status(200).json({
        message: "Login succesful",
        access_token,
      });
    } else {
      throw CustomErrorHandle.UnAuhtorized("Invalid password");
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserSchema.findOne({ email });

    if (!user) {
      throw CustomErrorHandle.UnAuhtorized("User not found");
    }

    const randomNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const time = Date.now() + 120000;

    await UserSchema.findByIdAndUpdate(user._id, {
      otp: randomNumbers,
      otpTime: time,
    });

    await emailSender(randomNumbers, email);

    res.status(200).json({
      message: "Succesful",
    });
  } catch (error) {
    next(error);
  }
};


const forgotPassword = async (req, res, next) => {
    try {
       const {email, otp, new_password} = req.body

       const foundeduser = await UserSchema.findOne({email})

       if(!foundeduser) {
        throw CustomErrorHandle.UnAuhtorized("User not found")
       }
        
       const time = Date.now()
       if(foundeduser.otpTime < time) {
        throw CustomErrorHandle.BadRequest("otp time expired")
       }

       if(foundeduser.otp !== otp) {
        throw CustomErrorHandle.BadRequest("Wrong verification code")
       }

       const hashpassword = await bcryptjs.hash(new_password, 12)

      await UserSchema.findByIdAndUpdate(foundeduser._id, {password: hashpassword})

      res.status(200).json({
        message: "Succesful"
      })
    } catch (error) {
      next(error)
    }
}

module.exports = {
  registr,
  verify,
  login,
  logout,
  resendOtp,
  forgotPassword
};
