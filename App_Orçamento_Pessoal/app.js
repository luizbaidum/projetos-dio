//POR VEZES OS TERMOS ITENS E LANÇMENTOS POSSUEM O MESMÍSSIMO SIGNIFICADO
//
//

class Item { //cria o objeto lançado
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

/*****i retorna os índices de um array ou os atributos de um objeto****/
    validarDados() {
        for (let i in this) {
           
            if(this[i] == undefined || this[i] == '' || this[i] == null)  //this[i] para ACESSAR o atributo {
                return false;
            } return true;
        }
    }   

class Bd  {//lança cada item como sendo uma linha nova no Storage

    constructor() {
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0);
        } 
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');

        return parseInt(proximoId) + 1
    }

    gravar(d) {

        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
        //conversão de objeto literal para anotação json (json conversa com o local storage do navegador)
        //uso do LOCAL STORAGE do navegador (info não é perdida a menos que seja propositalmente apagada)
    }

    recuperarTodosRegistros() {

        let itens = Array();
        
        let id = localStorage.getItem('id');
            
            //recupera todas os itens cadastradas em localStorage
            for (let i = 1; i <= id; i++) {
                //recuperar o item
                let item = JSON.parse(localStorage.getItem(i));

                //instrução para pular índice excluído ou vazio do array. Sem isso seria exibido o item NULL.  
                if(item === null) {
                    continue
                }

                item.id = i;
                itens.push(item);
            }
        return itens;
    }

    pesquisar(item) {

        let itensFiltrados = Array();

        itensFiltrados = this.recuperarTodosRegistros();
        
        if(item.ano != '') {
            itensFiltrados = itensFiltrados.filter(d => d.ano == item.ano);
        }

        if(item.mes != '') {
            itensFiltrados = itensFiltrados.filter(d => d.mes == item.mes);
        }

        if(item.dia != '') {
            itensFiltrados = itensFiltrados.filter(d => d.dia == item.dia);
        }

        if(item.tipo != '') {
            itensFiltrados = itensFiltrados.filter(d => d.tipo == item.tipo);
        }

        if(item.descricao != '') {
            itensFiltrados = itensFiltrados.filter(d => d.descricao == item.descricao);
        }

        if(item.valor != '') {
            itensFiltrados = itensFiltrados.filter(d => d.valor == item.valor);
        }

        return itensFiltrados;
    } 

    //método p/ apagar item
    remover(id) {
        localStorage.removeItem(id);
    }

}

let bd = new Bd();

function cadastrarItem() { //função para gerar objeto literal

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let item = new Item(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    //cria modal no JS (com base no modal descrito no HTML)
    let modalInterativo = new bootstrap.Modal(document.getElementById('modalInterativo'));

    //edita modal e cores conforme sucessso ou erro na gravação do lançamento
    var tituloModal = document.getElementById('tituloModal');
    var mensagemModal = document.getElementById('mensagemModal');
    var btnModal = document.getElementById('btnModal');
    var topsite = document.getElementById('topsite');
    
    if(item.validarDados() == true) {
        tituloModal.innerHTML = 'Registro inserido';
        tituloModal.style.color = 'green';
        mensagemModal.innerHTML = 'Lançamento cadastrado com sucesso';
        btnModal.innerHTML = 'Continuar';
        btnModal.style.backgroundColor = '#34A779';
        topsite.className = 'navbar navbar-expand-lg navbar-dark mb-5 bg-success';

        bd.gravar(item);

        modalInterativo.show();

        limpar();

    } else {
        tituloModal.innerHTML = 'Erro na gravação';
        tituloModal.style.color = 'red';
        mensagemModal.innerHTML = 'Existem campos obrigatórios que não foram preenchidos';
        btnModal.innerHTML = 'Voltar';
        btnModal.style.backgroundColor = '#CC5151';
        btnModal.style.color = 'white';
        topsite.className = 'navbar navbar-expand-lg navbar-dark mb-5 bg-danger';
        
        modalInterativo.show();
    }
}

//retorna a cor do topo do site para o normal
function returnTopsite() {
    var topsite = document.getElementById('topsite');
    topsite.className = 'navbar navbar-expand-lg navbar-dark mb-5 bg-primary';
}

//FUNÇÃO PARA LIMPAR CAMPOS DE PREENCHIMENTO DE PESQUISA/RECEITAS/DESPESAS  
function limpar() {   
    ano.value = '';
    mes.value = '';
    dia.value = '';
    tipo.value = '';
    descricao.value = '';
    valor.value = ''; }

//MANUSEANDO A LISTA DE LANÇAMENTOS:
function carregaListaItens(itens = Array(), filtro = false) {

    if(itens.length == 0 && filtro == false) {
        itens = bd.recuperarTodosRegistros();
    }

//TENTATIVA DE ORDENAR LISTA - aki deu certo - falta fazer virar um botão

    itens.sort(function (x, y) {
        let a = parseInt(x.ano);
        let b = parseInt(y.mes);
       
        return a - b;
   }) 

    //seleciona corpo da tabela na página consulta.html
    let listaItens = document.getElementById('listaItens');
    listaItens.innerHTML = '';

//percorrer o array itens/lançamentos, listando cada item de forma dinâmica
    itens.forEach(function(d) {
    //criando as linhas <tr>
    let linha = listaItens.insertRow();

    //criando as coolunas <td>
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
    
    //ajustar a descrição do tipo:
    switch(d.tipo) {
        case '1': d.tipo = 'Alimentação';
            break;
        case '2': d.tipo = 'Educação';
            break;
        case '3': d.tipo = 'Lazer';
            break
        case '4': d.tipo = 'Saúde';
            break;
        case '5': d.tipo = 'Transporte';
            break;       
        case '6': d.tipo = 'Trabalho';
            break;   
        case '7': d.tipo = 'Rendimento';
            break; 
        case '8': d.tipo = 'Presente';
            break;         
    }

    linha.insertCell(1).innerHTML = d.tipo;

    linha.insertCell(2).innerHTML = d.descricao;

    linha.insertCell(3).innerHTML = `R$ ${parseFloat(d.valor)}`;

    //cria botão p/ excluir itens
    let btn = document.createElement("button");
    linha.insertCell(4).append(btn);
    btn.className = 'btn btn-danger';
    btn.id = `id_item_${d.id}`;
    btn.innerHTML = '<i class = "fas fa-times"></i>';

        btn.onclick = function() {

            let id = this.id.replace("id_item_", '');

            bd.remover(id);

            alert("O lançamento será apagado");

            window.location.reload();
        }
    })
}

//---------------JS DA PAGINA CONSULTA.html
function pesquisarItem() {
    
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let item = new Item(ano, mes, dia, tipo, descricao, valor);

    let itens = bd.pesquisar(item);
  
    carregaListaItens(itens, true);

}