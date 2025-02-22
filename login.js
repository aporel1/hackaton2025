document.addEventListener("DOMContentLoaded", () => { 
    document.getElementById("login-btn").addEventListener("click", () => {
        const username = document.getElementById("user").value;
        const password = document.getElementById("pass").value;
        const errorMessage = document.getElementById("error-message");

        if (username === "admin" && password === "admin") {
            alert("Inicio de sesión exitoso");
            window.location.href = "chatbot.html"; // Redirige al chat
        } else {
            document.getElementById("user").value = "";
            document.getElementById("pass").value = "";
        }
    });
});