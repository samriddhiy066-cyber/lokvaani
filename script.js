// Login form handler - only run on login page
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
      console.log('Login attempt:', email);
      window.location.href = 'dashboard.html';
    } else {
      alert('Please fill all fields');
    }
  });
}

function logout() {
  // Simple logout - redirect back to login
  window.location.href = 'getStarted.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const voiceOption = document.getElementById('voice-option');
    const pictureOption = document.getElementById('picture-option');
    const translateBtn = document.getElementById('translate-btn');
    const inputText = document.getElementById('input-text');
    const output = document.getElementById('output');
    const fileInput = document.getElementById('file-input');
    const sourceSelect = document.getElementById('source-language-select');
    const targetSelect = document.getElementById('language-select');
 
    const languages = [
        ['en', 'English'], ['hi', 'Hindi'], ['af', 'Afrikaans'], ['sq', 'Albanian'],
        ['am', 'Amharic'], ['ar', 'Arabic'], ['hy', 'Armenian'], ['as', 'Assamese'],
        ['ay', 'Aymara'], ['az', 'Azerbaijani'], ['bm', 'Bambara'], ['eu', 'Basque'],
        ['be', 'Belarusian'], ['bn', 'Bengali'], ['bho', 'Bhojpuri'], ['bs', 'Bosnian'],
        ['bg', 'Bulgarian'], ['ca', 'Catalan'], ['ceb', 'Cebuano'], ['zh-CN', 'Chinese (Simplified)'],
        ['zh-TW', 'Chinese (Traditional)'], ['co', 'Corsican'], ['hr', 'Croatian'],
        ['cs', 'Czech'], ['da', 'Danish'], ['dv', 'Dhivehi'], ['doi', 'Dogri'],
        ['nl', 'Dutch'], ['eo', 'Esperanto'], ['et', 'Estonian'], ['ee', 'Ewe'],
        ['fil', 'Filipino'], ['fi', 'Finnish'], ['fy', 'Frisian'], ['gl', 'Galician'],
        ['ka', 'Georgian'], ['de', 'German'], ['el', 'Greek'], ['gn', 'Guarani'],
        ['gu', 'Gujarati'], ['ht', 'Haitian Creole'], ['ha', 'Hausa'], ['haw', 'Hawaiian'],
        ['he', 'Hebrew'], ['hmn', 'Hmong'], ['hu', 'Hungarian'], ['is', 'Icelandic'],
        ['ig', 'Igbo'], ['ilo', 'Ilocano'], ['id', 'Indonesian'], ['ga', 'Irish'],
        ['it', 'Italian'], ['ja', 'Japanese'], ['jv', 'Javanese'], ['kn', 'Kannada'],
        ['kk', 'Kazakh'], ['km', 'Khmer'], ['rw', 'Kinyarwanda'], ['gom', 'Konkani'],
        ['ko', 'Korean'], ['kri', 'Krio'], ['ku', 'Kurdish'], ['ky', 'Kyrgyz'],
        ['lo', 'Lao'], ['la', 'Latin'], ['lv', 'Latvian'], ['ln', 'Lingala'],
        ['lt', 'Lithuanian'], ['lg', 'Luganda'], ['lb', 'Luxembourgish'],
        ['mk', 'Macedonian'], ['mai', 'Maithili'], ['mg', 'Malagasy'], ['ms', 'Malay'],
        ['ml', 'Malayalam'], ['mt', 'Maltese'], ['mi', 'Maori'], ['mr', 'Marathi'],
        ['mni-Mtei', 'Meiteilon (Manipuri)'], ['lus', 'Mizo'], ['mn', 'Mongolian'],
        ['my', 'Myanmar (Burmese)'], ['ne', 'Nepali'], ['no', 'Norwegian'],
        ['or', 'Odia (Oriya)'], ['om', 'Oromo'], ['ps', 'Pashto'], ['fa', 'Persian'],
        ['pl', 'Polish'], ['pt', 'Portuguese'], ['pa', 'Punjabi'], ['qu', 'Quechua'],
        ['ro', 'Romanian'], ['ru', 'Russian'], ['sm', 'Samoan'], ['sa', 'Sanskrit'],
        ['gd', 'Scots Gaelic'], ['nso', 'Sepedi'], ['sr', 'Serbian'], ['st', 'Sesotho'],
        ['sn', 'Shona'], ['sd', 'Sindhi'], ['si', 'Sinhala'], ['sk', 'Slovak'],
        ['sl', 'Slovenian'], ['so', 'Somali'], ['es', 'Spanish'], ['su', 'Sundanese'],
        ['sw', 'Swahili'], ['sv', 'Swedish'], ['tg', 'Tajik'], ['tt', 'Tatar'],
        ['th', 'Thai'], ['ti', 'Tigrinya'], ['ts', 'Tsonga'], ['tr', 'Turkish'],
        ['tk', 'Turkmen'], ['tw', 'Twi'], ['uk', 'Ukrainian'], ['ur', 'Urdu'],
        ['ug', 'Uyghur'], ['uz', 'Uzbek'], ['vi', 'Vietnamese'], ['cy', 'Welsh'],
        ['xh', 'Xhosa'], ['yi', 'Yiddish'], ['yo', 'Yoruba'], ['zu', 'Zulu']
    ];

    function populateLanguageSelects() {
        languages.forEach(([value, label]) => {
            const sourceOpt = document.createElement('option');
            sourceOpt.value = value;
            sourceOpt.textContent = label;
            sourceSelect.appendChild(sourceOpt);

            const targetOpt = document.createElement('option');
            targetOpt.value = value;
            targetOpt.textContent = label;
            targetSelect.appendChild(targetOpt);
        });
        sourceSelect.value = 'en';
        targetSelect.value = 'hi';
    }

    populateLanguageSelects();
 
    // Only run translation features if on translation page
    if (voiceOption && pictureOption && translateBtn && inputText && output && fileInput && sourceSelect && targetSelect) {
        voiceOption.addEventListener('click', function() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                recognition.lang = 'en-US';
                 recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.start();

                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    inputText.value = transcript;
                };

                recognition.onerror = function(event) {
                    console.error('Speech recognition error:', event.error);
                    alert('Voice input failed. Please try again.');
                };
            } else {
                alert('Speech recognition not supported in this browser.');
            }
        });
        pictureOption.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                extractTextFromImage(file);
            }
        });

        function extractTextFromImage(file) {
            inputText.value = "Extracting text from image...";
            output.textContent = "Processing image...";

            Tesseract.recognize(
                file,
                'eng',
                {
                    logger: m => console.log(m)
                }
            ).then(({ data: { text } }) => {
                inputText.value = text.trim();
                output.textContent = "Text extracted. Click Translate to translate.";
                 }).catch(err => {
                console.error(err);
                alert('OCR failed. Please try again.');
                inputText.value = "";
                output.textContent = "OCR failed.";
            });
        }
        translateBtn.addEventListener('click', function() {
            const text = inputText.value.trim();
            const sourceLang = sourceSelect.value;
            const targetLang = targetSelect.value;

            if (!text) {
                alert('Please enter text to translate.');
                return;
            }

            if (sourceLang === targetLang) {
                alert('Please choose a different target language.');
                return;
            }

            output.textContent = 'Translating...';
            translateText(text, sourceLang, targetLang);
        });

        async function translateText(text, sourceLang, targetLang) {
            const localApiUrl = `/api/translate?q=${encodeURIComponent(text)}&source=${encodeURIComponent(sourceLang)}&target=${encodeURIComponent(targetLang)}`;
            const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(sourceLang + '|' + targetLang)}`;

            async function parseResponse(response) {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return await response.json();
            }

            try {
                let data;
                try {
                    const response = await fetch(localApiUrl);
                    data = await parseResponse(response);
                } catch (localError) {
                    console.warn('Local API failed, using direct fallback', localError);
                    const response = await fetch(fallbackUrl);
                    data = await parseResponse(response);
                }

                console.log('Translation result:', data);
                if (data.responseStatus === 200 && data.responseData && data.responseData.translatedText) {
                    output.textContent = data.responseData.translatedText;
                } else if (data.translatedText) {
                    output.textContent = data.translatedText;
                } else {
                    output.textContent = data.error || data.responseDetails || 'Translation failed - API error';
                }
            } catch (error) {
                console.error('Translation error:', error);
                output.textContent = `Translation failed: ${error.message}`;
            }
        }
    }
});
let words = [];
let currentWord = null;
let currentMode = '1';
let score = 0;
let currentLanguage = 'hi'; // Default to Hindi

// DOM elements - will be initialized later
let gameArea;
let feedbackArea;
let feedbackMessage;
let scoreElement;

// Load words data
async function loadWords() {
    // Initialize DOM elements here
    gameArea = document.getElementById('game-area');
    feedbackArea = document.getElementById('feedback-area');
    feedbackMessage = document.getElementById('feedback-message');
    scoreElement = document.getElementById('score');
    
    try {
        const response = await fetch('words.json');
        const data = await response.json();
        words = data.words;
        console.log('Words loaded:', words.length);
        loadNextQuestion();
    } catch (error) {
        console.error('Error loading words:', error);
        if (gameArea) gameArea.innerHTML = '<p>Error loading game data. Please refresh the page.</p>';
    }
}

// Switch game mode
function switchMode(mode) {
    currentMode = mode;
    document.getElementById('btn-mode-1').classList.toggle('active', mode === '1');
    document.getElementById('btn-mode-2').classList.toggle('active', mode === '2');
    loadNextQuestion();
}

// Load next question
function loadNextQuestion() {
    if (feedbackArea) feedbackArea.classList.add('hidden');
    currentWord = words[Math.floor(Math.random() * words.length)];
    renderQuestion();
}

// Render question based on mode
function renderQuestion() {
    if (!gameArea) return;
    gameArea.innerHTML = '';

    if (currentMode === '1') {
        // Mode 1: Guess Translation - Show English, guess local language
        gameArea.innerHTML = `
            <div class="question-box">
                <p class="question-title">What is "${currentWord.english}" in Hindi?</p>
                <div class="question-word">${currentWord.english}</div>
            </div>
            <div class="options-grid">
                ${generateOptions(currentWord.hindi)}
            </div>
        `;
    } else {
        // Mode 2: Word Quiz - Show local language, guess English
        gameArea.innerHTML = `
            <div class="question-box">
                <p class="question-title">What does "${currentWord.hindi}" mean in English?</p>
                <div class="question-word">${currentWord.hindi}</div>
            </div>
            <div class="input-group">
                <input type="text" id="answer-input" class="text-input" placeholder="Type your answer..." autocomplete="off">
                <button class="primary-btn" onclick="checkAnswer()">Submit Answer</button>
            </div>
        `;
    }
}

// Generate multiple choice options for Mode 1
function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    const otherWords = words.filter(w => w.hindi !== correctAnswer);

    // Add 3 random incorrect options
    while (options.length < 4) {
        const randomWord = otherWords[Math.floor(Math.random() * otherWords.length)];
        if (!options.includes(randomWord.hindi)) {
            options.push(randomWord.hindi);
        }
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    return options.map(option => `
        <button class="option-btn" onclick="checkMultipleChoice('${option}', '${correctAnswer}')">${option}</button>
    `).join('');
}

// Check multiple choice answer
function checkMultipleChoice(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && selected !== correct) {
            btn.classList.add('incorrect');
        }
    });

    if (selected === correct) {
        score += 10;
        showFeedback('Correct! 🎉', 'correct-text');
    } else {
        showFeedback(`Incorrect. The correct answer is "${correct}"`, 'incorrect-text');
    }
    updateScore();
}

// Check text input answer for Mode 2
function checkAnswer() {
    const input = document.getElementById('answer-input');
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = currentWord.english.toLowerCase();

    input.disabled = true;

    if (userAnswer === correctAnswer) {
        score += 15;
        input.classList.add('correct-input');
        showFeedback('Correct! 🎉', 'correct-text');
    } else {
        input.classList.add('error');
        showFeedback(`Incorrect. The correct answer is "${currentWord.english}"`, 'incorrect-text');
    }
    updateScore();
}

// Show feedback
function showFeedback(message, className) {
    if (feedbackMessage) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-msg ${className}`;
    }
    if (feedbackArea) feedbackArea.classList.remove('hidden');
}

// Update score display
function updateScore() {
    if (scoreElement) scoreElement.textContent = score;
}

// Initialize game if on game page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('game-area')) {
        loadWords();
    }
});