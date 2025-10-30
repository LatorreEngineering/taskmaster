import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Your final structure should look like:**
```
taskmaster/
├── backend/
│   ├── src/
│   │   └── server.js
│   ├── data/
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
