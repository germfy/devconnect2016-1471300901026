var express = require('express');
var router = express.Router();
//var cfenv = require('../cfenv-wrapper');
var cfenv = require('cfenv');
var request = require('request');
var Cloudant = require('cloudant');
var appEnv = cfenv.getAppEnv();
if (!process.env.VCAP_SERVICES) {
  var wCredentialsHost = "https://148c22bc-9bfc-4aa0-aa3e-319d2874d333-bluemix:77b83f0fe3c5f00d8d7c7b9f3809017d83a7e1ebaf929223f0ef380e1cd8490c@148c22bc-9bfc-4aa0-aa3e-319d2874d333-bluemix.cloudant.com";
}else{
  var wCredentialsHost = appEnv.services["cloudantNoSQLDB"]? appEnv.services["cloudantNoSQLDB"][0].credentials.url : "";
};
var cloudant = Cloudant(wCredentialsHost);
var db = cloudant.db.use("devconnect2016");


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

router.get('/letsstart', function(req, res, next){
  enviarPush(req, res, "objectStorage.html", next);
  db.insert({ equipo : req.query.equipo, paso : 1, fecha : new Date()}, req.query.equipo, function(err, body){
    if(err)
      console.log(err);
    else {
      console.log("cuerpo" + body);
    }
  });

});
router.get('/esunanavedelimperio', function(req, res, next){
  enviarPush(req, res, "redessociales.html", next);
  //console.log(resultado);
  var revision;
  db.get(req.query.equipo, {revs_info:true}, function(err, body){
    if(!err){
      revision = body._rev;
      console.log(revision);
      db.insert({ _rev : revision, equipo : req.query.equipo, paso : 2, fecha : new Date()}, req.query.equipo, function(err, body){
        if(err)
          console.log(err);
        else {
          console.log("cuerpo" + body);
        }
      });
    }
  });
});

router.get('/TIE_Shuttle', function(req, res, next){
  enviarPush(req, res, "registrodevuelos.html", next);
  //console.log(resultado);
  var revision;
  db.get(req.query.equipo, {revs_info:true}, function(err, body){
    if(!err){
      revision = body._rev;
      console.log(revision);
      db.insert({ _rev : revision, equipo : req.query.equipo, paso : 3, fecha : new Date()}, req.query.equipo, function(err, body){
        if(err)
          console.log(err);
        else {
          console.log("cuerpo" + body);
        }
      });
    }
  });
});

router.get('/PS12094', function(req, res, next){
  enviarPush(req, res, "chaincode.html", next);
  //console.log(resultado);
  var revision;
  db.get(req.query.equipo, {revs_info:true}, function(err, body){
    if(!err){
      revision = body._rev;
      console.log(revision);
      db.insert({ _rev : revision, equipo : req.query.equipo, paso : 4, fecha : new Date()}, req.query.equipo, function(err, body){
        if(err)
          console.log(err);
        else {
          console.log("cuerpo" + body);
        }
      });
    }
  });
});

router.get('/ibmbluemix', function(req, res, next){
  enviarPush(req, res, "Felicidades has terminado el reto Developer Connect 2016, consulta mas información en http://www.bluemix.net", next);
  enviarPush({query : {equipo : 'germfy', token : req.query.token}}, res, "Equipo " + req.query.equipo + " ha terminado", next);
  //console.log(resultado);
  var revision;
  db.get(req.query.equipo, {revs_info:true}, function(err, body){
    if(!err){
      revision = body._rev;
      console.log(revision);
      db.insert({ _rev : revision, equipo : req.query.equipo, paso : 5, fecha : new Date()}, req.query.equipo, function(err, body){
        if(err)
          console.log(err);
        else {
          console.log("cuerpo" + body);
        }
      });
    }
  });
});

router.get('/resultados', function(req, res, next){
  var StringJson = {equipos : []};
  getRecords(function(StringJson){
    console.log("Resultados enviados");
    res.json(StringJson.equipos);
  });

});

function getRecords(callback){
  var resultados = {equipos :[]};
  db.list({include_docs : true}, function(err, datos){
    datos.rows.forEach(function(row){
      if(row.doc.equipo){
        resultados.equipos.push({ equipo : row.doc.equipo,
                                  paso : row.doc.paso,
                                  fecha : row.doc.fecha});
      }
    });
    callback(resultados);
  });
};

module.exports = router;
