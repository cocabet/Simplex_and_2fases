var iden=0;

function crearPanel(titulo,idPrin,idBody) {
	var divHead = $(idPrin);

	var divPanel = document.createElement('div');
	divPanel.setAttribute('class',' panel panel-primary');

	var divH = document.createElement('div');
	divH.setAttribute('class','panel panel-heading');
	var node = document.createTextNode(titulo);
	divH.appendChild(node);
	divPanel.appendChild(divH);

	var divB = document.createElement('div');
	divB.setAttribute('class','panel panel-body');
	divB.setAttribute('id',idBody);
	divPanel.appendChild(divB);
	divHead.appendChild(divPanel);
}

function crearDatosPanel(dentro,variables){
	var divHead = $(dentro);

    var divFun = document.createElement('div');
    	divFun.setAttribute('class','col-sm-12 col-md-12');

    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var td = document.createElement('td');

  
    var LabEcu = document.createElement('label');
    var ecu = document.createTextNode('Ecuación Z =');
    LabEcu.appendChild(ecu);
    td.appendChild(LabEcu);
    tr.appendChild(td);

    var nams = 1;

    for (var i = 0; i < variables; i++) {
    	var td1 = document.createElement('td');
    	var td2 = document.createElement('td');
    	var th = document.createElement('th');
    	if(i==0){
    		td2.setAttribute('style','min-width:10px;');
    		tr.appendChild(td2);	
    	}
    	else{
    		var mas= document.createTextNode('+');
    		th.setAttribute('style','min-width:20px; text-align: center;');
    		th.appendChild(mas);
    		tr.appendChild(th);		
    	}

    	var inp = document.createElement('input');
    	inp.setAttribute('type','number');
    	inp.setAttribute('class','botones form-control');
    	inp.setAttribute('placeholder','Valor X'+nams);
    	inp.setAttribute('id',"ecu"+i);
    	td1.appendChild(inp);
    	tr.appendChild(td1);

    	nams++;
    }

    table.appendChild(tr);
    divFun.appendChild(table);
    divHead.appendChild(divFun);


//Tabla con las restricciones

    var brs = document.createElement("br");
	divFun.appendChild(brs);
	brs = document.createElement("br");
	divFun.appendChild(brs);
    divHead.appendChild(divFun);

	var divR=document.createElement('div');
	divR.setAttribute('class','row');
	var inC =0;

	var tabla = document.createElement('table');

	for (var i = 0; i <document.procesar.numRes.value; i++) {
		var renglon = document.createElement('tr');
		
		for(var j=0; j<parseInt(variables)+parseInt(2); j++){
			if(j==variables){

				var columna = document.createElement('th');
				var td2 = document.createElement('td');
				td2.setAttribute('style','min-width:10px;');
    			renglon.appendChild(td2);

				var select = document.createElement('select');
				select.setAttribute('class','form-control');
				select.setAttribute('style','text-align: center;');
				//select.setAttribute('class','tamnio');
				select.setAttribute('id','elegir'+inC);

				var Max = document.createElement("option");
				Max.setAttribute('value',"max");
				Max.setAttribute('style','text-align: center;');
				var optionMax = document.createTextNode("<=");
				Max.appendChild(optionMax);
				select.appendChild(Max);

				var Min = document.createElement("option");
				Min.setAttribute('value',"min");
				Min.setAttribute('style','text-align: center;');
				var optionMin= document.createTextNode(">=");
				Min.appendChild(optionMin);
				select.appendChild(Min);

				var Igu = document.createElement("option");
				Igu.setAttribute('value',"igual");
				Igu.setAttribute('style','text-align:center;');
				var optionIgu= document.createTextNode("=");
				Igu.appendChild(optionIgu);
				select.appendChild(Igu);
				//divMd.appendChild(select);
				columna.appendChild(select);
				renglon.appendChild(columna);
				inC++;
			}
			else{
				
				if(j<variables && j>0){
					var mas= document.createTextNode('+');
					var th =document.createElement('th');
					th.setAttribute('style','min-width:20px; text-align: center;');
    				th.appendChild(mas);
	  				renglon.appendChild(th);
				}
				else{
					var td2 = document.createElement('td');
					td2.setAttribute('style','min-width:10px;');
    				renglon.appendChild(td2);	
				}
				
				
				var columna = document.createElement('td');
				var input = document.createElement('input');
				input.setAttribute('type','number');
				input.setAttribute('class','botones');
				input.setAttribute('id',iden);
				iden += 1;

				columna.appendChild(input);
				renglon.appendChild(columna);
			}
		tabla.appendChild(renglon);
		}
	}
	divR.appendChild(tabla);

	var bre = document.createElement("br");
	divR.appendChild(bre);

	var boton = document.createElement('button');
	boton.setAttribute('type','button');
	boton.setAttribute('class','btn btn-success');
	boton.setAttribute('onclick',"proceso()");
	boton.setAttribute('id','calculos');

	var tipo = document.createTextNode("Procesar entradas");
	boton.appendChild(tipo);

	divR.appendChild(boton);
	divHead.appendChild(divR);
}

