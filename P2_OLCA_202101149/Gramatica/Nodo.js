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
		let resultado;
		let salida = document.getElementById("consola");
		switch(this.token){
			case "Parametros":
				resultado = [];
				for(const hijo of this.hijos){
					if(hijo.token == "Parametros"){
						resultado = hijo.ejecutar(tabla_simbolos);
					}else if(hijo.token == "ID"){
						resultado.push({ "identificador": hijo.dato, "entorno": hijo.entorno});
					}
				}
				return resultado;
		}
	}

}