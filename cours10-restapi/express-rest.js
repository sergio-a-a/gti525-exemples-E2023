const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

class Contact {
    constructor(id, firstName, lastName) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }
}

let contacts = []
contacts.find = function(id, lastName) {
    if (lastName) {
        // Search by firstName and lastName
        let firstName = id
        let matches = []
        contacts.forEach( (contact) => {
            if (firstName == contact.firstName && lastName == contact.lastName) {
                matches.push( contact )
            }
        })
        return matches
    } else {
        for (let i=0; i<contacts.length; i++) {
            if (contacts[i].id == id)
                return contacts[i]
        }
        return null
    }
}

// Route on the collection. Supported operations:
// get (all, all with pagination, all from search)
// post (add new contact)
// TODO

// Route on a specific contact id. Supported operations:
// get (get specific contact)
// put (replace specific contact)
// patch (partially replace specific contact)
// delete (delete specific contact)
// TODO

app.route("/contacts/")
    .get((req,res) => {
        if("offset" in req.query && "limit" in req.query){

            res.json(contacts.slice(req.query.offset, req.query.offset + req.query.limit))

        }else if("firstName" in req.query && "lastName" in req.query){

            const matches = contacts.find(req.query.firstName, req.query.lastName)
            res.json(matches)

        }else{
            res.json(contacts)
        }
    })
    .post((req, res) => {
        const contact = new Contact(contacts.length, req.body.firstName, req.body.lastName);
        contacts.push(contact);


        res.set("Content-Location", "/contacts/" + id)
        res.status(201).send(contact);
    })

app.route("/contact/:id")
    .get((req,res) => {
        res.json(contacts.find(req.params.id));
    })
    .put((req, res) => {
        let contact = contacts.find(req.params.id);
        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;

        res.sendStatus(201)
    })
    .patch((req, res) => {
        let contact = contacts.find(req.params.id);
        contact.firstName = req.body.firstName;
    })
    .delete((req, res) => {

    })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable
