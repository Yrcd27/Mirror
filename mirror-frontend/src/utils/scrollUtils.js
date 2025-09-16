/**
 * Smoothly scrolls to a specific element on the page
 * 
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} [offset=0] - Optional offset from the top of the element (in pixels)
 * @param {number} [delay=0] - Optional delay before scrolling (in milliseconds)
 * @returns {boolean} - Returns true if the element was found and scrolled to, false otherwise
 */
export const scrollToElement = (elementId, offset = 0, delay = 0) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return false;
  }
  
  if (delay > 0) {
    setTimeout(() => {
      scrollWithOffset(element, offset);
    }, delay);
  } else {
    scrollWithOffset(element, offset);
  }
  
  return true;
};

/**
 * Helper function to scroll to an element with an offset
 * 
 * @param {HTMLElement} element - The element to scroll to
 * @param {number} offset - Offset from the top of the element (in pixels)
 */
const scrollWithOffset = (element, offset = 0) => {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
};

/**
 * Registers click handlers for all anchor links that point to page sections
 * This enables smooth scrolling for all internal links
 * 
 * @param {number} [offset=0] - Optional offset from the top (useful if you have a fixed header)
 */
export const setupSmoothScrolling = (offset = 0) => {
  document.addEventListener('click', (e) => {
    // Check if the clicked element is an anchor with a hash
    const target = e.target.closest('a');
    if (!target) return;
    
    const href = target.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    const elementId = href.substring(1);
    if (!elementId) return;
    
    e.preventDefault();
    scrollToElement(elementId, offset);
  });
};

/**
 * Detects and highlights the current active section in the navigation
 * based on scroll position
 * 
 * @param {Array<string>} sectionIds - Array of section IDs to monitor
 * @param {string} activeClassName - CSS class name to apply to active nav items
 * @param {number} [offset=100] - Offset to determine when a section is active
 */
export const setupScrollSpy = (sectionIds, activeClassName, offset = 100) => {
  if (!sectionIds || !sectionIds.length) return;
  
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  
  const highlightNavItem = () => {
    const scrollPosition = window.scrollY + offset;
    
    // Find the current section
    let currentSection = null;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section;
        break;
      }
    }
    
    // If we're at the bottom of the page and no section is current,
    // use the last section
    if (!currentSection && window.innerHeight + scrollPosition >= document.body.offsetHeight) {
      currentSection = sections[sections.length - 1];
    }
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll(`[href^="#"]`);
    navItems.forEach(item => {
      item.classList.remove(activeClassName);
    });
    
    // Add active class to current nav item
    if (currentSection) {
      const currentNavItem = document.querySelector(`[href="#${currentSection.id}"]`);
      if (currentNavItem) {
        currentNavItem.classList.add(activeClassName);
      }
    }
  };
  
  window.addEventListener('scroll', highlightNavItem);
  window.addEventListener('load', highlightNavItem);
  
  // Initial call to set active section on page load
  highlightNavItem();
};