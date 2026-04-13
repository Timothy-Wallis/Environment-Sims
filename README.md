# 🌿 Ecosystem Simulator

An interactive, browser-based educational tool designed to visualise and teach core concepts in ecology and evolutionary biology. Built for classroom use, the simulator requires no installation — just open a browser and start exploring.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ecosystemsim.vercel.app-brightgreen)](https://ecosystemsim.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-1.2.0-informational)

---

## 📖 What Is It?

The Ecosystem Simulator is a collection of web-based simulations that bring environmental and evolutionary concepts to life. Each simulation is self-contained, visually driven, and controlled through simple on-screen inputs — making it accessible to students of all ages without requiring any prior technical knowledge.

The project is freely available to teachers and learners under the [MIT License](LICENSE).

---

## 🎯 Use Cases

- Teaching **natural selection** and **evolutionary trait progression** in biology classes
- Demonstrating how environmental pressures affect population dynamics
- Providing a visual complement to lectures on ecosystems and species survival
- Self-directed learning and exploration for students

---

## 🧪 Simulations

### 1. Progression Simulation
*File: `sources/html pages/evolutionarytraitsim.html`*

A real-time canvas simulation that models how a **priority trait** (colour) spreads through a population over successive generations.

**How it works:**
- A configurable number of organisms (insects) are spawned — split evenly between **brown** and **white**.
- Each organism moves randomly around the canvas and has a finite lifespan (timer).
- At each simulated year (controlled by the life span interval), every surviving organism reproduces, adding offspring proportional to its population count.
- Organisms with the **priority colour** receive a survival advantage: their lifespan timers are weighted higher, meaning they live longer and reproduce more.
- Over time, the priority-colour population dominates, visualising natural selection in action.

**Controls:**

| Control | Description |
|---|---|
| Start Simulation | Begins or resumes the animation loop |
| Pause Simulation | Freezes the current state |
| Reset Simulation | Clears all organisms and resets the year counter |
| Number of insects | Sets the initial population size (4 – 50) |
| Life Span | Sets the lifespan interval in milliseconds (1 000 – 10 000) |
| Change Color | Toggles which colour (brown / white) has the survival advantage |

---

### 2. Environment Choices *(Coming Soon)*
*File: `sources/html pages/enviornmentchoices.html`*

This simulation is currently under development. It will allow users to make environmental decisions and observe the downstream effects on an ecosystem using an interactive card-based interface.

---

## 🗂️ Project Structure

```
Environment-Sims/
│
├── index.html                              # Landing page — simulation selector
├── README.md                               # Project documentation
├── LICENSE                                 # MIT License
│
└── sources/
    └── html pages/
        ├── evolutionarytraitsim.html       # Progression Simulation page
        ├── evolutionarytraitsim.js         # Simulation logic (main loop, rendering, controls)
        ├── enviornmentchoices.html         # Environment Choices page (in development)
        │
        ├── styles/
        │   └── style.css                   # Global stylesheet
        │
        ├── icons/
        │   └── icon.png                    # Site favicon
        │
        └── assets/
            ├── obj.js                      # Organism class (position, movement, lifespan)
            ├── deltatime.js                # Delta-time utility for frame-rate-independent updates
            └── card.js                     # Card UI component (used by Environment Choices)
```

### Key Files

| File | Purpose |
|---|---|
| `index.html` | Entry point; links to all available simulations |
| `evolutionarytraitsim.js` | Core simulation engine — manages the render loop, population updates, and user input |
| `assets/obj.js` | `Obj` class representing a single organism; handles random movement and lifespan countdown |
| `assets/deltatime.js` | `DeltaTime` class that tracks elapsed time between frames for smooth, consistent updates |
| `assets/card.js` | `Card` class for rendering interactive information cards in future simulations |

---

## 🚀 Getting Started

### Online
Visit the live deployment at **[ecosystemsim.vercel.app](https://ecosystemsim.vercel.app)** — no installation required.

### Local
Because the simulations use ES modules (`import`/`export`), the files must be served over HTTP rather than opened directly from the filesystem.

1. Clone the repository:
   ```bash
   git clone https://github.com/Timothy-Wallis/Environment-Sims.git
   cd Environment-Sims
   ```

2. Serve with any static file server, for example:
   ```bash
   # Python 3
   python -m http.server 8080
   ```

3. Open `http://localhost:8080` in your browser.

---

## 🛠️ Technology

- **HTML5 Canvas** — real-time 2D rendering for the Progression Simulation
- **Vanilla JavaScript (ES Modules)** — no frameworks or build tools required
- **CSS3** — responsive styling

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Any distribution of this software must include the original license information.
