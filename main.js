let expression = "";
let showBtns = document.querySelectorAll('button');
for(let i = 0; i < showBtns.length; i++){
    showBtns[i].addEventListener("click", function(event){
        if(showBtns[i].value != "="){
            addExp(showBtns[i].value);
        }
    });
}
// showBtns[0].addEventListener("click", addExp(showBtns[0].value), false);
function addExp(number){
    if(expression == 0){
        expression = "";
    }
    expression += number
    document.getElementById("fomula").value = expression;
}
function getSum(){
    if(expression != ""){
        document.getElementById("expression").value = expression + "=";
        expression = expression.replace(/(?<=\D|)\d*\!/, 'factorial('+/(?<=\D|)\d*(?=\!)/.exec(expression)[0]+')').replace(/√/gi,'sqrt')
        console.log(/(?<=\D|)\d*(?=\!)/g.exec(expression));
        console.log(expression);
        document.getElementById("fomula").value = eval(expression);
    } else {
        document.getElementById("fomula").value = "0";
    }
}
function tan(number){
    return Math.tan(number*Math.PI/180);
}
function sin(number){
    return Math.sin(number*Math.PI/180);
}
function cos(number){
    return Math.cos(number*Math.PI/180);
}
function exp(number){
    return Math.exp(number)
}
function sqrt(number){
    return Math.sqrt(number)
}
function factorial(number) {
    let result = 1;
    for (let i = 1; i <= number; i++) {
      result = result * i;
    }
    return result;
}
function init(){
    expression = "";
    document.getElementById("fomula").value = "0";
    document.getElementById("expression").value = "0";
}
