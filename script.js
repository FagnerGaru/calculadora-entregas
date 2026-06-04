
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
    "Centro de Florianópolis": 25,
    "Agronômica": 25,
    "Trindade": 25,
    "Pantanal": 25,
    "Itacorubi": 25,
    "Santa Mônica": 25,
    "Córrego Grande": 25,
    "João Paulo": 25,
    "Saco dos Limões": 25,
    "Tapera": 30,
    "Ribeirão da Ilha": 30,
    "Campeche": 30,
    "Cachoeira do Bom Jesus": 30,
    "Jurerê Internacional": 30,
    "Canasvieiras": 30,
    "Ingleses": 30,
    "Santinho": 30,
    "Rio Vermelho": 30
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


function addExtra(){

 const div = document.createElement('div');

 div.className = 'extra-box';

 div.innerHTML = `
<hr>

<h4>📍 Destino Extra</h4>

<button
type="button"
onclick="this.parentElement.remove(); calcular();">
🗑 Remover Destino
</button>

<input type="text"
class="extraNome"
placeholder="Nome (opcional)">

<input type="tel"
class="extraTelefone"
placeholder="Telefone (opcional)">

<input type="text"
class="extraRua"
placeholder="Rua (opcional)">

<input type="text"
class="extraNumero"
placeholder="Número (opcional)">

<input type="text"
class="extraComplemento"
placeholder="Complemento (opcional)">

<label>Cidade</label>
<select class="extraCidade"></select>

<label>Bairro</label>
<select class="extra"></select>
`;

 document.getElementById('extras').appendChild(div);

 const cidadeExtra =
 div.querySelector('.extraCidade');

 const bairroExtra =
 div.querySelector('.extra');

 carregarCidades(cidadeExtra);

 carregarBairros(
   cidadeExtra.value,
   bairroExtra
 );

 cidadeExtra.addEventListener('change', () => {

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

    document.getElementById('total').innerText =
    'Total: R$ ' +
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

📍 DESTINO PRINCIPAL

Nome: ${nomeDestino}
Telefone: ${telefoneDestino}
Rua: ${ruaDestino}
Número: ${numeroDestino}
Complemento: ${complementoDestino}
Cidade: ${cidadeDestino}
Bairro: ${principal.value}
`;

document.querySelectorAll('.extra-box').forEach(box=>{

 const nome = box.querySelector('.extraNome').value;
 const telefone = box.querySelector('.extraTelefone').value;
 const rua = box.querySelector('.extraRua').value;
 const numero = box.querySelector('.extraNumero').value;
 const complemento = box.querySelector('.extraComplemento').value;
 const cidade =box.querySelector('.extraCidade')?.value || '-';
 const bairro =box.querySelector('.extra')?.value || '-';

msg += `

📍 DESTINO EXTRA

Nome: ${nome || '-'}
Telefone: ${telefone || '-'}
Rua: ${rua || '-'}
Número: ${numero || '-'}
Complemento: ${complemento || '-'}

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

window.onload = calcular;