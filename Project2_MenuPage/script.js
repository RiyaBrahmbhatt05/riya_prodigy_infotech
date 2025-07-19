function toggleDrawer() {
  document.getElementById("sideDrawer").classList.toggle("open");
}

function navigateTo(section) {
  document.getElementById("home").style.display = section === 'home' ? 'block' : 'none';
  document.getElementById("gallery").style.display = section === 'gallery' ? 'block' : 'none';
  toggleDrawer();
}

function toggleTheme() {
  const root = document.documentElement;
  const currentBg = getComputedStyle(root).getPropertyValue('--bg-color').trim();
  if (currentBg === '#ffffff') {
    root.style.setProperty('--bg-color', '#fff8e1'); // bright subtle
    root.style.setProperty('--theme-color', '#ff9800');
  } else {
    root.style.setProperty('--bg-color', '#ffffff');
    root.style.setProperty('--theme-color', '#00bcd4');
  }
}
