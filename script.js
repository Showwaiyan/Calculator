const numPad = document.getElementById("numpad");
const screenText = document.getElementById("screen-text");

function compute(infixStr) {
    return postfixEval(infixToPostfix(infixStr));
}

numPad.addEventListener("click",e => {
    if(e.target.matches(".numpad-item")) {

        switch (e.target.dataset.key){
            case "ac":
                // Remove all the text on screen
                screenText.innerText = "";
                break;
            case "del": 
                // Delect the last character of the text on screen
                screenText.innerText = screenText.innerText.slice(0,-1);
                break;
            case "=":
                screenText.innerText = compute(screenText.innerText);
                break;
            default:
                screenText.innerText += e.target.dataset.key;
        }
    }
})

function infixToPostfix(infixStr) {
    const predence = {
        "+": 1,"-": 1,
        "×": 2,"÷": 2,
    }

    let postFixStr = "";
    const opStack = []; //Stack structure for value push or pop

    for (let current of infixStr){

        if (Number(current)) { // Checking the current character is number or not
            postFixStr += current;
        }
        else if (current === "(") {
            opStack.push(current);
        }
        else if (current === ")") {
           for (let op = opStack.length-1; op >= 0; op--) {

            if (opStack[op] !== "("){
                postFixStr += opStack[op];
                opStack.splice(op,1); // Delect the element from array
            }
            else {
                opStack.splice(op,1); // Delect the element from array
            }
           }
        }
        else {
            if (opStack.length > 0) {
                // Operator predence comprassion and push to the post fix form
               for (let j = opStack.length-1; predence[current] <= predence[opStack[j]] && j >=0; j--) {
                postFixStr += opStack[j];
                opStack.splice(j,1); // Delect the element from array
               }
               opStack.push(current);
            }
            else opStack.push(current);
        }

    }

    // There might be at least one element in operator stack,
    //so then pop this element by using
    // Array.shift() function and
    // added to the return string.
    while(opStack.length > 0) postFixStr += opStack.pop();

    return postFixStr; 
}

function postfixEval(postfixStr) {
    const numStack = [];

    for (let i of postfixStr) {
        if (Number(i)) {
            numStack.push(Number(i))
        }
        else {
            switch(i){
                case "+":
                    numStack.push(numStack.pop()+numStack.pop());
                    break;
                case "-":
                    numStack.push(numStack.pop()-numStack.pop());
                    break;
                case "×":
                    numStack.push(numStack.pop()*numStack.pop());
                    break;
                case "÷":
                    numStack.push(numStack.pop()/numStack.pop());
                    break;
            }
        }
    }
    return numStack.pop();
}