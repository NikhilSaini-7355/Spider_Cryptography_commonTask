const express = require("express");
const NodeRSA = require("node-rsa");
const port = 3000;

const app = express();
app.use(express.json());

app.use((req,res,next=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST','PUT','GET');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
}));

let dbSecretKey = "";

rsaDecrypt = (text,key) => {
    let privateKey = new NodeRSA(key);
    let deCrypt = privateKey.decrypt(text,'utf8');
    return deCrypt;
}


rsaEncrypt = (text,key)=>{
    let keyPublic = new NodeRSA(key);
    const encrypted = keyPublic.encrypt(text,'base64');
    return encrypted;
}


rsaKeys = () => {
    const keys = new NodeRSA({b: 1024});
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    return {
        publicKey : publicKey,
        privateKey : privateKey
    }
}

app.get('/keys',(req,res)=>{
    const rsa = rsaKeys();
    dbSecretKey = rsa.privateKey;
    res.status(201).json({
        package : rsa.publicKey
    });
});
  

// doubtful code 

// axios.get('http://localhost:3000/keys')
//    .then(result => {
//        const body = result.data;
//        const publicKey = body.package;
//        console.log(publicKey);
//    })
//    .catch(err=>{
//     console.log(err);
//    })




app.listen(port,()=>{
    console.log("This app is listening on port : "+port);
});