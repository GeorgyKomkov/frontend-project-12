import filter from 'leo-profanity';

filter.loadDictionary('ru');
filter.loadDictionary('en');
const filterWords = (word) => filter.clean(word);

export default filterWords;
