function Simplex(Tabla,ecuacion,alguras,variables) {
	var cade="collapse";
	var iOne=1;
	var One=1;
	var iTwo=1;
	var fase1=0; var fase2=1;

	var MatMax=Clonar(Tabla);
	var Pos = masNeg(MatMax[0]);//Quien entra
	var ent= salE(MatMax,Pos[1]);//Quien sale
	crearPanel('Paso a paso','Iteraciones','SegundoF');
	crearPanItera("SegundoF","Inicial ",cade+iOne,MatMax,0,alguras,variables,fase2);
	iOne++; 
	while(Pos[0]==true && ent!=false){
		MatMax = hacerPivT(MatMax,ent,Pos[1]);
		MatMax = resTablaT(MatMax,ent,Pos[1]);
		console.log(MatMax);
		crearPanItera("SegundoF","Iteracion numero "+iTwo,cade+iOne,MatMax,0,alguras,variables,fase2,Pos[1],ent);
		iOne++;	iTwo++;
		Pos = masNeg(MatMax[0]);
		ent= salE(MatMax,Pos[1]);
	}
	if(ent==false)
		alert("NO ACOTADO\nTenemos el que entra pero no el que sale");
	crearPanel('Resultados','Resultados','resu');
	var valoRes=getResultados(MatMax,ecuacion);
	crearT('resu',valoRes);
}



function twoFase(Tabla,RH,ecuacion,artificiales,alguras,variables) {
	console.log("----------------funcion twoFase--------------");	
	var tipo =document.procesar.a.value;
	var TablaResp = Tabla;
	var cade="collapse";
	var iOne=1;
	var One=1;
	var iTwo=1;
	var fase1=0; var fase2=1;

	for (var i = 0; i < TablaResp.length; i++) {
		TablaResp[i]=TablaResp[i].concat(RH[i]);
	}
	console.log(TablaResp);

	var ProMati=Clonar(TablaResp);
	var Pos = masPos(ProMati[0]);//Quien entra
	var ent= salE(ProMati,Pos[1]);//Quien sale
	console.log(Pos);

	crearPanel('Primera Fase','Iteraciones','PrimerF');
	crearPanItera("PrimerF","Inicial ",cade+iOne,ProMati,artificiales,alguras,variables,fase1);
	iOne++;
	while(Pos[0]==true && ent!=false && ProMati[0][ProMati[0].length-1] !== 0){
		ProMati=hacerPivT(ProMati,ent,Pos[1]);
		ProMati =resTablaT(ProMati,ent,Pos[1]);
		console.log(ProMati);
		crearPanItera("PrimerF","Iteracion numero "+One,cade+iOne,ProMati,artificiales,alguras,variables,fase1,Pos[1],ent);
		iOne++;
		One++;
		Pos = masPos(ProMati[0]);
		ent= salE(ProMati,Pos[1]);
		ProMati[0][ProMati[0].length-1]=truncaRH(ProMati[0][ProMati[0].length-1]);
	}

	if(tipo==0){
		crearPanel('Segunda Fase','Iteraciones','SegundoF');
		var MatMax=elimArt(ProMati,artificiales,ecuacion);
		 	Pos = masNeg(MatMax[0]);//Quien entra
		 	ent= salE(MatMax,Pos[1]);//Quien sale
			crearPanItera("SegundoF","Inicial ",cade+iOne,MatMax,artificiales,alguras,variables,fase2);
			iOne++; 
			while(Pos[0]==true && ent!=false){
				MatMax = hacerPivT(MatMax,ent,Pos[1]);
				MatMax = resTablaT(MatMax,ent,Pos[1]);
				console.log(MatMax);
				crearPanItera("SegundoF","Iteracion numero "+iTwo,cade+iOne,MatMax,artificiales,alguras,variables,fase2,Pos[1],ent);
				iOne++;
				iTwo++;
				Pos = masNeg(MatMax[0]);
				ent= salE(MatMax,Pos[1]);
			}
		crearPanel('Resultados','Resultados','resu');
		var valoRes=getResultados(MatMax,ecuacion);
		crearT('resu',valoRes);
	}
	else{
		crearPanel('Segunda Fase','Iteraciones','SegundoF');
		var MatMax=elimArt(ProMati,artificiales,ecuacion);
		 	Pos = masPos(MatMax[0]);//Quien entra
		 	ent= salE(MatMax,Pos[1]);//Quien sale	 
			crearPanItera("SegundoF","Inicial",cade+iOne,MatMax,artificiales,alguras,variables,fase2);
			iOne++;	
		 	while(Pos[0]==true){
				MatMax = hacerPivT(MatMax,ent,Pos[1]);
				MatMax = resTablaT(MatMax,ent,Pos[1]);
				console.log(MatMax);
				crearPanItera("SegundoF","Iteracion numero "+iTwo,cade+iOne,MatMax,artificiales,alguras,variables,fase2,Pos[1],ent);
				iOne++;
				iTwo++;
				Pos = masPos(MatMax[0]);
				ent= salE(MatMax,Pos[1]);
			}
		crearPanel('Resultados','Resultados','resu');
		var valoRes=getResultados(MatMax,ecuacion);
		crearT('resu',valoRes);
	}
}

