class Despesa { //cria o objeto despesa lançado
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

class Bd  {//lança cada despesa como sendo uma linha nova no Storage

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

        let despesas = Array();
        
        let id = localStorage.getItem('id');
            
            //recupera todas as despesas cadastradas em localStorage
            for (let i = 1; i <= id; i++) {
                //recuperar a despesa
                let despesa = JSON.parse(localStorage.getItem(i));

                //instrução para pular índice excluído ou vazio do array. Sem isso seria exibido o item NULL.  
                if(despesa === null) {
                    continue
                }

                despesa.id = i;
                despesas.push(despesa);
            }
            return despesas;
    }
    pesquisar(despesa) {

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();
        
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }

        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }

        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }

        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }

        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }

        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        return despesasFiltradas;
    } 

    //método p/ apagar despesa
    remover(id) {
        localStorage.removeItem(id);
    }

}

let bd = new Bd();

function cadastrarDespesa() { //função para gerar objeto literal

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    //cria modal no JS (com base no modal descrito no HTML)
    let modalInterativo = new bootstrap.Modal(document.getElementById('modalInterativo'));

    //edita modal e cores conforme sucessso ou erro na gravação da despesa
    var tituloModal = document.getElementById('tituloModal');
    var mensagemModal = document.getElementById('mensagemModal');
    var btnModal = document.getElementById('btnModal');
    var topsite = document.getElementById('topsite');
    
    if(despesa.validarDados() == true) {
        tituloModal.innerHTML = 'Registro inserido';
        tituloModal.style.color = 'green';
        mensagemModal.innerHTML = 'Despesa cadastrada com sucesso';
        btnModal.innerHTML = 'Continuar';
        btnModal.style.backgroundColor = '#34A779';
        topsite.className = 'navbar navbar-expand-lg navbar-dark mb-5 bg-success';

        bd.gravar(despesa);

        modalInterativo.show();

        //limpa campos despesas a cadastrar após lançamento com sucesso       
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';

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

//MANUSEANDO A LISTA DE DESPESAS:
function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }

    //seleciona corpo da tabela na página consulta.html
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

//percorrer o array despesas, listando cada despesa de forma dinâmica
despesas.forEach(function(d) {
    //criando as linhas <tr>
    let linha = listaDespesas.insertRow();

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
    }
    linha.insertCell(1).innerHTML = d.tipo;

    linha.insertCell(2).innerHTML = d.descricao;

    linha.insertCell(3).innerHTML = d.valor;

    //cria botão p/ excluir despesas
    let btn = document.createElement("button");
    linha.insertCell(4).append(btn);
    btn.className = 'btn btn-danger';
    btn.id = `id_despesa_${d.id}`;
    btn.innerHTML = '<i class = "fas fa-times"></i>';

        btn.onclick = function() {

            let id = this.id.replace("id_despesa_", '');

            bd.remover(id);

            alert("A despesas será apagada");

            window.location.reload();
        }
    })
}

//---------------JS DA PAGINA CONSULTA.html
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    let despesas = bd.pesquisar(despesa);

    carregaListaDespesas(despesas, true);
}