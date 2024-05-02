const formulaire = document.getElementById("formInsc");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const pseudo = document.getElementById("pseudo").value;
  const age = parseInt(document.getElementById("age").value, 10);
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const error = document.getElementById("error-message");

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify({
      name: nom,
      pseudo: pseudo,
      age: age,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }),

    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 500) {
    error.innerHTML = `Erreur de serveur, c'est chaud !`;
    error.classList.remove("hiddenp");
    error.classList.add("active");
  } else {
    error.innerHTML = `Tout est good !`;
    error.classList.remove("hiddenp");
    error.classList.add("active");
    const data = await response.json();
    window.location.href = "./index.html";

    console.log(nom);
    console.log(response);
  }
});
