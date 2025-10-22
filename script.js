const input = {
  combustivel: document.querySelectorAll(".inputCombustivel"),
  consumo: document.querySelector("#consumo"),
  velocidade: document.querySelector("#velocidade"),
  duracao: document.querySelector("#duracao"),
  precoCombustivel: document.querySelector('#precoCombustivel')
};

const elemento = {
  formulario: document.querySelector("form"),
  paragrafo: document.querySelectorAll("p"),
  
};

const veiculo = {
  modelo: "Argo",
  consumoMedio: 8.5,
};

const viagem = {
  velocidadeMedia: "",
  duracao: "",
  percurso: "",
  consumoLitros: "",
  custoEmReais: "",
};

const combustivel = {
  tipo: "",
  precoEtanol: 3.899,
  precoGasolina: 5.999,
  preco_combustivel:""
};

input.combustivel.forEach((radio) => {
  radio.addEventListener("change", () => {
    combustivel.tipo = radio.value;
  });
});

elemento.formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  calcularConsumo();
});

function calcularConsumo() {

  //VARIAVEIS PARA CAPTURAR O VALOR DA HORA E MINUTO
  viagem.duracao = input.duracao.value;
  viagem.velocidadeMedia = input.velocidade.value;

  // CAPTURA O VALOR DO CONSUMO MÉDIO DO VEÍCULO DIGITADO PELO USUÁRIO
  veiculo.consumoMedio = input.consumo.value


  // MÉTODO (SLICE) PARA CORTAR O SÍMBOLO DE ":" DA HORA E MINUTO, SEPARANDO EM VARIAVEIS PRÓPRIAS
  let hora = +viagem.duracao.slice(0, 2);
  let minuto = Number(viagem.duracao.slice(3));

  // FÓRMULA PARA CALCULAR A DISTÂNCIA PERCORRIDA PELO USUÁRIO
    viagem.percurso = (viagem.velocidadeMedia * ((hora *60 + minuto)/60)).toFixed(1)

  //CONDIÇÃO PARA REDUZIR O VALOR DA DISTÂNCIA TOTAL CASO O USUÁRIO UTILIZE ETANOL
if(combustivel.tipo.toLowerCase() === 'etanol'){
  viagem.percurso = (viagem.percurso - ((viagem.percurso * 0,3) *100))
}



  // MÉTODO (REPLACE) PARA SUBSTITUIR "." POR "," NA EXIBIÇÃO DA DISTÂNCIA TOTAL
  // console.log(viagem.percurso.replace('.',',') + ' KM')

  // CALCULO DO CONSUMO EM LITROS GASTOS NA VIAGEM
  viagem.consumoLitros = viagem.percurso / veiculo.consumoMedio


// CALCULO PARA SABER O CUSTO EM REAIS (R$) DE ACORDO COM O CONSUMO EM LITROS
combustivel.preco_combustivel = +input.precoCombustivel.value

  viagem.custoEmReais = viagem.consumoLitros * combustivel.preco_combustivel
  // MÉTODO PARA FORMATAR O RESULTADO COMO MOEDA (R$)



elemento.paragrafo.innerText = `
O consumo em litros para uma viagem de ${viagem.percurso} km 
será de ${viagem.consumoLitros} litros 
e o valor será de ${viagem.custoEmReais.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})}`

elemento.paragrafo.forEach((item)=>{
  item.classList.toggle('color')
})

}



