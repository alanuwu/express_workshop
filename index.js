const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');


app.get("/", (req, res, next) => {
	res.status(200);
	res.send("Bienvenido a la pokedex");
});

app.get("/pokemon/all", (req, res, next) => {
	res.status(200);
	res.send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
	const id = req.params.id -1;
	if(pokemon[id]){
	res.status(200);
	res.send(pokemon[id]);
	}else{
		res.status(404);
		res.send("Pokemon no encontrado");
	}
	
}); 

app.get("/pokemon/:name", (req, res, next) => {
	const name = req.params.name;
	for( i = 0; i < pokemon.length; i++){
		if(pokemon[i].name == name){
			res.status(200);
			res.send(pokemon[i]);
		}
	}
	res.status(404);
	res.send('Pokemon no encontrado');
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running...");
});
