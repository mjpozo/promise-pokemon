
$(document).ready(function(){

	$.ajax({
		url: 'http://pokeapi.co/api/v2/pokemon',
		type: 'GET',
		dataType: 'json',
		data: {'limit': '16'},
	})
	.done(function(respuesta) {
		respuesta.results.forEach(function(e){
			console.log(e.name);
			$(".contenedor").append('<div class="pokemonBox" id="box' + respuesta.results.indexOf(e) + '"><p class="title">Nombre</p><p>' + e.name + '</p><p class="title" id="hab' + respuesta.results.indexOf(e) + '">Habilidades</p><p class="title" id="tip' + respuesta.results.indexOf(e) + '">Tipo de pokemon</p><p class="title" id="peso' + respuesta.results.indexOf(e) + '">Peso del pokemon</p><div class="title img-poke" id="img' + respuesta.results.indexOf(e) + '"></div></div>');
			llamarHabilidades(e.url);
		})
		
	})
	.done(function(){
		console.log("Este es el mensaje de despues de la llamada ajax");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

	var llamarHabilidades = function(datos){

		$.ajax({
			url: datos,
			type: 'GET',
			dataType: 'json',
			data: {'limit': '16'}
		})
		.done(function(misDatos) {
			console.log("Este es el mensaje de despues de la segunda llamada ajax");
			console.log(misDatos.id);
			//le damos una id al pokemon
			var miId = misDatos.id - 1;

			//para rescatar las habilidades
			misDatos.abilities.forEach(function(el){
				$("#hab" + miId).append('<p class="info">' + el.ability.name + '</p>');
			});

			//para rescatar el tipo de pokemon
			misDatos.types.forEach(function(el){
				$("#tip" + miId).append('<p class="info">' + el.type.name + '</p>');
			});

			//para rescatar el peso
			$("#peso" + miId).append('<p class="info">' + misDatos.weight + ' lb</p>');

			//para rescatar las fotos
			$("#img" + miId).append('<img src="' + misDatos.sprites.front_default + '"></img>');
		})
		.fail(function() {
			console.log("segundo error");
		})
		.always(function() {
			console.log("complete2");
		});
	}
})
console.log("llamada del ajax");

