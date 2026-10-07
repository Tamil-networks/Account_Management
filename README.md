# Moi Account Management System

A web-based account management and search system designed to quickly find and manage account records. The system supports **English and Tamil search**, **fuzzy matching for spelling variations**, and a simple responsive interface for viewing account information.

## 📌 Overview

Moi Account Management helps users efficiently search and manage account records without manually going through large amounts of data.

The application provides fast account searching with support for:

* English search
* Tamil search
* Fuzzy search for spelling variations
* Tamil account information display
* Account status management
* Protected Tick status updates
* Responsive user interface

The system uses a React frontend, Node.js/Express backend, and MySQL database.

---

## ✨ Features

### 🔎 Smart Account Search

Users can search account records using names or other supported search terms.

The system supports:

* Exact matching
* Partial matching
* Fuzzy matching
* Spelling variations
* Case-insensitive search

### 🌐 English & Tamil Search

The application supports both English and Tamil search.

Example:

```text
English:
selvamani

Tamil:
செல்வமணி
```

Tamil account information can also be displayed in the search results.

### 🧠 Fuzzy Search

The application uses fuzzy matching to find relevant records even when the search term contains spelling variations or typing mistakes.

For example:

```text
Search:
selvmani

Possible result:
selvamani
```

This improves the usability of the system when users don't know the exact spelling of a name.

### 📋 Account Information

Search results can display account-related information such as:

* Name
* Village
* Amount
* Extra Amount
* Tick status
* Tamil name
* Tamil village

### ✅ Protected Tick Update

The `Tick` status can be updated from the website.

Available values:

```text
Yes
No
```

Before changing the Tick status, the application requests a **secret code**.

Only a valid secret code allows the Tick value to be updated in the database.

This provides an additional layer of protection for sensitive account-status changes.

### 📱 Responsive Interface

The application is designed to work across:

* Mobile devices
* Tablets
* Laptops
* Desktop computers

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* Axios
* Fuse.js
* React Router
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MySQL
* Aiven Cloud Database

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    │ Mobile / PC / Web   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │ Search UI            │
                    │ Result Display       │
                    │ Tick Update          │
                    └──────────┬──────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
                               │ SQL
                               ▼
                    ┌─────────────────────┐
                    │    MySQL Database   │
                    │                     │
                    │   Moi Account Data  │
                    └─────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MySQL or access to the configured MySQL/Aiven database
* Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd moi-account-management
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 5. Start the Backend

```bash
cd backend
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔌 API

### Search Accounts

```http
GET /api/search?q=search_term
```

Example:

```text
/api/search?q=selvamani
```

The API returns matching account records based on the search term.

---

## 🔐 Security

The application includes protected functionality for updating the `Tick` status.

The update workflow is:

```text
User selects Tick value
        ↓
Secret code requested
        ↓
Code verification
        ↓
Valid?
   ↙        ↘
 Yes         No
 ↓            ↓
Update       Reject
Database     Update
```

Sensitive credentials and environment variables should be stored outside the source code.

---

## ☁️ Database

The application uses a MySQL database.

The production database can be hosted using **Aiven** or another compatible MySQL hosting provider.

The application separates database credentials from the source code using environment variables.

---

## 📸 Screenshots

### Home / Search

Add your screenshot here:

```markdown
![Home Screen](screenshots/home.png)
```

### Search Results

```markdown
![Search Results](screenshots/search-results.png)
```

### Tamil Search

```markdown
![Tamil Search](screenshots/tamil-search.png)
```

### Tick Update

```markdown
![Tick Update](screenshots/tick-update.png)
```

Create a folder such as:

```text
screenshots/
├── home.png
├── search-results.png
├── tamil-search.png
└── tick-update.png
```

---

## 🎯 Project Goals

The main goals of this project are:

* Reduce manual account searching
* Make account information easier to access
* Support Tamil and English users
* Handle spelling variations using fuzzy search
* Provide a simple and responsive interface
* Protect account-status updates
* Move account management from manual records to a digital system

---

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Role-based access control
* Advanced account editing
* Account history
* Detailed transaction tracking
* Automated reports
* PDF/Excel export
* Improved Tamil voice search
* Advanced analytics dashboard
* Audit logging for account changes

---

## 📊 Project Status

**Status: Completed ✅**

The current version includes the core account search and management functionality.

---

## 👨‍💻 Developer

**Tamilselvan**

Software Developer

---



If this project contains private or sensitive account data, make sure the repository contains only appropriate **sample/demo data** and not real personal information.
