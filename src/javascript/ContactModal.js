// Catch the form and the modal
const form = document.getElementById("form");
const dialog = document.getElementById("contact-modal");

// Buttons on the modal
const send_letter = document.getElementsByClassName("send_letter")[0];  
const back_letter = document.getElementsByClassName("back_letter")[0];

// Add an event listener to the form 
form.addEventListener("submit", (e) => {
  e.preventDefault()
  
  // catching the form data
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Place in Modal

  let name_modal = document.getElementById("modal_name");
  let email_modal = document.getElementById("modal_email");
  let message_modal = document.getElementById("modal_message");

  name_modal.innerHTML = name;
  email_modal.innerHTML = email;
  message_modal.innerHTML = message;



  dialog.showModal();

    // Close Modal
  back_letter.addEventListener("click", () => {
    dialog.close();
  })

  // Send Modal
  send_letter.addEventListener("click", () => {
    form.submit();
    dialog.close();
  })
})







// window.addEventListener("DOMContentLoaded", () => {
//   dialog.showModal(); 
// });