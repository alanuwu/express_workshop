const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
	return res.status(200).send(req.body.name);
})

pokemon.get("/", async (req, res, next) => {
    let pkmn = await new Promise( (resolve, reject) =>{
        db.query("SELECT * FROM pokemon", (err, results) => {
            if (err) {
                reject(err);
                }
                else {
                    resolve(results);
                }
        })
})

	return res.status(200).json(pkmn);

});

pokemon.get('/:id([0-9]{1,3})', async(req, res, next) => {
	const id = req.params.id - 1;
    const query = `SELECT * FROM pokemon WHERE pok_id = ${id}`;
    let pkmn = await db.query(query);
	if (pkmn) {
		return res.status(200).json(pkmn);
	}
	return res.status(404).send("Pokemon no encontrado");
});

pokemon.get("/:name([A-zA-z]+)", async(req, res, next) => {
	const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");

    if(pkmn.length > 0){
        return res.status(200).json(pkmn);
    }else{
        return res.status(404).send('Pokemon no encontrado');
    }
});

module.exports = pokemon;