var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

/*
	matriz bidimensional 3X3	

		a1|a2|a3
		--------			
		b1|b2|b3
		--------			
		c1|c2|c3			
*/

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;


function start()
{
	$('#btn_iniciar_jogo').click( 
		function()
		{
			//validar apelidos dos jogadores
			if($('#entrada_apelido_jogador_1').val() == "" || $('#entrada_apelido_jogador_1').val() == null)
			{
				alert("nome do jagador 1 não foi inserido!");
				return false;
			}

			if($('#entrada_apelido_jogador_2').val() == "" || $('#entrada_apelido_jogador_2').val() == null)
			{
				alert("nome do jagador 2 não foi inserido!");
				return false;
			}

			//exibir apelidos 
			$('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
			$('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

			//controlador de vizualização das divs
			$('#pagina_inicial').hide();
			$('#palco_jogo').show();
		}
	);

	//essa função recebe o id de cada jogada pelo click;
	$('.jogada').click( 
		function()
		{
			var id_campo_clicado = this.id;
			//removendo a alteração de clicar novamente 
			$('#'+id_campo_clicado).off();
			jogada(id_campo_clicado);
		}
	);

	//identifica o jagador 1 e 2;
	function jogada(id)
	{
		var icone = '';
		var ponto = 0;


		if((rodada % 2) == 1)
		{
			icone = 'url("imagens/marcacao_1.png")';
			ponto = -1;
		}
		else
		{
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}	

		rodada++;

		$('#'+id).css('background-image', icone);

		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifiva_combinacao();
	}

	function verifiva_combinacao()
	{
		//verificação na horizontal 
		var pontos = 0;

		for(var i=1; i<=3; i++)
		{
			pontos = pontos + matriz_jogo['a'][i];
		}
		
		ganhador(pontos);

		pontos = 0;

		for(var i=1; i<=3; i++)
		{
			pontos = pontos + matriz_jogo['b'][i];
		}

		ganhador(pontos);

		pontos = 0;

		for(var i=1; i<=3; i++)
		{
			pontos = pontos + matriz_jogo['c'][i];
		}

		ganhador(pontos);

		//verifica na vertical 

		for(var j=1; j<=3; j++)
		{ 
			pontos = 0;

			pontos += matriz_jogo['a'][j];
			pontos += matriz_jogo['b'][j];
			pontos += matriz_jogo['c'][j];

			ganhador(pontos);
		}

		//diagonal principal

		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		//diagonal secundária

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);


	}

	function ganhador(pontos)
	{	
		if(pontos == -3)
		{
			var jagador_1 = $('#entrada_apelido_jogador_1').val();
			alert(jagador_1 +" é o vencedor");
			$('.jogada').off();
		}	
		
		else if(pontos == 3)
		{
			var jagador_2 = $('#entrada_apelido_jogador_2').val();
			alert(jagador_2 +" é o vencedor");
			$('.jogada').off();
		}
	}

}

$(document).ready( function()
{
	start();
});