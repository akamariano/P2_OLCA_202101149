# Gramática Typewise
#
| Carnet            | Nombre      | Auxiliar | Sección|
|-------------------|-------------|------------|--------|
|202101149| Mariano Roberto Rac Noguera | Mynor Ruíz|A|
#
## Gramática
Expresiones Regulares
| Expresión regular | Token |
|-------------------|-------|
| [ \r\t\n]+ | blancos |
| \s+ | ignorar blancos |
| "//".* | comentarios una línea |
| "/*"([^*]|("*"[^/]))+"*/" | comentarios multilinea |
| "int" | reservada_int |
| "double" | reservada_double |
| "boolean" | reservada_boolean |
| "char" | reservada_char |
| "string" | reservada_string |
| "true" | reservada_true |
| "false" | reservada_false |
| "print" | reservada_print |
| "if" | reservada_if |
| "else" | reservada_else |
| "while" | reservada_while |
| "for" | reservada_for |
| "do" | reservada_do |
| "switch" | reservada_switch |
| "case" | reservada_case |
| "new" | reservada_new |
| "list" | reservada_list |
| "add" | reservada_add |
| "default" | reservada_default |
| "break" | reservada_break |
| "continue" | reservada_continue |
| "return" | reservada_return |
| "void" | reservada_void |
| "tolower" | reservada_tolower |
| "toupper" | reservada_toupper |
| "length" | reservada_length |
| "truncate" | reservada_truncate |
| "round" | reservada_round |
| "typeof" | reservada_typeof |
| "tostring" | reservada_tostring |
| "tochararray" | reservada_tochararray |
| "main" | reservada_main |
| "," | com |
| "." | pto |
| "+" | mas |
| "-" | menos |
| "*" | estrella |
| "/" | division |
| "^" | potencia |
| "%" | mod |
| "==" | igualacion |
| "!=" | desigual |
| "<=" | menor_igual |
| "<" | menor |
| ">=" | mayor_igual |
| ">" | mayor |
| ":" | dp |
| "?" | interrogacion |
| "I I" | or |
| "&&" | and |
| "!" | not |
| ";" | pc |
| "{" | llave_a |
| "}" | llave_c |
| "(" | paren_a |
| ")" | paren_c |
| "[" | corchete_a |
| "]" | corchete_c |
| "=" | igual |
| [0-9]+"."[0-9]+ | double |
| [0-9]+ | int |
| [a-z_][a-z0-9_]* | id |
No Terminales:
PROGRAMA, EXPRESION, INSTRUCCIONES, INSTRUCCION, ARITMETICO, CONDICIONAL,LLAMADA,SENTENCIA,FUNCIO_NOMBRE,PARAMETROS_NOMBRE,MODIFICACION_NOMBRE,AGREGAR_NOMBRE,DECLARACION_NOMBRE,TRANSFERENCIA,TIPO;ACTUALIZACIÓN,LÖGICO
INICIO:
%start PROGRAMA
Descripción de Algunas Porducciones
PROGRAMA: INSTRUCCIONES fin_archivo
        | fin_archivo;

EXPRESION: ARITMETICO
         | CONDICIONAL
         ...
         | paren_a EXPRESION paren_c;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION
             | INSTRUCCION;

INSTRUCCION: DECLARACION_VARIABLE
           | ASIGNACION_VARIABLE
           | DECLARACION_VECTOR
           | MODIFICACION_VECTOR
           | DECLARACION_LISTA
           | AGREGAR_LISTA
           | MODIFICACION_LISTA
           | SENTENCIA_IF
           | SENTENCIA_SWITCH
           | SENTENCIA_WHILE
           | SENTENCIA_FOR
           | SENTENCIA_DO_WHILE
           | DECLARACION_FUNCION
           | DECLARACION_METODO
           | FUNCION_PRINT
           | TRANSFERENCIA
           | ACTUALIZACION pc
           | LLAMADA pc
           | FUNCION_MAIN;

ARITMETICO: menos EXPRESION
          | EXPRESION potencia EXPRESION
          | EXPRESION division EXPRESION
          | EXPRESION estrella EXPRESION
          | EXPRESION mas EXPRESION
          | EXPRESION menos EXPRESION
          | EXPRESION mod EXPRESION;

CONDICIONAL: EXPRESION igualacion EXPRESION;
