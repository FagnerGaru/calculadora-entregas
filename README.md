# calculadora-entregas

# 🚚 Calculadora de Fretes - Fagner Entregas

Sistema web para cálculo rápido de fretes e solicitação de entregas via WhatsApp.

## 📋 Funcionalidades

* Seleção da região de coleta.
* Seleção do destino principal.
* Adição de múltiplos destinos extras.
* Remoção de destinos adicionados por engano.
* Cadastro de:

  * Nome
  * Telefone
  * Rua
  * Número
  * Complemento
* Geração automática da mensagem para WhatsApp.
* Cálculo automático do valor da entrega.
* Interface responsiva para celular e computador.

---

## 💰 Regra de Cálculo

O sistema utiliza uma tabela de preços por região.

Cada parada é calculada utilizando 50% do valor da região selecionada.

### Exemplo

Coleta: Brejaru (R$ 10)

Destino: Campinas (R$ 15)

Cálculo:

R$ 5,00 + R$ 7,50 = R$ 12,50

Destinos extras também utilizam 50% do valor da região correspondente.

---

## 📱 Solicitação via WhatsApp

Após preencher os dados da entrega, o sistema gera automaticamente uma mensagem estruturada e abre uma conversa no WhatsApp para envio do pedido.

Exemplo:

📦 Coleta

Nome: João

Bairro: Brejaru

📍 Destino Principal

Nome: Maria

Bairro: Campinas

💰 Total: R$ 12,50

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript
* GitHub Pages
* WhatsApp Click to Chat

---

## 🚀 Acesso ao Projeto

O projeto está publicado através do GitHub Pages.

---

## 📞 Contato

Fagner Entregas

WhatsApp: (48) 99648-3551

---

## 📌 Melhorias Futuras

* Integração com Google Maps.
* Cálculo automático por distância.
* Painel administrativo.
* Histórico de solicitações.
* Integração com API oficial do WhatsApp Business.
* Rastreamento de entregas.

---

Desenvolvido por Fagner Nunes da Silva.
