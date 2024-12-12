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
})bran        items.style.height = '0vh';
    }
});
