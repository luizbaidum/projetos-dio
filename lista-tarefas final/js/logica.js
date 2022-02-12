//Inserir linha com texto digitado no input + button
let textoDigitado = document.getElementsByTagName("input")[0];

function novaLinha() {

    //teste se há texto digitado
    if (textoDigitado.value == "") {
        alert("Por favor, digite algo para inserir na lista");

        //criando linha com nova tarefa
    } else {
        let listaItens = document.getElementById("listaItens");
        let linha = document.createElement("li");
        let btnConcluido = document.createElement("button");
        btnConcluido.className = "button1";
        btnConcluido.id = "btnconcluido";
        btnConcluido.appendChild(document.createTextNode("✔️"));
        listaItens.appendChild(linha);
        linha.appendChild(btnConcluido);
        linha.appendChild(document.createTextNode(textoDigitado.value));

        //adicionando função concluído no button criado
        btnConcluido.addEventListener("click", function finalizar(){
            linha.style.color = "#696969";
            linha.style.background = "#C0C0C0";
            btnConcluido.className = "button2";
        });
    }
}



