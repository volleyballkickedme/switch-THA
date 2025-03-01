/* Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

// recursive
var sum_to_n_a = function(n) {
    // your code here
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_a(n-1);
};

// memoization
var sum_to_n_b = function(n) {
    // your code here
    var sum_helper = function(n, memo) {
        if (n === 0) {
            return 0;
        }
        if (memo[n] === undefined) {
            memo[n] = n + sum_helper(n-1, memo);
        }
        return memo[n];
    }
    return sum_helper(n, {});
};

// mathematical approach
var sum_to_n_c = function(n) {
    // your code here
    return n * (n + 1) / 2;
};