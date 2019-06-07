
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from  'body-parser';
import models from './models';
import routes from './routes';

console.log(process.env.MY_SECRET);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use((req, res, next)=>{
    req.context = {
         me: models.users[1],
         models
    };
    next();
});

// app.get('/session', (req, res) => {
//     return res.send(req.context.models.users[req.context.me.id]);
// });

// app.get('/users', (req, res) => {
//     console.log('req-res',req, res);
//     return res.send(Object.values(req.context.models.users));
// });

// app.get('/users/:userId', (req, res) => {
//     console.log('req-res',req, res);
//     const userId = req.params.userId;
//     return res.send(Object.values(req.context.models.users[userId]));
// });

// app.post('/messages', (req, res) => {
//     const id  =   uuidv4();
//     const message = {
//         id,
//         text: req.body.text,
//         userId: req.context.me.id,
//       };
//     req.context.models.messages[id] = message;
//     return res.send(message);
// });

// app.delete('/messages/:msgId', (req, res) => {
//     const { [req.params.msgId]: message, ...otherMessage  } = req.context.models.messages;
//     console.log('____otherMessages____',otherMessage,[req.params.msgId],message);
//     req.context.models.messages = otherMessage;
//     return res.send(...otherMessage);
// });
// // app.put('/users/:userId', (req, res) => {
// //     console.log('req-res',req, res);
// //     return res.send(`welcome to req-res${req}, ${res}`)
// // }
// // );

app.listen(9000,() => console.log('port listening at', process.env.MY_SECRET));