
const whatsapp='5548996483551';

const taxas={
"Brejaru":10,"Bela Vista":10,"Passa Vinte":10,"Pagani":10,"Pedra Branca":10,
"Centro de Palhoça":10,"Ponte do Imaruim":10,"Jardim Eldorado":10,"Aririú":10,
"Alto Aririú":10,"Barra do Aririú":12,"Madri":12,"Caminho Novo":12,
"Potecas":15,"Forquilhinhas":15,"Forquilhinha":15,"Areias":15,"Serraria":15,
"Ipiranga":15,"Roçado":15,"Barreiros":15,"Campinas":15,"Kobrasol":15,
"Nossa Senhora do Rosário":15,"Praia Comprida":15,"Centro de São José":15,
"Estreito":20,"Capoeiras":20,"Jardim Atlântico":20,"Coqueiros":20,"Abraão":20,
"Balneário":20,"Centro de Florianópolis":25,"Agronômica":25,"Trindade":25,
"Pantanal":25,"Itacorubi":25,"Santa Mônica":25,"Córrego Grande":25,
"João Paulo":25,"Saco dos Limões":25,"Biguaçu Centro":20,"Bom Viver":20,
"Prado":20,"Universitário":20,"Rio Caveiras":20};

function fill(sel){
 sel.innerHTML='';
 Object.keys(taxas).sort().forEach(b=>{
  let o=document.createElement('option');
  o.value=b;
  o.textContent =
`${b} - R$ ${(taxas[b]/2).toFixed(2)}`;
  sel.appendChild(o);
 });
}

const principal=document.getElementById('principal');
fill(principal);

const bairroColeta =
document.getElementById('bairroColeta');

fill(bairroColeta);

function addExtra(){

 const div = document.createElement('div');
 div.className = 'extra-box';

 div.innerHTML = `
 <hr>

 <h4>📍 Destino Extra</h4>

 <button
   type="button"
   onclick="this.parentElement.remove(); calcular();"
 >
   🗑 Remover Destino
 </button>

 <input
   type="text"
   class="extraNome"
   placeholder="Nome (opcional)"
 >

 <input
   type="tel"
   class="extraTelefone"
   placeholder="Telefone (opcional)"
 >

 <input
   type="text"
   class="extraRua"
   placeholder="Rua (opcional)"
 >

 <input
   type="text"
   class="extraNumero"
   placeholder="Número (opcional)"
 >

 <input
   type="text"
   class="extraComplemento"
   placeholder="Complemento (opcional)"
 >

 <select class="extra"></select>
 `;

 const extras = document.getElementById('extras');

 extras.appendChild(div);

 fill(div.querySelector('.extra'));

 calcular();
}

function calcular() {

 let total = 0;

 const coleta =
 document.getElementById('bairroColeta')?.value;

 if (taxas[coleta]) {
   total += taxas[coleta] / 2;
 }

 if (taxas[principal.value]) {
   total += taxas[principal.value] / 2;
 }

 document.querySelectorAll('.extra').forEach(select => {

   if (taxas[select.value]) {
      total += taxas[select.value] / 2;
   }

 });

 document.getElementById('total').innerText =
   'Total: R$ ' +
   total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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

 let total = calcular();

 let msg =
`🚚 SOLICITAÇÃO DE ENTREGA

📦 COLETA

Nome: ${nome}
Telefone: ${telefone}
Rua: ${rua}
Número: ${numero}
Complemento: ${complemento}
Bairro: ${bairro}

📍 DESTINO PRINCIPAL

Nome: ${nomeDestino}
Telefone: ${telefoneDestino}
Rua: ${ruaDestino}
Número: ${numeroDestino}
Complemento: ${complementoDestino}
Bairro: ${principal.value}
`;

document.querySelectorAll('.extra-box').forEach(box=>{

 const nome = box.querySelector('.extraNome').value;
 const telefone = box.querySelector('.extraTelefone').value;
 const rua = box.querySelector('.extraRua').value;
 const numero = box.querySelector('.extraNumero').value;
 const complemento = box.querySelector('.extraComplemento').value;
 const bairro = box.querySelector('.extra').value;

 msg += `

📍 DESTINO EXTRA

Nome: ${nome || '-'}
Telefone: ${telefone || '-'}
Rua: ${rua || '-'}
Número: ${numero || '-'}
Complemento: ${complemento || '-'}
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