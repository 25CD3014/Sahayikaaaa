// Mock Data
const jobs = [
    { id: 1, title: "Senior UI Designer", company: "CreativeEdge", location: "Remote", type: "Full-time", salary: "$80k - $120k", category: "design", tags: ["UI/UX", "Figma", "Design Systems"] },
    { id: 2, title: "Frontend Developer", company: "TechScale", location: "San Francisco", type: "Full-time", salary: "$100k - $150k", category: "tech", tags: ["React", "TypeScript", "Tailwind"] },
    { id: 3, title: "Marketing Manager", company: "GrowthLoop", location: "New York", type: "Contract", salary: "$60k - $90k", category: "marketing", tags: ["SEO", "Content", "Strategy"] },
    { id: 4, title: "Data Analyst", company: "InsightsCo", location: "London", type: "Full-time", salary: "£50k - £75k", category: "tech", tags: ["Python", "SQL", "Tableau"] },
    { id: 5, title: "Product Researcher", company: "UserFirst", location: "Remote", type: "Full-time", salary: "$70k - $100k", category: "design", tags: ["User Research", "Testing", "Analytics"] },
    { id: 6, title: "Financial Advisor", company: "WealthWise", location: "Chicago", type: "Full-time", salary: "$90k - $130k", category: "finance", tags: ["CPA", "Planning", "Investment"] }
];

const communityPosts = {
    discussions: [
        { id: 1, author: "Sarah J.", avatar: "SJ", content: "How do you handle workplace negotiations as a woman in tech?", likes: 24, comments: 12, time: "2h ago" },
        { id: 2, author: "Maria R.", avatar: "MR", content: "Looking for a study buddy for the Digital Marketing course. Anyone interested?", likes: 15, comments: 8, time: "5h ago" },
        { id: 3, author: "Elena P.", avatar: "EP", content: "Just landed my first dev job thanks to the Career Hub! Thank you Sahayika!", likes: 156, comments: 45, time: "1d ago" }
    ],
    events: [
        { id: 1, author: "Sahayika Events", avatar: "SE", content: "Upcoming Webinar: Financial Literacy for Entrepreneurs", date: "Feb 15, 2026", type: "Webinar", link: "#" },
        { id: 2, author: "Local Chapter", avatar: "LC", content: "Women in Design Meetup - Downtown Coffee Shop", date: "Feb 20, 2026", type: "Meetup", link: "#" }
    ],
    mentorship: [
        { id: 1, author: "Dr. Linda K.", avatar: "LK", content: "Offering mentorship in AI Ethics and Policy. 5 slots available.", role: "Mentor", expertise: "AI & Policy" },
        { id: 2, author: "Rachel W.", avatar: "RW", content: "Experienced Product Manager open to reviewing resumes this weekend.", role: "Mentor", expertise: "Product Management" }
    ]
};

// UI Elements
const jobsGrid = document.getElementById('jobsGrid');
const communityContent = document.getElementById('communityContent');

