# 📋 Todo QRH - Quick Reference Handbook

A Progressive Web App (PWA) for managing checklists organized by categories. Optimized for mobile landscape mode and desktop, with a minimal, clean design and intuitive user interface.

## ✨ Features

- **📱 Progressive Web App**: Installable on mobile and desktop devices with offline support
- **🎨 Clean Design**: Minimal light theme with white background and large, readable fonts
- **📂 Category Organization**: Checklists organized into intuitive categories with icons
- **✅ Progress Tracking**: Real-time completion tracking with visual progress bars
- **💾 Persistent Storage**: Progress saved automatically in browser localStorage
- **🔗 Shareable URLs**: Each checklist and category has a unique shareable URL
- **🔄 Reset Functionality**: Clear checklist progress when needed
- **📱 Mobile Optimized**: Designed for mobile landscape mode with responsive design

## 📚 Included Checklists

### ✈️ Travel
- **Airport Travel** (15 items) - Everything you need before heading to the airport

### 🏖️ Leisure
- **Vacation Packing** (18 items) - Complete packing list for your vacation

### 📅 Daily Routines
- **Office Daily Checklist** (15 items) - Your daily routine checklist for office work

### 🚗 Vehicle Care
- **Car Fuel Stop** (15 items) - Quick checklist when fueling up your car

## 🚀 Getting Started

### View Live Demo
Visit the deployed app on GitHub Pages (after deployment).

### Run Locally

1. Clone the repository:
```bash
git clone https://github.com/devonepao/Todo-QRH.git
cd Todo-QRH
```

2. Start a local web server:
```bash
# Using Python 3
python3 -m http.server 8080

# Or using Node.js
npx http-server -p 8080
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## 📝 Adding New Checklists

Checklists are stored as JSON files for easy editing. To add a new checklist:

1. Add a new category to `data/categories.json` (if needed):
```json
{
  "id": "new-category",
  "name": "New Category",
  "icon": "🎯",
  "description": "Description of the category"
}
```

2. Add your checklist to `data/checklists.json`:
```json
{
  "id": "my-checklist",
  "name": "My Checklist",
  "icon": "📝",
  "category": "new-category",
  "description": "Description of the checklist",
  "items": [
    "First item to check",
    "Second item to check",
    "Third item to check"
  ]
}
```

3. Refresh the app to see your new checklist!

## 🛠️ Technology Stack

- **Frontend**: Pure vanilla JavaScript (no frameworks)
- **Styling**: CSS3 with Grid and Flexbox
- **Data**: JSON-based data structure
- **PWA**: Service Worker for offline functionality
- **Storage**: Browser localStorage for persistence
- **Routing**: Hash-based routing for shareable URLs
- **Deployment**: GitHub Actions for automated deployment to GitHub Pages

## 📦 Project Structure

```
Todo-QRH/
├── index.html              # Main HTML file
├── styles.css              # Styling
├── app.js                  # Application logic
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── icon-192.png            # App icon (192x192)
├── icon-512.png            # App icon (512x512)
├── data/
│   ├── categories.json     # Category definitions
│   └── checklists.json     # Checklist data
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions deployment workflow
```

## 🎯 Use Cases

- ✈️ Travel preparation and airport checklists
- 🏖️ Vacation packing lists
- 📅 Daily routines and office tasks
- 🚗 Vehicle maintenance reminders
- 📝 Custom checklists for any occasion

## 📄 License

This project is open source and available for use.

## 👨‍💻 Author

© 2025 solvepao research

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new checklists
- Improve the UI/UX
- Fix bugs
- Suggest new features

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
