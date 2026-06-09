
const whatsapp='5548996483551';

const cidades = {

  "Palhoça": {
    "Brejaru": 10,
    "Bela Vista": 10,
    "Passa Vinte": 10,
    "Pagani": 10,
    "Pedra Branca": 10,
    "Centro de Palhoça": 10,
    "Ponte do Imaruim": 10,
    "Jardim Eldorado": 10,
    "Aririú": 10,
    "Alto Aririú": 15,
    "Barra do Aririú": 15,
    "Madri": 10,
    "Caminho Novo": 10,
    "São sebastião": 10
  },

  "São José": {
    "Potecas": 15,
    "Forquilhinhas": 15,
    "Forquilhinha": 15,
    "Areias": 18,
    "Serraria": 18,
    "Ipiranga": 15,
    "Roçado": 15,
    "Barreiros": 15,
    "Campinas": 15,
    "Kobrasol": 15,
    "Nossa Senhora do Rosário": 15,
    "Praia Comprida": 15,
    "Centro de São José": 15
  },

  "Florianópolis": {
    "Estreito": 20,
    "Capoeiras": 20,
    "Jardim Atlântico": 20,
    "Coqueiros": 20,
    "Abraão": 20,
    "Balneário": 20,
    "Centro de Florianópolis": 30,
    "Agronômica": 30,
    "Trindade": 30,
    "Pantanal": 30,
    "Itacorubi": 30,
    "Santa Mônica": 30,
    "Córrego Grande": 30,
    "João Paulo": 30,
    "Saco dos Limões": 30,
    "Tapera": 30,
    "Ribeirão da Ilha": 35,
    "Campeche": 30,
    "Cachoeira do Bom Jesus": 50,
    "Jurerê Internacional": 50,
    "Canasvieiras": 50,
    "Ingleses": 55,
    "Santinho": 60,
    "Rio Vermelho": 55
  },

  "Biguaçu": {
    "Biguaçu Centro": 20,
    "Bom Viver": 20,
    "Prado": 20,
    "Universitário": 20,
    "Rio Caveiras": 20
  },

  "Santo Amaro da Imperatriz": {
    "Centro": 20,
    "Sul do Rio": 15
  }

};

const regioes = {

  PALHOCA_CENTRO: [
    "Brejaru",
    "Passa Vinte",
    "Pedra Branca",
    "Ponte do Imaruim",
    "Jardim Eldorado"
  ],

  ARIRIU: [
    "Aririú",
    "Centro de Palhoça",
    "Alto Aririú",
    "Barra do Aririú",
    "Madri",
    "Pagani",
    "Caminho Novo",
    "Bela Vista"
  ]

};

function getRegiao(bairro){

  for(const regiao in regioes){

    if(regioes[regiao].includes(bairro)){
      return regiao;
    }

  }

  return null;
}

function getValorBairro(nomeBairro){

    for(const cidade in cidades){

        if(cidades[cidade][nomeBairro] !== undefined){
            return cidades[cidade][nomeBairro];
        }

    }

    return 0;
}

function carregarCidades(select){

    select.innerHTML = '';

    Object.keys(cidades).forEach(cidade => {

        const option = document.createElement('option');

        option.value = cidade;
        option.textContent = cidade;

        select.appendChild(option);

    });

}

function carregarBairros(cidade, select){

    select.innerHTML = '';

    Object.keys(cidades[cidade]).sort().forEach(bairro => {

        const option = document.createElement('option');

        option.value = bairro;

        option.textContent =
        `${bairro} - R$ ${(cidades[cidade][bairro]/2).toFixed(2)}`;

        select.appendChild(option);

    });

}


function mostrarFormulario(){

    document.getElementById('dadosColeta').style.display = 'block';

    document.getElementById('dadosDestino').style.display = 'block';

    document.getElementById('dadosEntrega').style.display = 'block';

    document.getElementById('continuarBtn').style.display = 'none';

    document.querySelectorAll('.dadosExtra').forEach(div => {
        div.style.display = 'block';
    });

}


function addExtra(){

 const div = document.createElement('div');

 div.className = 'extra-box';

 div.innerHTML = `
<hr>

<h4>📍 Destino Extra</h4>

<button
type="button"
onclick="this.parentElement.remove(); calcular();">

🗑 Remover

</button>

<label>Cidade</label>
<select class="extraCidade"></select>

<label>Bairro</label>
<select class="extra"></select>

<div class="dadosExtra" style="display:none;">

<input
class="extraNome"
placeholder="Nome (opcional)">

<input
class="extraTelefone"
placeholder="Telefone (opcional)">

<input
class="extraRua"
placeholder="Rua">

<input
class="extraNumero"
placeholder="Número">

<input
class="extraComplemento"
placeholder="Complemento">

</div>
`;

 document.getElementById('extras')
 .appendChild(div);

 const cidadeExtra =
 div.querySelector('.extraCidade');

 const bairroExtra =
 div.querySelector('.extra');

 carregarCidades(cidadeExtra);

 carregarBairros(
    cidadeExtra.value,
    bairroExtra
 );

 cidadeExtra.addEventListener(
 'change',
 () => {

    carregarBairros(
       cidadeExtra.value,
       bairroExtra
    );

    calcular();
 });

 calcular();
}

