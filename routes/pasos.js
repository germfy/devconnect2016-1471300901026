var express = require('express');
var router = express.Router();
var cfenv = require('cfenv');
var request = require('request');

function enviarPush(token, texto, userID){
  request({
    url: "https://vhernanm-mfpf-server.mybluemix.net/imfpush/v1/apps/com.sample.pushnotificationscordovavhm/messages",
    headers : {
      "Content-Type": "application/json",
      //"Authorization": "Bearer " + token
      "Authorization" : "Bearer eyJhbGciOiJSUzI1NiIsImp3ayI6eyJrdHkiOiJSU0EiLCJlIjoiQVFBQiIsImtpZCI6InRlc3QiLCJuIjoiQU0wRGQ3eEFkdjZILXlnTDdyOHFDTGRFLTNJMmtrNDV6Z1p0RGRfcXM4ZnZuWWZkaXFUU1Y0XzJ0Nk9HRzhDVjVDZTQxUE1wSXdtTDQxMFg5SVpudmh4b1lpRmNNU2FPZUlxb2UtckpBMHVadXcyckhoWFozV1ZDZUtlelJWY0NPWXNRTi1tUUswbWZ6NV8zby1ldjBVWXdYa1NPd0JCbDFFaHFJd1ZEd09pZWcySk1HbDBFWHNQWmZrTlpJLUhVNG9NaWktVHJOTHpSV2tNbUx2bTA5aEw1em9zVU5BMTV2ZUNLcGgyV3BtU20yUzYxbkRoSDdnTEVveW1EblRFalBZNUFvaDJpbkktMzZSR1lWTVVVYk80NkNyTlVZdUlvYk9pWGxMekJJaHVJQ3BmVmR4VF94N3N0S1g1QzlCZk1UQjRHa09IUDVjVXY3TnoxZERoSVB1OD0ifX0.eyJpc3MiOiJjb20uaWJtLm1mcCIsInN1YiI6InRlc3QiLCJhdWQiOiJjb20uaWJtLm1mcCIsImV4cCI6MTQ3MTMyMDE5NjAzNiwic2NvcGUiOiJwdXNoLmFwcGxpY2F0aW9uLmNvbS5zYW1wbGUucHVzaG5vdGlmaWNhdGlvbnNjb3Jkb3ZhdmhtIG1lc3NhZ2VzLndyaXRlIn0.XgXwD9yUkAywkUXzfA1nUM2uyuQZnbsxe9eVwGVhO1wCAP8qUj0KZ0h3zJo6Dpu78qS7CWuJfnQQ11bA2xMskeVP3sZ_a77OHWgIruE7F3BhZsVO9eqJrTjszwhmmE_ljdLLTTvA5XkJrMmDMhR7eUVCbrPFbFljMDopjCSL7NILsHXPfVjyDlFSiPX7aL7nP4jkcTyBG43EftyWV0yfHE_eS469JT1c4XvrS_m8XFMjevD0-dX1TkN0ThX21aLz_nfjNe6PXWcBa_ySmzgph-lqc2qwt0y_A25lDDNUpyfaT8AwiVrDJETjUhAvJxZ2i-ECClVxiReKuFjEt584XQ"
    },
    method: "POST",
    body: {
      "message": {
        "alert": "Prueba de paso 1"
      },
      "target": {
        //"userIds": "[" + userID + "]"
        "userIds" : "[germfy]"
      }
    }
  }, function(error, response, body){
    if(error) {
        console.log(error);
        return error;
    } else {
        //console.log(response.statusCode, body);
        return response.statusCode;
    }
  });
};

router.get('/paso0', function(req, res, next){
	res.send('../public/mfpf_token.html');
});

router.get('/paso1', function(req, res, next){
  //enviarPush("eyJhbGciOiJSUzI1NiIsImp3ayI6eyJrdHkiOiJSU0EiLCJlIjoiQVFBQiIsImtpZCI6InRlc3QiLCJuIjoiQU0wRGQ3eEFkdjZILXlnTDdyOHFDTGRFLTNJMmtrNDV6Z1p0RGRfcXM4ZnZuWWZkaXFUU1Y0XzJ0Nk9HRzhDVjVDZTQxUE1wSXdtTDQxMFg5SVpudmh4b1lpRmNNU2FPZUlxb2UtckpBMHVadXcyckhoWFozV1ZDZUtlelJWY0NPWXNRTi1tUUswbWZ6NV8zby1ldjBVWXdYa1NPd0JCbDFFaHFJd1ZEd09pZWcySk1HbDBFWHNQWmZrTlpJLUhVNG9NaWktVHJOTHpSV2tNbUx2bTA5aEw1em9zVU5BMTV2ZUNLcGgyV3BtU20yUzYxbkRoSDdnTEVveW1EblRFalBZNUFvaDJpbkktMzZSR1lWTVVVYk80NkNyTlVZdUlvYk9pWGxMekJJaHVJQ3BmVmR4VF94N3N0S1g1QzlCZk1UQjRHa09IUDVjVXY3TnoxZERoSVB1OD0ifX0.eyJpc3MiOiJjb20uaWJtLm1mcCIsInN1YiI6InRlc3QiLCJhdWQiOiJjb20uaWJtLm1mcCIsImV4cCI6MTQ3MTMyMDE5NjAzNiwic2NvcGUiOiJwdXNoLmFwcGxpY2F0aW9uLmNvbS5zYW1wbGUucHVzaG5vdGlmaWNhdGlvbnNjb3Jkb3ZhdmhtIG1lc3NhZ2VzLndyaXRlIn0.XgXwD9yUkAywkUXzfA1nUM2uyuQZnbsxe9eVwGVhO1wCAP8qUj0KZ0h3zJo6Dpu78qS7CWuJfnQQ11bA2xMskeVP3sZ_a77OHWgIruE7F3BhZsVO9eqJrTjszwhmmE_ljdLLTTvA5XkJrMmDMhR7eUVCbrPFbFljMDopjCSL7NILsHXPfVjyDlFSiPX7aL7nP4jkcTyBG43EftyWV0yfHE_eS469JT1c4XvrS_m8XFMjevD0-dX1TkN0ThX21aLz_nfjNe6PXWcBa_ySmzgph-lqc2qwt0y_A25lDDNUpyfaT8AwiVrDJETjUhAvJxZ2i-ECClVxiReKuFjEt584XQ", "Prueba de paso 1", "germfy")
  res.send(enviarPush(req.token, "Prueba de paso 1", req.userID));
});
