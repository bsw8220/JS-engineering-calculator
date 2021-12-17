let expression = "";
let preAnswer = "";

let showBtns = document.querySelectorAll('button');
for(let i = 0; i < showBtns.length; i++){
    showBtns[i].addEventListener("click", function(event){
        if(showBtns[i].value != "="){
            addExp(showBtns[i].value);
        }
    });
}

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

            //함수 문자열 치환
            // if(/(?<=\D|)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.test(expression)){
            //     console.log(/(?<=\D|)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.test(expression));
            //     console.log(/(?<=\D|)\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.exec(expression)[0]);
            //     expression = expression.replace(/\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi, /\d*.(?=sin|cos|tan|exp|ln|log|sqrt)/gi.exec(expression)[0] +' * ');
            // }
            if(expression.indexOf("!") > -1  ){
                expression = expression.replace(/.\!/gi, 'factorial('+/(?<=\D|)\d*(?=\!)/.exec(expression)[0]+')');
            }
            if(expression.indexOf("√") > -1){
                expression = expression.replace(/√/gi,'sqrt');
            }
            if(expression.indexOf("×") > -1){
                expression = expression.replace(/×/gi,'*');
            }
            if(expression.indexOf("÷") > -1){
                expression = expression.replace(/÷/gi,'/');
            }
            if(expression.indexOf("exp") > -1){
                expression = expression.replace(/exp/gi,'funcExp');
            }
            if(expression.indexOf("^") > -1){
                expression = expression.replace(/\d*.\^.*\d/gi, `Math.pow(${/\w*(?=\^)/.exec(expression)[0]},${/(?<=\^).*\w/.exec(expression)[0]})`);
            }
            if(expression.indexOf("π") > -1){
                if(/(?<=\D|)\d*\π/.exec(expression)[0] > 0){
                    expression = expression.replace(/.\π/gi, /(?<=\D|)\d*(?=\π)/.exec(expression)[0] +'*Math.PI');
                } else {
                    expression = expression.replace(/π/gi,'Math.PI');
                }
            }
            if(expression.indexOf("e") > -1){
                console.log(expression);
                console.log(/(?<=\D|)\d*(?=e\W)/gi.exec(expression));
                if(/.e(?=e\W)/.test(expression)){
                    console.log(/.(?=e\W)/.exec(expression)[0])
                    expression = expression.replace(/.e(?=e\W)/gi, /.(?=e\W)/.exec(expression)[0] +'*Math.E');
                    
                } else {
                    expression = expression.replace(/e/gi,'Math.E');
                }
            }
            console.log(expression);
            if(expression.indexOf("Ans") > -1){
                expression = expression.replace("Ans", preAnswer);
            }
            

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
