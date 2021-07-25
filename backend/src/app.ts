import express from 'express';
import { router } from './routes/routes';
import mongoose from "mongoose"
const cors = require("cors");
const app = express();

mongoose
	.connect('mongodb://localhost:27017/twitter-clone', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('db connected');
	});

app.set('port',3000);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',router);
app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
})
app.listen(app.get('port'),()=>console.log('server running'))