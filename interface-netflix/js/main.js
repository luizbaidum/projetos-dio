$('.owl-carousel').owlCarousel({
    loop:false,
    margin:15,
    nav:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

/************** códigos da página */

function popupInfo(){
    varWindow = window.open (
    'info.html',
    'pagina',
    "width=450, height=320, top=150, left=750, scrollbars=no");
}

function popupOuvir(){
    varWindow = window.open (
    'ouvir.html',
    'pagina',
    "width=300, height=255, top=150, left=150, scrollbars=no");
}

function popupFilme(){
    varWindow = window.open (
    'filme.html',
    'pagina',
    "width=1024, height=720, top=250, left=450, scrollbars=no");
}

function clicou1() {
    document.getElementById("titulo").innerHTML = "PLEASE PLEASE ME";
    document.getElementById("descricao").innerHTML = "É o álbum de estreia gravado em estúdio e lançado pelos Beatles, em 22 de março de 1963. O álbum contém 14 canções, oito escritas por Lennon/McCartney.";
}

function clicou2() {
    document.getElementById("titulo").innerHTML = "WITH THE BEATLES";
    document.getElementById("descricao").innerHTML = "É o segundo álbum do grupo, lançado em 22 de novembro de 1963. Gravado quatro meses após o lançamento do primeiro álbum.";
}

function clicou3() {
    document.getElementById("titulo").innerHTML = "A HARD DAY'S NIGHT";
    document.getElementById("descricao").innerHTML = "É o terceiro álbum da banda britânica, lançado em 1964 na Inglaterra, acompanhando o lançamento do filme homônimo.";
}

function clicou4() {
    document.getElementById("titulo").innerHTML = "BEATLES FOR SALE";
    document.getElementById("descricao").innerHTML = "É o quarto álbum do The Beatles, lançado em dezembro de 1964. A beatlemania estava a todo vapor.";
}

function clicou5() {
    document.getElementById("titulo").innerHTML = "HELP!";
    document.getElementById("descricao").innerHTML = "É o quinto álbum do grupo The Beatles, que teve também um lançamento simultâneo de um filme com o mesmo nome. Lançado em agosto de 1965.";
}

function clicou6() {
    document.getElementById("titulo").innerHTML = "RUBBER SOUL";
    document.getElementById("descricao").innerHTML = "É o sexto álbum lançado pelo grupo de rock. Foi gravado em pouco mais de um mês e lançado em 3 de dezembro de 1965, sendo produzido por George Martin.";
}

function clicou7() {
    document.getElementById("titulo").innerHTML = "REVOLVER";
    document.getElementById("descricao").innerHTML = "É o sétimo álbum do grupo. Lançado em 5 de agosto de 1966, inicialmente no Reino Unido e em 8 de agosto nos EUA. Atingiu o primeiro lugar nas paradas de sucesso de ambos países.";
}

function clicou8() {
    document.getElementById("titulo").innerHTML = "SGT. PEPPER'S LONELY HEARTS CLUB BAND";
    document.getElementById("descricao").innerHTML = "É o oitavo álbum de estúdio da banda. Lançado a 26 de maio de 1967 no Reino Unido e a 2 de junho nos Estados Unidos. Tornou-se imediatamente um enorme sucesso comercial e crítico.";
}

function clicou9() {
    document.getElementById("titulo").innerHTML = "MAGICAL MYSTERY TOUR";
    document.getElementById("descricao").innerHTML = "O disco foi lançado no Reino Unido no dia 08/11/67 como um EP duplo de seis faixas, selo Parlophone, e, nos E.U.A., no dia 27/11/67, como um LP de onze faixas pela Capitol Records.";
}

function clicou10() {
    document.getElementById("titulo").innerHTML = "THE BEATLES";
    document.getElementById("descricao").innerHTML = "Também conhecido como 'O Álbum Branco' é o décimo álbum de estúdio dos Beatles, lançado como disco duplo em 22 de novembro de 1968.";
}

function clicou11() {
    document.getElementById("titulo").innerHTML = "YELLOW SUBMARINE";
    document.getElementById("descricao").innerHTML = "Yellow Submarine é o décimo primeiro álbum de estúdio da banda. Lançado em 13 de Janeiro de 1969 nos Estados Unidos e em 17 de Janeiro de 1969 no Reino Unido.";
}

function clicou12() {
    document.getElementById("titulo").innerHTML = "ABBEY ROAD";
    document.getElementById("descricao").innerHTML = "Abbey Road foi o 12º álbum de estúdio da banda. Foi lançado em 26 de setembro de 1969 e leva o mesmo nome da rua de Londres onde situa-se o estúdio Abbey Road.";
}

function clicou13() {
    document.getElementById("titulo").innerHTML = "LET IT BE";
    document.getElementById("descricao").innerHTML = "Let It Be é o décimo terceiro e último álbum de estúdio lançado. Gravado entre janeiro de 1969 e março/abril de 1970, o álbum foi somente lançado em 8 de maio de 1970.";
}
