// Capturar o botão Menu
menu = document.querySelector("header #men button");
menu_principal = document.querySelector("#MenuPrincipal")


// Verificar tamanho da tela
function verificarTamanhoTela(time) {
    if (window.innerWidth <= 768){
        alert("Mobile")
    } else {
        alert("PC")
    }
}


// Adicionar a função no Menu de desligar e ligar
function abrirMenu() {
        if (menu_principal.style.display === 'none' || menu_principal.style.display === ''){
            menu_principal.style.display = 'flex';
        } else {
            menu_principal.style.dislay = ''
            menu_principal.style.display = 'none';
        }     
    }

// Chamar a função menu ao clicar
menu.addEventListener('click', abrirMenu)





