// assets/js/newsletter.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#newsletter-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const messageBox = form.querySelector('.message-box');

    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.className = `message-box ${isError ? 'error' : 'success'}`;
        messageBox.style.display = 'block';

        // メッセージを自動的に非表示にする
        setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.className = 'message-box';
        }, isError ? 4000 : 3000);
    }

    function setSubmitting(isSubmitting) {
        buttonText.style.display = isSubmitting ? 'none' : 'block';
        loadingSpinner.style.display = isSubmitting ? 'block' : 'none';
        submitButton.disabled = isSubmitting;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        setSubmitting(true);
        messageBox.style.display = 'none';

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;

        try {
            const response = await fetch('/subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('ニュースレターの登録が完了しました！');
                form.reset();
                // 成功時の追加アクション
                submitButton.classList.add('success');
            } else {
                showMessage(data.error || 'エラーが発生しました。', true);
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('通信エラーが発生しました。後でもう一度お試しください。', true);
        } finally {
            setSubmitting(false);
        }
    });
});