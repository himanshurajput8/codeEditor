export const monacoLanguagePresets = [
  {
    language: "javascript",
    defaultValue: `// JavaScript: Greet Function
function greet(name) {
  return \`Hello, \${name}\`;
}

console.log(greet("World"));`
  },
  {
    language: "typescript",
    defaultValue: `// TypeScript: Strongly Typed Greet
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

console.log(greet("World"));`
  },
  {
    language: "html",
    defaultValue: `<!-- HTML: Basic Page -->
<!DOCTYPE html>
<html>
<head>
  <title>Monaco HTML</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`
  },
  {
    language: "css",
    defaultValue: `/* CSS: Basic Styling */
body {
  background: #fefefe;
  font-family: Arial, sans-serif;
  color: #333;
}`
  },
  {
    language: "json",
    defaultValue: `{
  "name": "monaco-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  }
}`
  },
  {
    language: "markdown",
    defaultValue: `# Monaco Editor Demo

- Type some code on the left
- See syntax highlighting
- Try other languages too!

**Happy Coding!**`
  },
  {
    language: "python",
    defaultValue: `# Python: Greet Function
def greet(name):
    return f"Hello, {name}"

print(greet("World"))`
  },
  {
    language: "java",
    defaultValue: `// Java: Hello World
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World");
  }
}`
  },
  {
    language: "cpp",
    defaultValue: `// C++: Hello World
#include <iostream>
int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`
  },
  {
    language: "csharp",
    defaultValue: `// C#: Hello World
using System;
class Program {
  static void Main() {
    Console.WriteLine("Hello, World");
  }
}`
  },
  {
    language: "php",
    defaultValue: `<?php
// PHP: Hello World
echo "Hello, World!";`
  },
  {
    language: "go",
    defaultValue: `// Go: Hello World
package main
import "fmt"

func main() {
  fmt.Println("Hello, World")
}`
  },
  {
    language: "yaml",
    defaultValue: `# YAML: Config Example
app:
  name: monaco-editor
  version: 1.0.0`
  },
  {
    language: "xml",
    defaultValue: `<?xml version="1.0" encoding="UTF-8"?>
<user>
  <name>Monaco</name>
  <status>active</status>
</user>`
  },
  {
    language: "shell",
    defaultValue: `# Shell Script: Greet
#!/bin/bash
echo "Hello, World"`
  },
  {
    language: "sql",
    defaultValue: `-- SQL: Select Users
SELECT * FROM users WHERE status = 'active';`
  },
  {
    language: "dockerfile",
    defaultValue: `# Dockerfile: Node App
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]`
  },
  {
    language: "powershell",
    defaultValue: `# PowerShell: Greet
Write-Output "Hello, World"`
  },
  {
    language: "rust",
    defaultValue: `// Rust: Hello World
fn main() {
  println!("Hello, world!");
}`
  },
  {
    language: "swift",
    defaultValue: `// Swift: Hello World
import Foundation
print("Hello, World!")`
  }
];
