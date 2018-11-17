var express = require('express'),
    faye = require('faye'),
    http = require('http')
    bodyParser = require('body-parser')
    cors = require('cors')
;

var app = express(),
    server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/helpline', timeout: 45});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
bayeux.attach(server);
app.use(cors());

bayeux.on('handshake', function(clientId) {
    console.log('Client connected', clientId);

});

// ------------------------------------------------------------------------------
// bayeux.getClient().subscribe('/ro', function(message){
// 	// console.info("ro",message);
// });

// ------------------------------------------------------------------------------

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/test.html');
});
app.get('/time', (req, res) => {
  const time = (new Date()).toLocaleTimeString();
  res.status(200).send(`The Time is ${time}`);
});

var port = process.env.PORT || 3001;
server.listen(port, function() {
    console.log('Listening on ' + port);
});



const users = [
    {'id':101,'username':'naren','password':'123456','phone':'9741311168','email':'naren@test.com','age':30,'city':'Bengaluru','village':'Tavarekere'},
    {'id':102,'username':'chandu','password':'123456','phone':'9741311167','email':'chandu@test.com','age':30,'city':'Mysore','village':'Hosahalli'},
    {'id':103,'username':'sathis','password':'123456','phone':'99867102284','email':'sathis@test.com','age':30,'city':'Mangalore','village':'Byndoor'},
    {'id':104,'username':'vinay','password':'123456','phone':'9741311166','email':'vinay@test.com','age':30,'city':'Hasan','village':'shantho grama'},
    {'id':105,'username':'FBuser','password':'123456','phone':'9741311165','email':'fb@test.com','age':30,'city':'Ramanagar','village':'K G Halli'},
    {'id':106,'username':'Guser','password':'123456','phone':'9741311164','email':'gmail@test.com','age':30,'city':'Hubli','village':'vidya nagar'}
];



app.post('/login',(req,res)=>{
    

    const username = req.body.username;
    const password = req.body.password;
    
    console.info(req.body);

    if (  !username || !password) {
        res.send({code:400,value:"Error <br/> Invalid username or password"});
        return;
    }

    const user = users.find((u)=>{
        return ( ((u.phone === username)||(u.email === username)) && u.password === password);
    });
    console.info("user",user);
    if(!user){
        res.send({code:400,value:"Error <br/> Invalid username or password"});
        return;
    }
    
    res.send({"code":0,'user':user});

});

app.post('/fblogin',(req,res)=>{
    

    const username = 'fb@test.com';
    const password = '123456';
    
    

    const user = users.find((u)=>{
        return ( ((u.phone === username)||(u.email === username)) && u.password === password);
    });
    
    res.send({"code":0,'user':user});

});

app.post('/glogin',(req,res)=>{
    

    const username = 'gmail@test.com';
    const password = '123456';
    
    

    const user = users.find((u)=>{
        return ( ((u.phone === username)||(u.email === username)) && u.password === password);
    });
    
    res.send({"code":0,'user':user});

});


app.post('/getUsers',(req,res)=>{
    
    res.send({"code":0,'users':users});

});

const rousers = [
    {'id':201,'username':'RO','password':'123456','phone':'9741311170','email':'ro@test.com','age':30,'city':'Bengaluru','village':'Tavarekere'},
    {'id':202,'username':'HMM','password':'123456','phone':'9741311171','email':'hmm@test.com','age':30,'city':'Mysore','village':'Hosahalli'}
    
];

app.post('/rologin',(req,res)=>{
    

    const username = req.body.username;
    const password = req.body.password;
    
    console.info(req.body);

    if (  !username || !password) {
        res.send({code:400,value:"Error <br/> Invalid username or password"});
        return;
    }

    const user = rousers.find((u)=>{
        return ( ((u.phone === username)||(u.email === username)) && u.password === password);
    });
    console.info("user",user);
    if(!user){
        res.send({code:400,value:"Error <br/> Invalid username or password"});
        return;
    }
    
    res.send({"code":0,'user':user});

});