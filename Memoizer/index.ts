type Func<T, R> = (arg: T) => R;

function memoize<T, R>(func: Func<T, R>): Func<T, R> {
  const cache: Map<T, R> = new Map();

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }

    const result: R = func(arg);
    cache.set(arg, result);
    return result;
  };
}

const fibonacci = memoize((n: number): number => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Output: 55
console.log(fibonacci(10)); // Output: 55 (Memoized)
