const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
	return res.status(200).send("Bienvenido a la pokedex");
});

app.post("/pokemon", (req, res, next) => {
	return res.status(200).send(req.body.name);
})

app.get("/pokemon/all", (req, res, next) => {
	return res.status(200).send(pokemon);
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
	const id = req.params.id - 1;
	if (pokemon[id]) {
		return res.status(200).send(pokemon[id]);
	}
	return res.status(404).send("Pokemon no encontrado");
});

app.get("/pokemon/:name([A-zA-z]+)", (req, res, next) => {
	const name = req.params.name;

	const pk = pokemon.filter((p) => {
		return p.name.toUpperCase() == name.toUpperCase() ? p : null;
	});
	console.log(pk);


	if(pk.length > 0 ){
		return res.status(200).send(pk);
	}
		else{
			return res.status(404).send('Pokemon no encontrado');
		}
		
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server is running...");
});
