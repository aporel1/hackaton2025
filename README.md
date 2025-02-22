# **Denodo HackUDC 2025**  
Este proyecto consiste en la creación de un entorno basado en **Denodo Express y AI SDK** para facilitar el procesamiento y análisis de datos mediante inteligencia artificial. Se ha desarrollado como parte del reto propuesto por **Denodo en HackUDC 2025**, con el objetivo de construir un **chatbot capaz de responder preguntas sobre una base de datos estructurada**.  

## **Participantes**  
### Jesús José Santamaría Santos  
### Mario Lamas Angeriz  
### Rubén Lesta Fraga  
### Andrés Rey Luna  

## **Contacto para Issues**  
Si encuentras un problema o tienes alguna consulta sobre este proyecto, puedes contactar con nosotros a través de los siguientes correos:  
- j.j.ssantos@udc.es
- m.lamasa@udc.es   
- ruben.lesta@udc.es  
- andres.rey1@udc.es  

## **¿Qué hace este proyecto?**  
El sistema permite cargar datos en **Denodo Express**, procesarlos con el **AI SDK** y utilizarlos para responder preguntas en lenguaje natural. Para ello, el **AI SDK de Denodo** se conecta con **Google AI Studio** y usa el modelo **Gemini** para mejorar la comprensión de las preguntas y ofrecer respuestas basadas en los datos disponibles.  

Además, hemos desarrollado un **frontend con HTML, CSS y JavaScript** para que los usuarios puedan interactuar con el chatbot de forma sencilla y visualmente atractiva.  

## **¿Cómo lo hemos hecho?**  
1. **Configuración del entorno**  
   - Creación de una cuenta en **Denodo** para descargar las imágenes necesarias.  
   - Instalación de **Docker** y configuración del entorno con **Docker Compose**.  
   - Clonación del repositorio **Denodo Community Lab Environment**, que facilita la instalación.  

2. **Integración con Google AI Studio**  
   - Registro en **Google AI Studio**.  
   - Configuración del AI SDK para usar el modelo **Gemini** como motor de procesamiento de lenguaje natural.  

3. **Carga y preparación de datos**  
   - Movimiento de datos a los contenedores de **Denodo Express** mediante comandos de **Docker**.  
   - Configuración del **Design Studio** para estructurar los datos y definir la base de datos que utilizará el chatbot.  

4. **Desarrollo del chatbot**  
   - Uso del **endpoint `/answerQuestion`** del AI SDK para responder preguntas en lenguaje natural.  
   - Creación de un **frontend con HTML, CSS y JavaScript** que permite a los usuarios escribir preguntas y obtener respuestas en tiempo real.  

5. **Puesta en marcha**  
   - Sincronización del **Data Catalog** para actualizar la información disponible.  
   - Regeneración de la base de datos del **AI SDK** para garantizar que trabaje con los datos correctos.  
   - Despliegue del chatbot y pruebas de funcionamiento.  

## **¿Para qué sirve?**  
Este proyecto permite interactuar con datos estructurados de manera sencilla y eficiente, gracias a la combinación de Denodo, AI SDK y modelos avanzados de IA como Gemini. Puede ser útil en múltiples casos, como:  
- Responder preguntas sobre una base de datos empresarial.  
- Crear asistentes virtuales basados en datos internos.  
- Facilitar la consulta de información en entornos educativos o de investigación.  

Este desarrollo demuestra cómo **Denodo AI SDK** puede integrarse con tecnologías modernas para ofrecer soluciones innovadoras basadas en inteligencia artificial y procesamiento de datos.  

---  

## **Cómo usar el VQL**  

Para importar los datos y vistas en **Denodo Design Studio**, sigue estos pasos:  

1. **Accede al repositorio del proyecto.**  
2. **Dirígete al directorio `export_DB/`.**  
3. **Descomprime el archivo `export.zip`.**  
4. **Abre Denodo Design Studio e importa los archivos VQL.**  
   - Ve a **File > Import** en Denodo.  
   - Selecciona los archivos descomprimidos del ZIP.  
   - Confirma la importación y espera a que se procesen los datos.  

Esta estructura permite mantener organizados los archivos **source** (CSV) y **view** (VQL), asegurando que el entorno de **Denodo Express** pueda utilizarlos correctamente para la consulta de datos.

