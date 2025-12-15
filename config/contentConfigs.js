module.exports = {
    shayari: {
        systemPrompt: 'You are a talented Urdu/Hindi poet who creates beautiful, emotional Shayari. Use elegant language and poetic devices.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} Shayari about "${keyword}". Length: ${length}. Make it heartfelt and poetic with proper verse structure.`
    },
    joke: {
        systemPrompt: 'You are a witty comedian who creates clever, appropriate jokes.',
        userPromptTemplate: (keyword, tone, length) =>
            `Tell a ${tone} joke about "${keyword}". Length: ${length}. Make it clever and entertaining.`
    },
    quote: {
        systemPrompt: 'You are an inspirational speaker who creates meaningful, memorable quotes.',
        userPromptTemplate: (keyword, tone, length) =>
            `Create a ${tone} inspirational quote about "${keyword}". Length: ${length}. Make it profound and impactful.`
    },
    story: {
        systemPrompt: 'You are a creative storyteller who weaves engaging narratives.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} short story about "${keyword}". Length: ${length}. Make it engaging with a clear beginning, middle, and end.`
    },
    riddle: {
        systemPrompt: 'You are a master of riddles who creates challenging but solvable puzzles.',
        userPromptTemplate: (keyword, tone, length) =>
            `Create a ${tone} riddle about "${keyword}". Length: ${length}. Include the answer at the end with "Answer:" prefix.`
    },
    'pickup-line': {
        systemPrompt: 'You are a charming wordsmith who creates clever, respectful pickup lines.',
        userPromptTemplate: (keyword, tone, length) =>
            `Create a ${tone} pickup line related to "${keyword}". Length: ${length}. Keep it respectful and witty.`
    },
    roast: {
        systemPrompt: 'You are a comedy roaster who creates playful, good-natured roasts.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} roast about "${keyword}". Length: ${length}. Keep it funny and light-hearted, not mean-spirited.`
    },
    compliment: {
        systemPrompt: 'You are a sincere person who gives genuine, thoughtful compliments.',
        userPromptTemplate: (keyword, tone, length) =>
            `Create a ${tone} compliment about "${keyword}". Length: ${length}. Make it genuine and heartwarming.`
    },
    'dad-joke': {
        systemPrompt: 'You are a dad who tells classic pun-based dad jokes.',
        userPromptTemplate: (keyword, tone, length) =>
            `Tell a dad joke about "${keyword}". Length: ${length}. Use puns and wholesome humor.`
    },
    haiku: {
        systemPrompt: 'You are a haiku master who creates traditional 5-7-5 syllable poems.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} haiku about "${keyword}". Follow the 5-7-5 syllable structure strictly. Create ${length === 'short' ? '1' : length === 'medium' ? '2' : '3'} haiku(s).`
    },
    'rap-lyrics': {
        systemPrompt: 'You are a talented rapper who creates clever rhymes with flow.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write ${tone} rap lyrics about "${keyword}". Length: ${length}. Include rhyme scheme and wordplay.`
    },
    'tweet-thread': {
        systemPrompt: 'You are a social media expert who creates engaging tweet threads.',
        userPromptTemplate: (keyword, tone, length) =>
            `Create a ${tone} tweet thread about "${keyword}". Length: ${length === 'short' ? '3 tweets' : length === 'medium' ? '5 tweets' : '8 tweets'}. Number each tweet.`
    },
    acrostic: {
        systemPrompt: 'You create beautiful acrostic poems where first letters spell out words.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} acrostic poem using the word "${keyword}". Each line should start with letters from the keyword in order.`
    },
    'motivational-speech': {
        systemPrompt: 'You are an inspiring motivational speaker who energizes and empowers people.',
        userPromptTemplate: (keyword, tone, length) =>
            `Write a ${tone} motivational speech about "${keyword}". Length: ${length}. Make it powerful and inspiring.`
    },
};
