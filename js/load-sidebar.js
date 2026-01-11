document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('sidebar-container');
    if (!container) return;

    // 1. 自动识别环境：是否在 pages 文件夹里
    const isInPages = window.location.pathname.includes('/pages/');
    
    // 2. 根据环境决定去哪找 sidebar.html
    const sidebarFile = isInPages ? '../sidebar.html' : 'sidebar.html';

    fetch(sidebarFile)
        .then(response => {
            if (!response.ok) throw new Error("找不到侧边栏文件");
            return response.text();
        })
        .then(data => {
            container.innerHTML = data;

            // 3. 如果在子页面，修正链接路径（可选，根据你之前的需求）
            if (isInPages) {
                container.querySelectorAll('a').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
                        link.setAttribute('href', '../' + href);
                    }
                });
            }

            // 4. 【关键核心】无论在哪，加载完内容后立刻显示
            // 延迟 50ms 是为了给浏览器留出渲染 HTML 的时间，从而触发 CSS transition
            setTimeout(() => {
                container.classList.add('visible');
                console.log("侧边栏已显示 (Visible class added)");
            }, 50);
        })
        .catch(err => {
            console.error("侧边栏加载失败:", err);
            // 如果加载失败，为了保底，可以直接让它显示（虽然内容是空的，但方便你调试）
            container.style.opacity = "1"; 
        });
});