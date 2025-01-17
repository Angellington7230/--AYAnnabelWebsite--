// Public key email
emailjs.init("bOfHdKpZptqmRrs5o")

function sendEmail(){
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Parameters for TemplateJS
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
  };
  emailjs.send("service_ykl66y3", "template_04t71zf", templateParams)
  .then((response) => {
    console.log("Success: ", response);
    alert("Message Sent!");
    document.getElementById("form").reset();
  }, (error) => {
    console.log("Failed: ", error);
    alert("Message Failed to Send!");
  })
}



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
})

  // Send Modal
send_letter.addEventListener("click", () => {
  sendEmail();
  dialog.close();
})

// Close Modal
back_letter.addEventListener("click", () => {
  dialog.close();
})