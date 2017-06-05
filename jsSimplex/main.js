function $(id) {
    var r = null;
    if (Array.isArray(id))
        r = id.map($);
    else
        r = document.getElementById(id);
    return r;
}


window.onload=function(){
	document.procesar.ver.onclick = generar;
}

function resetear() {
	document.getElementById('boton').disabled=false;
	iden = 0;
	
	var specs = $('valores');
	while(specs.hasChildNodes())
		specs.removeChild(specs.firstChild);

	var Result = $('Res');
	while(Result.hasChildNodes())
		Result.removeChild(Result.firstChild);

	Result = $('Resultados');
	while(Result.hasChildNodes())
		Result.removeChild(Result.firstChild);

	Result = $('Iteraciones');
	while(Result.hasChildNodes())
		Result.removeChild(Result.firstChild);
}

function generar(){
	var variables =document.procesar.numVar.value;
	document.getElementById('boton').disabled=true;
	//Funciones en dinamicos.js
	crearPanel('Función Objetivo y Restriciones del Problema','valores','dentro');
	crearDatosPanel('dentro',variables);


}

function proceso() {
	//Numero de restricciones
	var n = document.procesar.numRes.value;
	var variables = document.procesar.numVar.value;

	var tamCol = parseInt(variables)+parseInt(1);
	var tamRen = parseInt(n)+parseInt(1);

	document.getElementById('calculos').disabled=true;

	var ids = 0;
	var Tabla = new Array(n);
	var MatrizVar = new Array();
	var VectorRes= new Array();
	var Ope = new Array();
	var ecuZ = new Array();
	var dobleU = new Array();

	//Datos para crear la matriz de artificiales y las olguras....
		var numColArt=0;
		var artificiales=0;
		var alguras=0;
		var posiArti= new Array();
	//------------------------------------------------------------

	for (var i = 0; i <n ; i++) {
		MatrizVar[i] = new Array(variables);
		for (var j = 0; j<tamCol; j++) {
			if(j==variables)
				VectorRes.push(Number(document.getElementById(ids).value));
			else
				MatrizVar[i][j] = Number(document.getElementById(ids).value);
			ids +=1;
		}
	}
	
//Procesar mayor que, menor que  o igual que
	for (var i = 0; i < n; i++) {
		var opti=$("elegir"+i);
		if(opti.value== "max")
			Ope.push(0);
		else{
			if(opti.value=="min")
				Ope.push(1);
			else
				Ope.push(2);
		}
		opti="";
	}

	//Procesar la ecuacion Z
	for (var i = 0; i < variables; i++) {
		var ect ="ecu"+i;
		var dato=Number(document.getElementById(ect).value);
		ecuZ.push(dato);
		ect="";
	}

	console.log(ecuZ);
	//Calculas el numero de columnas de la matriz de artificiales y olguras
	for (var i = 0; i < Ope.length; i++) {
		if(Ope[i]==0){
			numColArt++;
			alguras++;
		}
		else
			if(Ope[i]==1){
				posiArti.push(i);
				numColArt+=2;
				alguras++;
				artificiales++;
			}
			else{
				posiArti.push(i);
				numColArt++;
				artificiales++;
			}
	}

	if(artificiales==0){
		//Solo simplex
		var Tamn = Number(variables)+Number(alguras);
		var Zet = new Array();
		var MatriOl=crearMatrizOlguras(Ope,alguras);//Matriz de olguras
		var Reso = [0];
		var RH = Reso.concat(VectorRes);

		for (var i = 0; i < Tamn; i++) {
			if(i<variables)
				Zet[i]=(-1)*ecuZ[i];
			else
				Zet[i]=0;
		}

		for (var i = 0; i < n; i++) {
			Tabla[i] = new Array();
	 		Tabla[i] = MatrizVar[i].concat(MatriOl[i]);
		}

		var tTabla=unirTabla(Tabla,Zet,tamRen);
		console.log("Super Tabla");
		for (var i = 0; i < tTabla.length; i++)
			tTabla[i] = tTabla[i].concat(RH[i]);
		alert("Se aplicara el método Simplex");
		Simplex(tTabla,ecuZ,alguras,variables);
	}
	else{
		//Empezar 2 fases
		//Crear la Matriz de las artificiales...
		alert("Se aplicara el método de 2 fases");
		var MatriArti=crearMatrizArt(Ope,artificiales);//Matriz de artificiales
		var MatriOl=crearMatrizOlguras(Ope,alguras);//Matriz de olguras
		
		for (var i = 0; i < n; i++) {
			Tabla[i] = new Array();
	 		Tabla[i] = MatrizVar[i].concat(MatriOl[i].concat(MatriArti[i]));
		}
		
		var tam = parseInt(variables)+parseInt(numColArt);
		var limite = parseInt(variables)+parseInt(alguras);

		for (var i = 0; i < tam; i++) {
			dobleU.push(0);
		}

		var wRH=crearW(Tabla,limite,posiArti,dobleU,VectorRes);
		console.log(wRH);
		
		var tTabla=unirTabla(Tabla,dobleU,tamRen);

		console.log("Super Tabla");
		console.log(tTabla);
		var Reso = [wRH];
		var RH = Reso.concat(VectorRes);

		console.log(RH);
		twoFase(tTabla,RH,ecuZ,artificiales,alguras,variables);

	}

}