function truncaRH(cero){
	if ( cero > -0.0001 && cero < 0.0001) {
		return 0;
	}
	return cero;
}

function masPos(Renglon) {
	console.log("----------------funcion masPos--------------");
	console.log(Renglon);
	
	var Renglon2=new Array();
	var Res = new Array();
	var pos;

	for (var i = 0; i <Renglon.length-1; i++)
		Renglon2[i]=Renglon[i];

	var Max = Math.max.apply(null, Renglon2);

	for (var i = 0; i < Renglon2.length; i++) {
		if(Max==Renglon2[i]){
			pos=i;
			i=Renglon2.length;
		}
	}
	if(Max<=0){
		Res.push(false); Res.push(-1);
	}
	else{
		Res.push(true);	Res.push(pos);
	}
	console.log(Max);
	return Res;
}

function masNeg(Renglon) {
	console.log(Renglon);
	
	var Renglon2=new Array();
	var Res = new Array();
	var pos;

	for (var i = 0; i <Renglon.length-1; i++)
		Renglon2[i]=Renglon[i];

	var Min = Math.min.apply(null, Renglon2);
	pos=busPos(Min,Renglon2);

	if(Min>=0){
		Res.push(false); Res.push(-1);
	}
	else{
		Res.push(true); Res.push(pos);
	}

	console.log(Min);
	console.log(pos);
	return Res;
}

function salE(Tabla,Pos) {
	console.log("----------------funcion salE----------------");
	var resRH = [0];
	var noNeg = new Array();
	var cont=1;

	var Trh=Tabla[0].length-1;
	var tami=Tabla.length;
	console.log("------verificacion minimo--------")
	for (var i = 1; i < tami; i++) {
		if(Tabla[i][Pos] <= 0){
			resRH.push(null);
			cont++;
		}
		else{
			//var val = truncarNumero(Tabla[i][Trh]/Tabla[i][Pos]);
			var val = Tabla[i][Trh]/Tabla[i][Pos];
			console.log(Tabla[i][Trh] + "/"+ Tabla[i][Pos] + "= " + val );
			resRH.push(val);
			noNeg.push(val);
		}
	}
	//console.log(cont);	
	//console.log(tami);
	if(cont==tami)
		return false;

	console.log(resRH);
	var Num= NumMenor(noNeg);
	var posSelect=busPos(Num,resRH); //regresa posicion del menor
	return posSelect;
	
}

function NumMenor(Vector){
	var min = Math.min.apply(null, Vector);
	console.log(min);
	return min;
}

function busPos(Numero, Vector) {
	for (var i = 0; i < Vector.length; i++) {
		if(Numero==Vector[i]){
			return i;
		}
	}
}

