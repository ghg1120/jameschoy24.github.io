document.addEventListener('DOMContentLoaded', function() {
    // Toggle experience details
    const experienceHeaders = document.querySelectorAll('.experience-header');
    
    experienceHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.experience-details');
            details.classList.toggle('expanded');
            
            // Optional: rotate icon if you add one
            const icon = this.querySelector('.toggle-icon');
            if (icon) {
                icon.classList.toggle('rotate');
            }
        });
    });
    
    // Print functionality
    const printButton = document.getElementById('print-resume');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Auto-expand all for printing
    window.addEventListener('beforeprint', function() {
        document.querySelectorAll('.experience-details').forEach(details => {
            details.classList.add('expanded');
        });
    });
});