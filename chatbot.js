document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        addMessage("¡Bienvenido a Olympedia 2024! Pregunta lo que quieras sobre los JJOO.", "bot");
    }, 500);

    const usuario = "admin";
    const credenciales = btoa(`${usuario}:${usuario}`); 

    const inputField = document.getElementById("query-asked");
    const sendButton = document.getElementById("send-btn");
    const chatHistory = document.querySelector(".chat-history");

    function autoScroll () {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function addMessage (text, remitente) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", remitente == "user" ? "user-message" : "bot-message");
        msgDiv.textContent = text;

        // Verificar si el texto contiene la palabra "DISCLAIMER"
        if (text.includes("DISCLAIMER")) {
            msgDiv.style.border = "2px solid #D81E05"; // Aplicar borde rojo
        }

        chatHistory.appendChild(msgDiv);
        autoScroll();
        inputField.readOnly = false;
    }

    function enviar() {

        const mensaje = inputField.value.trim();
        if (mensaje == "") return;

        addMessage(mensaje, "user");

        inputField.value = "";

        const datos = {
            "question": mensaje,
            "plot": false,
            "plot_details": "",
            "embeddings_provider": "googleaistudio",
            "embeddings_model": "models/text-embedding-004",
            "vector_store_provider": "Chroma",
            "sql_gen_provider": "googleaistudio",
            "sql_gen_model": "gemini-1.5-flash",
            "chat_provider": "googleaistudio",
            "chat_model": "gemini-1.5-flash",
            "vdp_database_names": "jjoo2024",
            "use_views": "",
            "expand_set_views": true,
            "custom_instructions": "",
            "markdown_response": true,
            "vector_search_k": 5,
            "mode": "default",
            "disclaimer": true,
            "verbose": true
        };
    
        fetch('http://localhost:8008/answerQuestion', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${credenciales}`
            },
            body: JSON.stringify(datos)
            })
            .then(response => {
                if (!response.ok) {
                    addMessage("Algo salió mal, revise su mensaje", "bot");
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                addMessage(data[Object.keys(data)[0]] || "Conexion perdida...", "bot");
                console.log(data);
            })
            .catch(error => {
                console.error('Error en la consulta:', error);
            });

            inputField.readOnly = true;
    }

    sendButton.addEventListener("click", enviar);

    document.getElementById("query-asked").addEventListener("keydown", (event) => {
        if (event.key == "Enter"){
            event.preventDefault();
            enviar();
        }
    })

    document.getElementById("logout").addEventListener("click", () => {
        alert("Cerrando sesion...");
        window.location.href = "login.html";
    })

    document.getElementById("del-btn").addEventListener("click", () => {
        document.getElementById("answer").replaceChildren();
        setTimeout(() => {
            addMessage("Borrado realizado!", "bot");
        }, 250);
    })

});