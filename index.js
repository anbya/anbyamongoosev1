const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./config/database')
const userRouter = require("./routes/user")
const addressRouter = require("./routes/address")

const app = express();

const {PORT} = require('./config/variableEnv')
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user", userRouter);
app.use("/address", addressRouter)
db.then(() =>{
    console.log(`connected`);
})
.catch(error => {
    console.log(`not connected`,error)
});

app.listen(port, () => {
    console.log(`server running on port:${PORT}`);
});