// Typed.js Animation
document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    new Typed('.typed-text', {
        strings: ["James Choy", "Marketing Specialist", "Event Coordinator"],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const filter = button.dataset.filter;
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.tags.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});