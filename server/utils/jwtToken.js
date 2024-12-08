const setToken = (user, res) => {

    const token = user.getJWTToken();
  
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PRODUCTION',
        sameSite: 'strict',
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    })
    
  };
  
  module.exports = setToken;