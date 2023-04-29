class Nodo{
	constructor(token, fila,columna, valor = ""){
		this.token = token;
		this.dato = valor;
		this.hijos = [];
		this.clave = Math.floor((Math.random() * 999999999999));
		this.entorno = [];
		this.fila = fila;
		this.columna = columna;
	}

	graficar_ast(){
		var codigo_dot = "digraph{\nlabel=\" AST \";\n";
		codigo_dot += this.imprimir_info();
		codigo_dot += "}";
		return codigo_dot
	}

	imprimir_info(){
		let s="";
		for(const hijo of this.hijos){
			s+="N_"+this.clave+"->"+"N_"+hijo.clave+";\n";
			s+=hijo.imprimir_info();
		} 
		s= "N_"+this.clave+"[label=\""+this.token+"\"];\n" +s;
		return s;
	}

	exec(tabla_simbolos, caso_selec = null){
		let resultado, r1, r2, r3, variable, tipo, valor_a_insertar, cantidad, indice, nuevo_valor, clonada, parametros, args;
		let salida = document.getElementById("consola");
		switch(this.token){
			case "Parametros":
				resultado = [];
				for(const hijo of this.hijos){
					if(hijo.token == "Parametros"){
						resultado = hijo.exec(tabla_simbolos);
					}else if(hijo.token == "id"){
						resultado.push({ "identificador": hijo.dato, "entorno": hijo.entorno});
					}
				}
				return resultado;
			case "Expression":
			resultado = this.hijos[0].exec(tabla_simbolos);
			return resultado;
			case "aritmetico":
				if(this.hijos[0].token == "menos"){
					r1 = this.hijos[1].exec(tabla_simbolos);
					if(r1.tipo == "int" || r1.tipo == "double"){
						return {tipo:r1.tipo,valor:-r1.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "potencia"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor ** r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor ** r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "division"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int" || r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor / r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "char" || r1.tipo == "double" && r2.tipo == "char"){
						return {tipo:"double",valor: r1.valor / r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "char" && r2.tipo == "double" || r1.tipo == "char" && r2.tipo == "int"){
						return {tipo:"double",valor: r1.valor.charCodeAt(0) / r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "estrella"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor * r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor * r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "char" ){
						return {tipo:"int",valor: r1.valor * r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "double" && r2.tipo == "char"){
						return {tipo:"double",valor: r1.valor * r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "char" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor.charCodeAt(0) * r2.valor};
					}else if(r1.tipo == "char" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor.charCodeAt(0) * r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "menos"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor - r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor - r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "boolean"){
						return {tipo:"int",valor: r1.valor - (r2.valor ? 1 : 0)};
					}else if(r1.tipo == "boolean" && r2.tipo == "int"){
						return {tipo:"int",valor: (r1.valor ? 1 : 0) - r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "boolean"){
						return {tipo:"double",valor: r1.valor - (r2.valor ? 1 : 0)};
					}else if(r1.tipo == "boolean" && r2.tipo == "double"){
						return {tipo:"double",valor: (r1.valor ? 1 : 0) - r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "char" ){
						return {tipo:"int",valor: r1.valor - r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "double" && r2.tipo == "char"){
						return {tipo:"double",valor: r1.valor - r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "char" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor.charCodeAt(0) - r2.valor};
					}else if(r1.tipo == "char" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor.charCodeAt(0) - r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "mas"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor + r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor + r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "boolean"){
						return {tipo:"int",valor: r1.valor + (r2.valor ? 1 : 0)};
					}else if(r1.tipo == "boolean" && r2.tipo == "int"){
						return {tipo:"int",valor: (r1.valor ? 1 : 0) + r2.valor};
					}else if(r1.tipo == "double" && r2.tipo == "boolean"){
						return {tipo:"double",valor: r1.valor + (r2.valor ? 1 : 0)};
					}else if(r1.tipo == "boolean" && r2.tipo == "double"){
						return {tipo:"double",valor: (r1.valor ? 1 : 0) + r2.valor};
					}else if(r1.tipo == "int" && r2.tipo == "char" ){
						return {tipo:"int",valor: r1.valor + r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "double" && r2.tipo == "char"){
						return {tipo:"double",valor: r1.valor + r2.valor.charCodeAt(0)};
					}else if(r1.tipo == "char" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor.charCodeAt(0) + r2.valor};
					}else if(r1.tipo == "char" && r2.tipo == "int"){
						return {tipo:"int",valor: r1.valor.charCodeAt(0) + r2.valor};
					}else if(r1.tipo == "char" && r2.tipo == "char" || r1.tipo == "string" && r2.tipo == "char"
						|| r1.tipo == "string" && r2.tipo == "boolean"|| r1.tipo == "string" && r2.tipo == "int"
						|| r1.tipo == "string" && r2.tipo == "double"|| r1.tipo == "string" && r2.tipo == "string"
						|| r1.tipo == "char" && r2.tipo == "string"|| r1.tipo == "boolean" && r2.tipo == "string"
						|| r1.tipo == "int" && r2.tipo == "string"|| r1.tipo == "double" && r2.tipo == "string"){
						return {tipo:"string",valor: r1.valor + r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}else if(this.hijos[1].token == "mod"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					lr2 = this.hijos[2].exec(tabla_simbolos);
					if(r1.tipo == "int" && r2.tipo == "int" || r1.tipo == "double" && r2.tipo == "int" || r1.tipo == "int" && r2.tipo == "double" || r1.tipo == "double" && r2.tipo == "double"){
						return {tipo:"double",valor: r1.valor % r2.valor};
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos";
						throw true;
					}
				}
				break;
			case "Condicional":
				if(this.hijos[1].token == "igualacion"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor == r2.valor};
				}else if(this.hijos[1].token == "desigual"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor != r2.valor};
				}else if(this.hijos[1].token == "menor_igual"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor <= r2.valor};
				}else if(this.hijos[1].token == "menor"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor < r2.valor};
				}else if(this.hijos[1].token == "mayor_igual"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor >= r2.valor};
				}else if(this.hijos[1].token == "mayor"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor > r2.valor};
				}
				break;
			case "Ternario":
				r1 = this.hijos[0].exec(tabla_simbolos);
				r2 = this.hijos[2].exec(tabla_simbolos);
				r3 = this.hijos[4].exec(tabla_simbolos);
				if(r1.valor){
					return r2;
				}
				return r3;
				break;
			case "Logico":
				if(this.hijos[0].token == "not"){
					r1 = this.hijos[1].exec(tabla_simbolos);
					return {tipo:"boolean",valor: !r1.valor};
				}else if(this.hijos[1].token == "and"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor && r2.valor};
				}else if(this.hijos[1].token == "or"){
					r1 = this.hijos[0].exec(tabla_simbolos);
					r2 = this.hijos[2].exec(tabla_simbolos);
					return {tipo:"boolean",valor: r1.valor || r2.valor};
				}
				break;
			case "Declaracion variable":
				variable = this.buscar_simbolo(this.hijos[1].dato.toLowerCase(),this.entorno,"variable",tabla_simbolos);
				for(const hijo of this.hijos){
					if(hijo.token == "Expression"){
						r1 = hijo.exec(tabla_simbolos);	
						if(variable.tipo == r1.tipo){
							variable.dato = r1.valor;
						}else{
							salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la declaracion";
							throw true;
						}
					}
				}
				break;
			case "Asignacion variable":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"variable",tabla_simbolos);
				if(variable == null){
					variable =  this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				}
				if(variable == null){
					variable =  this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"vector",tabla_simbolos);
				}
				if(variable == null){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el id: \""+this.dato+"\" no está declarado";
					throw true;
				}
				r1 = this.hijos[2].exec(tabla_simbolos);
				if(variable.tipo == r1.tipo){
					variable.dato = r1.valor;
				}else{
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la asignacion";
					throw true;
				}
				break;
			case "Casteo":
				r1 = this.hijos[3].exec(tabla_simbolos);
				tipo = this.hijos[1].hijos[0].dato;
				if(tipo == "double" && r1.tipo == "int"){
					return {tipo:"double",valor: r1.valor};
				}else if(tipo == "int" && r1.tipo == "double"){
					return {tipo:"int",valor: r1.valor};
				}else if(tipo == "string" && r1.tipo == "int"){
					return {tipo:"string",valor: ""+r1.valor};
				}else if(tipo == "char" && r1.tipo == "int"){
					return {tipo:"char",valor: String.fromCharCode(r1.valor)};
				}else if(tipo == "string" && r1.tipo == "double"){
					return {tipo:"string",valor: ""+r1.valor};
				}else if(tipo == "int" && r1.tipo == "char"){
					return {tipo:"int",valor: r1.valor.charCodeAt(0)};
				}else if(tipo == "double" && r1.tipo == "char"){
					return {tipo:"double",valor: r1.valor.charCodeAt(0)};
				}else{
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en el casteo";
					throw true;
				}
				break;
			case "Actualizacion":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"variable",tabla_simbolos);
				if(this.hijos[1].token == "mas"){
					variable.dato = variable.dato + 1;
					return {tipo:variable.tipo,valor: variable.valor};
				}else if(this.hijos[1].token == "menos"){
					variable.dato = variable.dato - 1;
					return {tipo:variable.tipo,valor: variable.valor};
				}
				break;
			case "Declaracion vector":
				variable = this.buscar_simbolo(this.hijos[3].dato.toLowerCase(),this.entorno,"vector",tabla_simbolos);
				if(this.hijos.length == 11){
					cantidad = this.hijos[8].exec(tabla_simbolos);
					if(cantidad.tipo == "int"){
						valor_a_insertar = variable.dato;
						variable.dato = new Array(cantidad.valor).fill(variable.dato);
					}else{
						salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la declaracion del vector";
						throw true;
					}
				}else{
					variable.dato = this.hijos[6].exec(tabla_simbolos);
				}
				break;
			case "Acceso vector":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"vector",tabla_simbolos);
				indice = this.hijos[8].exec(tabla_simbolos);
				if(indice.tipo == "int"){
					return {tipo:variable.tipo,valor: variable.dato[indice.valor]};
				}else{
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el indice del vector debe ser un int";
					throw true;
				}
				break;
			case "Modificacion vector":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"vector",tabla_simbolos);
				indice = this.hijos[2].exec(tabla_simbolos);
				nuevo_valor = this.hijos[5].exec(tabla_simbolos);
				if(indice.tipo != "int"){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el indice del vector debe ser un int";
					throw true;
				}
				if(nuevo_valor.tipo != variable.tipo){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la asignacion a vector";
					throw true;
				}

				variable.dato[indice.valor] = nuevo_valor.valor;
				break;
			case "Declaracion lista":
				variable = this.buscar_simbolo(this.hijos[4].dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				variable.dato = [];
				break;
			case "Agregar lista":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				r1 = this.hijos[4].exec(tabla_simbolos);
				if(r1.tipo != variable.tipo){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la asignacion a vector";
					throw true;
				}
				variable.dato.push(r1.valor);
				break;
			case "Acceso lista":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				indice = this.hijos[3].exec(tabla_simbolos);
				if(indice.tipo == "int"){
					return {tipo:variable.tipo,valor: variable.dato[indice.valor]};
				}else{
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el indice de la lista debe ser un int";
					throw true;
				}
				break;
			case "Modificacion lista":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				indice = this.hijos[3].exec(tabla_simbolos);
				nuevo_valor = this.hijos[7].exec(tabla_simbolos);
				if(indice.tipo != "int"){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el indice del vector debe ser un int";
					throw true;
				}
				if(nuevo_valor.tipo != variable.tipo){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la asignacion a lista";
					throw true;
				}

				variable.dato[indice.valor] = nuevo_valor.valor;
				break;
			case "Sentencia if":
				r1 = this.hijos[2].exec(tabla_simbolos);

				if(this.hijos.length == 7){
					if(r1.valor){
						r2 = this.hijos[5].exec(tabla_simbolos);
						return r2;
					}
				}else if(this.hijos.length == 11){
					if(r1.valor){
						r2 = this.hijos[5].exec(tabla_simbolos);
						return r2;
					}else{
						r2 = this.hijos[9].exec(tabla_simbolos);
						return r2;
					}
				}else{
					if(r1.valor){
						r2 = this.hijos[5].exec(tabla_simbolos);
						return r2;
					}else{
						r2 = this.hijos[8].exec(tabla_simbolos);
						return r2;
					}
				}
				break;
			case "Sentencia switch":
				r1 = this.hijos[2].exec(tabla_simbolos);
				if(this.hijos.length == 8){
					r2 = this.hijos[5].exec(tabla_simbolos, r1.valor);
					if(r2 != null){
						if(r2.sentencia == "return"){
							return r2;
						}else if(r2.sentencia == "break"){
							return null;
						}
					}
					r2 = this.hijos[6].exec(tabla_simbolos);
					if(r2 != null){
						if(r2.sentencia == "return"){
							return r2;
						}else if(r2.sentencia == "break"){
							return null;
						}
					}
				}else{
					r2 = this.hijos[5].exec(tabla_simbolos, r1.valor);
					if(r2 != null){
						if(r2.sentencia == "return"){
							return r2;
						}else if(r2.sentencia == "break"){
							return null;
						}
					}
				}
				break;
			case "Lista casos":
				if(this.hijos.length == 2){
					r1 = this.hijos[0].exec(tabla_simbolos, caso_selec);
					if(r1 == null){
						r1 = this.hijos[1].exec(tabla_simbolos, caso_selec);
						return r1;
					}
					return r1;
				}else{
					r1 = this.hijos[0].exec(tabla_simbolos);
					return r1;
				}
				break;
			case "Caso":
				r1 = this.hijos[1].exec(tabla_simbolos);
				r2;
				if(r1.valor == caso_selec){
					r2 = this.hijos[3].exec(tabla_simbolos);
					return r2;
				}
				break;
			case "Default":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return r1;
			case "Sentencia while":
				while(this.hijos[2].exec(tabla_simbolos).valor){
					r1 = this.hijos[5].exec(tabla_simbolos);
					if(r1!=null){
						if(r1.sentencia == "break"){
							break;
						}else if(r1.sentencia == "continue"){

						}else if(r1.sentencia == "return"){
							return r1;
						}
					}
				}
				break;
			case "Sentencia for":
				this.hijos[2].exec(tabla_simbolos);
				while(this.hijos[3].exec(tabla_simbolos).valor){
					r1 = this.hijos[8].exec(tabla_simbolos);
					if(r1!=null){
						if(r1.sentencia == "break"){
							break;
						}else if(r1.sentencia == "continue"){
							
						}else if(r1.sentencia == "return"){
							return r1;
						}
					}
					this.hijos[5].exec(tabla_simbolos);
				}
				break;
			case "Sentencia do while":
				do{
					r1 = this.hijos[2].exec(tabla_simbolos);
					if(r1 != null){
						if(r1.sentencia == "break"){
							break;
						}else if(r1.sentencia == "continue"){
							continue;
						}else if(r1.sentencia == "return"){
							return r1;
						}
					}
				} while(this.hijos[6].exec(tabla_simbolos).valor);
				break;
			case "Transferencia":
				if(this.hijos[0].token == "reservada_break"){
					return {sentencia: "break"};
				}else if (this.hijos[0].token == "reservada_continue"){
					return {sentencia: "continue"};
				}else if(this.hijos.length == 3){
					return {sentencia: "return", valor: this.hijos[1].exec(tabla_simbolos)};
				}else{
					return {sentencia: "return", valor: null};
				}
				break;
			case "Llamada":
				variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"metodo",tabla_simbolos);
				if(variable == null){
					variable = this.buscar_simbolo(this.hijos[0].dato.toLowerCase(),this.entorno,"funcion",tabla_simbolos);
				}
				clonada = tabla_simbolos;
				if(this.hijos.length == 4){
					parametros = this.hijos[2].exec(tabla_simbolos);
					args = [];
					for(let i = 0; i < variable.argumentos.length; i++){
						args.push(variable.argumentos[i].identificador)
					}
					clonada=this.clonar(tabla_simbolos, args, variable.argumentos[0].entorno);
					for( let i = 0; i < variable.argumentos.length; i++){
						 r1 = this.buscar_simbolo(variable.argumentos[i].identificador,variable.argumentos[i].entorno,"variable",clonada);
						 if(r1 == null){
						 	r1 = this.buscar_simbolo(variable.argumentos[i].identificador,variable.argumentos[i].entorno,"lista",clonada);
						 }
						 if(r1 == null){
						 	r1 = this.buscar_simbolo(variable.argumentos[i].identificador,variable.argumentos[i].entorno,"vector",clonada);
						 }
						 if(r1 == null){
						 	salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el id: \""+variable.argumentos[i]+"\" no está declarado";
							throw true;
						 }
						 if(r1.tipo == parametros[i].tipo){
						 		r1.dato= parametros[i].valor;
						 }else{
						 	salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la llamada";
							throw true;
						 }
					}
				}
				r2 = variable.instrucciones.exec(clonada);
				if(variable.constructor.name == "funcion"){
					if(r2.valor.tipo == variable.tipo){
						return r2.valor;
					}
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en el retorno de la funcion: "+variable.identificador;
					throw true;
				}
				break;
			case "Parametros llamada":
				resultado = [];
				if(this.hijos.length == 3){
					resultado = this.hijos[0].exec(tabla_simbolos);
					resultado.push(this.hijos[2].exec(tabla_simbolos));
				}else{
					resultado.push(this.hijos[0].exec(tabla_simbolos));
				}
				return resultado;
			case "Funcion print":
				r1 = this.hijos[2].exec(tabla_simbolos);
				salida.value += r1.valor+"\n";
				break;
			case "Funcion toLower":
				r1 = this.hijos[2].exec(tabla_simbolos);
				if(r1.tipo == "string"){
					return {tipo:"string", valor:r1.valor.toLowerCase()};
				}
				break;
			case "Funcion toUpper":
				r1 = this.hijos[2].exec(tabla_simbolos);
				if(r1.tipo == "string"){
					return {tipo:"string", valor:r1.valor.toUpperCase()};
				}
				break;
			case "Funcion length":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return {tipo:"int", valor:r1.valor.length};
				break;
			case "Funcion truncate":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return {tipo:"int", valor:Math.trunc(r1.valor)};
				break;
			case "Funcion round":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return {tipo:"int", valor:Math.round(r1.valor)};
				break;
			case "Funcion typeOf":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return {tipo:"string", valor: r1.tipo};
				break;
			case "Funcion toString":
				r1 = this.hijos[2].exec(tabla_simbolos);
				return {tipo:"string", valor: String(r1.valor)};
				break;
			case "Funcion toCharArray":
				r1 = this.hijos[2].exec(tabla_simbolos);
				if(r1.tipo == "string"){
				return {tipo:"char", valor: r1.valor.split("")};
				}else{
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", error de tipos en la funcion toCharArray";
					throw true;
				}
				break;
			case "Datos":
				if(this.hijos[0].token == "double"){
					return {tipo:"double", valor: parseFloat(this.hijos[0].dato)};
				}else if(this.hijos[0].token == "char"){
					return {tipo:"char", valor: this.hijos[0].dato};
				}else if(this.hijos[0].token == "string"){
					return {tipo:"string", valor: this.hijos[0].dato};
				}else if(this.hijos[0].token == "reservada_true"){
					return {tipo:"boolean", valor: true};
				}else if(this.hijos[0].token == "reservada_false"){
					return {tipo:"boolean", valor: false};
				}else if(this.hijos[0].token == "int"){
					return {tipo:"int", valor: parseInt(this.hijos[0].dato)};
				}
				break;
			case "id":
				variable = this.buscar_simbolo(this.dato.toLowerCase(),this.entorno,"variable",tabla_simbolos);
				if(variable == null){
					variable =  this.buscar_simbolo(this.dato.toLowerCase(),this.entorno,"lista",tabla_simbolos);
				}
				if(variable == null){
					variable =  this.buscar_simbolo(this.dato.toLowerCase(),this.entorno,"vector",tabla_simbolos);
				}
				if(variable == null){
					salida.value += "Error semantico en linea: "+this.fila+", columna: "+this.columna+", el id: \""+this.dato+"\" no está declarado";
					throw true;
				}
				return {tipo: variable.tipo, valor: variable.dato};
				break;
			case "instrucciones":
				if(this.hijos.length == 2){
					r1 = this.hijos[0].exec(tabla_simbolos);
					if(r1 != null){
						return r1;
					}
					return this.hijos[1].exec(tabla_simbolos);
				}
				return this.hijos[0].exec(tabla_simbolos);
				break;
			case "instruccion":
				return this.hijos[0].exec(tabla_simbolos);
				break;
		}
	}

	buscar_simbolo(id,entorno,tipo,tabla_simbolos){
		const simbolos_posibles = tabla_simbolos.filter(s => (s.constructor.name == tipo && s.identificador == id && s.entorno.every((n) => entorno.includes(n))));
		if(simbolos_posibles.length == 0){
			return null;
		}
		simbolos_posibles.sort((a,b) => (a.entorno.length > b.entorno.length) ? -1 : 1);
		return simbolos_posibles[0];
	}

	clonar(tabla_simbolos,parametros,contexto){
		let res = [];
		for(let s of tabla_simbolos){
			if((parametros.includes(s.identificador) && contexto == s.entorno) || (contexto.every((n) => s.entorno.includes(n)))){
				res.push(Object.assign(Object.create(Object.getPrototypeOf(s)), s));
			}else{
				res.push(s);
			}
		}
		return res;
	}

}