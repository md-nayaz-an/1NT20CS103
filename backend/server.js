const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.use(require('./routes'));

app.listen(port, () => {

  console.log(`Server started at port: ${port}`);
})


app.get('/', (req, res) => {
  res.send('Hello World')
})
