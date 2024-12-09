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

// Animar Menu
function animarMenu() {
    menu_principal.style.transition = "transform 0.3s ease"
    menu_principal.style.transform = "translateY(0px)"
}


// Adicionar a função no Menu de desligar e ligar
function abrirMenu() {
        if (menu_principal.style.display === 'none' || menu_principal.style.display === ''){
            menu_principal.style.display = 'flex';
            requestAnimationFrame(() => {
                animarMenu()
            })
        } else {
            // Animar o menu
            menu_principal.style.transition = "transform 0.3s ease"
            menu_principal.style.transform = "translateY(-50vh)"
            setTimeout(() => {
                menu_principal.style.display = ''
                menu_principal.style.display = 'none';
            }, 300)
            
        }     
    }

// Chamar a função menu ao clicar
menu.addEventListener('click', abrirMenu)





