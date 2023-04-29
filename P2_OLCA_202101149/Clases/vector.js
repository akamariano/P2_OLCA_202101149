class vector{
	constructor(identificador, tipo, entorno, fila, columna){
		this.identificador = identificador.toLowerCase();
		this.tipo = tipo.toLowerCase();
		this.entorno = entorno;

		switch(tipo){
			case "int":
				this.dato_llenado = 0;
				break;
			case "double":
				this.dato_llenado = 0.0;
				break;
			case "boolean":
				this.dato_llenado = true;
				break;
			case "char":
				this.dato_llenado = '0';
				break;
			case "string":
				this.dato_llenado = "";
				break;
		}
		this.dato =this.dato_llenado;
		this.fila = fila;
		this.columna = columna;
	} 
}