
function keyup(event){
  var numberOfLines = event.value.split("\n").length
  event.parentElement.getElementsByClassName("line-numbers")[0].innerHTML = Array(numberOfLines)
          .fill('<span></span>')
          .join('');
  if(numberOfLines >= 32){
    event.parentElement.getElementsByClassName("line-numbers")[0].style.height = (numberOfLines+1)*21 + "px";     
  }else{
     event.parentElement.getElementsByClassName("line-numbers")[0].style.height = "";
  }
  event.style.height = numberOfLines*21 + "px";
}

function keydown(event){
  if (event.key === 'Tab') {
          const start = event.target.selectionStart;
          const end = event.target.selectionEnd;

          event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);

          event.preventDefault();
        }
}


function Abrir(){
  var input = document.createElement('input');
  input.type = 'file';
  input.click();
  input.onchange = e => { 
    var file = e.target.files[0];
    var fr=new FileReader();
    fr.onload=function(){
      document.getElementById('entrada').value=fr.result.trim();
      keyup(document.getElementById("entrada"));
    }
    fr.readAsText(file); 
  }
  
}

function Guardar() {
  var n =prompt("Nombre del archivo", "Archivo_typewise");
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById("entrada").value));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function Analizar(){
  document.getElementById("consola").value ="";

  d3.select("#canvas-arbol").selectAll("*").remove();
  var parser = new gramatica.Parser();
  parser.yy = {er_l: [], er_s:[], arbol:[]};
  
  try{
    parser.parse(document.getElementById("entrada").value);
  }catch{
    document.getElementById("consola").value = "se encontraron errores en la entrada, revisa el reporte de errores abajo"
    d3.select("#canvas-simbolos").graphviz()
      .renderDot(graficar_errores(parser.yy.er_l,parser.yy.er_s));
    return;
  }

  if(parser.yy.er_l.length != 0){
    document.getElementById("consola").value = "se encontraron errores en la entrada, revisa el reporte de errores abajo"
    d3.select("#canvas-simbolos").graphviz()
      .renderDot(graficar_errores(parser.yy.er_l,parser.yy.er_s));
    return;
  }
  
  let resultado = new ast(parser.yy.arbol[0]);
  resultado.calcular_entorno(resultado.arbol);
  resultado.calcular_tabla(resultado.arbol);
  resultado.correr_programa();
  d3.select("#canvas-simbolos").graphviz()
      .renderDot(resultado.graficar_tabla());
  d3.select("#canvas-arbol").graphviz()
      .renderDot(resultado.arbol.graficar_ast());
  alert("se ha terminado el analisis, los resportes se encuentran en la parte inferior");

}

function graficar_errores(lex,sin){
  let dot = "digraph {\nlabel=\" Tabla de errores \";\nN_1[shape=none label = <\n"
                + " <TABLE border=\"0\" cellspacing=\"0\" cellpadding=\"10\" style=\"collapse\">\n"
                + "  <TR >\n"
                + "  <TD border=\"1\" bgcolor=\"#b9a8d6\"><b><font color=\"White\">Tipo de Error</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#b9a8d6\"><b><font color=\"White\">Descripción</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#b9a8d6\"><b><font color=\"White\">Linea</font></b></TD>\n"
                + "  <TD border=\"1\" bgcolor=\"#b9a8d6\"><b><font color=\"White\">Columna</font></b></TD>\n";
        dot += "  </TR>\n";

        for (const s of lex) {
            dot += "  <TR>\n"
                    + "  <TD border=\"1\">"+s.tipo+"</TD>\n"
                    + "  <TD border=\"1\">"+s.desc+"</TD>\n"
                    + "  <TD border=\"1\">"+s.lin+"</TD>\n"
                    + "  <TD border=\"1\">"+s.col+"</TD>\n"
                    + "  </TR>\n";
        }
        for (const s of sin) {
            dot += "  <TR>\n"
                    + "  <TD border=\"1\">"+s.tipo+"</TD>\n"
                    + "  <TD border=\"1\">"+s.desc+"</TD>\n"
                    + "  <TD border=\"1\">"+s.lin+"</TD>\n"
                    + "  <TD border=\"1\">"+s.col+"</TD>\n"
                    + "  </TR>\n";
        }
        
        dot += "</TABLE>>];\n}";
        return dot;
}