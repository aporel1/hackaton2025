document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send-btn").addEventListener("click", () => {

        const usuario = "admin";
        const credenciales = btoa(`${usuario}:${usuario}`); 

        const queryAsked = document.getElementById("query-asked");
        const question = queryAsked.value;
        queryAsked.conten

        if(question){
            const datos = {
                "question": question,
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
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const firstValue = data[Object.keys(data)[0]];
                const nthResponse = document.createElement("p");
                nthResponse.textContent = `${firstValue}`;
                document.getElementById("answer").appendChild(nthResponse);
            })
            .catch(error => {
                console.error('Error en la consulta:', error);
            });
        }else{
            const nthResponse = document.createElement("p");
            nthResponse.textContent = "El string esta vacio espabila primo";
            document.getElementById("answer").appendChild(nthResponse);
        }
    });
});
