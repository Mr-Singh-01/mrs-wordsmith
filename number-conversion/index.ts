const romanNumerals: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

function arabicToRoman(num: number): string {
  if (num <= 0) {
    throw new Error('Number must be positive');
  }

  let result = '';

  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

// Example usage
console.log(arabicToRoman(7)); // Output: VII
console.log(arabicToRoman(24)); // Output: XXIV
console.log(arabicToRoman(1024)); // Output: MXXIV
