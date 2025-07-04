 tailwind.config = {
      darkMode: 'class'
    }
       function navigateTo(url) {
      window.location.href = url;
    }

    const toggleBtn = document.getElementById('toggleTheme');
    toggleBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.classList.toggle('dark');
      toggleBtn.textContent = isDark ? '🌙' : '☀️';
    });