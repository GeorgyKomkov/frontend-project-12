import filter from 'leo-profanity';

filter.loadDictionary('ru');
const filterWords = (word) => filter.clean(word);

export default filterWords;
