// ============================================================
// MyOctaves — Seed Data: People, Special Days, Seasons, Songs
// ============================================================

import { Person, SpecialDay, SeasonConfig, HistoricEvent } from './types';

// ============================================================
// Iconic songs per artist — for ready-made suggestions
// ============================================================
export interface SeedSong {
  title: string;
  film?: string;
  year?: number;
  language: string;
  mood: string; // 'upbeat' | 'melody' | 'sad' | 'devotional' | 'patriotic' | 'romantic'
}

export const SEED_SONGS: Record<string, SeedSong[]> = {
  spb: [
    { title: 'Adi Raa Adi Raa', film: 'Swathi Muthyam', year: 1986, language: 'Telugu', mood: 'melody' },
    { title: 'Manasu Palike', film: 'Swathi Kiranam', year: 1992, language: 'Telugu', mood: 'melody' },
    { title: 'Ek Duuje Ke Liye', film: 'Ek Duuje Ke Liye', year: 1981, language: 'Hindi', mood: 'romantic' },
    { title: 'Kannu Hodiyaka', film: 'Auto Raja', year: 1980, language: 'Kannada', mood: 'upbeat' },
  ],
  lata: [
    { title: 'Lag Ja Gale', film: 'Woh Kaun Thi', year: 1964, language: 'Hindi', mood: 'romantic' },
    { title: 'Ajeeb Daastaan Hai Yeh', film: 'Dil Apna Aur Preet Parai', year: 1960, language: 'Hindi', mood: 'melody' },
    { title: 'Tujhe Dekha To', film: 'DDLJ', year: 1995, language: 'Hindi', mood: 'romantic' },
  ],
  ghantasala: [
    { title: 'Raagam Taanam Pallavi', film: 'Missamma', year: 1955, language: 'Telugu', mood: 'melody' },
    { title: 'Nee Navvu Cheppindi', film: 'Devadasu', year: 1953, language: 'Telugu', mood: 'romantic' },
    { title: 'Entho Chinnadi', film: 'Mayabazar', year: 1957, language: 'Telugu', mood: 'melody' },
  ],
  kishore: [
    { title: 'Roop Tera Mastana', film: 'Aradhana', year: 1969, language: 'Hindi', mood: 'romantic' },
    { title: 'Mere Sapno Ki Rani', film: 'Aradhana', year: 1969, language: 'Hindi', mood: 'upbeat' },
    { title: 'Pal Pal Dil Ke Paas', film: 'Blackmail', year: 1973, language: 'Hindi', mood: 'melody' },
  ],
  rafi: [
    { title: 'Chaudhvin Ka Chand', film: 'Chaudhvin Ka Chand', year: 1960, language: 'Hindi', mood: 'romantic' },
    { title: 'Kya Hua Tera Wada', film: 'Hum Kisise Kum Naheen', year: 1977, language: 'Hindi', mood: 'sad' },
    { title: 'Taarif Karun Kya Uski', film: 'Kashmir Ki Kali', year: 1964, language: 'Hindi', mood: 'melody' },
  ],
  rdburman: [
    { title: 'Tere Bina Zindagi Se', film: 'Aandhi', year: 1975, language: 'Hindi', mood: 'melody' },
    { title: 'Chura Liya Hai Tumne', film: 'Yaadon Ki Baaraat', year: 1973, language: 'Hindi', mood: 'romantic' },
    { title: 'Rim Jhim Gire Sawan', film: 'Manzil', year: 1979, language: 'Hindi', mood: 'romantic' },
  ],
  ilayaraja: [
    { title: 'Mannil Indha Kadhal', film: 'Keladi Kanmani', year: 1990, language: 'Tamil', mood: 'romantic' },
    { title: 'Ilayanila', film: 'Payanangal Mudivathillai', year: 1982, language: 'Tamil', mood: 'melody' },
    { title: 'Sundari Neeyum', film: 'Michael Madana Kama Rajan', year: 1990, language: 'Tamil', mood: 'melody' },
  ],
  arr: [
    { title: 'Maa Tujhe Salaam', film: 'Vande Mataram', year: 1997, language: 'Hindi', mood: 'patriotic' },
    { title: 'Jai Ho', film: 'Slumdog Millionaire', year: 2008, language: 'Hindi', mood: 'upbeat' },
    { title: 'Thee Thee', film: 'Thiruda Thiruda', year: 1993, language: 'Tamil', mood: 'upbeat' },
  ],
  susheela: [
    { title: 'Aaduvari Matalaku', film: 'Pandanti Kapuram', year: 1972, language: 'Telugu', mood: 'melody' },
    { title: 'Ninne Pelladutha', film: 'Missamma', year: 1955, language: 'Telugu', mood: 'romantic' },
  ],
  mss: [
    { title: 'Kurai Ondrum Illai', film: '', year: 1960, language: 'Tamil', mood: 'devotional' },
    { title: 'Bhaja Govindam', film: '', year: 1965, language: 'Telugu', mood: 'devotional' },
  ],
  bmk: [
    { title: 'Endaro Mahanubhavulu', film: '', year: 1970, language: 'Telugu', mood: 'devotional' },
    { title: 'Prabhuvuku Sarivaaru', film: 'Aapadbandhavudu', year: 1992, language: 'Telugu', mood: 'devotional' },
  ],
  madan: [
    { title: 'Lag Ja Gale', film: 'Woh Kaun Thi', year: 1964, language: 'Hindi', mood: 'romantic' },
    { title: 'Ruke Ruke Se Kadam', film: 'Mausam', year: 1975, language: 'Hindi', mood: 'melody' },
  ],
  naushad: [
    { title: 'Pyar Kiya To Darna Kya', film: 'Mughal-e-Azam', year: 1960, language: 'Hindi', mood: 'melody' },
    { title: 'Ae Mohabbat Zindabad', film: 'Mughal-e-Azam', year: 1960, language: 'Hindi', mood: 'romantic' },
  ],
  mukesh: [
    { title: 'Jeena Yahan Marna Yahan', film: 'Mera Naam Joker', year: 1970, language: 'Hindi', mood: 'melody' },
    { title: 'Suhana Safar', film: 'Madhumati', year: 1958, language: 'Hindi', mood: 'romantic' },
  ],
  yesudas: [
    { title: 'Ilayanila', film: 'Payanangal Mudivathillai', year: 1982, language: 'Tamil', mood: 'melody' },
    { title: 'Mannil Indha Kadhal', film: 'Keladi Kanmani', year: 1990, language: 'Tamil', mood: 'romantic' },
  ],
  chitra: [
    { title: 'Vennello Godari', film: 'Preminchukundam Raa', year: 1997, language: 'Telugu', mood: 'romantic' },
    { title: 'Kannanule', film: 'Bombay', year: 1995, language: 'Telugu', mood: 'melody' },
  ],
  janaki: [
    { title: 'Paadum Paravaigal', film: 'Payanangal Mudivathillai', year: 1982, language: 'Tamil', mood: 'melody' },
    { title: 'Amma Ani Kothaga', film: 'Life Is Beautiful', year: 2012, language: 'Telugu', mood: 'melody' },
  ],
  // Season/mood songs (keyed by category)
  _patriotic: [
    { title: 'Aye Mere Watan Ke Logon', film: '', year: 1963, language: 'Hindi', mood: 'patriotic' },
    { title: 'Maa Tujhe Salaam', film: 'Vande Mataram', year: 1997, language: 'Hindi', mood: 'patriotic' },
    { title: 'Desh Rangeela', film: 'Fanaa', year: 2006, language: 'Hindi', mood: 'patriotic' },
  ],
  _romantic: [
    { title: 'Tujhe Dekha To', film: 'DDLJ', year: 1995, language: 'Hindi', mood: 'romantic' },
    { title: 'Ennodu Nee Irundhal', film: 'I', year: 2015, language: 'Tamil', mood: 'romantic' },
  ],
  _monsoon: [
    { title: 'Rim Jhim Gire Sawan', film: 'Manzil', year: 1979, language: 'Hindi', mood: 'romantic' },
    { title: 'Bheegi Bheegi Raaton Mein', film: 'Ajanabee', year: 1974, language: 'Hindi', mood: 'romantic' },
  ],
  _festive: [
    { title: 'Nagada Sang Dhol', film: 'Goliyon Ki Rasleela Ram-Leela', year: 2013, language: 'Hindi', mood: 'upbeat' },
    { title: 'Jai Jai Shiv Shankar', film: 'Aap Ki Kasam', year: 1974, language: 'Hindi', mood: 'upbeat' },
  ],
  _devotional: [
    { title: 'Kurai Ondrum Illai', film: '', year: 1960, language: 'Tamil', mood: 'devotional' },
    { title: 'Om Jai Jagdish Hare', film: '', year: 1950, language: 'Hindi', mood: 'devotional' },
  ],
};

