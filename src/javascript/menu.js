// Catch
const menu = document.getElementById("menu");

menu.addEventListener("click", function(e){
    const items = document.getElementById("menu_items");

    const currentDisplay = window.getComputedStyle(items).display;
    const currentHeight = window.getComputedStyle(items).height

    items.classList.toggle("show")
   
    
    

})