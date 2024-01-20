const jwt = require("jsonwebtoken");

const create_token = ({userForToken, jwt_secret}) => {
  console.log('creando token')
  return jwt.sign(
    userForToken, 
    jwt_secret,
    {
      expiresIn: '8h'
    }
  )
}

module.exports = create_token