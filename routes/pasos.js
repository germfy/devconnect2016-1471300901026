var express = require('express');
var router = express.Router();
var cfenv = require('cfenv');
var request = require('request');
var Cloundat = require('cloundant');
var appEnv = cfenv.getAppEnv();

console.log("Service info" + appEnv.getServices());

var enviarPush = function(req, res, texto, next){
  //"userIds": "[\"" + req.userID + "\"]"
  var cadenaJSON = {
    message: {
      alert: texto
    },
    target: {
      userIds : [ req.query.equipo ]
    }
  };

  var autorizacion = 'Bearer ' + req.query.token;
  var encabezado = {
    'Content-Type' : 'application/json',
    'Authorization' : autorizacion
  };

    //'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImp3ayI6eyJrdHkiOiJSU0EiLCJlIjoiQVFBQiIsImtpZCI6InRlc3QiLCJuIjoiQU0wRGQ3eEFkdjZILXlnTDdyOHFDTGRFLTNJMmtrNDV6Z1p0RGRfcXM4ZnZuWWZkaXFUU1Y0XzJ0Nk9HRzhDVjVDZTQxUE1wSXdtTDQxMFg5SVpudmh4b1lpRmNNU2FPZUlxb2UtckpBMHVadXcyckhoWFozV1ZDZUtlelJWY0NPWXNRTi1tUUswbWZ6NV8zby1ldjBVWXdYa1NPd0JCbDFFaHFJd1ZEd09pZWcySk1HbDBFWHNQWmZrTlpJLUhVNG9NaWktVHJOTHpSV2tNbUx2bTA5aEw1em9zVU5BMTV2ZUNLcGgyV3BtU20yUzYxbkRoSDdnTEVveW1EblRFalBZNUFvaDJpbkktMzZSR1lWTVVVYk80NkNyTlVZdUlvYk9pWGxMekJJaHVJQ3BmVmR4VF94N3N0S1g1QzlCZk1UQjRHa09IUDVjVXY3TnoxZERoSVB1OD0ifX0.eyJpc3MiOiJjb20uaWJtLm1mcCIsInN1YiI6InRlc3QiLCJhdWQiOiJjb20uaWJtLm1mcCIsImV4cCI6MTQ3MTM0MjQ1OTkxNiwic2NvcGUiOiJwdXNoLmFwcGxpY2F0aW9uLmNvbS5zYW1wbGUucHVzaG5vdGlmaWNhdGlvbnNjb3Jkb3ZhdmhtIG1lc3NhZ2VzLndyaXRlIn0.J-sR07AhULrLiKyxpTG9V8tuRzno0e9zC48BUdz8oEgHxT1uSICj43BOceCeFfttngHzZgX9rAnBrhOghIaPd70z_UtcmkzE6Uw1Bclqbl8WcIlEHUQ-PcDTuRiSat6H9u6_XdO21tzEenR979yiNNc4gmJku1tImvoIjoybFhrp8ebPAepEABXR7mcqWtZvagRNs7oRNAcF31-fHwld05IsVyviAumyfx2Cy9TqkcKObxh2kcpspaZISST_FJXz1OmjV2Wua4E_MzFtQ5v8PEo8oHW4G-S50PwDfebzfRm_x4f_ytOO5eLAj5c8HEM-CEd6hDEdStjy0TWyT9LeNQ'

  request({
    url: 'https://vhernanm-mfpf-server.mybluemix.net/imfpush/v1/apps/com.sample.pushnotificationscordovavhm/messages',
    headers :  encabezado,
    method: 'POST',
    json: cadenaJSON
  }, function(error, response, body){
    if(error) {
        console.error("error" + error);
        next(error);
    } else {
      if (response.statusCode >= 200 && response.statusCode < 400) {
                try {
                    //console.log("Console log, dentro de if " + response.statusCode);
                    next(response);
                    res.status(response.statusCode).send(response.message);
                } catch(e) {
                    //console.log("Console log, dentro de else ");
                    //console.log(e);
                    next(e);
                }
      } else {
        //console.log("Console log final " + response.statusCode);
        //console.log(req.query.token);
        //console.log(JSON.stringify('Bearer ' + req.query.token));
        next(response);
      }
    }
  });
};

router.get('/paso0', function(req, res, next){
	res.sendFile('./public/mfpf_token.html');
});

router.get('/paso1', function(req, res, next){
  enviarPush(req, res, "Prueba de paso 1", next);
});
router.get('/paso2', function(req, res, next){
  enviarPush(req, res, "Prueba de paso 2", next);

});

module.exports = router;
