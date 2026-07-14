document.addEventListener('DOMContentLoaded', () => {
    const areaSlider = document.getElementById('areaSlider');
    const m2Value = document.getElementById('m2Value');
    const priceValue = document.getElementById('priceValue');

    // Pricing logic
    const basePrice = 15000; // CLP
    const pricePerM2 = 400; // CLP
    
    // Format currency to CLP
    const formatCurrency = (number) => {
        return number.toLocaleString('es-CL');
    };

    // Calculate price based on m2
    const calculatePrice = (m2) => {
        // Just a simple proportional logic with a base price
        const total = basePrice + (m2 * pricePerM2);
        return formatCurrency(total);
    };

    // Update slider background gradient
    const updateSliderBackground = (slider) => {
        const val = slider.value;
        const min = slider.min ? slider.min : 20;
        const max = slider.max ? slider.max : 300;
        const percentage = ((val - min) / (max - min)) * 100;
        
        slider.style.background = `linear-gradient(to right, var(--c-primary) ${percentage}%, #d3d3d3 ${percentage}%)`;
    };

    // Handle slider input (live dragging)
    let updateTimeout;
    
    const handleSliderInput = (e) => {
        const currentM2 = parseInt(e.target.value, 10);
        
        // Update DOM text
        m2Value.textContent = currentM2;
        priceValue.textContent = calculatePrice(currentM2);
        
        // Update ARIA attributes
        e.target.setAttribute('aria-valuenow', currentM2);
        
        // Update background visual
        updateSliderBackground(e.target);
        
        // Add "alive/glow" class for the camera moment
        e.target.classList.add('dragging');
        priceValue.classList.add('price-updating');
        
        // Remove the visual effect class shortly after dragging stops to make it reactive
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            priceValue.classList.remove('price-updating');
            e.target.classList.remove('dragging');
        }, 150);
    };

    // Initialize state on first render
    const initializeSlider = () => {
        // Set initial values just in case
        const initialValue = parseInt(areaSlider.value, 10);
        m2Value.textContent = initialValue;
        priceValue.textContent = calculatePrice(initialValue);
        updateSliderBackground(areaSlider);
    };

    // Attach events
    areaSlider.addEventListener('input', handleSliderInput);
    
    // Run initialization
    initializeSlider();
});
