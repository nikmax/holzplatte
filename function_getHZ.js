version = '4.11';

if(!document.getElementById('convertTool')){
div = document.createElement('div');
div.id = 'convertTool';
div.style.zIndex=100;
div.style.position='absolute';
div.style.top=0;
div.style.left=0;
div.innerHTML='<button style="padding:10px; border-radius:10px;" onclick=getHZ()>(V'+version+') Konvertiere</button><div id="convertInfo"></div>';
document.body.appendChild(div);
}

function getHZ (){

n=0;
panels=[...document.getElementsByClassName('orders-panel')];
panels.forEach((e)=>{if(e.style.display != 'none') {i=e;n++;} });
if(n==0) {alert('bitte zuerst Bestellung auswählen');return;}
n=0;
orders=[...i.getElementsByClassName('x-form-item-label-top')];
orders.forEach((e)=>{if(e.innerText == 'Menge:') {i=e.id.match(/\d+/)[0]*1;n++;}});
if(n == 0) {alert('bitte zuerst Artikel auswählen');return;}

t = document.getElementById("textfield-"+(i+36)+"-inputEl").value.match(/[ßüÜäÄöÖa-zA-Z\s\-]+/)[0];
o = document.getElementById("textareafield-"+(i+37)+"-inputEl");

//r=new RegExp(p,'g')
//x= [...t.matchAll(r)]
//x.forEach((e)=>{console.log(e[0-2])})

g = o.value.match(/Stärke:\s(\d+\.?\d*)/); s = g ? g[1] : '';
g = o.value.match(/Länge:\s(\d+\.?\d*)/); l = g ? g[1] : '';
g = o.value.match(/Breite:\s(\d+\.?\d*)/); b = g ? g[1] : '';
g = o.value.match(/Maserungsverlauf:\s(.*)/); m = g ? g[1]+' ' : '';


bs = (b+'').replaceAll('.',',');
ls = (l+'').replaceAll('.',',');

if(t.includes("Muster")){
r=t;
} else if(t.includes("MDF")){
r="HZ MDF " + s + " mm / " + bs + " x " + ls + " cm";
} else if (t.includes("HDF")){
r="HZ HDF " + s + " mm / " + bs + " x " + ls + " cm";
}else{
r="HZ BS " + t + " " + m + "/ " + s + " mm, " + bs + " x " + ls + " cm / ";
r += getUmleimer(o);
}

p = getOption(o,'Form',' ');
if(p != ''){
if (p == ' + Rechteck') ;
else if (p == ' +  Rechteck') ;
else if (p == ' + 2 Eckenrundungen') r += ' + 2xER'
else if (p == ' + 4 Eckenrundungen') r += ' + 4xER'
else if (p == ' + 2 Schräge Ecken') r += ' + 2xSchräge'
else if (p == ' + 4 Schräge Ecken') r += ' + 4xSchräge'
else if (p == ' + Schräge') r += ' + 1xSchräge'
else r += p;
}

r += getOption(o,'Rundecken','Rundecken',6);
r += getOption(o,'Radius',' ',3);
r += getOption(o,'Schrägecken','Schrägecken',6);
r += getOption(o,'Schräge',' ',3);

r += getOption(o,'Scharniere inkl. Bohrung','BuS',1);
r += getOption(o,'Steckdosenbohrungen in 70mm','Bohr.(70mm)',2);
r += getOption(o,'Lochreihen für Regalbretter','LR',4);
r += getOption(o,'Steckdosenbohrungen','Bohr.(70mm)',5);
r += getOption(o,'Bohrungen','Bohr.',2); // Anzahl ... 2 x Bohr.()
r += getOption(o,'Ausschnitte','Ausschnitt',2);

//if(confirm("übernehmen?\n" + r)){
document.getElementById("textfield-"+(i+2)+"-inputEl").value=r;


setCombobox(i+4,'Aufgenommen');
if(t.includes("Muster")){
setCombobox(i+24,'Muster');
setCombobox(i+26,'Muster Holz');
setNumberField(i+31,5); // LZ
setNumberField(i+12,0); // qm
setNumberField(i+10,'0,07'); // Gewicht
} else {
setCombobox(i+24,'Holzzuschnitt');
setCombobox(i+26,'Holz Zuschnitt');
setNumberField(i+31,14); // LZ
x = b*l/10000; x += ''; x = x.replaceAll('.',',');
setNumberField(i+12,x); // qm
x = b*l/10000*s*0.69 ; x += ''; x = x.replaceAll('.',',');
setNumberField(i+10,x); // Gewicht
}

//}
}