export const SEED_PEOPLE: Person[] = [
  {
    id: 'spb', name: 'S.P. Balasubrahmanyam',
    role: ['singer'], birthDate: '06-04', birthYear: 1946,
    deathDate: '09-25', deathYear: 2020,
    languages: ['Telugu', 'Tamil', 'Hindi', 'Kannada'],
    knownFor: 'Legendary playback singer with 40,000+ songs',
    isCurated: true,
  },
  {
    id: 'lata', name: 'Lata Mangeshkar',
    role: ['singer'], birthDate: '09-28', birthYear: 1929,
    deathDate: '02-06', deathYear: 2022,
    languages: ['Hindi'],
    knownFor: 'Nightingale of India',
    isCurated: true,
  },
  {
    id: 'ghantasala', name: 'Ghantasala Venkateswara Rao',
    role: ['singer', 'composer'], birthDate: '12-04', birthYear: 1922,
    deathDate: '02-11', deathYear: 1974,
    languages: ['Telugu'],
    knownFor: 'Legendary Telugu playback singer & composer',
    isCurated: true,
  },
  {
    id: 'kishore', name: 'Kishore Kumar',
    role: ['singer', 'actor'], birthDate: '08-04', birthYear: 1929,
    deathDate: '10-13', deathYear: 1987,
    languages: ['Hindi'],
    knownFor: 'Versatile singer and actor',
    isCurated: true,
  },
  {
    id: 'rafi', name: 'Mohammed Rafi',
    role: ['singer'], birthDate: '12-24', birthYear: 1924,
    deathDate: '07-31', deathYear: 1980,
    languages: ['Hindi'],
    knownFor: 'One of the greatest Indian playback singers',
    isCurated: true,
  },
  {
    id: 'rdburman', name: 'R.D. Burman',
    role: ['music_director', 'composer'], birthDate: '06-27', birthYear: 1939,
    deathDate: '01-04', deathYear: 1994,
    languages: ['Hindi'],
    knownFor: 'Pancham Da — revolutionary film composer',
    isCurated: true,
  },
  {
    id: 'sdburman', name: 'S.D. Burman',
    role: ['music_director', 'composer'], birthDate: '10-01', birthYear: 1906,
    deathDate: '10-31', deathYear: 1975,
    languages: ['Hindi'],
    knownFor: 'Iconic Bollywood composer',
    isCurated: true,
  },
  {
    id: 'ilayaraja', name: 'Ilaiyaraaja',
    role: ['music_director', 'composer'], birthDate: '06-02', birthYear: 1943,
    languages: ['Tamil', 'Telugu', 'Hindi', 'Kannada'],
    knownFor: 'Isaignani — Master of film music',
    isCurated: true,
  },
  {
    id: 'arr', name: 'A.R. Rahman',
    role: ['music_director', 'composer'], birthDate: '01-06', birthYear: 1967,
    languages: ['Tamil', 'Hindi', 'Telugu'],
    knownFor: 'Oscar-winning composer — Mozart of Madras',
    isCurated: true,
  },
  {
    id: 'susheela', name: 'P. Susheela',
    role: ['singer'], birthDate: '11-13', birthYear: 1935,
    languages: ['Telugu', 'Tamil', 'Kannada'],
    knownFor: 'Guinness record holder for most songs recorded',
    isCurated: true,
  },
  {
    id: 'mss', name: 'M.S. Subbulakshmi',
    role: ['singer'], birthDate: '09-16', birthYear: 1916,
    deathDate: '12-11', deathYear: 2004,
    languages: ['Tamil', 'Telugu'],
    knownFor: 'Queen of Carnatic music, Bharat Ratna awardee',
    isCurated: true,
  },
  {
    id: 'bmk', name: 'Balamuralikrishna',
    role: ['singer', 'composer'], birthDate: '07-06', birthYear: 1930,
    deathDate: '11-22', deathYear: 2016,
    languages: ['Telugu', 'Tamil', 'Kannada'],
    knownFor: 'Carnatic music legend, composed in all 72 ragas',
    isCurated: true,
  },
  {
    id: 'madan', name: 'Madan Mohan',
    role: ['music_director', 'composer'], birthDate: '06-25', birthYear: 1924,
    deathDate: '07-14', deathYear: 1975,
    languages: ['Hindi'],
    knownFor: 'King of ghazals in film music',
    isCurated: true,
  },
  {
    id: 'naushad', name: 'Naushad Ali',
    role: ['music_director', 'composer'], birthDate: '12-25', birthYear: 1919,
    deathDate: '05-05', deathYear: 2006,
    languages: ['Hindi'],
    knownFor: 'Pioneer of orchestral Bollywood music',
    isCurated: true,
  },
  {
    id: 'kv_mahadevan', name: 'K.V. Mahadevan',
    role: ['music_director', 'composer'], birthDate: '03-12', birthYear: 1918,
    deathDate: '01-21', deathYear: 2001, // Note: some sources cite August 21
    languages: ['Telugu', 'Tamil', 'Kannada'],
    knownFor: 'Prolific South Indian film composer',
    isCurated: true,
  },
  {
    id: 'pendyala', name: 'Pendyala Nageswara Rao',
    role: ['music_director', 'composer'], birthDate: '06-12', birthYear: 1924, // Note: some sources cite March 19
    deathDate: '05-17', deathYear: 1984,
    languages: ['Telugu'],
    knownFor: 'Classic Telugu film composer',
    isCurated: true,
  },
  {
    id: 'salil', name: 'Salil Chowdhury',
    role: ['music_director', 'composer'], birthDate: '11-19', birthYear: 1925,
    deathDate: '09-05', deathYear: 1995,
    languages: ['Hindi'],
    knownFor: 'Innovative composer with classical roots',
    isCurated: true,
  },
  {
    id: 'mukesh', name: 'Mukesh',
    role: ['singer'], birthDate: '07-22', birthYear: 1923,
    deathDate: '08-27', deathYear: 1976,
    languages: ['Hindi'],
    knownFor: 'Voice of Raj Kapoor films',
    isCurated: true,
  },
  {
    id: 'hemant', name: 'Hemant Kumar',
    role: ['singer', 'music_director'], birthDate: '06-16', birthYear: 1920,
    deathDate: '09-26', deathYear: 1989,
    languages: ['Hindi'],
    knownFor: 'Singer-composer with a soulful voice',
    isCurated: true,
  },
  {
    id: 'talat', name: 'Talat Mahmood',
    role: ['singer'], birthDate: '02-24', birthYear: 1924,
    deathDate: '05-09', deathYear: 1998,
    languages: ['Hindi'],
    knownFor: 'King of ghazal singing',
    isCurated: true,
  },
  {
    id: 'janaki', name: 'S. Janaki',
    role: ['singer'], birthDate: '04-23', birthYear: 1938,
    languages: ['Telugu', 'Tamil', 'Kannada', 'Hindi'],
    knownFor: 'Versatile playback singer across languages',
    isCurated: true,
  },
  {
    id: 'chitra', name: 'K.S. Chithra',
    role: ['singer'], birthDate: '07-27', birthYear: 1963,
    languages: ['Tamil', 'Telugu', 'Hindi', 'Kannada'],
    knownFor: 'Nightingale of South India',
    isCurated: true,
  },
  {
    id: 'yesudas', name: 'K.J. Yesudas',
    role: ['singer'], birthDate: '01-10', birthYear: 1940,
    languages: ['Tamil', 'Telugu', 'Hindi', 'Kannada'],
    knownFor: 'Ganagandharvan — celestial singer',
    isCurated: true,
  },
  {
    id: 'spcs', name: 'S.P. Sailaja',
    role: ['singer'], birthDate: '01-29', birthYear: 1966,
    languages: ['Telugu', 'Tamil'],
    knownFor: 'Award-winning playback singer',
    isCurated: true,
  },
  {
    id: 'viswanathan', name: 'M.S. Viswanathan',
    role: ['music_director', 'composer'], birthDate: '06-24', birthYear: 1928,
    deathDate: '07-14', deathYear: 2015,
    languages: ['Tamil', 'Telugu'],
    knownFor: 'Mellisai Mannar — King of melody',
    isCurated: true,
  },
];

