/**
 * Announcements Manager
 * Loads announcements from JSON file and displays them
 */

class AnnouncementsManager {
    constructor(jsonPath = 'data/announcements.json') {
        this.jsonPath = jsonPath;
        this.announcements = [];
    }

    /**
     * Load announcements from JSON file
     */
    async loadAnnouncements() {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.announcements = data.announcements;
            return this.announcements;
        } catch (error) {
            console.error('Error loading announcements:', error);
            this.showErrorMessage();
            return [];
        }
    }

    /**
     * Format date to readable format
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    /**
     * Get category icon
     */
    getCategoryIcon(category) {
        const icons = {
            'General': '📢',
            'Liturgy': '⛪',
            'Information': 'ℹ️',
            'Event': '📅',
            'Important': '⚠️',
            'Community': '👥',
            'Education': '📚'
        };
        return icons[category] || '📢';
    }

    /**
     * Get priority badge
     */
    getPriorityBadge(priority) {
        if (priority === 'high') {
            return '<span class="priority-badge priority-high">Important</span>';
        }
        return '';
    }

    /**
     * Render single announcement card
     */
    renderAnnouncement(announcement) {
        const icon = this.getCategoryIcon(announcement.category);
        const priorityBadge = this.getPriorityBadge(announcement.priority);
        const formattedDate = this.formatDate(announcement.date);

        return `
            <div class="announcement-card ${announcement.priority === 'high' ? 'priority-high-card' : ''}">
                <div class="announcement-header">
                    <div class="announcement-category">
                        <span class="category-icon">${icon}</span>
                        <span class="category-name">${announcement.category}</span>
                    </div>
                    ${priorityBadge}
                </div>
                <h3 class="announcement-title">${announcement.title}</h3>
                <p class="announcement-date">📅 ${formattedDate}</p>
                <p class="announcement-message">${announcement.message}</p>
            </div>
        `;
    }

    /**
     * Render all announcements
     */
    async renderAnnouncements(containerId = 'announcements-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        // Show loading state
        container.innerHTML = '<div class="loading">Loading announcements...</div>';

        // Load announcements
        await this.loadAnnouncements();

        // Sort by date (newest first)
        const sortedAnnouncements = this.announcements.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // Render announcements
        if (sortedAnnouncements.length === 0) {
            container.innerHTML = `
                <div class="no-announcements">
                    <p>No announcements at this time. Please check back later.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = sortedAnnouncements
            .map(announcement => this.renderAnnouncement(announcement))
            .join('');
    }

    /**
     * Show error message
     */
    showErrorMessage() {
        const container = document.getElementById('announcements-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <p>Unable to load announcements. Please try again later or contact the parish office.</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const announcementsManager = new AnnouncementsManager();
    announcementsManager.renderAnnouncements();
});