// Scroll Reveal
// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const revealSections = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.section-section, .features, .glass-card, .feature-card, .job-card, .legal-card, .skill-card');

    elementsToReveal.forEach(el => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Fallback: Show all elements after 2 seconds if observer fails
    setTimeout(() => {
        elementsToReveal.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 2000);
};

// Add a helper for reveal class in CSS via JS for convenience
const style = document.createElement('style');
style.textContent = `
    .reveal-active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize "Backend" Mock Data
    if (!localStorage.getItem('sahayika_applications')) {
        localStorage.setItem('sahayika_applications', JSON.stringify([
            { role: 'Senior UI Designer', company: 'CreativeEdge', date: '2/2/2026', status: 'Under Review' },
            { role: 'Product Researcher', company: 'UserFirst', date: '1/25/2026', status: 'Accepted' }
        ]));
    }
    if (!localStorage.getItem('sahayika_enrollments')) {
        localStorage.setItem('sahayika_enrollments', JSON.stringify([
            { title: 'Digital Marketing', progress: 85 }
        ]));
    }

    renderJobs('all');
    renderCommunity('discussions');
    revealSections();
    setupEventListeners();
});

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchModal(oldId, newId) {
    closeModal(oldId);
    setTimeout(() => showModal(newId), 300);
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// SOS Trigger
function triggerSOS() {
    const btn = document.querySelector('.sos-button');
    if (btn) {
        btn.style.backgroundColor = '#b91c1c';
        btn.innerHTML = '<span>SENT</span>';

        alert(`🚨 EMERGENCY ALERT SENT!\nYour location has been shared with emergency contacts and local authorities.`);

        setTimeout(() => {
            btn.style.backgroundColor = 'var(--error)';
            btn.innerHTML = '<div class="sos-pulse"></div><span>SOS</span>';
        }, 5000);
    }
}

// Job Application Simulation
window.applyJob = (title, company) => {
    let apps = JSON.parse(localStorage.getItem('sahayika_applications') || '[]');
    if (!apps.find(a => a.role === title && a.company === company)) {
        apps.push({ role: title, company: company, date: new Date().toLocaleDateString(), status: 'Pending' });
        localStorage.setItem('sahayika_applications', JSON.stringify(apps));
        alert(`Application sent for ${title} at ${company}!\nIt now appears in your dashboard.`);
    } else {
        alert('You have already applied for this position.');
    }
};

// Render Functions
function renderJobs(filter) {
    const grid = document.getElementById('jobsGrid');
    if (!grid) return;

    const filteredJobs = filter === 'all' ? jobs : jobs.filter(job => job.category === filter);

    grid.innerHTML = filteredJobs.map(job => `
        <div class="job-card glass-card reveal-active" style="opacity: 1; transform: translateY(0);">
            <div class="job-card-header">
                <div>
                    <h4 class="job-title">${job.title}</h4>
                    <p class="job-company">${job.company}</p>
                </div>
                <span class="job-salary">${job.salary}</span>
            </div>
            <div class="job-meta" style="margin: 1rem 0;">
                <div class="job-meta-item">📍 ${job.location}</div>
                <div class="job-meta-item">🕒 ${job.type}</div>
            </div>
            <div class="job-tags" style="margin-bottom: 1.5rem;">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            <button class="btn-primary btn-full" style="padding: 0.6rem;" onclick="applyJob('${job.title}', '${job.company}')">Apply Now</button>
        </div>
    `).join('');
}

function renderCommunity(tab) {
    const contentArea = document.getElementById('communityContent');
    if (!contentArea) return;

    const content = communityPosts[tab];

    contentArea.innerHTML = content.map(item => `
        <div class="community-post reveal-active" style="padding: 2rem; border-bottom: 1px solid var(--border); transition: 0.3s; border-radius: 16px; opacity: 1; transform: translateY(0);">
            <div style="display: flex; gap: 1.25rem; align-items: center; margin-bottom: 1.5rem;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary); font-size: 1rem;">
                    ${item.avatar}
                </div>
                <div>
                    <h5 style="margin: 0; font-size: 1.1rem;">${item.author}</h5>
                    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">${item.time || item.date || item.role}</span>
                </div>
            </div>
            <p style="color: var(--text-main); margin-bottom: 1.5rem; font-size: 1.05rem; line-height: 1.6;">${item.content}</p>
            <div style="display: flex; gap: 2rem; font-size: 0.9rem; font-weight: 700;">
                ${item.likes !== undefined ? `<span style="color: var(--primary); cursor: pointer;">❤️ ${item.likes}</span>` : ''}
                ${item.comments !== undefined ? `<span style="color: var(--text-muted); cursor: pointer;">💬 ${item.comments}</span>` : ''}
                ${item.type ? `<span style="color: var(--secondary);">${item.type}</span>` : ''}
                ${item.expertise ? `<span style="color: var(--primary);"># ${item.expertise}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Job Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderJobs(btn.dataset.filter);
        });
    });

    // Community Tabs
    document.querySelectorAll('.community-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCommunity(tab.dataset.tab);
        });
    });

    // Learn More Handlers
    document.querySelectorAll('.learn-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const h4 = btn.parentElement.querySelector('h4');
            const title = h4 ? h4.innerText : "this topic";
            alert(`Detailed guide for ${title} will be available soon in our Legal Resource Library.`);
        });
    });

    // Enrollment Handlers
    document.querySelectorAll('.skill-card .btn-outline').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.closest('.skill-content');
            const h4 = content ? content.querySelector('h4') : null;
            const title = h4 ? h4.innerText : "this course";

            let enrollments = JSON.parse(localStorage.getItem('sahayika_enrollments') || '[]');
            if (!enrollments.find(e => e.title === title)) {
                enrollments.push({ title: title, progress: 0 });
                localStorage.setItem('sahayika_enrollments', JSON.stringify(enrollments));
                alert(`Successfully enrolled in: ${title}!\nCheck your dashboard for course progress.`);
            } else {
                alert(`You are already enrolled in ${title}.`);
            }
        });
    });

    // Form Submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button');
            const originalText = button ? button.innerText : 'Submit';

            if (button) {
                button.innerText = 'Processing...';
                button.disabled = true;
            }

            setTimeout(() => {
                // Simulate Auth
                if (form.closest('#loginModal') || form.closest('#signupModal')) {
                    localStorage.setItem('sahayika_user', 'true');
                    window.location.href = 'dashboard.html';
                    return;
                }

                alert('Success! Action completed.');
                if (button) {
                    button.innerText = originalText;
                    button.disabled = false;
                }
                if (form.closest('.modal')) {
                    closeModal(form.closest('.modal').id);
                }
                form.reset();
            }, 1500);
        });
    });

    // Enter Dashboard Button Logic
    const enterDashboardBtn = document.querySelector('.hero-buttons .btn-primary');
    if (enterDashboardBtn) {
        enterDashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('sahayika_user')) {
                window.location.href = 'dashboard.html';
            } else {
                showModal('loginModal');
            }
        });
    }

    // Newsletter
    const newsletterBtn = document.querySelector('.newsletter button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const input = document.querySelector('.newsletter input');
            if (input && input.value) {
                alert('Thank you for subscribing to Sahayika newsletter!');
                input.value = '';
            } else {
                alert('Please enter a valid email.');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            const hamburger = document.querySelector('.hamburger');
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}