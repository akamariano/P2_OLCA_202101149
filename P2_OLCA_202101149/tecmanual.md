# Manual Técnico Typewise
#
| Carnet            | Nombre      | Auxiliar | Sección|
|-------------------|-------------|------------|--------|
|202101149| Mariano Roberto Rac Noguera | Mynor Ruíz|A|
#
## Introducción

Este manual técnico es una guía para los desarrolladores y técnicos encargados del mantenimiento de la aplicación o bien interesados en el código y desarrollo de la app. Proporciona información detallada sobre la arquitectura, el diseño y las tecnologías utilizadas en el desarrollo de Exregan
## Requerimientos de Software
1. Un dispositivo con acceso a internet: puede ser una computadora, teléfono móvil, tablet, u otro dispositivo que tenga capacidad de conectarse a internet.

2. Un navegador web: el software que se utiliza para acceder y visualizar las páginas web. Los navegadores más populares son Google Chrome, Mozilla Firefox, Safari, y Microsoft Edge.

3. Una conexión a internet: para poder acceder a la página web, se requiere una conexión a internet estable y de alta velocidad.

# Arquitectura
Se sigue una estructura de capas y utiliza patrones de diseño para separar las responsabilidades y mejorar la modularidad del código.
- Capa de análisis léxico: Esta capa utiliza Jison para realizar el análisis léxico del código fuente y generar una secuencia de tokens.
- Capa de análisis sintáctico: Esta capa utiliza JIson para realizar el análisis sintáctico del código fuente y generar un árbol de análisis sintáctico.
- Capa de generación de código: Esta capa se encarga de generar el código objeto o el código ejecutable a partir del árbol de análisis sintáctico y la información recopilada en las capas anteriores.

## Tecnologías utilizadas

Exregan utiliza las siguientes tecnologías:

* Javascript- para el desarrollo del programa
* HTML- para el desarrollo del programa
* CSSL- para el desarrollo del programa
* Graphviz - para la  elaboración de reportes

## Introducción
# Estructura del Código

Para el desarrollo de la aplicación se implementó uso de las herramienta JIson P dentro del entorno web. El código está estructurado de la siguiente manera: 
- UI: La interfaz gráfica con los botones necesarios para manipular el archivo de entrada o bien redactar uno desde cero,
- Package Gramática: Contiene los distintos paquetes que dictaminan el funcionamiento directo de la aplicación, siendo el principal el documento de gramatica.js el analizador Léxico y sintáctico.
- Clases: contiene los documentos para la creación de estructuras, funciones, métodos o variables más elaboradas para el funcionamiento  de la aplicación.