function crearMatrizArt(ArrayOpe,numArt) {
	//calcular la matriz de artificiales
	var MatAr = new Array(ArrayOpe.length);
	var posAr=0;

	for (var i = 0; i < ArrayOpe.length; i++) {
		if(ArrayOpe[i]==0){
			var arreglo=crearArr(numArt,0,posAr);
			MatAr[i]=arreglo;
		}
		else{
			var arreglo=crearArr(numArt,1,posAr);
			MatAr[i]=arreglo;
			posAr++;
		}
	}
	return MatAr;
}

function crearArr(numArt,oper,posi) {
	var arreglo=new Array();

	if(oper==0){
		for (var j = 0; j < numArt; j++)
			arreglo.push(0);
	}
	else{
		for (var j = 0; j < numArt; j++){
			if(j==posi)
				arreglo.push(1);
			else
				arreglo.push(0);
		}
	}
	return arreglo;
}


function crearMatrizOlguras(ArrayOpe,numOlg) {
	//calcular la matriz de Olguras
	var MatOl = new Array(ArrayOpe.length);
	var posOl=0;

	for (var i = 0; i < ArrayOpe.length; i++) {
		if(ArrayOpe[i]==2){
			var arreglo=crearArrOl(numOlg,2,posOl);
			MatOl[i]=arreglo;
		}
		else{
			var arreglo=crearArrOl(numOlg,ArrayOpe[i],posOl);
			MatOl[i]=arreglo;
			posOl++;

		}

	}
	return MatOl;
}

function crearArrOl(numOlg,oper,posi) {
	var arreglo = new Array();
	if(oper==2){
		for (var j = 0; j < numOlg; j++)
			arreglo.push(0);
	}

	if(oper==1){
		for (var j = 0; j < numOlg; j++){
			if(j==posi)
				arreglo.push(-1);
			else
				arreglo.push(0);
			}
		}

	if(oper==0){
		for (var j = 0; j < numOlg; j++){
			if(j==posi)
				arreglo.push(1);
			else
				arreglo.push(0);
			}
		}
	return arreglo;
}

//Tabla,limite,posiArti,dobleU,VectorRes
function crearW(Tabla,limit,posA,dobleU,vRes) {
	var totalR=0;
	for (var i = 0; i < posA.length; i++) {
		totalR= vRes[posA[i]]+totalR;
		for (var j = 0; j < limit; j++) {
				dobleU[j]= Tabla[posA[i]][j]+dobleU[j];
			}
	}
	return totalR;
	//console.log(dobleU);
}

//unirTabla(Tabla,dobleU);
function unirTabla(Tabla,dobleU,n) {
	var T = new Array();
	for (var i = 0; i < n; i++) {
		if(i==0){
			T[i] = new Array();
			T[i]= dobleU;
		}
		else{
			var poR=parseInt(i)-1;
			T[i] = new Array();
			T[i]= Tabla[poR];
		}

	}
	return T;
}

