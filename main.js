let expression = "";
let preAnswer = "";

//bubbling
let btnTable = document.querySelector('.calc-btns');
btnTable.addEventListener('click', function (event) {
    if(event.target.value != "^" && event.target.value != "!"){
        event.target.value = event.target.innerHTML
    }

    let funcBtns = document.querySelectorAll('.func');
    for(let i = 0; i < funcBtns.length; i++){
        if(funcBtns[i] == event.target){
            event.target.value += "("
        }
    }

    if(event.target.value != " = " && event.target.value != "AC"){
        addExp(event.target.value);
    }
    event.stopPropagation(); //stop bubbling
})

function getOperators() {
    let operators= new Array();
    let operatorBtns = document.querySelectorAll('.operator');
    for(let i = 0; i < operatorBtns.length; i++){
        operators.push(operatorBtns[i].value);
    }

    return operators
}

function checkBracketClosed(exp) {
    let countOpenBracket = 0;
    let positionOpened = exp.indexOf("(");

    while (positionOpened !== -1){
        countOpenBracket++;
        positionOpened = exp.indexOf("(", positionOpened + 1);
    }
    
    let countCloseBracket = 0;
    let positionClosed = exp.indexOf(")");

    while (positionClosed !== -1){
        countCloseBracket++;
        positionClosed = exp.indexOf(")", positionClosed + 1);
    }

    if(((countOpenBracket - countCloseBracket) % 2) === 1){
        return false;
    }

    return true;
}

function addExp(number){
    if(expression == 0){
        expression = "";
    }
    expression += number
    document.getElementById("fomula").value = expression;
}

function rebuildExp (exp) {
    //곱셈 생략을 위한 문자열 치환
    if(/(?<=\s)\d*.(?=sin|cos|tan|exp|ln|log|sqrt|π|e|Ans)|^\d*.(?=sin|cos|tan|exp|ln|log|sqrt|π|e|Ans)/g.test(exp)){
        exp = exp.replace(/\d*.(?=sin|cos|tan|exp|ln|log|sqrt|π|e|Ans)/g, /\d*.(?=sin|cos|tan|exp|ln|log|sqrt|π|e|Ans)/g.exec(exp)[0] +' * ');
    }
    //각 연산 문자열을 함수로 치환
    if(exp.indexOf("!") > -1  ){
        exp = exp.replace(/.\!/g, 'factorial('+/(?<=\D|)\d*(?=\!)/.exec(exp)[0]+')');
    }
    if(exp.indexOf("√") > -1){
        exp = exp.replace(/√/g,'sqrt');
    }
    if(exp.indexOf("×") > -1){
        exp = exp.replace(/×/g,'*');
    }
    if(exp.indexOf("÷") > -1){
        exp = exp.replace(/÷/g,'/');
    }
    if(exp.indexOf("exp") > -1){
        exp = exp.replace(/exp/g,'funcExp');
    }
    if(exp.indexOf("^") > -1){
        exp = exp.replace(/\d*.\^.*\d/g, `Math.pow(${/\w*(?=\^)/.exec(exp)[0]},${/(?<=\^).*\w/.exec(exp)[0]})`);
    }
    if(exp.indexOf("π") > -1){
        exp = exp.replace(/π/g,'Math.PI');
    }
    if(exp.indexOf("e") > -1){
        exp = exp.replace(/e/g,'Math.E');
    }
    
    if(exp.indexOf("Ans") > -1){
        exp = exp.replace("Ans", preAnswer);
    }
    

    console.log(exp);
    return exp;
}

function fixWrongExp(exp) {
    operators = getOperators();
    let lastWords = exp.substring(exp.length-3, exp.length);
    if(operators.indexOf(lastWords) > -1){
        exp = exp.substring(0, exp.length-3);
    }

    return exp;
}

function getSum(){
    if(expression != ""){
        try{
            //수식 정제
            expression = fixWrongExp(expression);
            if(!checkBracketClosed(expression)){
                expression +=")"
            }
            document.getElementById("expression").value = expression + " = ";
            expression = rebuildExp(expression);

            //코드 실행
            result = (new Function ('return ' + expression));
            document.getElementById("fomula").value = result();
            preAnswer = result();
            expression = "";
        } catch(error){
            console.error(error);
            alert("수식이 잘못되었습니다.");
            expression = "";
            document.getElementById("fomula").value = "0";
        }
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
function funcExp(number){
    return Math.exp(number);
}
function sqrt(number){
    return Math.sqrt(number);
}
function factorial(number) {
    if(number != null){
        let result = 1;
        for (let i = 1; i <= number; i++) {
        result = result * i;
        }
        return result;
    } else {
        return 0;
    }
}
function ln(number){
    return Math.log(number);
}
function log(number){
    return Math.log(number)/Math.log(10);
}

function init(){
    expression = "";
    document.getElementById("fomula").value = "0";
    document.getElementById("expression").value = `Ans = ${preAnswer}`;
}
