function GCD(a, b){
    if(b===0) return a;
    return GCD(b, a%b);
    }
function factorial(n){
    if(n===0) return 1;
    return n * factorial(n-1);
    }
export {GCD, factorial}