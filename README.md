# ES6 Interactive Playground

An interactive, educational dashboard built with **React**, designed to help developers explore and experiment with **ES6 (ECMAScript 2015+) features** through live coding, instant feedback, and detailed explanations.

---

## Project Overview

The **ES6 Interactive Playground** is a web-based application that enables users to learn and practice JavaScript ES6 features in a hands-on manner. Each ES6 feature (e.g., arrow functions, destructuring, promises, async/await, etc.) has its own section containing:

- **Concept Explanation** – Concise overview and examples of the feature.
- **Live Code Editor** – Write, edit, and execute ES6 code directly in the browser.
- **Output Console** – See real-time results and console logs.
- **Snippets and Quizzes** – Reinforce understanding with short examples and interactive quizzes.

It provides a **sandboxed, secure environment** to experiment with JavaScript code compiled via **Babel Standalone**, ensuring compatibility across browsers.

---

## Features

### 🔹 Core Functionalities

- **Interactive Playground:** Edit and run ES6 code in a live environment.
- **Babel Transpilation:** Compile modern JavaScript into browser-compatible code.
- **Console Output:** Capture `console.log()` and errors in a custom output panel.
- **Auto-Run Mode:** Execute code automatically as you type.
- **Reset & Copy:** Quickly reset to default examples or copy code/output.

### 🔹 Learning Tools

- **Explanations & Gotchas:** Rich Markdown-based learning content for each feature.
- **Code Examples:** Multiple code snippets per feature demonstrating concepts and edge cases.
- **Quizzes:** Multiple-choice questions to test understanding.
- **Goal Checklists:** Track completed learning objectives.

### 🔹 UI/UX Enhancements

- **Dark/Light Theme Toggle** using Tailwind and shadcn/ui.
- **Responsive Layout:** Works across desktop and mobile devices.
- **Accessible Interface:** Keyboard navigation, ARIA labels, and high contrast.
- **Persistent State:** Save code and theme preferences in localStorage.

---

## Project Structure

```
es6-playground/
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── assets/                   # Static images, icons, and logos
│   ├── components/               # Reusable UI components
│   │   ├── EditorPanel.tsx       # CodeMirror/Monaco editor setup
│   │   ├── OutputPanel.tsx       # Displays console output
│   │   ├── RunBar.tsx            # Run, stop, and auto-run controls
│   │   ├── FeatureCard.tsx       # Cards for each ES6 topic
│   │   ├── FeatureGrid.tsx       # Layout grid for features
│   │   ├── SearchBar.tsx         # Search functionality for features
│   │   ├── ThemeToggle.tsx       # Dark/Light mode toggle
│   │   ├── CopyButton.tsx        # Copy to clipboard utility
│   │   ├── ResetButton.tsx       # Reset to default example
│   │   ├── GoalChecklist.tsx     # Checklist for learning goals
│   │   ├── SnippetList.tsx       # Curated examples/snippets per feature
│   │   └── QuizPanel.tsx         # Multiple-choice quiz component
│   │
│   ├── data/
│   │   └── features.ts           # JSON-like data for ES6 features and examples
│   │
│   ├── hooks/
│   │   ├── useSandbox.ts         # Hook to compile and run code in a sandboxed iframe
│   │   └── useLocalStorage.ts    # Custom hook for persistent data
│   │
│   ├── pages/
│   │   ├── Home.tsx              # Overview of all ES6 features
│   │   ├── FeatureDetail.tsx     # Page for individual ES6 topics
│   │   └── Playground.tsx        # Blank editor page for experimentation
│   │
│   ├── sandbox/
│   │   ├── SandboxIframe.tsx     # Iframe for isolated code execution
│   │   └── ConsoleBridge.ts      # Handles communication between iframe and parent
│   │
│   ├── store/
│   │   └── appStore.ts           # Zustand/Context store for global state
│   │
│   ├── styles/
│   │   └── index.css             # Tailwind base styles
│   │
│   ├── utils/
│   │   ├── babelSetup.ts         # Babel presets and plugins for ES6
│   │   └── formatUtils.ts        # Helpers for formatting and parsing output
│   │
│   ├── App.tsx                   # Root component and router setup
│   ├── main.tsx                  # React entry point
│   └── vite-env.d.ts
│
├── tests/                        # Vitest + Testing Library tests
│   ├── runner.test.ts            # Tests for sandbox runner
│   ├── quiz.test.ts              # Quiz scoring logic tests
│   └── persistence.test.ts       # localStorage persistence tests
│
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## Tech Stack

| Category           | Technology                             |
| ------------------ | -------------------------------------- |
| Framework          | **React 18** + Vite                    |
| Language           | **TypeScript**                         |
| Styling            | **Tailwind CSS** + **shadcn/ui**       |
| Editor             | **CodeMirror 6** or **Monaco Editor**  |
| Compiler           | **@babel/standalone**                  |
| State Management   | **Zustand** or **React Context**       |
| Routing            | **React Router DOM**                   |
| Markdown Rendering | **react-markdown**                     |
| Testing            | **Vitest** + **React Testing Library** |

---

## Security & Sandbox Model

- All code execution runs inside a **sandboxed iframe** using `sandbox="allow-scripts"`.
- The iframe has **no access** to parent DOM or cookies.
- The app uses **postMessage** for one-way communication from the iframe.
- Execution timeouts prevent infinite loops.
- Only internal imports are allowed (no external scripts).

---

## Learning Modules (ES6 Topics)

Each ES6 topic includes detailed explanations, code examples, and interactive quizzes.

| Topic                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| Arrow Functions        | Lexical `this`, concise syntax, pitfalls.            |
| Destructuring          | Simplified extraction from arrays/objects.           |
| Spread & Rest          | Expand and merge data structures.                    |
| Default Parameters     | Handle undefined arguments gracefully.               |
| Template Literals      | Interpolated and multi-line strings.                 |
| Classes                | Object-oriented patterns in ES6.                     |
| Modules                | Encapsulation via `import`/`export`.                 |
| Promises               | Asynchronous flow control.                           |
| Async/Await            | Simplified promise handling with syntax sugar.       |
| Iterators & Generators | Custom data iteration and control flow.              |
| Map & Set              | Modern data structures for key/value and uniqueness. |

---

## How It Works

1. User selects an **ES6 feature** from the dashboard.
2. The app loads its **default example code** from `features.ts`.
3. User edits code in the **EditorPanel**.
4. On run, Babel transpiles ES6 → ES5 using **@babel/standalone**.
5. The transpiled code is injected into an **iframe** and executed.
6. Console logs are captured via `postMessage` and displayed in **OutputPanel**.

## Roadmap

- [ ] Add TypeScript Playground mode.
- [ ] Side-by-side view: ES6 vs Transpiled ES5.
- [ ] Gist import for shared code snippets.
- [ ] Offline support via service workers.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/es6-lab-bench-.git
cd es6-playground
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

---

## 🧑‍💻 Contributing

Contributions are welcome! To add a new ES6 feature:

1. Add the feature data to `features.ts`.
2. Include code examples, gotchas, and quiz questions.
3. Add corresponding Markdown documentation in `/docs/learn/`.

---

## 🧾 License

This project is licensed under the **MIT License**.
