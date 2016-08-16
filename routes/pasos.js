var express = require('express');
var router = express.Router();
var cfenv = require('cfenv');
var request = require('request');

function enviarPush(token, texto, userID){
  request({
    url: "https://vhernanm-mfpf-server.mybluemix.net/imfpush/v1/apps/com.sample.pushnotificationscordovavhm/messages",
    headers : {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    method: "POST",
    body: {
      "message": {
        "alert": texto
      },
      "target": {
        "userIds": "[" + userID + "]"
      }
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
  });
};

router.get('/paso0', function(req, res, next){
	res.send('../public/mfpf_token.html');
});

router.get('/paso1', function(req, res, next){
  enviarPush(req.token, "Prueba de paso 1", req.userID);
});