function hacerPivT(Tabla,PosOut,PosIn) {
	var Tablita=Clonar(Tabla);
	var Pivote = Tablita[PosOut][PosIn];
	var tam = Tablita[PosOut].length;
	
	for(var i = 0; i < tam; i++) {
		//Tablita[PosOut][i]=truncarNumero(Tablita[PosOut][i]/Pivote); ++++++++++++++++++++++++++++++++++++
		Tablita[PosOut][i]=Tablita[PosOut][i]/Pivote;
	}
	return Tablita;
}

function Clonar(argument) {
	var clonMat=new Array(argument.length);
	for (var i = 0; i < argument.length; i++) {
		clonMat[i]=new Array();
		clonMat[i]=argument[i].slice();
	}
	return clonMat;
}

function resTablaT(Tabla,PosOut,PosIn) {
	var real = Tabla[PosOut];
	var Tam = Tabla.length;

	for (var i = 0; i < Tam; i++) {
		if(i==PosOut)
			;
		else{
			var aElem=Tabla[i][PosIn];
			console.log("algo "+aElem);
			//if(aElem==0)
				//;	
			if(aElem>0){
				for (var j = 0; j < Tabla[i].length; j++)
					//Tabla[i][j]=truncarNumero(Tabla[i][j]-(aElem*real[j]));
					Tabla[i][j]=Tabla[i][j]-(aElem*real[j]);
			}
			if(aElem<0){
				for (var j = 0; j < Tabla[i].length; j++)
					//Tabla[i][j] = truncarNumero(Tabla[i][j]+((aElem*(-1))*real[j]));
					Tabla[i][j] = Tabla[i][j]+((aElem*(-1))*real[j]);
			}
					
		}
	}
	
	return Tabla;
}

function truncarNumero(number){
	var numString = number.toFixed(4);
	var numDecimal = 0;
	var len = numString.length;
	
	for(i=1;i<=4;i++)
		if(numString[len-i]!='0')
			break;
		else
			numDecimal++;
		//console.log("El numero truncado es " + parseFloat(number.toFixed(4-numDecimal)));
	return parseFloat(number.toFixed(4-numDecimal));
}	

function elimArt(Mati,Artificials,Ecua) {
	var Matriz=new Array();
	var Zeta = new Array();
	var Renglon= new Array();
	
	for (var i = 0; i < Mati.length; i++) {
		Matriz[i]= new Array();
		var tam=Mati[i].length;
		for (var j = 0; j < tam-Artificials; j++) {
			if(j== tam-Artificials-1){
				var tami=tam-1;
				Matriz[i][j]=Mati[i][tami];
				Zeta[j]=0;
			}
			else{
				Matriz[i][j]=Mati[i][j];
				Zeta[j]=0;
			}
		}
	}
	
	for (var i = 0; i < Ecua.length; i++) {
		var down=Matriz.length;
		for (var j= 1; j < down; j++) {
			if(Matriz[j][i]==1){
				SumaZeta(Zeta,Matriz[j],Ecua[i]);
			}
		}
	}

	console.log(Zeta);
	Renglon=Zeta.slice();
	for (var i = 0; i < Ecua.length; i++) {
		Renglon[i] = Number(Zeta[i])+Number(Ecua[i]*(-1));
	}
	console.log(Renglon);

	for (var i = 0; i < Matriz[0].length; i++) {
		Matriz[0][i]=Renglon[i];
	}
console.log(Matriz);
	return Matriz;

}

function SumaZeta(Zeta,Ren,Num) {
	for (var i = 0; i < Zeta.length; i++) {
		//Zeta[i]=truncarNumero(Number(Zeta[i])+Number(Ren[i]*Num));
		Zeta[i]=Number(Zeta[i])+Number(Ren[i]*Num);

	}
}

function getResultados(Matriz,Ecuacion) {
	var X= new Array(2);
	var valX = new Array();
	var Tam = Matriz[0].length-1;
	var down=Matriz.length;
	var Z = Matriz[0][Tam];

	X[0]=new Array();
	X[0][0]=Z;
	for (var i = 0; i < Ecuacion.length; i++) {
		for (var j= 1; j < down; j++) {
			if(Matriz[j][i]==1){
				valX.push(Matriz[j][Tam]);
			}
		}
	}

	X[1]=new Array();
	X[1]=valX;
	return X;
	

}