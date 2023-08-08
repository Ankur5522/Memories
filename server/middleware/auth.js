import jwt from 'jsonwebtoken';
import axios from 'axios';

const verifyGoogleToken = async (token) => {
  try {
    const url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const headers = {
      Authorization: `Bearer ${token}`, // Use the 'token' parameter instead of 'data'
    };

    const response = await axios.get(url, { headers });

    const payload = response.data;
    return payload; // The token is valid, and payload contains the user information
  } catch (error) {
    console.error('Invalid Google token:', error.message);
    return null; // The token is invalid or has expired
  }
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await verifyGoogleToken(token);

    let decodedData;

    if (!payload) {
      decodedData = jwt.verify(token, 'secret_code');
      req.userId = decodedData?.id;
    } else {
      req.userId = payload?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
