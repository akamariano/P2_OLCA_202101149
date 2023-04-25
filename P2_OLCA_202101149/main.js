function Analizar(){
  var parser = new gramatica.Parser();
  parser.yy = {er_l: [], er_s:[], arbol:[]};
  
  try{
    parser.parse(document.getElementById("entrada").value);
  }catch{
    console.log("errores en la entrada");
    return;
  }

  let resultado = new ast(parser.yy.arbol[0]);
  resultado.calcular_entorno(resultado.arbol);
  resultado.calcular_tabla(resultado.arbol);


  if(parser.yy.er_l.length != 0 || parser.yy.er_s.length != 0){
    d3.select("#canvas").graphviz()
      .width("45vw") 
      .height("82vh")
      .renderDot(resultado.graficar_tabla());
  }

}