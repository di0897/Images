document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function openTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        const targetContent = document.getElementById(tabId);
        const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);

        if (targetContent && targetButton) {
            targetContent.classList.add('active');
            targetButton.classList.add('active');
        } else {
            console.error(`Error: Tab ID atau Button tidak ditemukan untuk ID: ${tabId}`);
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab; 
            openTab(tabId);
        });
    });

    openTab('summary');
});