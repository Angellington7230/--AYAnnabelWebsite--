const modal = document.getElementById('contact-modal');

const btn_modal = document.getElementById('btn-modal');

btn_modal.addEventListener('click', () => {
  modal.showModal();
});


 // Carregar com o DOMContentLoader 
 /*
 Cada ponot do fomudmular, form, modal


 aí quando abrir o form, vai por os valores em form

 vai atualizar o conteudo do modal logo após enviar


 depois quando clicar fora do modal, vai fechar
 
 */


 document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form");
    const modal = document.getElementById("modal");

    const modal_name = document.getElementById("modal_name");
    const modal_email = document.getElementById("modal_email");
    const modal_message = document.getElementById("modal_message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        modal_name.textContent = form.name.value;
        modal_email.textContent = form.email.value;
        modal_message.textContent = form.message.value;

        modal.showModal();
    })
 });