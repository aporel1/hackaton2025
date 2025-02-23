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
        if (text.includes("Sorry" || "sorry")) {
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
            "sql_gen_model": "gemini-2.0-flash",
            "chat_provider": "googleaistudio",
            "chat_model": "gemini-2.0-flash",
            "vdp_database_names": "jjoo2024",
            "use_views": "",
            "expand_set_views": true,
            "custom_instructions": "answer in the same language as the question and you are especialized in the Olympic Games of 2024 and format the answers in the most human way possible",
            "markdown_response": false,
            "vector_search_k": 5,
            "mode": "default",
            "disclaimer": false,
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

    let deleteClicked = 0;
    const jsConfeti = new JSConfetti({});

    document.getElementById("del-btn").addEventListener("click", () => {
        document.getElementById("answer").replaceChildren();
        deleteClicked++;
        setTimeout(() => {
            addMessage("Borrado realizado!", "bot");
        }, 250);

        if(deleteClicked >= 10) {
            jsConfeti.addConfetti();
            deleteClicked = 0;
        }
    })

});
