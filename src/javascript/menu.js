// Catch
const menu = document.getElementById("menu");
const items = document.getElementById("menu_items");

menu.addEventListener("click", function(e){


    if(items.style.height == '0vh' || items.style.height === ''){
        requestAnimationFrame(() =>{
            animarMenu()
        })
    } else {
        requestAnimationFrame(() => {
            menu.style.transition = "transform 2s ease"
            items.style.height = '0vh'
        })
    }
})

function animarMenu(){
    const menu = document.getElementById("menu_items")

    menu.style.transition = "height 0.3s ease";
    menu.style.height = '50vh'
}

window.addEventListener("resize", function() {
    const items = document.getElementById("menu_items");
    const menu = document.getElementById("menu");
    if (window.innerWidth >= 774) { 
        items.style.height = 'auto';
    } else {
        items.style.height = '0vh';
    }
});
