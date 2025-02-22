document.addEventListener("DOMContentLoaded", () => {

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
        chatHistory.appendChild(msgDiv);
        autoScroll();
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
    }

    sendButton.addEventListener("click", enviar);

    document.getElementById("query-asked").addEventListener("keydown", (event) => {
        if (event.key == "Enter"){
            event.preventDefault();
            enviar();
        }
    })

});
