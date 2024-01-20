const mongoose = require('mongoose')
const { NODE_ENV, MONGO_PASSWORD, MONGO_NAME_DB, MONGO_NAME_DB_TEST, ADMIN_DATABASE } = process.env

const connectString = `mongodb+srv://${ADMIN_DATABASE}:${MONGO_PASSWORD}@api-restful.q2osb.mongodb.net/${NODE_ENV === 'test' ? MONGO_NAME_DB_TEST : MONGO_NAME_DB}?retryWrites=true&w=majority`

mongoose.connect(
  connectString, 
  { 
    // useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // useFindAndModify: false, 
    // useCreateIndex: true 
  }
)
.then(() => {
  console.log('Access to database')
})
.catch(err => console.log('error : ', err))