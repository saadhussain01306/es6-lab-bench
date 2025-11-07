export interface ES6Feature {
  id: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  gotchas: string[];
  examples: {
    title: string;
    code: string;
    expected?: string;
  }[];
  goals: string[];
  snippets: {
    title: string;
    code: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export const es6Features: ES6Feature[] = [
  {
    id: 'arrow-functions',
    title: 'Arrow Functions',
    icon: '→',
    summary: 'Concise function syntax with lexical this binding',
    description: `Arrow functions provide a more concise syntax for writing functions and lexically bind the \`this\` value. They're ideal for callbacks and functional programming patterns.

**When to use:**
- Short callback functions
- Functions that don't need their own \`this\`
- Array methods like \`map\`, \`filter\`, \`reduce\`

**When NOT to use:**
- Methods in objects (they bind \`this\` lexically)
- Constructors (cannot be used with \`new\`)
- When you need \`arguments\` object`,
    gotchas: [
      'No binding of this, arguments, super, or new.target',
      'Cannot be used as constructors',
      'No prototype property',
      'Cannot use yield within their body (cannot be generators)',
    ],
    examples: [
      {
        title: 'Basic Arrow Function',
        code: `// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function with explicit return
const addArrow = (a, b) => {
  return a + b;
};

// Arrow function with implicit return
const addShort = (a, b) => a + b;

console.log(add(2, 3));
console.log(addArrow(2, 3));
console.log(addShort(2, 3));`,
        expected: '5\n5\n5',
      },
      {
        title: 'Lexical This',
        code: `function Person() {
  this.age = 0;
  
  // Arrow function captures 'this' from Person
  setInterval(() => {
    this.age++;
    console.log(this.age);
  }, 1000);
}

const p = new Person();
// Watch the console for incrementing age`,
      },
      {
        title: 'Array Methods',
        code: `const numbers = [1, 2, 3, 4, 5];

// Map with arrow function
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

// Filter
const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);`,
        expected: 'Doubled: [2, 4, 6, 8, 10]\nEvens: [2, 4]\nSum: 15',
      },
    ],
    goals: [
      'Understand the difference between arrow functions and regular functions',
      'Know when to use arrow functions vs regular functions',
      'Master lexical this binding',
      'Use arrow functions in array methods effectively',
    ],
    snippets: [
      {
        title: 'Single Parameter (no parens needed)',
        code: 'const double = x => x * 2;',
      },
      {
        title: 'No Parameters',
        code: 'const greet = () => console.log("Hello!");',
      },
      {
        title: 'Object Return (needs parens)',
        code: 'const makeUser = (name, age) => ({ name, age });',
      },
    ],
    quiz: [
      {
        question: 'What will be the output of this code?',
        options: [
          'undefined',
          'window object',
          'the button element',
          'Error',
        ],
        answerIndex: 2,
        explanation: 'Arrow functions lexically bind `this`, so `this` refers to the surrounding context, which is the button element in this case.',
      },
    ],
  },
  {
    id: 'destructuring',
    title: 'Destructuring',
    icon: '{ }',
    summary: 'Extract values from arrays or properties from objects',
    description: `Destructuring assignment allows you to unpack values from arrays or properties from objects into distinct variables. It makes code more readable and concise.

**When to use:**
- Extracting multiple values from function returns
- Working with complex objects
- Function parameters
- Swapping variables

**Benefits:**
- Less repetitive code
- More readable
- Easy default values`,
    gotchas: [
      'Variable names must match object keys (unless aliasing)',
      'Nested destructuring can be hard to read',
      'Default values only apply to undefined, not null',
      'Order matters in array destructuring',
    ],
    examples: [
      {
        title: 'Object Destructuring',
        code: `const user = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
  city: 'NYC'
};

// Basic destructuring
const { name, age } = user;
console.log(name, age);

// With defaults
const { country = 'USA' } = user;
console.log(country);

// Aliasing
const { email: userEmail } = user;
console.log(userEmail);`,
        expected: 'Alice 30\nUSA\nalice@example.com',
      },
      {
        title: 'Array Destructuring',
        code: `const colors = ['red', 'green', 'blue', 'yellow'];

// Basic
const [first, second] = colors;
console.log(first, second);

// Skip items
const [, , third] = colors;
console.log(third);

// Rest operator
const [primary, ...others] = colors;
console.log(primary);
console.log(others);`,
        expected: 'red green\nblue\nred\n["green", "blue", "yellow"]',
      },
      {
        title: 'Nested Destructuring',
        code: `const data = {
  user: {
    name: 'Bob',
    address: {
      city: 'Boston',
      zip: '02101'
    }
  },
  posts: [1, 2, 3]
};

// Nested destructuring
const {
  user: {
    name,
    address: { city }
  },
  posts: [firstPost]
} = data;

console.log(name);
console.log(city);
console.log(firstPost);`,
        expected: 'Bob\nBoston\n1',
      },
      {
        title: 'Function Parameters',
        code: `// Destructuring in function params
function displayUser({ name, age, email = 'N/A' }) {
  console.log(\`Name: \${name}\`);
  console.log(\`Age: \${age}\`);
  console.log(\`Email: \${email}\`);
}

displayUser({
  name: 'Charlie',
  age: 25
});`,
        expected: 'Name: Charlie\nAge: 25\nEmail: N/A',
      },
    ],
    goals: [
      'Master object destructuring with defaults and aliasing',
      'Understand array destructuring and rest patterns',
      'Use nested destructuring effectively',
      'Apply destructuring in function parameters',
    ],
    snippets: [
      {
        title: 'Swap Variables',
        code: 'let a = 1, b = 2;\n[a, b] = [b, a];',
      },
      {
        title: 'Function Return',
        code: 'const getCoords = () => ({ x: 10, y: 20 });\nconst { x, y } = getCoords();',
      },
    ],
    quiz: [
      {
        question: 'What happens with default values in destructuring?',
        options: [
          'Applied when value is null or undefined',
          'Applied only when value is undefined',
          'Applied when value is falsy',
          'Never applied automatically',
        ],
        answerIndex: 1,
        explanation: 'Default values in destructuring are only applied when the value is `undefined`, not `null` or other falsy values.',
      },
    ],
  },
  {
    id: 'spread-rest',
    title: 'Spread & Rest',
    icon: '...',
    summary: 'Expand or collect elements with the ... operator',
    description: `The spread (\`...\`) operator expands iterables, while rest collects multiple elements. Same syntax, different contexts.

**Spread uses:**
- Copying arrays/objects (shallow)
- Merging arrays/objects
- Passing array elements as function arguments

**Rest uses:**
- Function parameters (variable arguments)
- Destructuring (collect remaining items)

**Key difference:**
Spread expands, rest collects.`,
    gotchas: [
      'Shallow copy only (nested objects share references)',
      'Object spread only copies enumerable own properties',
      'Spread order matters (last wins in objects)',
      'Rest parameter must be last in function params',
    ],
    examples: [
      {
        title: 'Spread in Arrays',
        code: `const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Merge arrays
const merged = [...arr1, ...arr2];
console.log(merged);

// Copy array
const copy = [...arr1];
console.log(copy);
console.log(copy === arr1); // false

// Add elements
const extended = [0, ...arr1, 4];
console.log(extended);`,
        expected: '[1, 2, 3, 4, 5, 6]\n[1, 2, 3]\nfalse\n[0, 1, 2, 3, 4]',
      },
      {
        title: 'Spread in Objects',
        code: `const defaults = { theme: 'dark', lang: 'en' };
const userPrefs = { lang: 'es', fontSize: 14 };

// Merge objects (later values win)
const settings = { ...defaults, ...userPrefs };
console.log(settings);

// Add/override properties
const updated = { ...settings, theme: 'light', new: true };
console.log(updated);`,
        expected: '{ theme: "dark", lang: "es", fontSize: 14 }\n{ theme: "light", lang: "es", fontSize: 14, new: true }',
      },
      {
        title: 'Rest in Functions',
        code: `// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5));

// Mixed parameters
function greet(greeting, ...names) {
  return \`\${greeting} \${names.join(', ')}\`;
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie'));`,
        expected: '6\n15\nHello Alice, Bob, Charlie',
      },
      {
        title: 'Shallow Copy Gotcha',
        code: `const original = {
  name: 'Alice',
  address: { city: 'NYC' }
};

const copy = { ...original };

// Modify nested object
copy.address.city = 'LA';

console.log('Original:', original.address.city);
console.log('Copy:', copy.address.city);
// Both changed! Shallow copy only`,
        expected: 'Original: LA\nCopy: LA',
      },
    ],
    goals: [
      'Understand difference between spread and rest',
      'Use spread for array/object operations',
      'Implement rest parameters in functions',
      'Recognize shallow copy limitations',
    ],
    snippets: [
      {
        title: 'Function Call with Spread',
        code: 'const nums = [1, 2, 3];\nMath.max(...nums);',
      },
      {
        title: 'Clone with Modifications',
        code: 'const updated = { ...obj, newProp: value };',
      },
    ],
    quiz: [
      {
        question: 'What type of copy does spread create?',
        options: [
          'Deep copy',
          'Shallow copy',
          'Reference copy',
          'No copy at all',
        ],
        answerIndex: 1,
        explanation: 'Spread creates a shallow copy. Nested objects/arrays still share references with the original.',
      },
    ],
  },
  {
    id: 'template-literals',
    title: 'Template Literals',
    icon: '` `',
    summary: 'Enhanced strings with interpolation and multiline support',
    description: `Template literals use backticks (\\\`) and provide string interpolation, multiline strings, and tagged templates.

**Features:**
- String interpolation with \\\${expression}
- Multiline strings without \\n
- Tagged templates for custom processing
- Expression evaluation

**When to use:**
- Building strings with variables
- Multiline text
- HTML/SQL template generation
- Custom string processing (tags)`,
    gotchas: [
      'Backticks vs quotes matter',
      'Expressions are evaluated, watch side effects',
      'Tagged templates receive split strings and values',
      'Whitespace is preserved in multiline strings',
    ],
    examples: [
      {
        title: 'Basic Interpolation',
        code: `const name = 'Alice';
const age = 30;

// String interpolation
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;
console.log(message);

// Expression evaluation
const price = 19.99;
const quantity = 3;
console.log(\`Total: $\${(price * quantity).toFixed(2)}\`);`,
        expected: "Hello, my name is Alice and I'm 30 years old.\nTotal: $59.97",
      },
      {
        title: 'Multiline Strings',
        code: `// Multiline without escaping
const html = \`
  <div class="card">
    <h1>Title</h1>
    <p>Content goes here</p>
  </div>
\`;

console.log(html);

// Preserves indentation
const poem = \`
Roses are red,
Violets are blue,
Template literals,
Are great for you!
\`;

console.log(poem);`,
      },
      {
        title: 'Tagged Templates',
        code: `// Custom tag function
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + str + value;
  }, '');
}

const user = 'Bob';
const action = 'logged in';

const log = highlight\`User \${user} just \${action}!\`;
console.log(log);`,
        expected: 'User <mark>Bob</mark> just <mark>logged in</mark>!',
      },
      {
        title: 'Nested Templates',
        code: `const items = ['apple', 'banana', 'orange'];

const list = \`
  <ul>
    \${items.map(item => \`<li>\${item}</li>\`).join('\\n    ')}
  </ul>
\`;

console.log(list);`,
      },
    ],
    goals: [
      'Use template literals for string interpolation',
      'Create multiline strings effectively',
      'Understand and use tagged templates',
      'Combine templates with expressions',
    ],
    snippets: [
      {
        title: 'HTML Template',
        code: 'const el = `<div class="${className}">${content}</div>`;',
      },
      {
        title: 'SQL Query',
        code: 'const query = `SELECT * FROM users WHERE id = ${userId}`;',
      },
    ],
    quiz: [
      {
        question: 'What happens to whitespace in template literals?',
        options: [
          'It is removed',
          'It is preserved',
          'It is converted to spaces',
          'It causes an error',
        ],
        answerIndex: 1,
        explanation: 'Template literals preserve all whitespace, including newlines and indentation.',
      },
    ],
  },
  {
    id: 'default-parameters',
    title: 'Default Parameters',
    icon: '=',
    summary: 'Set default values for function parameters',
    description: `Default parameters allow function parameters to have default values if no value or \`undefined\` is passed.

**When to use:**
- Optional function arguments
- Configuration objects
- Fallback values

**Benefits:**
- Cleaner function signatures
- No need for manual checks
- More readable code

**Note:**
Default values are only used for \`undefined\`, not \`null\` or other falsy values.`,
    gotchas: [
      'Only triggered by undefined, not null',
      'Default params are evaluated at call time',
      'Can reference earlier parameters',
      'Order matters - defaults should be at end',
    ],
    examples: [
      {
        title: 'Basic Defaults',
        code: `function greet(name = 'Guest', greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet());
console.log(greet('Alice'));
console.log(greet('Bob', 'Hi'));
console.log(greet(undefined, 'Hey'));`,
        expected: 'Hello, Guest!\nHello, Alice!\nHi, Bob!\nHey, Guest!',
      },
      {
        title: 'Expression Defaults',
        code: `// Defaults can be expressions
function createUser(name, id = Date.now()) {
  return { name, id };
}

console.log(createUser('Alice'));
console.log(createUser('Bob'));

// Function call as default
function getDefaultTimeout() {
  return 3000;
}

function request(url, timeout = getDefaultTimeout()) {
  console.log(\`Fetching \${url} with timeout \${timeout}ms\`);
}

request('/api/data');`,
      },
      {
        title: 'Referencing Earlier Params',
        code: `function calculate(x, y = x * 2, z = x + y) {
  return { x, y, z };
}

console.log(calculate(5));
console.log(calculate(5, 3));
console.log(calculate(5, 3, 20));`,
        expected: '{ x: 5, y: 10, z: 15 }\n{ x: 5, y: 3, z: 8 }\n{ x: 5, y: 3, z: 20 }',
      },
      {
        title: 'Null vs Undefined',
        code: `function test(value = 'default') {
  console.log(value);
}

test();           // undefined -> uses default
test(undefined);  // undefined -> uses default  
test(null);       // null passed through (not default!)
test('');         // empty string passed through
test(0);          // 0 passed through`,
        expected: 'default\ndefault\nnull\n\n0',
      },
    ],
    goals: [
      'Use default parameters effectively',
      'Understand undefined vs null behavior',
      'Use expressions as defaults',
      'Reference earlier parameters in defaults',
    ],
    snippets: [
      {
        title: 'Config Object',
        code: 'function setup({ theme = "dark", fontSize = 14 } = {}) { }',
      },
      {
        title: 'Required Parameter',
        code: 'const required = () => { throw new Error("Missing") };\nfunction fn(param = required()) { }',
      },
    ],
    quiz: [
      {
        question: 'When is a default parameter used?',
        options: [
          'When argument is falsy',
          'When argument is undefined',
          'When argument is null or undefined',
          'When no argument is passed',
        ],
        answerIndex: 1,
        explanation: 'Default parameters are only used when the value is `undefined` (either explicitly or by omission).',
      },
    ],
  },
  {
    id: 'classes',
    title: 'Classes',
    icon: '⚙',
    summary: 'Syntactic sugar for constructor functions and prototypes',
    description: `ES6 classes provide cleaner syntax for creating objects and implementing inheritance. They're syntactic sugar over JavaScript's prototypal inheritance.

**Features:**
- Constructor methods
- Instance and static methods
- Inheritance with extends
- Super calls
- Private fields (#)
- Getters and setters

**When to use:**
- Object-oriented patterns
- Complex object hierarchies
- Framework integration`,
    gotchas: [
      'Classes are not hoisted (unlike function declarations)',
      'Methods are non-enumerable by default',
      'Always in strict mode',
      'Cannot call constructor without new',
    ],
    examples: [
      {
        title: 'Basic Class',
        code: `class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return \`Hi, I'm \${this.name}\`;
  }

  get info() {
    return \`\${this.name} (\${this.age})\`;
  }
}

const person = new Person('Alice', 30);
console.log(person.greet());
console.log(person.info);`,
        expected: "Hi, I'm Alice\nAlice (30)",
      },
      {
        title: 'Inheritance',
        code: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return \`\${this.name} barks\`;
  }

  getInfo() {
    return \`\${super.speak()} - Breed: \${this.breed}\`;
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak());
console.log(dog.getInfo());`,
        expected: 'Buddy barks\nBuddy makes a sound - Breed: Golden Retriever',
      },
      {
        title: 'Static Methods & Private Fields',
        code: `class Counter {
  #count = 0; // Private field

  static totalCounters = 0;

  constructor() {
    Counter.totalCounters++;
  }

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }

  static getTotal() {
    return Counter.totalCounters;
  }
}

const c1 = new Counter();
const c2 = new Counter();

c1.increment();
c1.increment();

console.log('C1 count:', c1.getCount());
console.log('Total counters:', Counter.getTotal());`,
        expected: 'C1 count: 2\nTotal counters: 2',
      },
      {
        title: 'Getters and Setters',
        code: `class Temperature {
  constructor(celsius) {
    this._celsius = celsius;
  }

  get celsius() {
    return this._celsius;
  }

  set celsius(value) {
    if (value < -273.15) {
      throw new Error('Temperature below absolute zero!');
    }
    this._celsius = value;
  }

  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(25);
console.log(\`\${temp.celsius}°C = \${temp.fahrenheit}°F\`);

temp.fahrenheit = 86;
console.log(\`\${temp.celsius}°C = \${temp.fahrenheit}°F\`);`,
        expected: '25°C = 77°F\n30°C = 86°F',
      },
    ],
    goals: [
      'Create classes with constructor and methods',
      'Implement inheritance with extends and super',
      'Use static methods and private fields',
      'Understand getters and setters',
    ],
    snippets: [
      {
        title: 'Factory Method',
        code: 'class User {\n  static create(data) { return new User(data); }\n}',
      },
      {
        title: 'Method Binding',
        code: 'class Button {\n  handleClick = () => { /* lexical this */ }\n}',
      },
    ],
    quiz: [
      {
        question: 'Can you call a class constructor without new?',
        options: [
          'Yes, always',
          'No, it throws an error',
          'Yes, but only with static methods',
          'It depends on the class',
        ],
        answerIndex: 1,
        explanation: 'Class constructors must be called with `new`. Calling them without it throws a TypeError.',
      },
    ],
  },
  {
    id: 'promises',
    title: 'Promises',
    icon: '⏳',
    summary: 'Handle asynchronous operations with promises',
    description: `Promises represent the eventual completion (or failure) of an asynchronous operation. They provide a cleaner alternative to callbacks.

**States:**
- Pending: initial state
- Fulfilled: operation completed successfully
- Rejected: operation failed

**Methods:**
- .then() - handle success
- .catch() - handle errors
- .finally() - cleanup
- Promise.all() - wait for multiple
- Promise.race() - first to complete`,
    gotchas: [
      'Promises execute immediately (not lazy)',
      'Errors must be caught or they propagate',
      'then() always returns a new promise',
      'Returning a value in then() wraps it in a resolved promise',
    ],
    examples: [
      {
        title: 'Creating Promises',
        code: `// Basic promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('Success!');
    } else {
      reject('Failed!');
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));`,
      },
      {
        title: 'Chaining Promises',
        code: `// Simulated API calls
function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: 'Alice' });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]);
    }, 500);
  });
}

fetchUser(1)
  .then(user => {
    console.log('User:', user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('Posts:', posts.length);
  })
  .catch(error => console.error(error));`,
      },
      {
        title: 'Promise.all()',
        code: `const promise1 = Promise.resolve(3);
const promise2 = new Promise(resolve => 
  setTimeout(() => resolve('foo'), 100)
);
const promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log('All resolved:', values);
  });

// If any rejects, all fails
const mixed = [
  Promise.resolve(1),
  Promise.reject('Error!'),
  Promise.resolve(3)
];

Promise.all(mixed)
  .then(values => console.log(values))
  .catch(error => console.error('One failed:', error));`,
      },
      {
        title: 'Promise.race()',
        code: `const fast = new Promise(resolve => 
  setTimeout(() => resolve('Fast'), 100)
);

const slow = new Promise(resolve => 
  setTimeout(() => resolve('Slow'), 500)
);

Promise.race([fast, slow])
  .then(winner => console.log('Winner:', winner));

// Timeout pattern
function timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject('Timeout!'), ms)
  );
}

function fetchData() {
  return new Promise(resolve => 
    setTimeout(() => resolve('Data'), 2000)
  );
}

Promise.race([fetchData(), timeout(1000)])
  .then(result => console.log(result))
  .catch(error => console.error(error));`,
      },
    ],
    goals: [
      'Create and consume promises',
      'Chain promises effectively',
      'Handle errors with catch',
      'Use Promise.all() and Promise.race()',
    ],
    snippets: [
      {
        title: 'Promisify Callback',
        code: 'const promisified = (arg) => new Promise((resolve, reject) => {\n  oldFunc(arg, (err, data) => err ? reject(err) : resolve(data));\n});',
      },
      {
        title: 'Delay Function',
        code: 'const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));',
      },
    ],
    quiz: [
      {
        question: 'What happens if you don\'t catch a rejected promise?',
        options: [
          'Nothing happens',
          'Unhandled promise rejection warning/error',
          'The promise is automatically retried',
          'It becomes fulfilled',
        ],
        answerIndex: 1,
        explanation: 'Unhandled promise rejections cause warnings (and errors in Node.js strict mode).',
      },
    ],
  },
  {
    id: 'async-await',
    title: 'Async/Await',
    icon: '⏰',
    summary: 'Write asynchronous code that looks synchronous',
    description: `Async/await is syntactic sugar over promises, making asynchronous code look and behave more like synchronous code.

**async keyword:**
- Makes function return a promise
- Allows use of await inside

**await keyword:**
- Pauses execution until promise resolves
- Can only be used in async functions
- Returns the resolved value

**Benefits:**
- More readable than .then() chains
- Error handling with try/catch
- Easier debugging`,
    gotchas: [
      'await only works in async functions (or top-level in modules)',
      'Sequential awaits can be slow - use Promise.all() for parallel',
      'Errors must be caught with try/catch or .catch()',
      'Returning a value from async function wraps it in a promise',
    ],
    examples: [
      {
        title: 'Basic Async/Await',
        code: `// Simulate API call
function fetchData(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, data: 'Some data' });
    }, 1000);
  });
}

async function getData() {
  console.log('Fetching...');
  const result = await fetchData(1);
  console.log('Got:', result);
  return result;
}

getData();`,
      },
      {
        title: 'Error Handling',
        code: `function riskyOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      success ? resolve('Success!') : reject('Failed!');
    }, 500);
  });
}

async function handleRisk() {
  try {
    const result = await riskyOperation();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error caught:', error);
  } finally {
    console.log('Cleanup');
  }
}

handleRisk();`,
      },
      {
        title: 'Sequential vs Parallel',
        code: `function delay(ms, value) {
  return new Promise(resolve => 
    setTimeout(() => resolve(value), ms)
  );
}

// Sequential (slow - 3 seconds total)
async function sequential() {
  console.time('Sequential');
  const a = await delay(1000, 'A');
  const b = await delay(1000, 'B');
  const c = await delay(1000, 'C');
  console.timeEnd('Sequential');
  console.log([a, b, c]);
}

// Parallel (fast - 1 second total)
async function parallel() {
  console.time('Parallel');
  const [a, b, c] = await Promise.all([
    delay(1000, 'A'),
    delay(1000, 'B'),
    delay(1000, 'C')
  ]);
  console.timeEnd('Parallel');
  console.log([a, b, c]);
}

parallel();
// sequential(); // Try this to see the difference`,
      },
      {
        title: 'Real-World Example',
        code: `// Simulated API
const api = {
  getUser: (id) => 
    Promise.resolve({ id, name: 'Alice', posts: [1, 2] }),
  getPost: (id) => 
    Promise.resolve({ id, title: \`Post \${id}\` })
};

async function getUserWithPosts(userId) {
  try {
    // Get user
    const user = await api.getUser(userId);
    console.log('User:', user.name);

    // Get all posts in parallel
    const posts = await Promise.all(
      user.posts.map(id => api.getPost(id))
    );
    
    console.log('Posts:', posts.map(p => p.title));
    
    return { user, posts };
  } catch (error) {
    console.error('Failed to load data:', error);
    throw error;
  }
}

getUserWithPosts(1);`,
      },
    ],
    goals: [
      'Write async functions with await',
      'Handle errors with try/catch',
      'Understand sequential vs parallel execution',
      'Convert promise chains to async/await',
    ],
    snippets: [
      {
        title: 'IIFE Async',
        code: '(async () => {\n  const data = await fetch("/api");\n})();',
      },
      {
        title: 'Async forEach Alternative',
        code: 'await Promise.all(items.map(async (item) => {\n  await process(item);\n}));',
      },
    ],
    quiz: [
      {
        question: 'How do you run multiple async operations in parallel?',
        options: [
          'await them one after another',
          'Use Promise.all() with await',
          'Use async.parallel()',
          'They run in parallel automatically',
        ],
        answerIndex: 1,
        explanation: 'Use `await Promise.all([...])` to run multiple async operations in parallel.',
      },
    ],
  },
  {
    id: 'modules',
    title: 'ES Modules',
    icon: '📦',
    summary: 'Import and export code between files',
    description: `ES modules provide a standardized way to organize and share code between files.

**Export types:**
- Named exports: \`export const x = 1\`
- Default export: \`export default MyClass\`
- Re-exports: \`export { x } from './file'\`

**Import types:**
- Named imports: \`import { x, y } from './file'\`
- Default import: \`import MyClass from './file'\`
- Namespace import: \`import * as utils from './utils'\`
- Dynamic import: \`import('./file').then(...)\`

**Benefits:**
- Better code organization
- Tree-shaking
- Explicit dependencies`,
    gotchas: [
      'Can only have one default export per file',
      'Named imports must match export names',
      'Imports are hoisted and read-only',
      'Circular dependencies can cause issues',
    ],
    examples: [
      {
        title: 'Named Exports',
        code: `// math.js (simulated)
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const PI = 3.14159;

// main.js
// import { add, multiply, PI } from './math.js';

// Simulated usage (can't actually import in this playground)
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const PI = 3.14159;

console.log(add(2, 3));
console.log(multiply(4, 5));
console.log('PI:', PI);`,
        expected: '5\n20\nPI: 3.14159',
      },
      {
        title: 'Default Export',
        code: `// logger.js (simulated)
export default class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(\`[\${this.name}] \${message}\`);
  }
}

// main.js
// import Logger from './logger.js';

// Simulated usage
class Logger {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(\`[\${this.name}] \${message}\`);
  }
}

const logger = new Logger('App');
logger.log('Started');`,
        expected: '[App] Started',
      },
      {
        title: 'Mixed Exports',
        code: `// utils.js (simulated)
export const VERSION = '1.0.0';
export function helper() {
  return 'Helper function';
}
export default class MainClass {
  constructor() {
    this.data = 'Main';
  }
}

// main.js
// import MainClass, { VERSION, helper } from './utils.js';

// Simulated
const VERSION = '1.0.0';
function helper() {
  return 'Helper function';
}
class MainClass {
  constructor() {
    this.data = 'Main';
  }
}

console.log('Version:', VERSION);
console.log(helper());
const instance = new MainClass();
console.log(instance.data);`,
        expected: 'Version: 1.0.0\nHelper function\nMain',
      },
      {
        title: 'Dynamic Import',
        code: `// Dynamic imports are async and return promises
async function loadModule() {
  try {
    // In real code: const module = await import('./heavy-module.js');
    
    // Simulated dynamic import
    const module = await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          default: { name: 'DynamicModule' },
          helper: () => 'Dynamic helper'
        });
      }, 100);
    });

    console.log('Module loaded:', module.default.name);
    console.log(module.helper());
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}

loadModule();`,
      },
    ],
    goals: [
      'Use named and default exports',
      'Import modules effectively',
      'Understand module scope',
      'Use dynamic imports for code splitting',
    ],
    snippets: [
      {
        title: 'Re-export',
        code: 'export { something } from "./other-module.js";',
      },
      {
        title: 'Rename Import',
        code: 'import { longName as short } from "./module.js";',
      },
      {
        title: 'Side Effect Import',
        code: 'import "./polyfills.js"; // runs code, no imports',
      },
    ],
    quiz: [
      {
        question: 'Can you have multiple default exports in one file?',
        options: [
          'Yes, unlimited',
          'No, only one default export',
          'Yes, but only two',
          'Yes, if using different syntax',
        ],
        answerIndex: 1,
        explanation: 'A module can only have one default export. You can have multiple named exports though.',
      },
    ],
  },
  {
    id: 'iterators-generators',
    title: 'Iterators & Generators',
    icon: '*',
    summary: 'Create custom iteration behavior with generators',
    description: `Iterators define how objects are iterated. Generators are functions that can pause and resume execution.

**Iterator:**
- Object with next() method
- Returns { value, done }
- Used by for...of

**Generator:**
- Function with * (function*)
- Uses yield keyword
- Automatically creates iterator
- Can pause and resume

**Use cases:**
- Custom iteration logic
- Lazy evaluation
- Infinite sequences
- State machines`,
    gotchas: [
      'Generators return iterator objects, not direct values',
      'yield only works in generator functions',
      'Generator state is preserved between calls',
      'Cannot use arrow functions for generators',
    ],
    examples: [
      {
        title: 'Basic Generator',
        code: `function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Using for...of
console.log('Using for...of:');
for (const num of numberGenerator()) {
  console.log(num);
}`,
        expected: '{ value: 1, done: false }\n{ value: 2, done: false }\n{ value: 3, done: false }\n{ value: undefined, done: true }\nUsing for...of:\n1\n2\n3',
      },
      {
        title: 'Infinite Generator',
        code: `function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const sequence = infiniteSequence();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2

// Fibonacci generator
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log('Fibonacci:');
for (let i = 0; i < 7; i++) {
  console.log(fib.next().value);
}`,
      },
      {
        title: 'Generator with Parameters',
        code: `function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

console.log('Range 0 to 5:');
for (const num of range(0, 5)) {
  console.log(num);
}

console.log('Range 0 to 10, step 2:');
for (const num of range(0, 10, 2)) {
  console.log(num);
}

// Convert to array
const arr = [...range(5, 10)];
console.log('Array:', arr);`,
      },
      {
        title: 'Custom Iterable',
        code: `class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i++) {
      yield i;
    }
  }
}

const range = new Range(1, 5);

console.log('Using for...of:');
for (const num of range) {
  console.log(num);
}

console.log('Spread:', [...range]);

// Works with array methods
const doubled = [...range].map(x => x * 2);
console.log('Doubled:', doubled);`,
      },
      {
        title: 'Generator Delegation',
        code: `function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield 3;
  yield 4;
}

function* combined() {
  yield* gen1(); // delegate to gen1
  yield* gen2(); // delegate to gen2
  yield 5;
}

console.log('Combined generator:');
for (const num of combined()) {
  console.log(num);
}

// Array delegation
function* arrayGen() {
  yield* [10, 20, 30];
  yield* 'ABC'; // strings are iterable!
}

console.log('Array delegation:');
console.log([...arrayGen()]);`,
      },
    ],
    goals: [
      'Create generator functions',
      'Understand yield and next()',
      'Build custom iterables',
      'Use generators for lazy evaluation',
    ],
    snippets: [
      {
        title: 'ID Generator',
        code: 'function* idMaker() {\n  let id = 0;\n  while (true) yield id++;\n}',
      },
      {
        title: 'Take N Items',
        code: 'function* take(n, iterable) {\n  let i = 0;\n  for (const item of iterable) {\n    if (i++ >= n) return;\n    yield item;\n  }\n}',
      },
    ],
    quiz: [
      {
        question: 'What does a generator function return?',
        options: [
          'The first yielded value',
          'An iterator object',
          'An array of all values',
          'undefined',
        ],
        answerIndex: 1,
        explanation: 'Generator functions return iterator objects. Call .next() to get values.',
      },
    ],
  },
  {
    id: 'map-set',
    title: 'Map & Set',
    icon: '🗺',
    summary: 'New collection types with enhanced capabilities',
    description: `Map and Set are new collection types that provide better alternatives to objects and arrays for certain use cases.

**Map:**
- Key-value pairs (like objects)
- Keys can be ANY type (objects, functions, etc.)
- Maintains insertion order
- Better performance for frequent additions/deletions
- Has size property

**Set:**
- Unique values only
- Values can be ANY type
- Maintains insertion order
- Fast lookup/deletion
- Great for removing duplicates

**When to use:**
- Map: when you need non-string keys or order matters
- Set: when you need unique values or fast existence checks`,
    gotchas: [
      'Maps use === for key comparison (with NaN special case)',
      'Objects as keys compare by reference, not value',
      'Sets use === for value comparison',
      'Use .get()/.set() for Maps, not bracket notation',
    ],
    examples: [
      {
        title: 'Map Basics',
        code: `const map = new Map();

// Set values
map.set('name', 'Alice');
map.set('age', 30);
map.set(42, 'number key');

// Objects as keys!
const keyObj = { id: 1 };
map.set(keyObj, 'object value');

console.log(map.get('name'));
console.log(map.get(42));
console.log(map.get(keyObj));
console.log('Has name:', map.has('name'));
console.log('Size:', map.size);

// Iteration
console.log('\\nIterating:');
for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}`,
      },
      {
        title: 'Map Methods',
        code: `const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

// Keys, values, entries
console.log('Keys:', [...map.keys()]);
console.log('Values:', [...map.values()]);
console.log('Entries:', [...map.entries()]);

// forEach
map.forEach((value, key) => {
  console.log(\`\${key} = \${value}\`);
});

// Delete
map.delete('b');
console.log('After delete:', [...map.keys()]);

// Clear
map.clear();
console.log('After clear, size:', map.size);`,
      },
      {
        title: 'Set Basics',
        code: `const set = new Set();

// Add values
set.add(1);
set.add(2);
set.add(3);
set.add(2); // Duplicate, won't be added

console.log('Size:', set.size);
console.log('Has 2:', set.has(2));
console.log('Has 4:', set.has(4));

// Remove duplicates from array
const numbers = [1, 2, 3, 2, 4, 3, 5];
const unique = [...new Set(numbers)];
console.log('Unique:', unique);

// Iteration
console.log('\\nIterating:');
for (const value of set) {
  console.log(value);
}`,
      },
      {
        title: 'Set Operations',
        code: `const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...setA, ...setB]);
console.log('Union:', [...union]);

// Intersection
const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);
console.log('Intersection:', [...intersection]);

// Difference
const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);
console.log('Difference:', [...difference]);

// Symmetric difference
const symDiff = new Set([
  ...[...setA].filter(x => !setB.has(x)),
  ...[...setB].filter(x => !setA.has(x))
]);
console.log('Symmetric Diff:', [...symDiff]);`,
      },
      {
        title: 'Real-World: Cache',
        code: `// Simple cache using Map
class Cache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }
}

const cache = new Cache(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
console.log('Size:', cache.cache.size);

cache.set('d', 4); // Evicts 'a'
console.log('Has a:', cache.has('a'));
console.log('Has d:', cache.has('d'));`,
      },
    ],
    goals: [
      'Use Map for key-value storage',
      'Use Set for unique collections',
      'Understand when to use Map vs Object',
      'Perform set operations (union, intersection)',
    ],
    snippets: [
      {
        title: 'Group By',
        code: 'const grouped = new Map();\narray.forEach(item => {\n  const key = item.category;\n  grouped.set(key, [...(grouped.get(key) || []), item]);\n});',
      },
      {
        title: 'Count Occurrences',
        code: 'const counts = new Map();\narray.forEach(item => {\n  counts.set(item, (counts.get(item) || 0) + 1);\n});',
      },
    ],
    quiz: [
      {
        question: 'What types can be used as Map keys?',
        options: [
          'Only strings and numbers',
          'Only strings',
          'Any type including objects',
          'Only primitive types',
        ],
        answerIndex: 2,
        explanation: 'Map keys can be ANY type - objects, functions, primitives, etc.',
      },
    ],
  },
];

export function getFeatureById(id: string): ES6Feature | undefined {
  return es6Features.find(f => f.id === id);
}
