function nowyObiektAjax() {
	var ObiektXMLHttp;
	try {
		ObiektXMLHttp=new XMLHttpRequest();
	}
	catch(e) { 
		try {	ObiektXMLHttp=new ActiveXObject("Msxml2.XMLHTTP");}
		catch(e) {
			try {	ObiektXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");	}
			catch(e) {
				alert("Twoja przegladardka nie obsluguje technologii AJAX!");
				return false;
			}
		}
	}
	return ObiektXMLHttp;
}

ObiektXMLHttp=nowyObiektAjax();

function WczytajMenu()
{
	nowyObiektAjax();
	if(ObiektXMLHttp) 
	{
		var ilosc_pozycji;
		var i=0;
		var text = "";
		ObiektXMLHttp.open("GET", "menu.xml");
		ObiektXMLHttp.onreadystatechange = function()
		{
				if (ObiektXMLHttp.readyState == 4)
				{
					ilosc_pozycji=ObiektXMLHttp.responseXML.documentElement.getElementsByTagName("link").length;
					for(i=0;i<ilosc_pozycji;i++)
					{
						text = text + "<li><a href="+
						ObiektXMLHttp.responseXML.documentElement.getElementsByTagName("link")[i].firstChild.nodeValue +"\" " +
						ObiektXMLHttp.responseXML.documentElement.getElementsByTagName("zdarzenie")[i].firstChild.nodeValue +  ">" +
						ObiektXMLHttp.responseXML.documentElement.getElementsByTagName("nazwa")[i].firstChild.nodeValue + "</a></li>";
					}
					document.getElementById("menu_lista").innerHTML=text;

				}
			
		}
		ObiektXMLHttp.send(null);
	}
}

ObiektXMLHttp2=nowyObiektAjax();
function WczytajTrescStrony(numer_wezla)
{ 
	if(ObiektXMLHttp2) 
	{
		var cel1=document.getElementById("naglowek");
		var cel2=document.getElementById("tekst");
		var dlugosc;
		var tekst2 = "";
		var tekst3 = "";
		var i=0;
		ObiektXMLHttp2.open("GET", "strona.xml");
		ObiektXMLHttp2.onreadystatechange = function() 
		{
			if (ObiektXMLHttp2.readyState == 4)
			{
				dlugosc=ObiektXMLHttp2.responseXML.documentElement.getElementsByTagName("sekcja").length;
				if(numer_wezla < 0) //jesli podano niepoprawną wartosc wezla, to wypisz wszystkie
				{
					for(i=0;i<dlugosc;i++) 
					{
					//cel.innerHTML = ObiektXMLHttp.responseXML.documentElement.getElementsByTagName("link")[1].childNodes[0].nodeValue; 
						tekst2=tekst2 +  ObiektXMLHttp2.responseXML.documentElement.getElementsByTagName("sekcja")[i].firstChild.nodeValue + "<br/>";				tekst3=tekst3 + ObiektXMLHttp2.responseXML.documentElement.getElementsByTagName("tresc")[i].childNodes[0].nodeValue + "<br/>";					}
				}
				
				else
				{
					tekst2=tekst2 +  ObiektXMLHttp2.responseXML.documentElement.getElementsByTagName("sekcja")[numer_wezla].firstChild.nodeValue;				tekst3=tekst3 + ObiektXMLHttp2.responseXML.documentElement.getElementsByTagName("tresc")[numer_wezla].childNodes[0].nodeValue;
				}
				//cel.innerHTML = tekst2;
				cel1.innerHTML=tekst2;
				cel2.innerHTML=tekst3;
				
			}
		} 
	// potwierdzenie (dla metody get - null)
		ObiektXMLHttp2.send(null); 
	} 
}
function WczytajStrone()
{
	WczytajTrescStrony(0);
	WczytajMenu();
}
