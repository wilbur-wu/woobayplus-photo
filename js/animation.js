// js/animation.js
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null, // 默认相对于浏览器视口
        threshold: 0.15 // 图片露出 15% 时触发
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 触发 CSS 中定义的动画类
                entry.target.classList.add('show');
                // 触发后停止观察，确保动画只运行一次
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 选取瀑布流中的所有图片进行观察
    const images = document.querySelectorAll('.photo-columns img');
    images.forEach((img) => {
        observer.observe(img);
    });
});