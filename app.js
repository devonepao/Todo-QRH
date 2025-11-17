// Todo QRH App
class TodoQRH {
    constructor() {
        this.categories = [];
        this.checklists = [];
        this.init();
    }

    async init() {
        // Set current year in footer
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(reg => console.log('Service Worker registered', reg))
                .catch(err => console.log('Service Worker registration failed', err));
        }

        // Load data
        await this.loadData();

        // Route based on URL
        this.route();

        // Handle browser back/forward
        window.addEventListener('popstate', () => this.route());
    }

    async loadData() {
        try {
            // Load categories
            const categoriesResponse = await fetch('./data/categories.json');
            this.categories = await categoriesResponse.json();

            // Load all checklists
            const checklistsResponse = await fetch('./data/checklists.json');
            this.checklists = await checklistsResponse.json();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load data. Please refresh the page.');
        }
    }

    route() {
        const path = window.location.hash.slice(1) || '/';
        const [route, param] = path.split('/').filter(p => p);

        if (!route || route === '') {
            this.showHome();
        } else if (route === 'category' && param) {
            this.showCategory(param);
        } else if (route === 'checklist' && param) {
            this.showChecklist(param);
        } else {
            this.showHome();
        }
    }

    showHome() {
        const main = document.getElementById('main-content');
        
        let html = '<h2 class="page-title">Select a Category</h2>';
        html += '<div class="categories-grid">';
        
        this.categories.forEach(category => {
            const checklistCount = this.checklists.filter(c => c.category === category.id).length;
            html += `
                <a href="#/category/${category.id}" class="category-card">
                    <div class="category-icon">${category.icon}</div>
                    <h2>${category.name}</h2>
                    <p>${category.description}</p>
                    <p style="margin-top: 0.5rem; color: #999;">${checklistCount} checklist${checklistCount !== 1 ? 's' : ''}</p>
                </a>
            `;
        });
        
        html += '</div>';
        main.innerHTML = html;
    }

    showCategory(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) {
            this.showError('Category not found');
            return;
        }

        const categoryChecklists = this.checklists.filter(c => c.category === categoryId);
        const main = document.getElementById('main-content');
        
        let html = `<a href="#/" class="back-button">← Back to Categories</a>`;
        html += `<h2 class="page-title">${category.icon} ${category.name}</h2>`;
        html += `<p style="text-align: center; color: #666; margin-bottom: 2rem; font-size: 1.1rem;">${category.description}</p>`;
        html += '<div class="checklists-grid">';
        
        categoryChecklists.forEach(checklist => {
            const progress = this.getChecklistProgress(checklist.id);
            html += `
                <a href="#/checklist/${checklist.id}" class="checklist-card">
                    <div class="checklist-header">
                        <div class="checklist-icon">${checklist.icon}</div>
                        <div>
                            <h3>${checklist.name}</h3>
                        </div>
                    </div>
                    <p class="description">${checklist.description}</p>
                    <div class="checklist-progress">
                        <span>${progress.completed} of ${progress.total} completed</span>
                        <span>${progress.percentage}%</span>
                    </div>
                </a>
            `;
        });
        
        html += '</div>';
        main.innerHTML = html;
    }

    showChecklist(checklistId) {
        const checklist = this.checklists.find(c => c.id === checklistId);
        if (!checklist) {
            this.showError('Checklist not found');
            return;
        }

        const category = this.categories.find(c => c.id === checklist.category);
        const main = document.getElementById('main-content');
        
        const progress = this.getChecklistProgress(checklistId);
        const completedItems = this.getCompletedItems(checklistId);
        
        let html = `
            <div class="checklist-page">
                <a href="#/category/${checklist.category}" class="back-button">← Back to ${category.name}</a>
                <button class="reset-button" onclick="app.resetChecklist('${checklistId}')">Reset</button>
                
                <div class="checklist-title">
                    <span style="font-size: 3rem;">${checklist.icon}</span>
                    <h2>${checklist.name}</h2>
                </div>
                
                <p class="checklist-description">${checklist.description}</p>
                
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress.percentage}%">
                        ${progress.completed} / ${progress.total} (${progress.percentage}%)
                    </div>
                </div>
                
                <ul class="checklist-items">
        `;
        
        checklist.items.forEach((item, index) => {
            const isCompleted = completedItems.includes(index);
            html += `
                <li class="checklist-item ${isCompleted ? 'completed' : ''}" 
                    onclick="app.toggleItem('${checklistId}', ${index})">
                    <div class="checkbox"></div>
                    <span>${item}</span>
                </li>
            `;
        });
        
        html += `
                </ul>
            </div>
        `;
        
        main.innerHTML = html;
    }

    getCompletedItems(checklistId) {
        const key = `checklist_${checklistId}`;
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : [];
    }

    saveCompletedItems(checklistId, completedItems) {
        const key = `checklist_${checklistId}`;
        localStorage.setItem(key, JSON.stringify(completedItems));
    }

    toggleItem(checklistId, itemIndex) {
        const completedItems = this.getCompletedItems(checklistId);
        const index = completedItems.indexOf(itemIndex);
        
        if (index > -1) {
            completedItems.splice(index, 1);
        } else {
            completedItems.push(itemIndex);
        }
        
        this.saveCompletedItems(checklistId, completedItems);
        this.showChecklist(checklistId); // Refresh the view
    }

    resetChecklist(checklistId) {
        if (confirm('Are you sure you want to reset this checklist?')) {
            const key = `checklist_${checklistId}`;
            localStorage.removeItem(key);
            this.showChecklist(checklistId);
        }
    }

    getChecklistProgress(checklistId) {
        const checklist = this.checklists.find(c => c.id === checklistId);
        if (!checklist) return { completed: 0, total: 0, percentage: 0 };
        
        const completedItems = this.getCompletedItems(checklistId);
        const total = checklist.items.length;
        const completed = completedItems.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { completed, total, percentage };
    }

    showError(message) {
        const main = document.getElementById('main-content');
        main.innerHTML = `
            <div class="error">
                <p>${message}</p>
                <a href="#/" class="back-button" style="margin-top: 1rem; display: inline-block;">Go Home</a>
            </div>
        `;
    }
}

// Initialize app
const app = new TodoQRH();
