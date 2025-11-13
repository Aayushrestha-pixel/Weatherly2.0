// Weatherly - Main JavaScript File

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌤️ Weatherly loaded!');
    
    // Initialize all features
    initAnimations();
    initFormValidation();
    initTaskInteractions();
    initWeatherUpdates();
});

// ============================================
// ANIMATIONS
// ============================================

function initAnimations() {
    // Observe elements for fade-in animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// FORM VALIDATION & ENHANCEMENT
// ============================================

function initFormValidation() {
    const taskForm = document.getElementById('addTaskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            const taskInput = document.getElementById('task_name');
            const submitBtn = document.getElementById('submitTaskBtn');
            
            if (taskInput.value.trim().length < 3) {
                e.preventDefault();
                alert('⚠️ Please enter a task with at least 3 characters');
                taskInput.focus();
                return false;
            }
            
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            // Show a nice toast notification
            showToast('🤖 AI is analyzing your task...', 'info');
        });
    }

    // Real-time character counter for task input
    const taskInput = document.getElementById('task_name');
    if (taskInput) {
        taskInput.addEventListener('input', function() {
            const length = this.value.length;
            const formText = this.nextElementSibling;
            
            if (length > 0) {
                formText.innerHTML = `<i class="fas fa-check-circle text-success"></i> ${length} characters - Looking good!`;
            } else {
                formText.innerHTML = '<i class="fas fa-info-circle"></i> AI will analyze this task against current weather';
            }
        });
    }
}

// ============================================
// TASK INTERACTIONS
// ============================================

function initTaskInteractions() {
    // Add hover effects to tasks
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        task.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        task.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Smooth toggle animation
    const toggleLinks = document.querySelectorAll('.task-toggle');
    toggleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const taskItem = this.closest('.task-item');
            taskItem.style.transition = 'all 0.3s ease';
            taskItem.style.opacity = '0.5';
        });
    });

    // Add confirmation with emoji for delete
    const deleteLinks = document.querySelectorAll('.task-actions a[href*="delete_task"]');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const taskName = this.closest('.task-item').querySelector('.task-title').textContent;
            
            if (confirm(`🗑️ Are you sure you want to delete:\n"${taskName}"?`)) {
                showToast('🗑️ Task deleted!', 'info');
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });
}

// ============================================
// WEATHER UPDATES
// ============================================

function initWeatherUpdates() {
    // Add refresh button functionality
    const weatherCard = document.querySelector('.weather-card');
    if (weatherCard) {
        weatherCard.classList.add('weather-loaded');
    }

    // Location change with smooth transition
    const locationForm = document.getElementById('locationForm');
    if (locationForm) {
        locationForm.addEventListener('submit', function() {
            showToast('📍 Updating location...', 'info');
        });
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = message;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus task input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const taskInput = document.getElementById('task_name');
        if (taskInput) {
            taskInput.focus();
            showToast('✨ Quick add task!', 'info');
        }
    }
});

// ============================================
// WEATHER EMOJI ANIMATIONS
// ============================================

function animateWeatherEmoji() {
    const weatherEmoji = document.querySelector('.weather-emoji-large');
    if (weatherEmoji) {
        weatherEmoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        weatherEmoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Initialize emoji animations
setTimeout(animateWeatherEmoji, 500);

// ============================================
// RISK LEVEL INDICATORS
// ============================================

function highlightRiskLevels() {
    const riskItems = document.querySelectorAll('[class*="risk-"]');
    riskItems.forEach(item => {
        if (item.classList.contains('risk-high')) {
            item.style.borderLeft = '4px solid #dc3545';
        } else if (item.classList.contains('risk-medium')) {
            item.style.borderLeft = '4px solid #ffc107';
        } else if (item.classList.contains('risk-low')) {
            item.style.borderLeft = '4px solid #17a2b8';
        }
    });
}

highlightRiskLevels();

console.log('✅ All JavaScript features loaded successfully!');