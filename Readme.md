# Challenge 1: Code Analysis

Using the library ramda, what is the result of the following code?

`R.reduce((acc,x) => R.compose(R.flip(R.prepend)(acc), R.sum,R.map(R.add(1)))([x,...acc]), [0])([13, 28]);`

Explain each of the steps the best you can.

## Answer

This code will run the `R.reduce` iterative function, which takes the arrow function `(acc,x) => R.compose(R.flip(R.prepend)(acc), R.sum,R.map(R.add(1)))([x,...acc])`, the accumulator `[0]` and the array `([13, 28])` and will run the arrow function for every value inside the array and pass the result to the next call through the `acc`. It will return the final value of the accumulator.

The arrow function will receive the accumulator `acc`and a value `x`. Because it runes the `R.compose`function it will perform right-to-left function composition (calling the last argument function first).
### Step 1: 
   It starts by calling `R.map(R.add(1))`. The map function runs a given function, in this case `R.add(1)` for all the values in the array `[x,...acc])`.   
### Step 2: 
   On the second step the `R.compose`function will call `R.sum`. This function will return the sum of all values inside of a given array, in this case `[x+1 , (...acc)+1]`. ..
### Step 3:
   On the third step it will call the `R.flip(R.prepend)(acc)`. The `R.flip` function will reverse the order of the two first elements of the given argument. Yet, before the `R.flip`, the `R.prepend`function will run first. This will add the value of the sum of our previous array `[x+1, (...acc)+1]` to the front of the list `acc`. After this step, the first two elements in the accumulator `acc` will be in reversed positions by the `R.flip`function.

### Output:   
With the values provided in the code:

1. In the first iteration `acc = [0]` and `x = 13`.
2. After Step 1 we have `[14, 1]`.
3. After Step 2 we have `15`.
4. After Step 3 we have `[15, 0]` after calling `R.prepend`. We have `[0, 15]` after calling `R.flip`.
5. The accumulator value of `R.reduce`function is `[0, 15]`.
6. On the second iteration `acc = [0, 15]` and `x = 28`.
7. After Step 1 we have `[29, 1, 16]`.
8. After Step 2 we have `46`.
9. After Step 3 we have `[46, 0, 15]` after calling `R.prepend`. We have `[0, 46, 15]` after calling `R.flip`.
10. The `R.reduce` function will return `[0, 46, 15]`

