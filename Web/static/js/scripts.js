async function trans_late() {
    const textToTranslate = document.getElementById('input-text').value;
    console.log(textToTranslate);
    const translationResult = await fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textToTranslate })
    });
    const translationData = await translationResult.json();
    document.getElementById('output-text').value = translationData.translation;
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
