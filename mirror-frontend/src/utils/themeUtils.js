/**
 * A utility to get theme-specific class names
 * This makes it easier to maintain theme styling across components
 */

export const getThemeClasses = (theme) => {
  // Theme-specific classes
  const themeClasses = {
    // Backgrounds
    background: theme === 'dark' ? 'bg-black' : 'bg-white',
    cardBackground: theme === 'dark' ? 'bg-[#111111]' : 'bg-[#f8f8f8]',
    
    // Text colors
    text: theme === 'dark' ? 'text-white' : 'text-black',
    textSecondary: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    textTertiary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    
    // Borders
    border: theme === 'dark' ? 'border-white/10' : 'border-gray-200',
    
    // Button styles
    buttonPrimary: theme === 'dark' 
      ? 'bg-[#7a7ffb] text-white hover:bg-[#7a8fff]' 
      : 'bg-[#7a7ffb] text-white hover:bg-[#7a8fff]',
    buttonSecondary: theme === 'dark'
      ? 'border border-white/20 bg-white/10 hover:bg-white/20'
      : 'border border-gray-300 bg-gray-100 hover:bg-gray-200',
      
    // Inputs
    input: theme === 'dark'
      ? 'bg-[#111111] border-white/20 text-white'
      : 'bg-white border-gray-300 text-black',
  };

  return themeClasses;
};