class ast{
	constructor(arbol){
		this.arbol = arbol;
		this.tabla_simbolos = [];
		this.main;
		this.tokens_entorno = ["Sentencia if", "Caso", "Default",
			"Sentencia while","Sentencia do while", "Sentencia for", 
			"Declaracion metodo", "Declaracion funcion"];

		this.tokens_hijos = ["instrucciones","Declaracion variable","Asignacion variable",
			"Actualizacion","Parametros", "Condicional"];
	}
	
	calcular_tabla(actual){
		let identificador, tipo, argumentos, instrucciones;
		switch(actual.token){
			case "Funcion main":
				this.main = actual.hijos[1];
				break;
			case "Declaracion variable": 
				identificador = actual.hijos[1].dato;
				tipo = actual.hijos[0].hijos[0].dato;
				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new variable(identificador, tipo, actual.entorno,actual.fila,actual.columna));
				break;
			case "Declaracion vector":
				for(const hijo of actual.hijos){
					if(hijo.token == "Tipo"){
						tipo = hijo.hijos[0].dato;
					}else if(hijo.token == "id"){
						identificador = hijo.dato;
					}
				}

				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new vector(identificador, tipo, actual.entorno,actual.fila,actual.columna));
				break;
			case "Parametros":
				for(const hijo of actual.hijos){
					if(hijo.token == "Tipo"){
						tipo = hijo.hijos[0].dato;
					}else if(hijo.token == "id"){
						identificador = hijo.dato;
					}
				}

				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new variable(identificador, tipo, actual.entorno,actual.fila,actual.columna));
				break;
			case "Declaracion funcion":
				argumentos = [];
				for(const hijo of actual.hijos){
					if(hijo.token == "Tipo"){
						tipo = hijo.hijos[0].dato;
					}else if(hijo.token == "id"){
						identificador = hijo.dato;
					}else if(hijo.token == "Parametros"){
						argumentos = hijo.exec();
					}else if(hijo.token == "instrucciones"){
						instrucciones = hijo;
					}

				}

				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new funcion(identificador, argumentos, tipo, actual.entorno, instrucciones,actual.fila,actual.columna));
				break;
			case "Declaracion metodo":
				for(const hijo of actual.hijos){
					if(hijo.token == "id"){
						identificador = hijo.dato;
					}else if(hijo.token == "Parametros"){
						argumentos = hijo.exec();
					}else if(hijo.token == "instrucciones"){
						instrucciones = hijo;
					}

				}

				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new metodo(identificador, argumentos, actual.entorno, instrucciones,actual.fila,actual.columna));
				break;
			case "Declaracion lista":
				for(const hijo of actual.hijos){
					if(hijo.token == "Tipo"){
						tipo = hijo.hijos[0].dato;
					}else if(hijo.token == "id"){
						identificador = hijo.dato;
					}
				}

				for(const simbolo of this.tabla_simbolos){
					if(this.areEqual(simbolo.entorno,actual.entorno) && simbolo.identificador == identificador){
						document.getElementById("consola").value += "error, linea: "+actual.fila+", columna: "+ actual.columna+", la variable "+identificador+" ya fue declarada en el mismo entorno\n";
						return "error";
					}
				}
				this.tabla_simbolos.push(new lista(identificador, tipo, actual.entorno,actual.fila,actual.columna));
				break;
		}

		for(const hijo of actual.hijos){
			let r = this.calcular_tabla(hijo);
			if(r != null){
				return "error";
			}
		}
	}

	correr_programa(){
		this.main.exec(this.tabla_simbolos);
	}

	calcular_entorno(actual){
		if(actual.token == "Programa"){
			actual.entorno.push(actual.clave);
			for(const hijo of actual.hijos){
				hijo.entorno = actual.entorno;
			}
		}else if(this.tokens_entorno.includes(actual.token)){
			for(const hijo of actual.hijos){
				if(this.tokens_hijos.includes(hijo.token)){
					hijo.entorno = hijo.entorno.concat(actual.entorno);
					hijo.entorno.push(actual.clave);
				}else{
					hijo.entorno = actual.entorno;
				}
			}
		}else{
			for(const hijo of actual.hijos){
				hijo.entorno = actual.entorno;
			}
		}

		for(const hijo of actual.hijos){
			this.calcular_entorno(hijo);
		}
	}

	graficar_tabla(){
        let dot = "digraph {\nN_1[shape=none label = <\n"
                + " <TABLE border=\"0\" cellspacing=\"0\" cellpadding=\"10\" style=\"collapse\">\n"
                + "  <TR >\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Identificador</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Objeto</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Tipo</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Entorno</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Linea</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#4191e1\"><b><font color=\"White\">Columna</font></b></TD>\n";
        dot += "  </TR>\n";

        for (const s of this.tabla_simbolos) {
            dot += "  <TR>\n"
                    + "  <TD border=\"1\">"+s.identificador+"</TD>\n"
                    + "  <TD border=\"1\">"+s.constructor.name+"</TD>\n"
                    + "  <TD border=\"1\">"+s.tipo+"</TD>\n";
            if(s.entorno.length == 1){
            	dot+= "  <TD border=\"1\">global</TD>\n";
            }else{
            	dot+= "  <TD border=\"1\">local</TD>\n";
            }
            dot+= "  <TD border=\"1\">"+s.fila+"</TD>\n";
            dot+= "  <TD border=\"1\">"+s.columna+"</TD>\n";
            dot += "  </TR>\n";
        }
        
            dot += "</TABLE>>];\n}";
        return dot;
	}

	areEqual(array1, array2) {
	  if (array1.length === array2.length) {
	    return array1.every((element, index) => {
	      if (element === array2[index]) {
	        return true;
	      }

	      return false;
	    });
	  }

	  return false;
	}
}