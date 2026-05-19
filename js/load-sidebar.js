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

            // ==========================================================================
            // 核心功能 1：页面加载时，根据当前 URL 自动高亮并固开对应的分类与项目
            // ==========================================================================
            const currentPath = window.location.pathname;
            const submenuLinks = container.querySelectorAll(".submenu-wrapper a");

            submenuLinks.forEach(link => {
                const href = link.getAttribute("href");
                const cleanHref = href.replace("pages/", "").replace("../", "");

                if (currentPath.includes(cleanHref)) {
                    // 给活动项目链接加上圆点标记 class
                    link.classList.add("active-link");

                    // 向上寻找并展开它的固定父级分类列
                    const parentCategory = link.closest(".category-item");
                    if (parentCategory) {
                        parentCategory.classList.add("active");
                    }
                }
            });

            // ==========================================================================
            // 核心功能 2：鼠标点击事件 —— 允许用户自由切换分类
            // ==========================================================================
            const categories = container.querySelectorAll(".category-item");

            categories.forEach(item => {
                const label = item.querySelector(".category-label");
                
                if (label) {
                    label.addEventListener("click", function(e) {
                        // 阻止任何默认的点击跳转行为（如果标签是 span/label）
                        e.preventDefault(); 

                        // 如果点击的是已经打开的分类，则将其关闭
                        if (item.classList.contains("active")) {
                            item.classList.remove("active");
                        } else {
                            // 否则，先关闭所有其他的分类（排他性收起），再打开当前点击的分类
                            categories.forEach(c => c.classList.remove("active"));
                            item.classList.add("active");
                        }
                    });
                }
            });
            // ==========================================================================

            // 3. 如果在子页面，修正链接路径
            if (isInPages) {
                container.querySelectorAll('a').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('mailto:')) {
                        if (!href.startsWith('../')) {
                            link.setAttribute('href', '../' + href);
                        }
                    }
                });
            }

            // 4. 加载完内容后立刻显示侧边栏
            setTimeout(() => {
                container.classList.add('visible');
                console.log("侧边栏已显示 (Visible class added)");
            }, 50);
        })
        .catch(err => {
            console.error("侧边栏加载失败:", err);
            container.style.opacity = "1"; 
        });
});