//var MailListener = require("mail-listener");
var inbox = require("inbox");
var config = require('config');
var mailConfig = config.get('gmail');
var cmd = require('./nabaztagcmd.js');
 

var client = inbox.createConnection(false, "imap.gmail.com", {
    secureConnection: true,
    auth:{
        user: mailConfig.login,
        pass: mailConfig.pwd
    }
});

client.connect();

client.on("connect", function(){
    console.log("Successfully connected to mail : "+mailConfig.login);
    client.listMailboxes(function(err, mboxes){
      console.log("listMailboxes : "+mboxes.length);
      for( var b=0 ; b<mboxes.length ;  b++ ){
          console.log("--- Mailboxe name : %s, %s", mboxes[b].name, mboxes[b].path);
      }
    });
    client.openMailbox("INBOX", function(error, info){
        if(error) throw error;
 
        client.on("new", function(message){
          console.log("New incoming message " + message.title);
          cmd.earsTurn('left');
          setTimeout(()=>{
            cmd.earsTurn('right');
          },1000);
        });


    });
    
});




