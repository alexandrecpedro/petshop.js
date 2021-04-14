// Chamando os módulos
const moment = require('moment');
const fs = require('fs');

// Nome do arquivo a ser chamado
const nomeArquivo = 'pets.json'; //coloco o caminho do arquivo

const nomePetshop = "*** PETSHOP DH ***";

// Lendo o conteúdo do arquivo JSON
let petsJSON = fs.readFileSync(nomeArquivo)
// Converte para o formato JavaScript
let arquivoPets = JSON.parse(petsJSON);
// console.log(arquivoPets.pets);

const atualizarJson = () => {
  // Converte o objeto literal para JSON
  let listaJson = JSON.stringify(arquivoPets, null, 2) // null para não minificar, 2 para número de linhas
  // fs.writeFileSync (caminho do arquivo, conteúdo novo, formato)
  fs.writeFileSync(nomeArquivo, listaJson, 'utf-8')
}

// Declarando a função listarPets que imprime a lista de pets sem imprimir a sintaxe de código
const listarPets = (listaDePets) => {
  let vacinado // Declarando uma variável para salvar o status de vacinado
  for (let i = 0; i < listaDePets.length; i++) {
    // Checando se o pet está vacinado
    // if (listaDePets[i].vacinado) { 
    //   // Pet está vacinado
    //   vacinado = "vacinado"
    // } else { 
    //   // Pet não está vacinado
    //   vacinado = "não vacinado"
    // }
    // Retornando os dados
    console.log(`${listaDePets[i].nome}, ${listaDePets[i].idade} anos, ${listaDePets[i].tipo}, ${listaDePets[i].raca}, ${(listaDePets[i].vacinado)? "vacinado": "não vacinado"}, ${listaDePets[i].genero}`)
    for (let index = 0; index < listaDePets[i].servicos.length; index++) {
      console.log(`${listaDePets[i].servicos[index].data} - ${listaDePets[i].servicos[index].nome}`);
    }
  }
}
// listarPets(arquivoPets.pets)

// Declarando função - arrow function
const adicionarPet = (infoPet) => {
  arquivoPets.pets.push(infoPet);
  atualizarJson();
  console.log(`${infoPet.nome} está cadastrado no nosso sistema!`);
}
// Executa função
// adicionarPet({
//     nome: 'Rex',
//     idade: 1,
//     raca: 'Maltes',
//     tipo: 'cachorro',
//     vacinado: false,
//     genero: 'M',
//     servicos: []
// });

const vacinarPet = (pet) => {
  if (!pet.vacinado) {
    pet.vacinado = true
    atualizarJson();
    console.log(`${pet.nome} foi vacinado com sucesso`);
  } else {
    console.log(`Ops, ${pet.nome} já está vacinado!`);
  }
  atualizarJson();
}
// vacinarPet(arquivoPets.pets[0])

const campanhaVacina = (listaPets) => {
  let totalVacinados = 0;
  for (let i = 0; i < listaPets.length; i++) {
    if (!listaPets[i].vacinado) {
      listaPets[i].vacinado = true
      totalVacinados++
    }
  }
  atualizarJson();
  console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
}
// campanhaVacina(arquivoPets.pets)

const darBanhoPet = (pet) => {
  pet.servicos.push({
    nome: 'banho',
    data: moment().format('DD-MM-YYYY')
  })
  atualizarJson();
  console.log(`${pet.nome} acabou de tomar banho!`);
}
// darBanhoPet(arquivoPets.pets[0]);

const tosarPet = (pet) => {
  pet.servicos.push({
    nome: 'tosa',
    data: moment().format('DD-MM-YYYY')
  })
  atualizarJson();
  console.log(`${pet.nome} está com cabelinho na régua!`);
}
// tosarPet(arquivoPets.pets[1])

const apararUnhasPet = (pet) => {
  pet.servicos.push({
    nome: 'corte de unhas',
    data: moment().format('DD-MM-YYYY')
  })
  atualizarJson();
  console.log(`${pet.nome} está de unhas aparadas!`);
}
// apararUnhasPet(arquivoPets.pets[4])

const buscarPet = (nomePet) => {
  // Função FIND retorna o primeiro elemento onde está o parâmetro nomePet
  const petEncontrado = arquivoPets.pets.find((pet) => {
    return pet.nome == nomePet
  })
  // Pergunta se tem algum valor válido (objeto, string, array) para o petEncontrado
  // truthy e falsy = elementos verdadeiros e falsos, respectivamente, pro JavaScript
  console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com o nome ${nomePet}`);
}
// buscarPet('Costelinha')

const atenderCliente = (pet, servico) => {
  console.log(`Olá, ${pet.nome}!`);
  servico(pet)
  console.log(`Até mais!`);
}
// atenderCliente(arquivoPets.pets[0], darBanhoPet)
// console.log(`-------------`);
// atenderCliente(arquivoPets.pets[3], tosarPet)

const addInfoCastrado = () => {
  arquivoPets.pets = listaPets.map((pet) => {
    pet.castrado = true;
    return pet
  })
  atualizarJson()
}
// addInfoCastrado()
// listarPets(arquivoPets.pets)

const listarVacinados = () => {
  console.log('** VACINADO **');
  let vacinados = arquivoPets.pets.filter(pet => pet.vacinado);
  console.log(vacinados);
  console.log(`Temos ${vacinados.length} pets vacinados!`);
}
// listarVacinados()