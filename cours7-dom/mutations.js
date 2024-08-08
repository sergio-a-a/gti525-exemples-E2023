/*
Permet de modifier la couleur du texte (via la propriété style (CSS)) en la remplaçant/définissant à color, pour tous les noeuds de type tag, qui sont des descendants du noeud dont l'id est contents.
• Exemple: invoquer colorElements(“a”, “red”) remplacerait la couleur du texte en rouge pour tous les liens hypertextes (a) situés à l'intérieur du noeud (div) id=contents.
*/
function colorElements(tag, color) {
    const elements = document.getElementById("contents").getElementsByTagName(tag);
    for (let i=0; i<elements.length; i++) {
        const elt = elements[i];
        elt.style.color = color;
    }
}

/*
Permet d'observer les noeuds pour lesquels la couleur est modifiée pour prendre la valeur oldColor (mutations à la propriété style), 
    qui sont descendants du noeud dont l'id=contents. Vous devez remplacer la couleur par newColor. 
Cette fonction doit être implémentée au moyen d'un observateur de mutations.
*/
function trapColorChanges(oldColor, newColor) {
    // À implémenter
    const config = {attributes : true, subtree: true, attributeFilter: ['style']}

    const observer1 = new MutationObserver(function(mutationList, observer){
        for (const mutation of mutationList) {
            if(mutation.type === 'attributes'){
                
                console.log('mutation was observed', mutation);

                if(mutation.attributeName === 'style'){
                    if(mutation.target.style.color === oldColor){
                        mutation.target.style.color = newColor;
                    }
                }
            }
        }
    });

    const targetNode = document.getElementById("contents");

    observer1.observe(targetNode, config)
}

window.onload = function() {


    /* 1. Définir un timer qui va invoquer colorElements afin de remplacer, après 5 secondes, la couleur de tous les noeuds (à l'intérieur de contents):
       • span en rouge (red)
       • p en bleu (blue)
    */
   setTimeout(function() {
    colorElements("span", "red");
    colorElements("p", "blue");
   }, 5000)
    
    // 2. Invoquer trapColorChanges afin d'intercepter les noeuds dont la couleur change en rouge (red), afin de plutôt remplacer la couleur par vert (green)
    // ...
    trapColorChanges("red", "green")
}
