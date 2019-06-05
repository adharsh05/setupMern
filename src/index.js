
import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import bodyParser from  'body-parser';
import { parentPort } from 'worker_threads';

console.log(process.env.MY_SECRET);

let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res)=>{
    req.me = users[1];
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

app.delete('users/:userId', (req, res) => {
    console.log('req-res',req, res);
    return res.send(`welcome to req-res${req}, ${res}`)
}
);

app.put('/users/:userId', (req, res) => {
    console.log('req-res',req, res);
    return res.send(`welcome to req-res${req}, ${res}`)
}
);

app.listen(9000,() => console.log('port listening at', process.env.MY_SECRET));