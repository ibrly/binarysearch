function binarySearch(array, value) {
    let low = 0;
    let high = array.length - 1
    while (low <= high) {
        let mid = (low + high)
        let guess = array[mid]
        if (guess === value) {
            return mid
        } else {
            if (guess > value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
    }
    return false
}

