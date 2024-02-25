document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');

    async function translate() {
        const textToTranslate = inputText.value.trim();
        if (textToTranslate === '') return;

        try {
            const translationResult = await fetch('/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: textToTranslate })
            });

            if (!translationResult.ok) {
                throw new Error('Translation failed');
            }

            const translationData = await translationResult.json();
            outputText.value = translationData.translation;
        } catch (error) {
            console.error('Translation error:', error);
        }
    }

    async function reverseTranslate() {
        const translatedText = outputText.value.trim();
        if (translatedText === '') return;

        try {
            const reverseTranslationResult = await fetch('/reverse-translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: translatedText })
            });

            if (!reverseTranslationResult.ok) {
                throw new Error('Reverse translation failed');
            }

            const reverseTranslationData = await reverseTranslationResult.json();
            inputText.value = reverseTranslationData.translation;
        } catch (error) {
            console.error('Reverse translation error:', error);
        }
    }

    document.getElementById('translate-button').addEventListener('click', translate);
    document.getElementById('reverse-translate-button').addEventListener('click', reverseTranslate);

});