export const SEED_SPECIAL_DAYS: SpecialDay[] = [
  // January
  { id: 'new_year', name: 'New Year', date: '01-01', month: 1, day: 1, description: 'New Year celebrations', scope: 'international', tags: ['festive', 'upbeat'], suggestedThemes: ['Fresh start melodies'] },
  { id: 'republic_day', name: 'Republic Day', date: '01-26', month: 1, day: 26, description: 'India Republic Day', scope: 'india', tags: ['patriotic'], suggestedThemes: ['Patriotic songs'] },

  // February
  { id: 'valentines', name: "Valentine's Day", date: '02-14', month: 2, day: 14, description: 'Day of love', scope: 'international', tags: ['romantic'], suggestedThemes: ['Romantic melodies'] },

  // March
  { id: 'womens_day', name: "International Women's Day", date: '03-08', month: 3, day: 8, description: 'Celebrating women worldwide', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Songs celebrating women'] },
  { id: 'happiness_day', name: 'International Day of Happiness', date: '03-20', month: 3, day: 20, description: 'UN day promoting happiness as a universal goal', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Feel-good songs'] },
  { id: 'forest_day', name: 'International Day of Forests', date: '03-21', month: 3, day: 21, description: 'Celebrating the vital role of forests', scope: 'international', tags: ['peace'], suggestedThemes: ['Nature-inspired melodies'] },
  { id: 'world_water_day', name: 'World Water Day', date: '03-22', month: 3, day: 22, description: 'Raising awareness about freshwater resources', scope: 'international', tags: ['peace'], suggestedThemes: ['Rain and river songs'] },
  { id: 'world_theatre_day', name: 'World Theatre Day', date: '03-27', month: 3, day: 27, description: 'Celebrating the art of theatre', scope: 'international', tags: ['melody', 'classical'], suggestedThemes: ['Drama and stage songs'] },
  { id: 'ugadi', name: 'Ugadi / Gudi Padwa', date: '03-30', month: 3, day: 30, description: 'Telugu & Kannada New Year (approx)', scope: 'regional', tags: ['festive'], suggestedThemes: ['Festive Telugu/Kannada songs'] },

  // April
  { id: 'world_health_day', name: 'World Health Day', date: '04-07', month: 4, day: 7, description: 'WHO global health awareness day', scope: 'international', tags: ['peace'], suggestedThemes: ['Healing melodies'] },
  { id: 'earth_day', name: 'Earth Day', date: '04-22', month: 4, day: 22, description: 'Annual event supporting environmental protection', scope: 'international', tags: ['peace', 'folk'], suggestedThemes: ['Nature songs'] },
  { id: 'world_book_day', name: 'World Book Day', date: '04-23', month: 4, day: 23, description: 'UNESCO day promoting reading and publishing', scope: 'international', tags: ['peace'], suggestedThemes: ['Literary-inspired music'] },
  { id: 'world_dance_day', name: 'International Dance Day', date: '04-29', month: 4, day: 29, description: 'Celebrating dance as an art form', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Dance numbers'] },

  // May
  { id: 'labour_day', name: 'International Labour Day', date: '05-01', month: 5, day: 1, description: 'Workers Day worldwide', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Songs of the working spirit'] },
  { id: 'mothers_day', name: "Mother's Day", date: '05-11', month: 5, day: 11, description: 'Celebrating mothers (2nd Sunday of May)', scope: 'international', tags: ['melody', 'devotional'], suggestedThemes: ['Songs for Amma/Maa'] },
  { id: 'world_sleep_day', name: 'World Sleep Day', date: '03-14', month: 3, day: 14, description: 'Promoting restful sleep worldwide', scope: 'international', tags: ['peace'], suggestedThemes: ['Lullaby melodies'] },

  // June
  { id: 'environment_day', name: 'World Environment Day', date: '06-05', month: 6, day: 5, description: 'UN principal vehicle for encouraging environmental awareness', scope: 'international', tags: ['peace', 'folk'], suggestedThemes: ['Nature and ecology songs'] },
  { id: 'fathers_day', name: "Father's Day", date: '06-15', month: 6, day: 15, description: 'Celebrating fathers (3rd Sunday of June)', scope: 'international', tags: ['melody'], suggestedThemes: ['Songs for Nanna/Papa'] },
  { id: 'world_music_day', name: 'World Music Day', date: '06-21', month: 6, day: 21, description: 'F\u00EAte de la Musique', scope: 'international', tags: ['melody', 'classical'], suggestedThemes: ['Classical renditions'] },
  { id: 'yoga_day', name: 'International Yoga Day', date: '06-21', month: 6, day: 21, description: 'Celebrating the ancient practice of yoga', scope: 'international', tags: ['peace', 'devotional'], suggestedThemes: ['Meditation and peaceful ragas'] },

  // July
  { id: 'world_chocolate_day', name: 'World Chocolate Day', date: '07-07', month: 7, day: 7, description: 'Celebrating the sweet delight', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Sweet melodious songs'] },
  { id: 'friendship_day', name: 'International Friendship Day', date: '07-30', month: 7, day: 30, description: 'UN day celebrating friendship', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Friendship songs'] },

  // August
  { id: 'independence_day', name: 'Independence Day', date: '08-15', month: 8, day: 15, description: 'India Independence Day', scope: 'india', tags: ['patriotic'], suggestedThemes: ['Desh bhakti songs'] },

  // September
  { id: 'teachers_day', name: "Teachers' Day", date: '09-05', month: 9, day: 5, description: "Dr. Radhakrishnan's Birthday", scope: 'india', tags: ['devotional', 'peace'], suggestedThemes: ['Guru vandana'] },
  { id: 'world_peace_day', name: 'International Day of Peace', date: '09-21', month: 9, day: 21, description: 'UN day devoted to world peace', scope: 'international', tags: ['peace'], suggestedThemes: ['Peace and harmony songs'] },
  { id: 'world_heart_day', name: 'World Heart Day', date: '09-29', month: 9, day: 29, description: 'Raising awareness about cardiovascular disease', scope: 'international', tags: ['melody'], suggestedThemes: ['Heartfelt melodies'] },

  // October
  { id: 'gandhi_jayanti', name: 'Gandhi Jayanti', date: '10-02', month: 10, day: 2, description: "Mahatma Gandhi's Birthday", scope: 'india', tags: ['patriotic', 'peace'], suggestedThemes: ['Songs of peace'] },
  { id: 'world_smile_day', name: 'World Smile Day', date: '10-03', month: 10, day: 3, description: 'Act of kindness day', scope: 'international', tags: ['upbeat'], suggestedThemes: ['Happy and cheerful songs'] },
  { id: 'world_mental_health_day', name: 'World Mental Health Day', date: '10-10', month: 10, day: 10, description: 'Raising awareness of mental health', scope: 'international', tags: ['peace', 'melody'], suggestedThemes: ['Soothing and calming music'] },
  { id: 'diwali', name: 'Diwali (approx)', date: '10-20', month: 10, day: 20, description: 'Festival of lights', scope: 'india', tags: ['festive'], suggestedThemes: ['Festival songs'] },
  { id: 'halloween', name: 'Halloween', date: '10-31', month: 10, day: 31, description: 'Night of costumes and spooks', scope: 'international', tags: ['festive'], suggestedThemes: ['Thriller-inspired songs'] },

  // November
  { id: 'childrens_day', name: "Children's Day", date: '11-14', month: 11, day: 14, description: "Nehru's Birthday — Children's Day in India", scope: 'india', tags: ['upbeat'], suggestedThemes: ['Fun and playful songs'] },
  { id: 'world_kindness_day', name: 'World Kindness Day', date: '11-13', month: 11, day: 13, description: 'Encouraging kindness worldwide', scope: 'international', tags: ['peace', 'melody'], suggestedThemes: ['Gentle, kind melodies'] },

  // December
  { id: 'human_rights_day', name: 'Human Rights Day', date: '12-10', month: 12, day: 10, description: 'UN day marking the Universal Declaration of Human Rights', scope: 'international', tags: ['peace', 'patriotic'], suggestedThemes: ['Songs of freedom'] },
  { id: 'christmas', name: 'Christmas', date: '12-25', month: 12, day: 25, description: 'Christmas Day', scope: 'international', tags: ['festive', 'peace'], suggestedThemes: ['Peaceful melodies'] },
  { id: 'nye', name: "New Year's Eve", date: '12-31', month: 12, day: 31, description: 'Last day of the year celebrations', scope: 'international', tags: ['festive', 'upbeat'], suggestedThemes: ['Celebration and party songs'] },
];

export const SEASON_CONFIG: SeasonConfig[] = [
  { months: [12, 1, 2], name: 'Winter', tags: ['peace', 'melody'], description: 'Cool and contemplative — soft, introspective melodies', priority: 1 },
  { months: [3, 4, 5], name: 'Summer', tags: ['summer', 'upbeat'], description: 'Warm and energetic — bright, lively tunes', priority: 1 },
  { months: [6, 7, 8, 9], name: 'Monsoon', tags: ['rain', 'romantic'], description: 'Rainy and romantic — soulful rain songs', priority: 2 },
  { months: [10, 11], name: 'Festive', tags: ['festive'], description: 'Festival season — celebratory rhythms', priority: 2 },
];

// ============================================================
// This Week in Music History — landmark moments by MM-DD
// ============================================================
export const SEED_MUSIC_HISTORY: HistoricEvent[] = [
  // January
  { id: 'mh_grammy_first', title: 'First Grammy Awards held', date: '05-04', year: 1959, description: 'The Recording Academy held its first ceremony at the Beverly Hilton Hotel in Los Angeles.', scope: 'world', tags: ['melody'] },
  { id: 'mh_elvis_bday', title: 'Elvis Presley born', date: '01-08', year: 1935, description: 'The King of Rock & Roll was born in Tupelo, Mississippi.', scope: 'world', tags: ['retro'] },
  { id: 'mh_arr_bday', title: 'A.R. Rahman born', date: '01-06', year: 1967, description: 'Oscar-winning composer A.R. Rahman, the Mozart of Madras, was born in Chennai.', scope: 'india', tags: ['melody'] },

  // February
  { id: 'mh_beatles_us', title: 'The Beatles arrive in the US', date: '02-07', year: 1964, description: 'The Beatles landed at JFK Airport, igniting the British Invasion in America.', scope: 'world', tags: ['retro'] },
  { id: 'mh_bob_marley', title: 'Bob Marley born', date: '02-06', year: 1945, description: 'Reggae legend Bob Marley was born in Nine Mile, Jamaica.', scope: 'world', tags: ['folk'] },
  { id: 'mh_lata_passes', title: 'Lata Mangeshkar passes away', date: '02-06', year: 2022, description: 'India\'s Nightingale, with over 25,000 songs, left an immortal legacy.', scope: 'india', tags: ['melody', 'sad'] },

  // March
  { id: 'mh_roja_release', title: 'Roja released', date: '08-15', year: 1992, description: 'A.R. Rahman\'s debut film Roja released, revolutionizing Indian film music forever.', scope: 'india', tags: ['melody'] },
  { id: 'mh_alam_ara', title: 'Alam Ara — India\'s first talkie released', date: '03-14', year: 1931, description: 'India\'s first sound film, directed by Ardeshir Irani, premiered at Majestic Cinema in Bombay, launching Indian cinema\'s golden era.', scope: 'india', tags: ['retro', 'classical'] },
  { id: 'mh_bach_born', title: 'Johann Sebastian Bach born', date: '03-21', year: 1685, description: 'One of the greatest composers in the history of Western music was born in Eisenach, Germany.', scope: 'world', tags: ['classical'] },
  { id: 'mh_beethoven_debut', title: 'Beethoven performs his first public concert in Vienna', date: '03-29', year: 1795, description: 'Ludwig van Beethoven made his public debut as a pianist in Vienna, performing his Piano Concerto No. 2.', scope: 'world', tags: ['classical'] },

  // April
  { id: 'mh_sgt_pepper', title: 'Beatles complete Sgt. Pepper\'s final session', date: '04-01', year: 1967, description: 'The Beatles held their last recording session for Sgt. Pepper\'s Lonely Hearts Club Band, one of the most influential albums ever.', scope: 'world', tags: ['retro'] },
  { id: 'mh_mayabazar', title: 'Mayabazar released', date: '03-27', year: 1957, description: 'One of the greatest Indian films, with Ghantasala\'s legendary music, released in Telugu & Tamil.', scope: 'india', tags: ['classical', 'melody'] },
  { id: 'mh_mtv_unplugged', title: 'MTV Unplugged premieres', date: '11-26', year: 1989, description: 'MTV Unplugged debuted, bringing acoustic performances to mainstream audiences.', scope: 'world', tags: ['melody'] },

  // May
  { id: 'mh_bob_dylan_bday', title: 'Bob Dylan born', date: '05-24', year: 1941, description: 'Nobel Prize-winning songwriter Bob Dylan was born in Duluth, Minnesota.', scope: 'world', tags: ['folk'] },
  { id: 'mh_devdas_release', title: 'Devdas (2002) premieres at Cannes', date: '05-23', year: 2002, description: 'Ismail Darbar\'s magnificent score for Devdas premiered at the Cannes Film Festival.', scope: 'india', tags: ['melody', 'classical'] },

  // June
  { id: 'mh_world_music_day', title: 'First World Music Day (Fête de la Musique)', date: '06-21', year: 1982, description: 'France launched the first Fête de la Musique, now celebrated in 120+ countries.', scope: 'world', tags: ['festive', 'melody'] },
  { id: 'mh_spb_recording', title: 'S.P. Balasubrahmanyam\'s debut recording', date: '12-15', year: 1966, description: 'SPB recorded his first song "Sri Sri Sri Maryada Ramanna" for a Telugu film, starting a 40,000+ song career.', scope: 'india', tags: ['melody'] },
  { id: 'mh_rdburman_bday', title: 'R.D. Burman born', date: '06-27', year: 1939, description: 'Pancham Da, who revolutionized Bollywood music with experimental sounds, was born in Kolkata.', scope: 'india', tags: ['retro'] },

  // July
  { id: 'mh_live_aid', title: 'Live Aid concerts held', date: '07-13', year: 1985, description: 'The legendary dual-venue benefit concert in London and Philadelphia raised $127M for famine relief.', scope: 'world', tags: ['upbeat'] },
  { id: 'mh_rafi_passes', title: 'Mohammed Rafi passes away', date: '07-31', year: 1980, description: 'One of the greatest voices in Indian cinema fell silent, leaving behind thousands of timeless songs.', scope: 'india', tags: ['melody', 'sad'] },

  // August
  { id: 'mh_woodstock', title: 'Woodstock Festival begins', date: '08-15', year: 1969, description: 'The iconic Woodstock Music Festival began in Bethel, New York — 400,000 people, 3 days of peace & music.', scope: 'world', tags: ['folk', 'retro'] },
  { id: 'mh_kishore_bday', title: 'Kishore Kumar born', date: '08-04', year: 1929, description: 'The most versatile voice of Bollywood was born in Khandwa, Madhya Pradesh.', scope: 'india', tags: ['melody', 'retro'] },
  { id: 'mh_mtv_launch', title: 'MTV launches', date: '08-01', year: 1981, description: 'MTV began broadcasting with "Video Killed the Radio Star," revolutionizing how the world consumed music.', scope: 'world', tags: ['retro', 'upbeat'] },
  { id: 'mh_mughal_e_azam', title: 'Mughal-e-Azam released', date: '08-05', year: 1960, description: 'K. Asif\'s epic masterpiece with Naushad\'s legendary score released — featuring the immortal "Pyar Kiya To Darna Kya."', scope: 'india', tags: ['classical', 'melody'] },

  // September
  { id: 'mh_spb_passes', title: 'S.P. Balasubrahmanyam passes away', date: '09-25', year: 2020, description: 'Indian music lost one of its greatest voices — SPB sang in 16 languages with over 40,000 songs.', scope: 'india', tags: ['melody', 'sad'] },
  { id: 'mh_freddie_bday', title: 'Freddie Mercury born', date: '09-05', year: 1946, description: 'The legendary Queen frontman was born Farrokh Bulsara in Zanzibar.', scope: 'world', tags: ['upbeat'] },

  // October
  { id: 'mh_john_lennon_bday', title: 'John Lennon born', date: '10-09', year: 1940, description: 'Beatles co-founder and peace activist John Lennon was born in Liverpool.', scope: 'world', tags: ['peace'] },
  { id: 'mh_dilwale_release', title: 'DDLJ released', date: '10-20', year: 1995, description: 'Dilwale Dulhania Le Jayenge released with Jatin-Lalit\'s iconic score — the longest-running Hindi film ever.', scope: 'india', tags: ['romantic'] },
  { id: 'mh_kishore_passes', title: 'Kishore Kumar passes away', date: '10-13', year: 1987, description: 'Bollywood\'s most beloved voice fell silent on his birthday month, leaving a void never filled.', scope: 'india', tags: ['melody', 'sad'] },

  // November
  { id: 'mh_spotify_launch', title: 'Spotify launches', date: '10-07', year: 2008, description: 'Spotify launched in Sweden, beginning the streaming revolution that changed how the world listens to music.', scope: 'world', tags: ['upbeat'] },
  { id: 'mh_thriller_album', title: 'Michael Jackson\'s Thriller album released', date: '11-30', year: 1982, description: 'The best-selling album of all time was released, with 7 hit singles and over 70 million copies sold worldwide.', scope: 'world', tags: ['retro', 'upbeat'] },
  { id: 'mh_arr_oscar', title: 'A.R. Rahman wins Oscar', date: '02-22', year: 2009, description: 'A.R. Rahman won two Academy Awards for Slumdog Millionaire — Best Original Score and Best Original Song ("Jai Ho").', scope: 'india', tags: ['melody', 'upbeat'] },

  // December
  { id: 'mh_beethoven_bday', title: 'Beethoven born', date: '12-16', year: 1770, description: 'Ludwig van Beethoven, one of the greatest composers in Western music history, was born in Bonn, Germany.', scope: 'world', tags: ['classical'] },
  { id: 'mh_ghantasala_bday', title: 'Ghantasala Venkateswara Rao born', date: '12-04', year: 1922, description: 'The voice that defined Telugu cinema was born in Chowtapalli, Andhra Pradesh.', scope: 'india', tags: ['melody', 'classical'] },
  { id: 'mh_rafi_bday', title: 'Mohammed Rafi born', date: '12-24', year: 1924, description: 'The golden voice of Hindi cinema was born in Kotla Sultan Singh, Punjab.', scope: 'india', tags: ['melody'] },
];
