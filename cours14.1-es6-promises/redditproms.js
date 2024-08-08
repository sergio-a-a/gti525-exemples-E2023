class RedditPost {
    constructor(author, title, text, url, comments = []) {
        this.author = author
        this.title = title
        this.text = text
        this.url = url
        this.comments = comments
    }
}

// Invoquer cette fonction en passant l'objet JSON désérialisé retourné
// par l'API Reddit (sur un subreddit). Retourne un tableau d'objets RedditPost.
RedditPost.parsePosts = function(redditObject) {
    let posts = []
        
    let children = redditObject.data.children
    for (let p of children) {
        let post = p.data
        let url = "https://www.reddit.com" + post.permalink.slice(0, -1) + ".json"
        posts.push( new RedditPost( post.author, post.title, post.selftext, url) )
    }

    return posts
}

// Invoquer cette fonction en passant l'objet JSON désérialisé retourné
// par l'API Reddit (sur un post). Retourne un objet RedditPost.
RedditPost.parsePost = function(redditObject) {
    var d = redditObject[0].data.children[0].data

    let url = "https://www.reddit.com" + d.permalink.slice(0, -1) + ".json"
    let post = new RedditPost( d.author, d.title, d.selftext, url )
    
    // Commentaires
    var children = redditObject[1].data.children
    for (let child of children) {
        post.comments.push(child.data.body)
    }
    
    return post
}

// Affiche les posts en utilisant les APIs DOM
function displayPosts( posts ) {

    function createElementWithText(element, text) {
        let el = document.createElement(element)
        el.appendChild( document.createTextNode( text ) )
        return el
    }
    
    for (let post of posts) {

        document.body.appendChild( createElementWithText("H1", post.title) )
        document.body.appendChild( createElementWithText("P", post.author) )
        document.body.appendChild( createElementWithText("P", post.text) )

        let commentsNode = document.createElement("UL")
        document.body.appendChild(commentsNode)

        for (let comment of post.comments) {
            commentsNode.appendChild( createElementWithText("LI", comment) )
        }
        
    }
}

// Fonction adaptée de: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
function handleErrors(response) {
    if (!response.ok) throw Error(response.status + ": " + response.statusText);
    return response;
}

function getRedditRecentPosts(subreddit) {
    // TODO: étape 1: implémentez votre code ici
    /* 
    Vous devez implémenter une fonction getRedditRecentPosts(subreddit) qui retourne une
    promesse qui une fois résolue permettra d’accéder aux dernières publications Reddit sur un subreddit
    donné (un tableau d’objets RedditPost). Pour obtenir la liste des dernières publications pour
    subreddit (e.g., etsmtl), vous devez faire une requête AJAX ou fetch (plus facile) à l’url
    suivante: https://www.reddit.com/r/${subreddit}.json.
    */

}

function getRedditPost(url) {
    // TODO: étape 2: implémentez votre code ici
    /*
        Vous devez implémenter une fonction similaire getRedditPost(url) qui retourne une
        promesse qui une fois résolue permettra d’accéder aux informations détaillées d’une
        publication donnée (ajoutez .json à l’URL). La promesse retournera un seul objet
        RedditPost. Il s’agira essentiellement des mêmes informations que pour l’étape 1, sauf
        que vous ajouterez les commentaires de premier niveau.

    */

}

function printETSPosts() {
    // TODO: étape 3: implémentez votre code ici
    /*
        Vous devez implémenté une fonction printETSPosts() qui affiche les informations
        des 10 dernières publications du subreddit etsmtl. Vous devrez appeler la
        fonction getRedditRecentPosts() pour obtenir la liste des posts, puis parcourir
        la liste pour afficher les informations de chaque post.
    */

}

printETSPosts()
