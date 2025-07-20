function toggleDrawer() 
{
  document.getElementById("sideDrawer").classList.toggle("open");
}

function navigateTo(section) 
{
  const sections = ['home', 'gallery'];
  sections.forEach(sec => {
    const el = document.getElementById(sec);
    if (el) 
      {
      if (sec === section) 
        {
        el.style.display = 'block';
        el.classList.add('page-section');
      } else 
        {
        el.style.display = 'none';
        el.classList.remove('page-section');
      }
    }
  });
  toggleDrawer();
}

function toggleTheme() 
{
  const root = document.documentElement;
  const currentBg = getComputedStyle(root).getPropertyValue('--bg-color').trim();

  if (currentBg === '#e0f7fa') 
    {
    // Switch to Mystic Twilight Sea dark theme
    root.style.setProperty('--bg-color', '#121826');  // very dark slate blue
    root.style.setProperty('--theme-color', '#8a3ffc'); // vivid violet-blue
    root.style.setProperty('--theme-color-dark', '#522d80'); // deep purple
    root.style.setProperty('--coral-color', '#ff6584'); // warm pink-coral accent
    root.style.setProperty('--text-color', '#d8c8ff');  // light lavender
    root.style.setProperty('--card-bg', '#2a1f4ecc');   // semi-transparent dark purple
    root.style.setProperty('--shadow-color', 'rgba(138, 63, 252, 0.4)'); // glowing violet shadow
  } else 
    {
    // Day sea theme (unchanged)
    root.style.setProperty('--bg-color', '#e0f7fa');  // light sea foam
    root.style.setProperty('--theme-color', '#36d1dc'); // ocean blue
    root.style.setProperty('--theme-color-dark', '#5b86e5'); // deeper blue
    root.style.setProperty('--coral-color', '#ff6f61'); // coral accent
    root.style.setProperty('--text-color', '#004d40');
    root.style.setProperty('--card-bg', '#ffffffcc');
    root.style.setProperty('--shadow-color', 'rgba(0, 77, 64, 0.2)');
  }
}
