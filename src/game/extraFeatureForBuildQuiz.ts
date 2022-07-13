/** A method to change the order for the questions and the given answers */
export function shuffleOrder(array: any[]) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    };
    return array;
};

/** This method gives a random number back */
export function randomNumber(max: number): number {
    return Math.floor(Math.random() * max)
};