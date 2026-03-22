// ============================================================
// MyOctaves â€” Song Catalogue: Rich, filterable song database
// ============================================================

import { DiscoverySong } from './types';

export const SONG_CATALOGUE: DiscoverySong[] = [
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TELUGU â€” Tollywood
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_tel_01', title: 'Raagam Taanam Pallavi', film: 'Missamma', artist: 'Ghantasala', composer: 'S. Rajeswara Rao', year: 1955, language: 'Telugu', genre: 'Tollywood', mood: 'Happy', weather: ['Any'], personId: 'ghantasala', reelFriendly: false },
  { id: 's_tel_02', title: 'Nee Navvu Cheppindi', film: 'Devadasu', artist: 'Ghantasala', composer: 'C. Ramchandra', year: 1953, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Any'], personId: 'ghantasala', reelFriendly: true },
  { id: 's_tel_03', title: 'Entho Chinnadi', film: 'Mayabazar', artist: 'Ghantasala', composer: 'Ghantasala', year: 1957, language: 'Telugu', genre: 'Tollywood', mood: 'Peaceful', weather: ['Any'], personId: 'ghantasala', reelFriendly: true },
  { id: 's_tel_04', title: 'Manasu Palike Mouna Geetham', film: 'Swathi Kiranam', artist: 'S.P. Balasubrahmanyam', composer: 'K.V. Mahadevan', year: 1992, language: 'Telugu', genre: 'Tollywood', mood: 'Melancholic', weather: ['Rainy', 'Winter'], personId: 'spb', reelFriendly: true },
  { id: 's_tel_05', title: 'Adi Raa Adi Raa', film: 'Swathi Muthyam', artist: 'S.P. Balasubrahmanyam', composer: 'Ilaiyaraaja', year: 1986, language: 'Telugu', genre: 'Tollywood', mood: 'Happy', weather: ['Sunny'], personId: 'spb', festivals: ['Sankranti', 'Ugadi'], reelFriendly: false },
  { id: 's_tel_06', title: 'Aaduvari Matalaku', film: 'Pandanti Kapuram', artist: 'P. Susheela', composer: 'K.V. Mahadevan', year: 1972, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Any'], personId: 'susheela', reelFriendly: false },
  { id: 's_tel_07', title: 'Vennello Godari', film: 'Preminchukundam Raa', artist: 'K.S. Chithra', composer: 'A.R. Rahman', year: 1997, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Rainy'], personId: 'chitra', reelFriendly: true },
  { id: 's_tel_08', title: 'Kannanule', film: 'Bombay', artist: 'K.S. Chithra', composer: 'A.R. Rahman', year: 1995, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Any'], personId: 'chitra', reelFriendly: true },
  { id: 's_tel_09', title: 'Ninne Pelladutha', film: 'Missamma', artist: 'P. Susheela & Ghantasala', composer: 'S. Rajeswara Rao', year: 1955, language: 'Telugu', genre: 'Tollywood', mood: 'Happy', weather: ['Sunny'], personId: 'susheela', festivals: ['Sankranti'], reelFriendly: false },
  { id: 's_tel_10', title: 'Sirimalle Puvva', film: 'Padaharella Vayasu', artist: 'S.P. Balasubrahmanyam & S.P. Sailaja', composer: 'Ilaiyaraaja', year: 1978, language: 'Telugu', genre: 'Tollywood', mood: 'Happy', weather: ['Sunny'], personId: 'spb', festivals: ['Sankranti', 'Ugadi'], reelFriendly: true },
  { id: 's_tel_11', title: 'Aa Ante Amalapuram', film: 'Arya', artist: 'Karthik', composer: 'Devi Sri Prasad', year: 2004, language: 'Telugu', genre: 'Tollywood', mood: 'Energetic', weather: ['Sunny'], festivals: ['Sankranti'], reelFriendly: true },
  { id: 's_tel_12', title: 'Pilichina', film: 'Athadu', artist: 'Karthik & Shreya Ghoshal', composer: 'Mani Sharma', year: 2005, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Rainy'], reelFriendly: true },
  { id: 's_tel_13', title: 'Ye Maaya Chesave', film: 'Ye Maaya Chesave', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2010, language: 'Telugu', genre: 'Tollywood', mood: 'Romantic', weather: ['Any'], personId: 'arr', reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // HINDI â€” Bollywood
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_hin_01', title: 'Lag Ja Gale', film: 'Woh Kaun Thi', artist: 'Lata Mangeshkar', composer: 'Madan Mohan', year: 1964, language: 'Hindi', genre: 'Bollywood', mood: 'Melancholic', weather: ['Rainy', 'Winter'], personId: 'lata', reelFriendly: true },
  { id: 's_hin_02', title: 'Roop Tera Mastana', film: 'Aradhana', artist: 'Kishore Kumar', composer: 'S.D. Burman', year: 1969, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Any'], personId: 'kishore', reelFriendly: true },
  { id: 's_hin_03', title: 'Mere Sapno Ki Rani', film: 'Aradhana', artist: 'Kishore Kumar', composer: 'S.D. Burman', year: 1969, language: 'Hindi', genre: 'Bollywood', mood: 'Happy', weather: ['Sunny'], personId: 'kishore', festivals: ['Holi'], reelFriendly: true },
  { id: 's_hin_04', title: 'Pal Pal Dil Ke Paas', film: 'Blackmail', artist: 'Kishore Kumar', composer: 'Kalyanji-Anandji', year: 1973, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Any'], personId: 'kishore', reelFriendly: true },
  { id: 's_hin_05', title: 'Chaudhvin Ka Chand', film: 'Chaudhvin Ka Chand', artist: 'Mohammed Rafi', composer: 'Ravi', year: 1960, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Any'], personId: 'rafi', reelFriendly: true },
  { id: 's_hin_06', title: 'Kya Hua Tera Wada', film: 'Hum Kisise Kum Naheen', artist: 'Mohammed Rafi', composer: 'R.D. Burman', year: 1977, language: 'Hindi', genre: 'Bollywood', mood: 'Melancholic', weather: ['Rainy'], personId: 'rafi', reelFriendly: true },
  { id: 's_hin_07', title: 'Tere Bina Zindagi Se', film: 'Aandhi', artist: 'Lata Mangeshkar & Kishore Kumar', composer: 'R.D. Burman', year: 1975, language: 'Hindi', genre: 'Bollywood', mood: 'Melancholic', weather: ['Rainy', 'Winter'], personId: 'rdburman', reelFriendly: true },
  { id: 's_hin_08', title: 'Chura Liya Hai Tumne', film: 'Yaadon Ki Baaraat', artist: 'Asha Bhosle & Mohammed Rafi', composer: 'R.D. Burman', year: 1973, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Any'], personId: 'rdburman', reelFriendly: true },
  { id: 's_hin_09', title: 'Rim Jhim Gire Sawan', film: 'Manzil', artist: 'Kishore Kumar & Lata Mangeshkar', composer: 'R.D. Burman', year: 1979, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Rainy'], personId: 'rdburman', reelFriendly: true },
  { id: 's_hin_10', title: 'Ajeeb Daastaan Hai Yeh', film: 'Dil Apna Aur Preet Parai', artist: 'Lata Mangeshkar', composer: 'Shankar Jaikishan', year: 1960, language: 'Hindi', genre: 'Bollywood', mood: 'Melancholic', weather: ['Winter'], personId: 'lata', reelFriendly: true },
  { id: 's_hin_11', title: 'Tujhe Dekha To', film: 'DDLJ', artist: 'Kumar Sanu & Lata Mangeshkar', composer: 'Jatin-Lalit', year: 1995, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Sunny'], reelFriendly: true },
  { id: 's_hin_12', title: 'Jeena Yahan Marna Yahan', film: 'Mera Naam Joker', artist: 'Mukesh', composer: 'Shankar Jaikishan', year: 1970, language: 'Hindi', genre: 'Bollywood', mood: 'Nostalgic', weather: ['Any'], personId: 'mukesh', reelFriendly: false },
  { id: 's_hin_13', title: 'Suhana Safar', film: 'Madhumati', artist: 'Mukesh', composer: 'Salil Chowdhury', year: 1958, language: 'Hindi', genre: 'Bollywood', mood: 'Peaceful', weather: ['Any'], personId: 'mukesh', reelFriendly: true },
  { id: 's_hin_14', title: 'Ruke Ruke Se Kadam', film: 'Mausam', artist: 'Lata Mangeshkar', composer: 'Madan Mohan', year: 1975, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Rainy'], personId: 'madan', reelFriendly: true },
  { id: 's_hin_15', title: 'Pyar Kiya To Darna Kya', film: 'Mughal-e-Azam', artist: 'Lata Mangeshkar', composer: 'Naushad', year: 1960, language: 'Hindi', genre: 'Bollywood', mood: 'Energetic', weather: ['Any'], personId: 'naushad', festivals: ['Diwali', 'Navratri'], reelFriendly: true },
  { id: 's_hin_16', title: 'Taarif Karun Kya Uski', film: 'Kashmir Ki Kali', artist: 'Mohammed Rafi', composer: 'O.P. Nayyar', year: 1964, language: 'Hindi', genre: 'Bollywood', mood: 'Happy', weather: ['Sunny'], personId: 'rafi', reelFriendly: true },
  { id: 's_hin_17', title: 'Dil Chahta Hai', film: 'Dil Chahta Hai', artist: 'Shankar Mahadevan', composer: 'Shankar-Ehsaan-Loy', year: 2001, language: 'Hindi', genre: 'Bollywood', mood: 'Happy', weather: ['Sunny'], festivals: ['Holi'], reelFriendly: true },
  { id: 's_hin_18', title: 'Tum Hi Ho', film: 'Aashiqui 2', artist: 'Arijit Singh', composer: 'Mithoon', year: 2013, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Rainy', 'Winter'], festivals: ['Christmas'], reelFriendly: true },
  { id: 's_hin_19', title: 'Jai Ho', film: 'Slumdog Millionaire', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2008, language: 'Hindi', genre: 'Bollywood', mood: 'Energetic', weather: ['Any'], personId: 'arr', festivals: ['Diwali', 'Holi'], reelFriendly: true },
  { id: 's_hin_20', title: 'Bheegi Bheegi Raaton Mein', film: 'Ajanabee', artist: 'Kishore Kumar & Lata Mangeshkar', composer: 'R.D. Burman', year: 1974, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Rainy'], personId: 'rdburman', reelFriendly: true },
  { id: 's_hin_21', title: 'Kabhi Kabhie Mere Dil Mein', film: 'Kabhi Kabhie', artist: 'Mukesh & Lata Mangeshkar', composer: 'Khayyam', year: 1976, language: 'Hindi', genre: 'Bollywood', mood: 'Romantic', weather: ['Any'], reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // TAMIL
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_tam_01', title: 'Ilayanila', film: 'Payanangal Mudivathillai', artist: 'K.J. Yesudas', composer: 'Ilaiyaraaja', year: 1982, language: 'Tamil', genre: 'Kollywood', mood: 'Peaceful', weather: ['Winter'], personId: 'yesudas', reelFriendly: true },
  { id: 's_tam_02', title: 'Mannil Indha Kadhal', film: 'Keladi Kanmani', artist: 'K.J. Yesudas', composer: 'Ilaiyaraaja', year: 1990, language: 'Tamil', genre: 'Kollywood', mood: 'Romantic', weather: ['Any'], personId: 'ilayaraja', reelFriendly: true },
  { id: 's_tam_03', title: 'Sundari Neeyum', film: 'Michael Madana Kama Rajan', artist: 'Ilaiyaraaja', composer: 'Ilaiyaraaja', year: 1990, language: 'Tamil', genre: 'Kollywood', mood: 'Happy', weather: ['Sunny'], personId: 'ilayaraja', festivals: ['Pongal'], reelFriendly: true },
  { id: 's_tam_04', title: 'Thee Thee', film: 'Thiruda Thiruda', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 1993, language: 'Tamil', genre: 'Kollywood', mood: 'Energetic', weather: ['Sunny'], personId: 'arr', festivals: ['Pongal', 'Holi'], reelFriendly: true },
  { id: 's_tam_05', title: 'Ennodu Nee Irundhal', film: 'I', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2015, language: 'Tamil', genre: 'Kollywood', mood: 'Romantic', weather: ['Any'], personId: 'arr', reelFriendly: true },
  { id: 's_tam_06', title: 'Munbe Vaa', film: 'Sillunu Oru Kaadhal', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2006, language: 'Tamil', genre: 'Kollywood', mood: 'Romantic', weather: ['Winter'], personId: 'arr', reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // GHAZAL
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_ghz_01', title: 'Chupke Chupke Raat Din', film: 'Nikaah', artist: 'Ghulam Ali', year: 1982, language: 'Hindi', genre: 'Ghazal', mood: 'Melancholic', weather: ['Rainy', 'Winter'], reelFriendly: true },
  { id: 's_ghz_02', title: 'Hazaron Khwahishein Aisi', film: '', artist: 'Jagjit Singh', year: 1990, language: 'Hindi', genre: 'Ghazal', mood: 'Melancholic', weather: ['Winter'], reelFriendly: true },
  { id: 's_ghz_03', title: 'Tum Itna Jo Muskura Rahe Ho', film: 'Arth', artist: 'Jagjit Singh', year: 1982, language: 'Hindi', genre: 'Ghazal', mood: 'Melancholic', weather: ['Rainy'], reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // CARNATIC / CLASSICAL
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_car_01', title: 'Kurai Ondrum Illai', film: '', artist: 'M.S. Subbulakshmi', year: 1960, language: 'Tamil', genre: 'Carnatic', mood: 'Devotional', weather: ['Any'], personId: 'mss', festivals: ['Navratri', 'Diwali'], reelFriendly: false },
  { id: 's_car_02', title: 'Bhaja Govindam', film: '', artist: 'M.S. Subbulakshmi', year: 1965, language: 'Telugu', genre: 'Carnatic', mood: 'Devotional', weather: ['Any'], personId: 'mss', reelFriendly: false },
  { id: 's_car_03', title: 'Endaro Mahanubhavulu', film: '', artist: 'Balamuralikrishna', year: 1970, language: 'Telugu', genre: 'Carnatic', mood: 'Devotional', weather: ['Any'], personId: 'bmk', festivals: ['Ganesh Chaturthi'], reelFriendly: false },
  { id: 's_car_04', title: 'Vatapi Ganapatim Bhaje', film: '', artist: 'Balamuralikrishna', year: 1975, language: 'Telugu', genre: 'Carnatic', mood: 'Devotional', weather: ['Any'], personId: 'bmk', festivals: ['Ganesh Chaturthi'], reelFriendly: true },
  { id: 's_car_05', title: 'Raghuvamsa Sudha', film: '', artist: 'Balamuralikrishna', year: 1972, language: 'Telugu', genre: 'Carnatic', mood: 'Peaceful', weather: ['Any'], personId: 'bmk', reelFriendly: false },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // DEVOTIONAL
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_dev_01', title: 'Om Jai Jagdish Hare', film: '', artist: 'Anuradha Paudwal', year: 1988, language: 'Hindi', genre: 'Devotional', mood: 'Devotional', weather: ['Any'], festivals: ['Diwali', 'Navratri'], reelFriendly: false },
  { id: 's_dev_02', title: 'Prabhuvuku Sarivaaru', film: 'Aapadbandhavudu', artist: 'Balamuralikrishna', composer: 'M.M. Keeravani', year: 1992, language: 'Telugu', genre: 'Devotional', mood: 'Devotional', weather: ['Any'], personId: 'bmk', festivals: ['Diwali', 'Ganesh Chaturthi'], reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // PATRIOTIC
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_pat_01', title: 'Aye Mere Watan Ke Logon', film: '', artist: 'Lata Mangeshkar', year: 1963, language: 'Hindi', genre: 'Patriotic', mood: 'Patriotic', weather: ['Any'], personId: 'lata', festivals: ['Independence Day', 'Republic Day'], reelFriendly: true },
  { id: 's_pat_02', title: 'Maa Tujhe Salaam', film: 'Vande Mataram', artist: 'A.R. Rahman', year: 1997, language: 'Hindi', genre: 'Patriotic', mood: 'Patriotic', weather: ['Any'], personId: 'arr', festivals: ['Independence Day', 'Republic Day'], reelFriendly: true },
  { id: 's_pat_03', title: 'Sandese Aate Hain', film: 'Border', artist: 'Sonu Nigam & Roop Kumar Rathod', composer: 'Anu Malik', year: 1997, language: 'Hindi', genre: 'Patriotic', mood: 'Patriotic', weather: ['Any'], festivals: ['Independence Day', 'Republic Day'], reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // FOLK
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_folk_01', title: 'Choti Si Asha', film: 'Roja', artist: 'Minmini', composer: 'A.R. Rahman', year: 1992, language: 'Hindi', genre: 'Folk', mood: 'Happy', weather: ['Sunny'], personId: 'arr', festivals: ['Pongal', 'Sankranti'], reelFriendly: true },
  { id: 's_folk_02', title: 'Urvasi Urvasi', film: 'Kadhalan', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 1994, language: 'Tamil', genre: 'Folk', mood: 'Energetic', weather: ['Sunny'], personId: 'arr', festivals: ['Pongal', 'Holi'], reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // WESTERN-INFLUENCED / INDIE
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_west_01', title: 'Kun Faya Kun', film: 'Rockstar', artist: 'A.R. Rahman & Javed Ali', composer: 'A.R. Rahman', year: 2011, language: 'Hindi', genre: 'Indie', mood: 'Peaceful', weather: ['Winter', 'Rainy'], personId: 'arr', festivals: ['Eid'], reelFriendly: true },
  { id: 's_west_02', title: 'Khwaja Mere Khwaja', film: 'Jodhaa Akbar', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2008, language: 'Hindi', genre: 'Indie', mood: 'Devotional', weather: ['Any'], personId: 'arr', festivals: ['Eid'], reelFriendly: true },
  { id: 's_west_03', title: 'Nadaan Parindey', film: 'Rockstar', artist: 'A.R. Rahman', composer: 'A.R. Rahman', year: 2011, language: 'Hindi', genre: 'Indie', mood: 'Melancholic', weather: ['Rainy', 'Winter'], personId: 'arr', reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // KANNADA
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_kan_01', title: 'Kannu Hodiyaka', film: 'Auto Raja', artist: 'S.P. Balasubrahmanyam', composer: 'Rajan-Nagendra', year: 1980, language: 'Kannada', genre: 'Kollywood', mood: 'Happy', weather: ['Sunny'], personId: 'spb', festivals: ['Ugadi'], reelFriendly: true },
  { id: 's_kan_02', title: 'Naanu Ninna Mareyalare', film: 'Naa Ninna Mareyalare', artist: 'S.P. Balasubrahmanyam', composer: 'Ilaiyaraaja', year: 1986, language: 'Kannada', genre: 'Kollywood', mood: 'Romantic', weather: ['Any'], personId: 'spb', reelFriendly: true },

  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  // HINDUSTANI CLASSICAL
  // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
  { id: 's_hind_01', title: 'Raag Yaman Kalyan', film: '', artist: 'Pandit Hariprasad Chaurasia', year: 1985, language: 'Hindi', genre: 'Hindustani', mood: 'Peaceful', weather: ['Winter'], reelFriendly: false },
  { id: 's_hind_02', title: 'Raag Bhairavi', film: '', artist: 'Pandit Ravi Shankar', year: 1970, language: 'Hindi', genre: 'Hindustani', mood: 'Peaceful', weather: ['Any'], reelFriendly: false },
];
