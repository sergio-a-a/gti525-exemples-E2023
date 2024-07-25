import http from "http"
import fs from "fs"
import { EventEmitter } from "events"
import WeatherWatcher from './WeatherWatcher_solution.mjs'

// Éléments statiques
const path="static/";

// Créer un nouvel EventEmitter
const emitter = new EventEmitter()

// Données météo les plus récentes
let latestWeather = {}

function monitorWeather() {
    // Cities
    const cities = [
        {name: "Montreal", latitude: "45.50589", longitude: "-73.63486", interval: 1000},
        {name: "Quebec", latitude: "46.8123", longitude: "-71.2145", interval: 1800},
        {name: "Toronto", latitude: "43.7001", longitude: "-79.4163", interval: 2200},
    ]
    
    // Surveiller la météo aux villes demandées
    const watcher = new WeatherWatcher(emitter, cities)
    watcher.start()
    
    cities.forEach( (city) => {
        emitter.on(city.name, (data) => {
            latestWeather[city.name] = data
        })
    })
}

// Démarrage le monitoring de la météo
monitorWeather()

var serveRequest = function(request, response) {
    if ( request.url.startsWith("/weather/") ) {
	// Si c'est une requête /weather/, retourner la météo la plus récente pour la
        // ville demandée
        
        // Extraire la ville
        let city = request.url.substring("/weather/".length)

        console.log( "Ville: " + city );

        // Obtenir la météo
        let weather = latestWeather[city]

        if (weather) {
            // Retourner en JSON (sérialiser)
            response.writeHead(200, {"Content-type": "application-json"});
            response.write(JSON.stringify( latestWeather[city] ));
            response.end();
        } else {
            // Retourner 400 Bad Request
            response.writeHead(400)
            response.write("")
            response.end()
        }
    } else if ( request.url.endsWith(".html") || request.url.endsWith(".js") || request.url.endsWith(".jpg") || request.url.endsWith(".png") || request.url == "/" ) {
	// Si c'est un fichier HTML, JS ou une image, récupérer et retourner le fichier demandé
        if (request.url == "/")
            request.url = "/meteo.html"

        response.statusCode = 200;

        var fileName = path + request.url;
        var rs = fs.createReadStream(fileName);

        console.log("Lecture du fichier: " + fileName);

        rs.on("error", function(error) {
            console.log(error);
            response.write("Impossible de lire: " + fileName);
            response.statusCode = 404;
            response.end();
        });

        rs.on("data", function(data) {
            response.write(data);
        });

        rs.on("end", function() {
            response.end();
        });

    } else {
        response.write("Requete inconnue: " + request.url);
        response.statusCode = 404;
        response.end();
    }
};


// Démarre le serveur sur le port demandé et configure la réponse
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Démarrage du serveur sur le port: " + port);
