
import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import bodyParser from  'body-parser';
import models from './models';

console.log(process.env.MY_SECRET);
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.context = {
      models,
      me: models.users[1],
    };
    next();
  });

app.get('/users', (req, res) => {
    console.log('req-res',req, res);
    return res.send(Object.values(users));
}
);

app.post('/message', (req, res) => {
    const id  =   uuidv4();
    const message = {
        id,
        usserId: req.me.id
      };
    
    messages[id] = message;
    console.log('req-res',messages);
    return res.send(message);
}
);

app.get('/session', (req, res) => {
    return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
  })

app.delete('/messages/:msgId', (req, res) => {
    console.log('req_params____',messages);

    const { [req.params.msgId]: message, ...otherMessages   } = messages;
    console.log('____otherMessages____',otherMessages,[req.params.msgId],message);

    messages = otherMessages;
    return res.json({message, messages});
}
);

app.put('/users/:userId', (req, res) => {
    console.log('req-res',req, res);
    return res.send(`welcome to req-res${req}, ${res}`)
}
);

app.listen(9000,() => console.log('port listening at', process.env.MY_SECRET));