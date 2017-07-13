
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
			$(".contenedor").append('<div class="pokemonBox" id="box' + respuesta.results.indexOf(e) + '"><p>' + e.name + '</p><h6 id="hab' + respuesta.results.indexOf(e) + '">Habilidades</h6><h6 id="tip' + respuesta.results.indexOf(e) + '">Tipo de pokemon</h6><h6 id="peso' + respuesta.results.indexOf(e) + '">Peso del pokemon</h6></div>');
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
				$("#hab" + miId).append('<p>' + el.ability.name + '</p>');
			});
			misDatos.types.forEach(function(el){
				$("#tip" + miId).append('<p>' + el.type.name + '</p>');
			});
			
			$("#peso" + miId).append('<p>' + misDatos.weight + ' lb</p>');
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

