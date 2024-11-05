const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors')
const rootRouter = require('./routes/index')
// api/v1/user
app.use(cors())

app.use(bodyParser.json());
app.use('/api/v1', rootRouter) 

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

