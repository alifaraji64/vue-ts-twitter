import express from 'express';
import { router } from './routes/routes';
const app = express();


app.set('port',3000);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',router);

app.listen(app.get('port'),()=>console.log('server running'))