document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const closeButton = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // モバイルメニューを開く
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden'; // スクロール防止
    });

    // モバイルメニューを閉じる
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.style.overflow = ''; // スクロール再開
    });

    // 画面外クリックでメニューを閉じる
    document.addEventListener('click', (e) => {
        if (e.target.closest('.mobile-menu') || e.target.closest('.mobile-menu-button')) return;
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
});