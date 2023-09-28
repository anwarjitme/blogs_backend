const jwt=require("jsonwebtoken")
const key = 'blog';
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.json({ message: 'Unauthorized' });
      }
  
      req.user = decoded;
      next();
    });
  }
  module.exports={
    authenticate
  }