function crearPanItera(idIte,Titulo,Cc,Matz,artificiales,alguras,variables,Fase,ColumIn,FilaOut) {
	var divHead = $(idIte);

	var divG = document.createElement('div');
		divG.setAttribute('class','panel-group');

	var divPanel = document.createElement('div');
		divPanel.setAttribute('class','panel panel-default');

	var divH = document.createElement('div');
		divH.setAttribute('class','panel-heading');
	var enH = document.createElement('h4');
		enH.setAttribute('class','panel-title');
	var ahrf = document.createElement('a');
		ahrf.setAttribute('data-toggle',"collapse");
		ahrf.setAttribute('href',"#"+Cc);
	var node = document.createTextNode(Titulo);
		ahrf.appendChild(node);
		enH.appendChild(ahrf);
		divH.appendChild(enH);

	var div = document.createElement('div');
		div.setAttribute('id',Cc);
		div.setAttribute('class','panel-collapse collapse');

	var divB = document.createElement('div');
		divB.setAttribute('class','panel-body');

	var tabla = document.createElement('table');
	tabla.setAttribute("class","table table-bordered");
	var thead = document.createElement('thead');
	
	if(Fase==0){
		var arti=0; var alg=0;
		var Ren=document.createElement('tr');
		
		var th1 = document.createElement('th');
			th1.setAttribute('style','text-align: center;');
		var mas1= document.createTextNode("W");
			th1.appendChild(mas1);
			Ren.appendChild(th1);

		for (var i = 0; i < Matz[0].length; i++) {
			if(i<variables){
				var th = document.createElement('th');
				if(i == ColumIn){
					th.setAttribute('style','text-align: center; background-color: #64b5f6;');	
				}
				else{
					th.setAttribute('style','text-align: center;');	
				}
				var tit=Number(i)+Number(1);
				var mas= document.createTextNode("X"+tit);
				th.appendChild(mas);
				Ren.appendChild(th);

			}
			else{
				if(i>=variables && i<(Number(variables)+Number(alguras))){
					var th = document.createElement('th');
					if(i == ColumIn){
						th.setAttribute('style','text-align: center; background-color: #64b5f6;');	
					}
					else{
						th.setAttribute('style','text-align: center;');	
					}
					var tit=Number(alg)+Number(1);
					var mas= document.createTextNode("S"+tit);
					th.appendChild(mas);
					Ren.appendChild(th);
					alg++;
				}
				else{
					if(i>=(Number(variables)+Number(alguras)) && i<(Number(variables)+Number(alguras)+Number(artificiales))  ){
						var th = document.createElement('th');
						if(i == ColumIn){
							th.setAttribute('style','text-align: center; background-color: #64b5f6;');	
						}
						else{
							th.setAttribute('style','text-align: center;');	
						}
						var tit=Number(arti)+Number(1);
						var mas= document.createTextNode("a"+tit);
						th.appendChild(mas);
						Ren.appendChild(th);
					}
					else{
						var th = document.createElement('th');
						th.setAttribute('style','text-align: center;');
						var mas= document.createTextNode("RH");
						th.appendChild(mas);
						Ren.appendChild(th);	
					}
				}
			}
		}//for
		thead.appendChild(Ren);
	}
	else{
		var alg=0;
		var Ren=document.createElement('tr');

		var th1 = document.createElement('th');
			th1.setAttribute('style','text-align: center;');
		var mas1= document.createTextNode("Z");
			th1.appendChild(mas1);
			Ren.appendChild(th1);

		for (var i = 0; i < Matz[0].length; i++) {
			if(i<variables){
				var th = document.createElement('th');
				if(i == ColumIn){
					th.setAttribute('style','text-align: center; background-color: #64b5f6;');	
				}
				else{
					th.setAttribute('style','text-align: center;');	
				}
				var tit=Number(i)+Number(1);
				var mas= document.createTextNode("X"+tit);
				th.appendChild(mas);
				Ren.appendChild(th);

			}
			else{
				if(i>=variables && i<(Number(variables)+Number(alguras))){
					var th = document.createElement('th');
					if(i == ColumIn){
						th.setAttribute('style','text-align: center; background-color: #64b5f6;');	
					}
					else{
						th.setAttribute('style','text-align: center;');	
					}
					var tit=Number(alg)+Number(1);
					var mas= document.createTextNode("S"+tit);
					th.appendChild(mas);
					Ren.appendChild(th);
					alg++;
				}
				else{
					var th = document.createElement('th');
					th.setAttribute('style','text-align: center;');
					var mas= document.createTextNode("RH");
					th.appendChild(mas);
					Ren.appendChild(th);
				}
			}
		}//for
		thead.appendChild(Ren);
	}
	tabla.appendChild(thead);
		
	var tbody = document.createElement('tbody');

		for (var i = 0; i < Matz.length; i++) {
			var tr=document.createElement('tr');
			if(i==0){
				var td2=document.createElement('td');
				if(i == FilaOut){
					td2.setAttribute('style','text-align: center; background-color: #aed581;');	
				}
				else{
					td2.setAttribute('style','text-align: center;');	
				}
				var mas2= document.createTextNode(1);
					td2.appendChild(mas2);
					tr.appendChild(td2);
				}
			else{
				var td3=document.createElement('td');
				if(i == FilaOut){
					td3.setAttribute('style','text-align: center; background-color: #aed581;');	
				}
				else{
					td3.setAttribute('style','text-align: center;');	
				}
				var mas3= document.createTextNode(0);
					td3.appendChild(mas3);
					tr.appendChild(td3);
				}

			for (var j = 0; j < Matz[i].length; j++) {
				var td=document.createElement('td');
					td.setAttribute('style','text-align: center;');
				if(i == FilaOut){
					td.setAttribute('style','text-align: center; background-color: #aed581;');	
				}
				else{
					td.setAttribute('style','text-align: center;');	
				}
				var mas= document.createTextNode(truncarNumero(Matz[i][j]));
					td.appendChild(mas);
					tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		tabla.appendChild(tbody);
		divB.appendChild(tabla);

	div.appendChild(divB);
	divPanel.appendChild(divH);
	divPanel.appendChild(div);
	divG.appendChild(divPanel);
	divHead.appendChild(divG);

}

function crearT(id,Matz) {
	var divHead = $(id);

	var tabla = document.createElement('table');
	tabla.setAttribute("class","table table-bordered");
	var thead = document.createElement('thead');
	
	var Ren=document.createElement('tr');

	for(i=0; i<2; i++){
		var th1 = document.createElement('th');
			th1.setAttribute('style','text-align: center;');
		var mas1;
		if(i==0)
			mas1= document.createTextNode("Variable");
		else
			mas1= document.createTextNode("Valor");
			
		th1.appendChild(mas1);
		Ren.appendChild(th1);
	}
	thead.appendChild(Ren);
	tabla.appendChild(thead);
		
	var tbody = document.createElement('tbody');

		for (var i = 0; i < Matz.length; i++) {
			
			if(i==0){
				var tr=document.createElement('tr');
				var td2=document.createElement('td');
					td2.setAttribute('style','text-align: center;');
				var mas2= document.createTextNode("Z");
					td2.appendChild(mas2);
					tr.appendChild(td2);

					td2=document.createElement('td');
					td2.setAttribute('style','text-align: center;');
					mas2= document.createTextNode( truncarNumero( Matz[i][0]));
					td2.appendChild(mas2);
					tr.appendChild(td2);
					tbody.appendChild(tr);
			}
			else{
				for (var j = 0; j < Matz[i].length; j++) {
					var tr=document.createElement('tr');
					var td=document.createElement('td');
						td.setAttribute('style','text-align: center;');
					var po=Number(j)+Number(1);
					var mas= document.createTextNode("X"+po);
						td.appendChild(mas);
						tr.appendChild(td);

						td=document.createElement('td');
						td.setAttribute('style','text-align: center;');
						mas= document.createTextNode(Matz[i][j]);
						td.appendChild(mas);
						tr.appendChild(td);
						tbody.appendChild(tr);
				}				
			}
		}
	
	tabla.appendChild(tbody);
	divHead.appendChild(tabla);

}
