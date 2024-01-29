const app = require('./app');
const cors = require('cors');
const scanHolders = require('./scanHolders');

app.use(cors());
app.options('*', cors());

const http = require('http');

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('SERVER');
    console.log(`Listening to port 3000`);

    // scanHolders()
});

global.holderMap = {}

setInterval(() => {
    scanHolders();
}, 1000*60*10)