function calcular(){

    let total = 0;

    const coleta =
    document.getElementById('bairroColeta')?.value;

    const destino =
    principal.value;

    const regiaoColeta =
    getRegiao(coleta);

    const regiaoDestino =
    getRegiao(destino);

    // Mesma região de Palhoça
    if(
        regiaoColeta &&
        regiaoDestino &&
        regiaoColeta === regiaoDestino
    ){

        total = 10;

    }else{

        total += getValorBairro(coleta) / 2;

        total += getValorBairro(destino) / 2;

    }

    // Destinos extras
    document.querySelectorAll('.extra').forEach(select => {

        const valor =
        getValorBairro(select.value);

        total += valor / 2;

    });

    document.getElementById('valorTotal').textContent =
total.toLocaleString('pt-BR',{
    minimumFractionDigits:2,
    maximumFractionDigits:2
});

    return total;
}

document.addEventListener('change',calcular);
window.onload=calcular;

function enviar(){

const nome =
document.getElementById('nomeColeta')?.value || '-';

const telefone =
document.getElementById('telefoneColeta')?.value || '-';

const rua =
document.getElementById('ruaColeta')?.value || '-';

const numero =
document.getElementById('numeroColeta')?.value || '-';

const complemento =
document.getElementById('complementoColeta')?.value || '-';

const bairro =
document.getElementById('bairroColeta')?.value || '-';



const nomeDestino =
document.getElementById('nomeDestino')?.value || '-';

const telefoneDestino =
document.getElementById('telefoneDestino')?.value || '-';

const ruaDestino =
document.getElementById('ruaDestino')?.value || '-';

const numeroDestino =
document.getElementById('numeroDestino')?.value || '-';

const complementoDestino =
document.getElementById('complementoDestino')?.value || '-';

const cidade =
document.getElementById('cidadeColeta')?.value || '-';

const cidadeDestino =
document.getElementById('cidadeDestino')?.value || '-';

const dataEntrega =
document.getElementById('dataEntrega')?.value || '-';

const horaEntrega =
document.getElementById('horaEntrega')?.value || '-';

 let total = calcular();


 let msg =
`🚚 SOLICITAÇÃO DE ENTREGA

📦 COLETA

Nome: ${nome}
Telefone: ${telefone}
Rua: ${rua}
Número: ${numero}
Complemento: ${complemento}
Cidade: ${cidade}
Bairro: ${bairro}

📅 AGENDAMENTO

Data: ${dataEntrega}
Horário: ${horaEntrega}

📍 DESTINO PRINCIPAL

Nome: ${nomeDestino}
Telefone: ${telefoneDestino}
Rua: ${ruaDestino}
Número: ${numeroDestino}
Complemento: ${complementoDestino}
Cidade: ${cidadeDestino}
Bairro: ${principal.value}
`;

document.querySelectorAll('.dadosExtra').forEach((box,index)=>{

 const nome =
 box.querySelector('.extraNome')?.value || '-';

 const telefone =
 box.querySelector('.extraTelefone')?.value || '-';

 const rua =
 box.querySelector('.extraRua')?.value || '-';

 const numero =
 box.querySelector('.extraNumero')?.value || '-';

 const complemento =
 box.querySelector('.extraComplemento')?.value || '-';

 const cidade =
 document.querySelectorAll('.extraCidade')[index]?.value || '-';

 const bairro =
 document.querySelectorAll('.extra')[index]?.value || '-';

 msg += `

📍 DESTINO EXTRA #${index + 1}

Nome: ${nome}
Telefone: ${telefone}
Rua: ${rua}
Número: ${numero}
Complemento: ${complemento}
Cidade: ${cidade}
Bairro: ${bairro}
`;
});

msg += `

💰 Total: R$ ${total.toFixed(2)}
`;
window.open(
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`,
  '_blank'
);
}

const cidadeColeta =
document.getElementById('cidadeColeta');

const bairroColeta =
document.getElementById('bairroColeta');

const cidadeDestino =
document.getElementById('cidadeDestino');

const principal =
document.getElementById('principal');

carregarCidades(cidadeColeta);
carregarCidades(cidadeDestino);

carregarBairros(cidadeColeta.value, bairroColeta);
carregarBairros(cidadeDestino.value, principal);

cidadeColeta.addEventListener('change', () => {

    carregarBairros(
        cidadeColeta.value,
        bairroColeta
    );

    calcular();
});

cidadeDestino.addEventListener('change', () => {

    carregarBairros(
        cidadeDestino.value,
        principal
    );

    calcular();
});

window.onload = () => {

    calcular();

    const campoData =
    document.getElementById('dataEntrega');

    if(campoData){

        const hoje = new Date();

        campoData.min =
        hoje.toISOString().split('T')[0];

        const maxDate =
        new Date();

        maxDate.setMonth(
            maxDate.getMonth() + 1
        );

        campoData.max =
        maxDate.toISOString().split('T')[0];

    }

};