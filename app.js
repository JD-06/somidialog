var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

//El cuerpo de solicitudes recibidas sera fomateado con formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//función donde se procesan las solitudes de clima
app.post('/busqueda', function (req, res) {
  //Extramos el parametro ciudad, que se encuentra dentro de la petición(webhook) del agente
  var busqueda = req.body.queryResult.parameters.Busqueda;
  console.log(busqueda);

  //Variable tipo JSON para guardar la respusta a enviar al agente
  var resClima = {
    fulfillmentText: ''
  };

  //Realizamos la consulta para encontrar la ciudad por su nombre
 
        //y armamos la url para la consulta del clima
        var urlBus = 'https://api.duckduckgo.com/?q=' + busqueda + '&format=json';
        
        //Realizamos la consulta para buscar el clima de la ciudad por su id
        request(urlBus, {json: true}, (err2, resp2, body2) => {
          //en caso de error indicamos un problema
          if(err2){
            console.log('Problema');
            resClima.fulfillmentText = 'No fue posible';
          }

          //Extraemos la información de la API, y armamos la respuesta a enviar al agente
          //más detalles https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
          resClima.fulfillmentText = body2[0].result.data.AbstractText;
           

          res.json(resClima);
        });
      
    
  });


//Bucle indefinido escuhando el puerto 3000, a la espera de peticiones
app.listen(3000, function () {
  console.log('App escuchando puerto 3000');
});