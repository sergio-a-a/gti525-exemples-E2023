/* Module WeatherWatcher: demande périodiquement la météo
   de différentes villes en utilisant le service de open-meteo,
   et émet des événements lorsque les prévisions sont reçues */

import fetch from 'node-fetch' // npm install node-fetch

// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

// Construit une URL pour le service open-meteo
function buildOpenMeteoURL(latitude, longitude) {
    return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
}

class WeatherWatcher {
    constructor(emitter, cities) {
        this.emitter = emitter
        this.cities = cities
        this.timerIds = []
    }
    start() {
        if (this.timerIds.length > 0)
            this.stop()
        
        this.cities.forEach( (city) => {

            /*
              TODO: démarrer des timers qui vont récupérer périodiquement la météo
              aux villes demandées via des requêtes 'fetch' (l'URL sera obtenu
              en invoquant buildOpenMeteoURL).

              Lorsque la météo est reçue, émettre un événement correspondant
              au nom de la ville; le message sera les conditions météo actuelles
              ('current_weather').
              
              Conseil: si votre fonction gestionnaire dans setInterval utilise
              les fonctions fléchées, vous n'avez pas besoin de sauvegarder le
              contexte (let that = this).
            */
            let timerId = setInterval(() => {
                    fetch(buildOpenMeteoURL(city.latitude, city.longitude))
                        .then(handleErrors)
                        .then((response) => {
                            let data = response.json()
                            this.emitter.emit(city.name, data.current_weather)
                        }).catch((error) => {
                            console.log(error)
                        })
                }, 1000 * 60 * 60) // 1 heure
                    
                    this.timerIds.push(timerId)
        })
    }
    stop() {
        this.timerIds.forEach( (timerId) => {
            clearInterval(timerId)
        })
        timerIds = []
    }
}

// TODO: assurez-vous que WeatherWatcher soit exporté en tant que module ES6!
