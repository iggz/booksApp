let condition = true;

if (condition) {
    function();
}

let x = condiiton || function();  // this will run if the condition is false.  Do not need () for condition. the && means execute this.

let x = condition && function();  // this will run if condition is true.

/////////////////////////////////////
Ternary 

const x = (condition) ? true : false;