## Diseño de la Interfaz de Usuario
![Interfaz Gráfica](https://github.com/akamariano/P2_OLCA_202101149/blob/main/interfaztw.png)
Para la interfaz de usuario se utilizó:
 HTML,  se usó es la interfaz gráfica de  Typewise. La estructura de la página web está compuesta por una sección de encabezado (head), una sección de cuerpo (body) y una sección de scripts.

En la sección de encabezado, se establece el tipo de documento con el DOCTYPE, se definen las propiedades del documento como el idioma y la codificación de caracteres, y se incluyen los recursos externos necesarios como los estilos y los scripts.

En la sección de cuerpo, se define la estructura de la página web. Hay varios contenedores que organizan la información y elementos interactivos, como botones y áreas de texto. Estos elementos permiten a los usuarios ingresar código, ver la consola y visualizar los resultados del análisis de código.

Los scripts incluidos en la sección de scripts incluyen librerías como d3.js y d3-graphviz.js, que permiten la visualización de gráficos y árboles. Además, se incluyen scripts personalizados que contienen las funciones y clases necesarias para el funcionamiento del compilador.

En resumen, la interfaz gráfica permite a los usuarios ingresar código, ver la consola y visualizar los resultados del análisis de código a través de una serie de elementos interactivos y gráficos.

## Funcionamiento Interno de la Aplicación
Integración main.js, Se utiliza un arreglo llamado "paginas_guardadas" para guardar el texto de entrada y el texto de la consola de cada página. Una variable llamada "pagina_actual" indica el número de la página actual que está siendo mostrada en el editor.

Hay varias funciones definidas en el código:

"keyup": esta función se activa cada vez que se suelta una tecla mientras se escribe en el editor. Actualiza el número de líneas en el editor y guarda el texto de entrada y de la consola de la página actual en "paginas_guardadas".

"keydown": esta función se activa cada vez que se presiona una tecla en el editor. Si se presiona la tecla "Tab", inserta una tabulación en el texto en lugar de saltar al siguiente elemento en la página.

"cambiar_pagina": esta función cambia la página actual mostrada en el editor. Se activa cuando se cambia el valor en el control de selección de página.

"quitar_pagina": esta función elimina la página actual. Se activa al hacer clic en el botón "Quitar Página".

"agregar_pagina": esta función agrega una nueva página en el editor. Se activa al hacer clic en el botón "Agregar Página".

"Abrir": esta función permite abrir un archivo de texto y mostrar su contenido en el editor. Se activa al hacer clic en el botón "Abrir".

"Guardar": esta función permite guardar el texto del editor en un archivo de texto. Se activa al hacer clic en el botón "Guardar".

"Analizar": esta función analiza el texto en el editor utilizando un parser generado con Jison. Si se encuentran errores en el texto de entrada, se muestra un reporte de errores en la consola. Si no hay errores, se construye un árbol de sintaxis abstracta (AST) y se muestran los resultados en la consola y en dos gráficos generados con D3.js. Se activa al hacer clic en el botón "Analizar".

"graficar_errores": esta función genera un gráfico de errores en formato DOT de Graphviz a partir de dos arreglos que contienen información sobre los errores léxicos y sintácticos.
Parser Lexer, Este código es un parser generado por Jison, un generador de parsers basado en gramáticas de contexto libres de derechos. Jison convierte una gramática escrita en un formato específico en un parser JavaScript que puede analizar entradas y producir un árbol de análisis sintáctico.

El código contiene un objeto Parser con una serie de propiedades y métodos. La propiedad "symbols_" es una lista asociativa que relaciona el nombre de un símbolo con su número. La propiedad "terminals_" es una lista asociativa que relaciona el número de un terminal con su nombre. La propiedad "productions_" es una lista de producciones, es decir, reglas de la gramática.

El método "performAction" se utiliza para realizar una acción en función de la entrada analizada y la producción aplicada. La propiedad "table" es una tabla de acciones de análisis que se utiliza para seguir el camino correcto a través del árbol de análisis sintáctico. El objeto "defaultActions" contiene acciones predeterminadas que se utilizan en caso de que no haya una acción específica para un símbolo o producción en particular.

El método "parseError" se utiliza para manejar errores en el análisis. La función "parse" es la función principal que toma una entrada y produce un árbol de análisis sintáctico.

El objeto "lexer" contiene información y métodos relacionados con el proceso de análisis léxico, que convierte la entrada en una secuencia de tokens. La función "lex" es la función principal que realiza el análisis léxico.

En resumen, el parser generado por Jison permite analizar entradas y producir un árbol de análisis sintáctico utilizando una gramática especificada y un conjunto de acciones asociadas a cada producción de la gramática. 
AST: El AST se utiliza en el proceso de compilación de un programa de computadora para representar de manera estructurada el código fuente.

La clase ast tiene una serie de propiedades y métodos que permiten trabajar con un AST. Aquí describo algunos de los más importantes:

constructor(arbol): Este es el constructor de la clase, que recibe un argumento arbol, que representa el árbol de sintaxis abstracta.

tabla_simbolos: Una lista que almacena los símbolos (variables, funciones, métodos, etc.) declarados en el programa.

main: Una propiedad que representa el nodo principal del programa, que suele ser una función main.

tokens_entorno: Una lista que contiene los tokens que representan diferentes tipos de entornos en el programa, por ejemplo, una sentencia if, una estructura de control for, etc.

tokens_hijos: Una lista que contiene los tokens que representan diferentes tipos de hijos en el programa, por ejemplo, una lista de instrucciones, una asignación de variable, etc.

calcular_tabla(actual): Este método recibe un argumento actual, que representa un nodo del árbol, y se encarga de calcular la tabla de símbolos. A partir del token del nodo actual, se determina qué acción se debe realizar (por ejemplo, si se trata de una declaración de variable, se agrega una nueva entrada a la tabla de símbolos).

correr_programa(): Este método ejecuta el programa principal, que se encuentra en la propiedad main.

calcular_entorno(actual): Este método recibe un argumento actual, que representa un nodo del árbol, y se encarga de calcular el entorno en el que se encuentra cada nodo. El entorno se utiliza para determinar la visibilidad de las variables y otros símbolos en el programa.

graficar_tabla(): Este método genera una representación en formato Graphviz del contenido de la tabla de símbolos.
## Pruebas de la Aplicación

Para el testing de la app, se probaron diversos archivos de entrada con distintas complejidades y se probo la resistencia y recuperación de errores de la app
