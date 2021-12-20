let expression = "";
let preAnswer = "";

//bubbling
let btnTable = document.querySelector('.calc-btns');
btnTable.addEventListener('click', function (event) {
    if(event.target.value != "="){
        addExp(event.target.value);
    }
    event.stopPropagation(); //stop bubbling
})

let operators= new Array();
let operatorBtns = document.querySelectorAll('.operator');
for(let i = 0; i < operatorBtns.length; i++){
    operators.push(operatorBtns[i].value);
}

function addExp(number){
    if(expression == 0){
        expression = "";
    }
    expression += number
    document.getElementById("fomula").value = expression;
}
function rebuildExp (exp) {
    //함수 문자열 치환
    if(/(?<=\s)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.test(exp)){
        console.log(/(?<=\s)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.test(exp));
        console.log(/(?<=\s)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.exec(exp)[0]);
        exp = exp.replace(/\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi, /\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.exec(exp)[0] +' * ');
    }
    console.log(exp);
    if(exp.indexOf("!") > -1  ){
        exp = exp.replace(/.\!/gi, 'factorial('+/(?<=\D|)\d*(?=\!)/.exec(exp)[0]+')');
    }
    if(exp.indexOf("√") > -1){
        exp = exp.replace(/√/gi,'sqrt');
    }
    if(exp.indexOf("×") > -1){
        exp = exp.replace(/×/gi,'*');
    }
    if(exp.indexOf("÷") > -1){
        exp = exp.replace(/÷/gi,'/');
    }
    if(exp.indexOf("exp") > -1){
        exp = exp.replace(/exp/gi,'funcExp');
    }
    if(exp.indexOf("^") > -1){
        exp = exp.replace(/\d*.\^.*\d/gi, `Math.pow(${/\w*(?=\^)/.exec(exp)[0]},${/(?<=\^).*\w/.exec(exp)[0]})`);
    }
    if(exp.indexOf("π") > -1){
        if(/(?<=\D|)\d*\π/.exec(exp)[0] > 0){
            exp = exp.replace(/.\π/gi, /(?<=\D|)\d*(?=\π)/.exec(exp)[0] +'*Math.PI');
        } else {
            exp = exp.replace(/π/gi,'Math.PI');
        }
    }
    if(exp.indexOf("e") > -1){
        console.log(exp);
        console.log(/(?<=\D|)\d*(?=e\W)/gi.exec(exp));
        if(/.e(?=e\W)/.test(exp)){
            console.log(/.(?=e\W)/.exec(exp)[0])
            exp = exp.replace(/.e(?=e\W)/gi, /.(?=e\W)/.exec(exp)[0] +'*Math.E');
            
        } else {
            exp = exp.replace(/e/gi,'Math.E');
        }
    }
    if(exp.indexOf("Ans") > -1){
        exp = exp.replace("Ans", preAnswer);
    }

    return exp;
}

function getSum(){
    if(expression != ""){
        try{
            //수식 오류 확인 및 제거
            let lastWords = expression.substring(expression.length-3, expression.length);
            if(operators.indexOf(lastWords) > -1){
                expression = expression.substring(0, expression.length-3);
            }

            //수식 표출
            document.getElementById("expression").value = expression + " = ";

            //코드 실행
            expression = rebuildExp(expression);
            console.log(expression);
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
