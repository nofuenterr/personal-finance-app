# Personal Finance App

> A personal finance dashboard for tracking transactions, managing budgets, and growing savings.

![Preview](public/Budgets-desktop.png)

**Live Demo:** [personal-finance-app-rrn.vercel.app](https://personal-finance-app-rrn.vercel.app)

---

## Overview

Personal Finance App is a responsive financial management tool built as a Frontend Mentor challenge. Users get a full dashboard overview of their finances, can drill into paginated transactions, set and manage budgets, track savings in pots, and monitor recurring bills — all with keyboard accessibility and responsive layouts across all screen sizes.

---

## Features

- Dashboard overview of all financial data at a glance
- Paginated transaction list (10 per page) with search, sort, and filter
- Full CRUD for budgets — with the latest 3 transactions per budget category displayed
- Full CRUD for savings pots — deposit and withdraw money, track progress toward goals
- Recurring bills view with monthly status indicators, search, and sort
- Pie chart visualization of budget breakdown
- Form validation across all inputs
- Fully keyboard-navigable UI
- Responsive layout for mobile, tablet, and desktop

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router |
| Forms | React Hook Form + Zod |
| UI Components | Radix UI |
| State Management | Zustand |
| Charts | Recharts |

---

## Getting Started

### Prerequisites

- Node.js `v18+`

### Installation

```bash
git clone https://github.com/nofuenterr/personal-finance-app.git
cd personal-finance-app
npm install
```

### Running the App

```bash
npm run preview
```

### Build

```bash
npm run build
```

---

## Screenshots

### Overview
| Desktop | Tablet | Mobile | 
|---|---|---|
| ![Desktop](public/Overview-desktop.png) | ![Tablet](public/Overview-tablet.png) | ![Mobile](public/Overview-mobile.png) |

### Transactions
| Desktop | Tablet | Mobile | 
|---|---|---|
| ![Desktop](public/Transactions-desktop.png) | ![Tablet](public/Transactions-tablet.png) | ![Mobile](public/Transactions-mobile.png) |

### Budgets
| Desktop | Tablet | Mobile | 
|---|---|---|
| ![Desktop](public/Budgets-desktop.png) | ![Tablet](public/Budgets-tablet.png) | ![Mobile](public/Budgets-mobile.png) |

### Pots
| Desktop | Tablet | Mobile | 
|---|---|---|
| ![Desktop](public/Pots-desktop.png) | ![Tablet](public/Pots-tablet.png) | ![Mobile](public/Pots-mobile.png) |

### Recurring Bills
| Desktop | Tablet | Mobile | 
|---|---|---|
| ![Desktop](public/Recurring-bills-desktop.png) | ![Tablet](public/Recurring-bills-tablet.png) | ![Mobile](public/Recurring-bills-mobile.png) |

---

## To-do

- [ ] Animations and transitions (e.g. sidebar open/close)
- [ ] Form for adding new transactions and recurring bills
- [ ] Fix scrollbar positioning (overlapping content)
- [ ] UI polish and code refactor for readability

---

## Credits

This project is a solution to a [Frontend Mentor](https://www.frontendmentor.io) challenge. I do not own the rights to any assets used.

---

*Developed by **RR Nofuente***