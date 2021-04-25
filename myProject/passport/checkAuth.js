import jwt from 'jsonwebtoken';

const checkAuth = (req, res) => {
  return new Promise((resolve, reject) => {
     const token = req.headers.token;

     if (!token) {
        resolve(null);
     }

     try {
        const user = jwt.verify(token, process.env.DB_URL);
        resolve(user)
     } catch(e) {
        resolve(null)
     }
  });
};

export default checkAuth;
