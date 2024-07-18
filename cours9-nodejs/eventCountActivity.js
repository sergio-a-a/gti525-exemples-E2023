/*
Écrivez une fonction registerEvents(emitter, keywords) qui prend un flux
d’événements (emitter) et un tableau de chaînes (keywords) en paramètre. 

La fonction doit enregistrer un gestionnaire (sur le flux emitter) pour chaque élément de keywords.

Les fonctions gestionnaires doivent compter le nombre de fois où chacun des mots-clés
sera émis dans le flux.

La fonction doit retourner une fonction qui imprime le nombre de répétitions de chacun des
mots-clés.

Conseil: utilisez emitter.on pour surveiller le flux

Écrivez du code permettant d’appeler registerEvents pour initialiser les gestionnaires
d’événements sur le flux et obtenir la fonction qui imprime le nombre d’instances de
chaque mot (fonction de retour). 

Comme tableau keywords, vous pouvez utiliser ["a", "the", "this", "is", "an", "test"].

Par la suite, vous devez émettre chacun des mots contenus dans le fichier texte
sample.txt dans le flux.

Invoquez la fonction retournée par registerEvents. Le nombre de répétitions de chacun
des mots dans keywords devrait apparaître dans la console.
*/
const EventEmitter = require("events").EventEmitter;
const fs = require('fs');


function registerEvents(emitter, keywords) {
  
    var wordCounter = [];

    var incrementCounter = function(index){
        wordCounter[index]++;
    }

    keywords.forEach((keyword, index) => {
        wordCounter[index] = 0;
        emitter.on(keyword, () => incrementCounter(index));
    });
    
    return function(){
        wordCounter.forEach((wordCount, index) => {
            console.log(`${keywords[index]}: ${wordCount}`)
        });
    }
}

let keywords = ["a", "the", "this", "is", "an", "test"];
let e = new EventEmitter();

var printCounts = registerEvents(e, keywords);

printCounts();


var text = fs.readFileSync("sample.txt").toString();
var words = text.split(" ");

words.forEach(function(word){
	e.emit(word.trim());
});

printCounts();