
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
  o.textContent=`${b} - R$ ${taxas[b]}`;
  sel.appendChild(o);
 });
}

const principal=document.getElementById('principal');
fill(principal);

function addExtra(){
 const div=document.createElement('div');
 div.className='extra-box';
 div.innerHTML='<select class="extra"></select>';
 document.getElementById('extras').appendChild(div);
 fill(div.querySelector('select'));
 calcular();
}

function calcular(){
 let total=taxas[principal.value]||0;
 document.querySelectorAll('.extra').forEach(s=>{
  total += (taxas[s.value]||0)/2;
 });
 document.getElementById('total').innerText='Total: R$ '+total.toFixed(2);
 return total;
}

document.addEventListener('change',calcular);
window.onload=calcular;

function enviar(){
 let total=calcular();
 let msg=`Solicitação de Entrega\n\nColeta: ${origem.value}\nDestino Principal: ${principal.value}`;

 document.querySelectorAll('.extra').forEach(s=>{
   msg += `\nDestino Extra: ${s.value}`;
 });

 msg += `\n\nTotal: R$ ${total.toFixed(2)}`;

 window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`,'_blank');
}
