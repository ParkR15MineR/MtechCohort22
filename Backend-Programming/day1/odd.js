let printNumber = 0;

for (let outputNumber = 0; outputNumber <= 20; outputNumber++) {
    if (outputNumber % 2 === 1) {
        printNumber++;
        console.log(printNumber + ' -> ' + outputNumber);
    };
};