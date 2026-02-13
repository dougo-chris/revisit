---
title: "Mermaid Diagram Test"
date: "2026-01-30"
description: "Testing Mermaid diagram rendering with dark mode support"
---

## Flowchart Example

This is a simple flowchart demonstrating conditional logic:

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
```

## Sequence Diagram

This shows interaction between user and browser:

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Request page
    Browser->>Server: HTTP GET
    Server-->>Browser: HTML response
    Browser-->>User: Render page
```

## Class Diagram

Object-oriented structure example:

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## Regular Code Block

This should still use Prism syntax highlighting:

```javascript
function hello() {
  console.log('Hello, world!')
}
```
