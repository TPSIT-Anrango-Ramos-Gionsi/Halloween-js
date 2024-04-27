window.onload=init;
var idTimer,timer;
var r=9,c=11;
var giocoIniziato=false;
function init()
{
    let tabella=`<table>`;
    let button=document.createElement("button");
    button.style.height= "55px";
    button.style.width= "55px";
    button.style.backgroundRepeat= "no-repeat";
    button.style.backgroundPosition= "top";
    button.style.backgroundSize= "cover";
    button.style.borderRadius="5px"
    
    
    for (let i = 0; i < r; i++) {
        tabella+="<tr>"
        for (let j = 0; j < c; j++) {
            button.style.backgroundImage= `url("${returnImmagine()}")`;
            button.style.backgroundColor=`${returnColor()}`;
           // if(((i>=2-1&&i<=r-1)&&((j==0||j==1)||(j==7||j==8)))||((j>=2-1&&j<=8-1)&&((i==0||i==8))))
           if(((i>=1&&i<=r-2)&&(j==0||j==1||j==c-2||j==c-1))||(j>=2&&j<=c-3)&&(i==0||i==r-1))
           tabella+=`<td onclick="contapunti(event)">${button.outerHTML}</td>`;
                else tabella+=`<td></td>`
        } 
        tabella+="</tr>"
    } 
    tabella+="</table>"

    document.querySelector("main").innerHTML=tabella;

    document.getElementById("playInfoTimer").style.display="block";
    let playDiv=document.getElementById("playInfoTimer").outerHTML;
    document.getElementById("playInfoTimer").style.display="none";

    document.querySelector("table").innerHTML+=playDiv;

    document.querySelector("table").style.borderCollapse="collapse";
    document.querySelector("table").style.position="relative";
    /*
///metodo per inserire una cella che occupa più celle --> inserirci il playInfoTimer timer eccetera ? carino da vedere
    // let j=6,i=4;
    // do{
    //     do{
            
    //         document.querySelector(`table tr:nth-child(${i}) td:nth-child(${j})`).outerHTML="";
    //         j++;
    //     } while(j<=7);
    //     j=5;
    //     i++;
    // } while(i<=6);
    // console.log(document.querySelector("table tr:nth-child(4) td:nth-child(5)").outerHTML)
    // document.querySelector("table tr:nth-child(4) td:nth-child(5)").outerHTML=`<td style="background-color: red;" colspan="3" rowspan="3"></td>`
*/
  

for (let i = 0; i < 3; i++) {
    a=document.getElementsByClassName("material-symbols-outlined")[i].clientHeight
    document.getElementsByClassName("material-symbols-outlined")[i].style.lineHeight=`${a}px`
    document.getElementsByClassName("material-symbols-outlined")[i].style.fontSize=`${parseInt(a*80/100)}px`
    
}    
console.log(document.querySelector("header article").children.length)

for (let i = 0; i < document.querySelector("header article").children.length; i++) {
    document.querySelector("header article").children[i].style.backgroundColor=`${returnColor()}`
}

}

function returnImmagine()
{
    let immagine;
    switch(Math.round(Math.random()*(8-1)+1)){
        case 1:
            immagine="img/ghost1.png"
            break;
            case 2:
            immagine="img/ghost2.png"
            break;
            case 3:
            immagine="img/monster1.png"
            break;
            case 4:
            immagine="img/Pumpkin.png"
            break;
            case 5:
            immagine="img/Pumpkin2.png"
            break;
            case 6:
            immagine="img/skeleton1.png"
            break;
            case 7:
            immagine="img/skeleton2.png"
            break;
            case 8:
            immagine="img/skeleton3.png"
            break;
    }
    return immagine;
}
function returnColor()
{
    let colore;
    switch(Math.round(Math.random()*(6-1)+1)){
        case 1:
            colore="orange"
            break;
            case 2:
            colore="red"
            break;
            case 3:
            colore="darkorange"
            break;
            case 4:
            colore="darkgoldenrod"
            break;
            case 5:
            colore="orangered"
            break;
            case 6:
            colore="burlywood"
            break;
    }
    return colore;
}

function giochiamo(){
    aPreso=false;
    bPreso=false;
    alert("40 punti ed hai vinto")
    timer=100000;
    punti=0;
    giocoIniziato=true;
    idTimer=setInterval(timerSecondi,100)
}
function timerSecondi()
{
    
    document.querySelector("#playInfoTimer section div:last-child span:nth-child(2)").innerHTML=`${Math.floor((timer/1000)/60)}:${(Math.floor(timer/1000)%60)}`
    if(timer==0||punti>=40) 
    {
        clearInterval(idTimer)
        giocoIniziato=false;
        scoreBoard();
        init();
    }
        timer-=100;
}
var aPreso,bPreso;
const datiA=[];
const datiB=[];
    //vettori... (-_- )
function contapunti(event){

    if(giocoIniziato){
        
        if(!aPreso){
            datiA[0]=event.srcElement.style.backgroundColor
            datiA[1]=event.srcElement.style.backgroundImage
            datiA[2]=event.srcElement;
            aPreso=true
            datiA[2].style.transform="scale(1.3)"
        } else  if(!bPreso&&event.srcElement.style.transform!="scale(1.3)"){
            datiB[0]=event.srcElement.style.backgroundColor
            datiB[1]=event.srcElement.style.backgroundImage
            datiB[2]=event.srcElement;
            bPreso=true
            datiA[2].style.transform=""

        }
        // console.log(aPreso+" "+bPreso)
        if(aPreso&&bPreso){

            // for (let i = 0; i < 3; i++) {
            //     console.log(`${datiA[i]} -- ${datiB[i]}`)
            // }   
            if((datiA[0]==datiB[0])||(datiA[1]==datiB[1]))    {

                if((datiA[0]==datiB[0])&&(datiA[1]==datiB[1])) 
                {
                    console.log("card Identiche \\(^ ^)/ +3")
                    punti+=3;
                }
                else
                if(datiA[0]==datiB[0]) 
                {
                    console.log("Colore giusto (- -) +1")
                    punti++;
                }
                else 
                {
                    console.log("immagini giuste (- -;) +2")
                    punti+=2;
                }
                

                
                document.querySelector("#playInfoTimer section div:first-child span:nth-child(2)").innerHTML=`${punti}`
                datiA[2].outerHTML=""
                datiB[2].outerHTML=""
            }


                aPreso=false;
                bPreso=false;
        }
        

    }
    else alert("Premere per cominciare a giocare")
}
function scoreBoard(){
    if(punti>=40) alert("Bravo hai vinto il gioco")
    else alert("Mi spiace non hai completato in tempo il gioco")
}