function getUmleimer(o){
r = '';
g = o.value.match(/Seitenauswahl der Kanten:\s(.*)/); k = g ? g[1] : '';
g = o.value.match(/Umleimer:\s(.*)/);
if(g) u = g[1];
else {
g = o.value.match(/Kantenbearbeitung:\s(.*)/);
u = g ? g[1] : 'ohne';
}
r = u;
if(!u.match(/ohne/)){
switch (k){
case 'links': r += ' (D)';break;
case 'unten': r += ' (C)';break;
case 'unten, links': r += ' (C-D)';break;
case 'rechts': r += ' (B)';break;
case 'rechts, links': r += ' (B-D)';break;
case 'rechts, unten': r += ' (B_C)';break;
case 'rechts, unten, links': r += ' (B-C-D)';break;
case 'oben': r += ' (A)';break;
case 'oben, links': r += ' (A-D)';break;
case 'oben, unten': r += ' (A-C)';break;
case 'oben, unten, links': r += ' (A-C-D)';break;
case 'oben, rechts': r += ' (A-B)';break;
case 'oben, rechts, links': r += ' (A-B-D)';break;
case 'oben, rechts, unten': r += ' (A-B-C)';break;
}
}
return r;
}
function setNumberField(i,val){
document.getElementById("numberfield-"+i+"-inputEl").value = val;}
function setCombobox(id,value){
x=document.getElementById('combobox-'+id+'-inputEl').click();
x=[...document.getElementsByClassName('x-boundlist')];
x.forEach((e)=>{if(e.style.display != 'none') y=e});
if(!y){
x=document.getElementById('combobox-'+id+'-inputEl').click();
x=[...document.getElementsByClassName('x-boundlist')];
x.forEach((e)=>{if(e.style.display != 'none') y=e});
}
x = [...y.getElementsByClassName('x-boundlist-item')]
x.forEach((e)=>{if(e.textContent == value) e.click() })}
function getOption (o,name,key='',val = 0){
result = '';
if(key == '') value = name+': ';
else value = key;

if(!name) return result;
if(val == 1) regex = new RegExp(`- ${name}:\\s*((\\w+)\\s+(\\d+).*)`);
else if(val == 2) regex = new RegExp(`- ${name}:\\s*(\\d+)`);
// else if(val == 3) regex = new RegExp(`- ${name}:\\s*( [a-zA-Z0-9_\\.]+)`);
else if(val == 4) regex = new RegExp(`- ${name}:\\s*([a-zA-Z0-9\\s]*).*(\\d+)`);
//else if(val == 6) regex = new RegExp(`- ${name}:.*(\\d+).*`);
else regex = new RegExp(`- ${name}:\\s*(.*)`);


get = o.value.match(regex);
if(get) switch (val){
case 1 : result += ' + ' + get[3] + 'x' + key + '(' + get[2] + ')';break;
case 2 : result += ' + ' + get[1] + 'x' + key + '()';break;
case 3 : result += '('+ get[1] +')';break;
case 4 : result += ' + ' + get[2] + 'x' + key + ' (' + get[1] + ')';break;
case 5 : result += ' + ' + get[1] + 'x' + key;break;
case 6 : result += ' + ' + value;break;
default: result += ' + ' + value + get[1];
}
return result;}

clear()