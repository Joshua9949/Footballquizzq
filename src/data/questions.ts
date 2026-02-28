export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation?: string;
}

export const quizData: Record<string, Question[]> = {

  // ─────────────────────────────────────────────
  //  PREMIER LEAGUE  (40+ questions)
  // ─────────────────────────────────────────────
  premier_league: [
    // EASY
    { id:'pl_e1',  question:'Which club has won the most Premier League titles?', options:['Manchester United','Chelsea','Manchester City','Arsenal'], answer:'Manchester United', difficulty:'easy', category:'premier_league', explanation:'Manchester United have won 13 Premier League titles.' },
    { id:'pl_e2',  question:'What year was the Premier League founded?', options:['1988','1992','1996','1990'], answer:'1992', difficulty:'easy', category:'premier_league', explanation:'The Premier League was formed in 1992, replacing the First Division.' },
    { id:'pl_e3',  question:'Which stadium is home to Arsenal?', options:['Stamford Bridge','Anfield','Emirates Stadium','Old Trafford'], answer:'Emirates Stadium', difficulty:'easy', category:'premier_league' },
    { id:'pl_e4',  question:'What colour are Chelsea\'s home shirts?', options:['Red','Blue','White','Yellow'], answer:'Blue', difficulty:'easy', category:'premier_league' },
    { id:'pl_e5',  question:'Which manager is known as "The Special One"?', options:['Arsene Wenger','Jose Mourinho','Pep Guardiola','Jurgen Klopp'], answer:'Jose Mourinho', difficulty:'easy', category:'premier_league' },
    { id:'pl_e6',  question:'Liverpool\'s home ground is called?', options:['Anfield','Goodison Park','Villa Park','St James\' Park'], answer:'Anfield', difficulty:'easy', category:'premier_league' },
    { id:'pl_e7',  question:'Manchester City\'s home ground is?', options:['Etihad Stadium','Old Trafford','Anfield','Wembley'], answer:'Etihad Stadium', difficulty:'easy', category:'premier_league' },
    { id:'pl_e8',  question:'Which city does Tottenham Hotspur represent?', options:['Manchester','London','Birmingham','Leeds'], answer:'London', difficulty:'easy', category:'premier_league' },
    { id:'pl_e9',  question:'What animal features on the Wolverhampton Wanderers badge?', options:['Lion','Bull','Wolf','Fox'], answer:'Wolf', difficulty:'easy', category:'premier_league' },
    { id:'pl_e10', question:'Which Premier League club is nicknamed "The Gunners"?', options:['Arsenal','Manchester United','Chelsea','Everton'], answer:'Arsenal', difficulty:'easy', category:'premier_league' },
    { id:'pl_e11', question:'Aston Villa\'s home ground is called?', options:['Villa Park','St Andrews','The Hawthorns','City Ground'], answer:'Villa Park', difficulty:'easy', category:'premier_league' },
    { id:'pl_e12', question:'Which club plays at Stamford Bridge?', options:['Arsenal','Chelsea','Tottenham','West Ham'], answer:'Chelsea', difficulty:'easy', category:'premier_league' },
    { id:'pl_e13', question:'Manchester United are nicknamed?', options:['The Citizens','The Toffees','The Red Devils','The Reds'], answer:'The Red Devils', difficulty:'easy', category:'premier_league' },
    { id:'pl_e14', question:'Which club did Erling Haaland join in 2022?', options:['Arsenal','Chelsea','Manchester City','Liverpool'], answer:'Manchester City', difficulty:'easy', category:'premier_league' },
    { id:'pl_e15', question:'How many clubs compete in the Premier League each season?', options:['18','20','22','24'], answer:'20', difficulty:'easy', category:'premier_league' },
    // MEDIUM
    { id:'pl_m1',  question:'Who holds the record for most Premier League goals?', options:['Wayne Rooney','Alan Shearer','Andrew Cole','Frank Lampard'], answer:'Alan Shearer', difficulty:'medium', category:'premier_league', explanation:'Alan Shearer scored 260 Premier League goals for Newcastle and Blackburn.' },
    { id:'pl_m2',  question:'Which team went an entire PL season unbeaten in 2003-04?', options:['Manchester United','Chelsea','Arsenal','Liverpool'], answer:'Arsenal', difficulty:'medium', category:'premier_league', explanation:'Arsenal\'s "Invincibles" went 38 games without a defeat.' },
    { id:'pl_m3',  question:'How many points did Manchester City get in their record 2017-18 season?', options:['95','98','100','102'], answer:'100', difficulty:'medium', category:'premier_league', explanation:'Man City\'s 100-point season remains the all-time record.' },
    { id:'pl_m4',  question:'In what season did Leicester City famously win the Premier League?', options:['2014-15','2015-16','2016-17','2013-14'], answer:'2015-16', difficulty:'medium', category:'premier_league', explanation:'Leicester were 5000-1 outsiders and still won the title under Claudio Ranieri.' },
    { id:'pl_m5',  question:'Which goalkeeper holds the record for most clean sheets in PL history?', options:['David Seaman','Peter Schmeichel','Petr Cech','David de Gea'], answer:'Petr Cech', difficulty:'medium', category:'premier_league', explanation:'Petr Cech kept 202 clean sheets in the Premier League.' },
    { id:'pl_m6',  question:'Who was Premier League top scorer in the 2021-22 season?', options:['Mohamed Salah','Harry Kane','Son Heung-min','Cristiano Ronaldo'], answer:'Mohamed Salah', difficulty:'medium', category:'premier_league' },
    { id:'pl_m7',  question:'Which club has won the most consecutive Premier League games?', options:['Manchester City','Chelsea','Arsenal','Liverpool'], answer:'Manchester City', difficulty:'medium', category:'premier_league', explanation:'Manchester City won 15 consecutive PL matches in the 2021-22 season.' },
    { id:'pl_m8',  question:'Who scored the "Aguerooo" last-minute title-winning goal in 2012?', options:['Carlos Tevez','Edin Dzeko','Sergio Aguero','David Silva'], answer:'Sergio Aguero', difficulty:'medium', category:'premier_league', explanation:'Aguero\'s 93:20 goal vs QPR won Man City their first league title in 44 years.' },
    { id:'pl_m9',  question:'Which club won the first ever Premier League title in 1992-93?', options:['Arsenal','Manchester United','Blackburn Rovers','Liverpool'], answer:'Manchester United', difficulty:'medium', category:'premier_league' },
    { id:'pl_m10', question:'Blackburn Rovers won the Premier League in which year?', options:['1993-94','1994-95','1995-96','1996-97'], answer:'1994-95', difficulty:'medium', category:'premier_league', explanation:'Blackburn won the title under Kenny Dalglish funded by Jack Walker\'s millions.' },
    { id:'pl_m11', question:'Who is the only player to win the PL with three different clubs?', options:['Nicolas Anelka','Andrew Cole','Ashley Cole','Frank Lampard'], answer:'Nicolas Anelka', difficulty:'medium', category:'premier_league', explanation:'Nicolas Anelka won the PL with Arsenal (1998), Manchester City (2012 as a squad player), and Chelsea (2010).' },
    { id:'pl_m12', question:'Which season did Chelsea win their first ever Premier League title?', options:['2003-04','2004-05','2005-06','2006-07'], answer:'2004-05', difficulty:'medium', category:'premier_league', explanation:'Jose Mourinho guided Chelsea to their first PL title in 2004-05.' },
    // HARD
    { id:'pl_h1',  question:'Who scored the first ever Premier League goal?', options:['Teddy Sheringham','Brian Deane','Mark Hughes','Les Ferdinand'], answer:'Brian Deane', difficulty:'hard', category:'premier_league', explanation:'Brian Deane scored for Sheffield United against Manchester United on 15 August 1992.' },
    { id:'pl_h2',  question:'What is the record for the fastest Premier League goal ever scored?', options:['7.69 seconds','8.9 seconds','9.9 seconds','10.6 seconds'], answer:'7.69 seconds', difficulty:'hard', category:'premier_league', explanation:'Shane Long scored for Southampton against Watford in 2019 after just 7.69 seconds.' },
    { id:'pl_h3',  question:'Who was the first foreign manager to win the Premier League?', options:['Arsene Wenger','Jose Mourinho','Carlo Ancelotti','Ruud Gullit'], answer:'Arsene Wenger', difficulty:'hard', category:'premier_league', explanation:'Arsene Wenger won the PL in 1997-98, becoming the first foreign manager to do so.' },
    { id:'pl_h4',  question:'Which club has been relegated from the Premier League the most times?', options:['Norwich City','Sunderland','Leicester City','Crystal Palace'], answer:'Sunderland', difficulty:'hard', category:'premier_league' },
    { id:'pl_h5',  question:'Which Premier League season saw the introduction of VAR?', options:['2017-18','2018-19','2019-20','2020-21'], answer:'2019-20', difficulty:'hard', category:'premier_league' },
    { id:'pl_h6',  question:'Who scored the most goals in a single Premier League season?', options:['Alan Shearer','Andrew Cole','Erling Haaland','Cristiano Ronaldo'], answer:'Erling Haaland', difficulty:'hard', category:'premier_league', explanation:'Erling Haaland scored 36 Premier League goals in his debut 2022-23 season.' },
    { id:'pl_h7',  question:'How many goals did Andy Cole score in the 1993-94 PL season for Newcastle?', options:['30','34','41','38'], answer:'34', difficulty:'hard', category:'premier_league', explanation:'Andy Cole scored 34 goals in 40 games, sharing the single-season record with Alan Shearer (1995-96).' },
    { id:'pl_h8',  question:'Which club won the inaugural Premier League title with a 10-point margin?', options:['Arsenal','Liverpool','Manchester United','Leeds United'], answer:'Manchester United', difficulty:'hard', category:'premier_league', explanation:'Man United won the 1992-93 PL title by 10 points from Aston Villa.' },
    { id:'pl_h9',  question:'Who is the youngest ever Premier League scorer (16 years 270 days)?', options:['Wayne Rooney','James Vaughan','Jack Wilshere','Theo Walcott'], answer:'James Vaughan', difficulty:'hard', category:'premier_league', explanation:'James Vaughan scored for Everton against Crystal Palace in April 2005.' },
    { id:'pl_h10', question:'What record did Coventry City and Sheffield United share in the first PL season?', options:['First relegation','First sending off','First 5-0 win','First goalless draw'], answer:'First relegation', difficulty:'hard', category:'premier_league' },
  ],

  // ─────────────────────────────────────────────
  //  LA LIGA  (40+ questions)
  // ─────────────────────────────────────────────
  la_liga: [
    // EASY
    { id:'ll_e1',  question:'Which club has won La Liga the most times?', options:['Barcelona','Real Madrid','Atletico Madrid','Valencia'], answer:'Real Madrid', difficulty:'easy', category:'la_liga', explanation:'Real Madrid have won La Liga a record 36 times.' },
    { id:'ll_e2',  question:'What is FC Barcelona\'s iconic nickname?', options:['Los Blancos','Los Colchoneros','Blaugrana','Los Merengues'], answer:'Blaugrana', difficulty:'easy', category:'la_liga' },
    { id:'ll_e3',  question:'Where does Real Madrid play their home games?', options:['Camp Nou','Santiago Bernabeu','Wanda Metropolitano','Mestalla'], answer:'Santiago Bernabeu', difficulty:'easy', category:'la_liga' },
    { id:'ll_e4',  question:'What is "El Clasico"?', options:['Real Madrid vs Atletico','Barcelona vs Real Madrid','Valencia vs Sevilla','Sevilla vs Barcelona'], answer:'Barcelona vs Real Madrid', difficulty:'easy', category:'la_liga' },
    { id:'ll_e5',  question:'Which player joined Real Madrid in 2023 from PSG?', options:['Neymar','Kylian Mbappe','Lionel Messi','Marco Verratti'], answer:'Kylian Mbappe', difficulty:'easy', category:'la_liga' },
    { id:'ll_e6',  question:'What colours does Real Madrid wear at home?', options:['Red and white','All blue','All white','Yellow and black'], answer:'All white', difficulty:'easy', category:'la_liga' },
    { id:'ll_e7',  question:'Which La Liga club is nicknamed "Los Colchoneros" (The Mattress Makers)?', options:['Real Madrid','Barcelona','Atletico Madrid','Sevilla'], answer:'Atletico Madrid', difficulty:'easy', category:'la_liga' },
    { id:'ll_e8',  question:'Which city is Sevilla FC based in?', options:['Madrid','Barcelona','Seville','Valencia'], answer:'Seville', difficulty:'easy', category:'la_liga' },
    { id:'ll_e9',  question:'Who was Barcelona\'s manager during their 2009 treble?', options:['Johan Cruyff','Louis van Gaal','Frank Rijkaard','Pep Guardiola'], answer:'Pep Guardiola', difficulty:'easy', category:'la_liga' },
    { id:'ll_e10', question:'Villarreal FC is known by what nickname?', options:['Yellow Submarine','Red Robots','Blue Giants','Orange Army'], answer:'Yellow Submarine', difficulty:'easy', category:'la_liga' },
    { id:'ll_e11', question:'Real Madrid\'s home ground has how many seats (approx.) after renovation?', options:['55,000','72,000','81,000','65,000'], answer:'81,000', difficulty:'easy', category:'la_liga' },
    // MEDIUM
    { id:'ll_m1',  question:'Who holds the record for most La Liga goals overall?', options:['Cristiano Ronaldo','Lionel Messi','Telmo Zarra','Hugo Sanchez'], answer:'Lionel Messi', difficulty:'medium', category:'la_liga', explanation:'Messi scored 474 La Liga goals across his Barcelona career.' },
    { id:'ll_m2',  question:'Who managed Real Madrid to 3 consecutive Champions Leagues (2016-2018)?', options:['Carlo Ancelotti','Jose Mourinho','Zinedine Zidane','Rafael Benitez'], answer:'Zinedine Zidane', difficulty:'medium', category:'la_liga', explanation:'Zidane is the only manager to win three consecutive Champions Leagues.' },
    { id:'ll_m3',  question:'In which year was La Liga founded?', options:['1929','1935','1920','1928'], answer:'1929', difficulty:'medium', category:'la_liga' },
    { id:'ll_m4',  question:'Atletico Madrid play at which stadium?', options:['Santiago Bernabeu','Camp Nou','Wanda Metropolitano','Metropolitano'], answer:'Wanda Metropolitano', difficulty:'medium', category:'la_liga' },
    { id:'ll_m5',  question:'How many teams are in La Liga?', options:['18','20','22','16'], answer:'20', difficulty:'medium', category:'la_liga' },
    { id:'ll_m6',  question:'Which club won La Liga after a 18-year wait in 2003-04?', options:['Valencia','Sevilla','Deportivo La Coruna','Real Sociedad'], answer:'Valencia', difficulty:'medium', category:'la_liga', explanation:'Valencia won the La Liga title in 2003-04 under Rafael Benitez.' },
    { id:'ll_m7',  question:'Who was the Pichichi (La Liga top scorer) in the 2022-23 season?', options:['Robert Lewandowski','Karim Benzema','Borja Iglesias','Joselu'], answer:'Robert Lewandowski', difficulty:'medium', category:'la_liga' },
    { id:'ll_m8',  question:'How many Ballon d\'Or winners has Barcelona produced (club record)?', options:['9','11','12','8'], answer:'12', difficulty:'medium', category:'la_liga', explanation:'Barcelona\'s players have won the Ballon d\'Or 12 times in club history.' },
    { id:'ll_m9',  question:'Cristiano Ronaldo scored how many La Liga goals during his Real Madrid career?', options:['277','311','275','292'], answer:'311', difficulty:'medium', category:'la_liga', explanation:'Ronaldo scored 311 La Liga goals in 292 appearances for Real Madrid.' },
    { id:'ll_m10', question:'Which Spanish club famously beat Arsenal 3-0 in the 2006 Champions League final?', options:['Real Madrid','Sevilla','Barcelona','Valencia'], answer:'Barcelona', difficulty:'medium', category:'la_liga' },
    // HARD
    { id:'ll_h1',  question:'Who was the first foreign player to win the Pichichi award?', options:['Ronaldo Nazario','Gary Lineker','Johan Cruyff','Hristo Stoichkov'], answer:'Gary Lineker', difficulty:'hard', category:'la_liga', explanation:'Gary Lineker won the Pichichi (top scorer) award with Barcelona in 1986-87.' },
    { id:'ll_h2',  question:'Which club went 39 La Liga games unbeaten in 1979-80?', options:['Real Madrid','Barcelona','Real Sociedad','Atletico Madrid'], answer:'Real Sociedad', difficulty:'hard', category:'la_liga' },
    { id:'ll_h3',  question:'Who scored the most goals in a single La Liga season?', options:['Cristiano Ronaldo','Lionel Messi','Telmo Zarra','Hugo Sanchez'], answer:'Lionel Messi', difficulty:'hard', category:'la_liga', explanation:'Messi scored 50 La Liga goals in the 2011-12 season, a record.' },
    { id:'ll_h4',  question:'How many consecutive La Liga titles did Real Madrid win 1961-1965?', options:['3','4','5','6'], answer:'5', difficulty:'hard', category:'la_liga' },
    { id:'ll_h5',  question:'Which year did Deportivo La Coruna sensationally beat Real Madrid 8-2?', options:['1993-94','2000-01','1994-95','2002-03'], answer:'1993-94', difficulty:'hard', category:'la_liga', explanation:'Deportivo beat Real Madrid 8-2 in La Liga in August 1993.' },
    { id:'ll_h6',  question:'Which player holds the record for most La Liga assists in a single season?', options:['Messi','Xavi','Ronaldo','Mesut Ozil'], answer:'Messi', difficulty:'hard', category:'la_liga', explanation:'Lionel Messi recorded 21 assists in La Liga in the 2019-20 season.' },
    { id:'ll_h7',  question:'Who was the first player to win the Pichichi award 4 times?', options:['Lionel Messi','Hugo Sanchez','Telmo Zarra','Quini'], answer:'Telmo Zarra', difficulty:'hard', category:'la_liga', explanation:'Telmo Zarra won the Pichichi award 6 times in total.' },
    { id:'ll_h8',  question:'Which Atletico Madrid manager guided them to La Liga in 2020-21?', options:['Unai Emery','Diego Simeone','Quique Sanchez Flores','Gregorio Manzano'], answer:'Diego Simeone', difficulty:'hard', category:'la_liga' },
  ],

  // ─────────────────────────────────────────────
  //  SERIE A  (35+ questions)
  // ─────────────────────────────────────────────
  serie_a: [
    // EASY
    { id:'sa_e1',  question:'Which club has won the most Serie A titles?', options:['AC Milan','Juventus','Inter Milan','Roma'], answer:'Juventus', difficulty:'easy', category:'serie_a', explanation:'Juventus have won Serie A a record 36 times.' },
    { id:'sa_e2',  question:'What is the name of the Milan derby?', options:['Derby della Capitale','Derby della Madonnina','Derby del Sole','Derby d\'Italia'], answer:'Derby della Madonnina', difficulty:'easy', category:'serie_a' },
    { id:'sa_e3',  question:'Juventus are nicknamed?', options:['The Blues','The Old Lady','The Nerazzurri','The Rossoneri'], answer:'The Old Lady', difficulty:'easy', category:'serie_a' },
    { id:'sa_e4',  question:'Which stadium do Roma and Lazio share?', options:['San Siro','Juventus Stadium','Stadio Olimpico','Maradona Stadium'], answer:'Stadio Olimpico', difficulty:'easy', category:'serie_a' },
    { id:'sa_e5',  question:'Inter Milan\'s nickname is?', options:['Bianconeri','Giallorossi','Nerazzurri','Rossoneri'], answer:'Nerazzurri', difficulty:'easy', category:'serie_a' },
    { id:'sa_e6',  question:'AC Milan\'s iconic home colours are?', options:['All white','Blue and black','Red and black','Green and gold'], answer:'Red and black', difficulty:'easy', category:'serie_a' },
    { id:'sa_e7',  question:'Napoli\'s home stadium was renamed after which legend?', options:['Roberto Baggio','Diego Maradona','Giuseppe Meazza','Silvio Piola'], answer:'Diego Maradona', difficulty:'easy', category:'serie_a' },
    { id:'sa_e8',  question:'How many teams are in Serie A?', options:['16','18','20','22'], answer:'20', difficulty:'easy', category:'serie_a' },
    { id:'sa_e9',  question:'Which Italian club did Cristiano Ronaldo play for from 2018 to 2021?', options:['AC Milan','Inter Milan','Juventus','Roma'], answer:'Juventus', difficulty:'easy', category:'serie_a' },
    { id:'sa_e10', question:'Where is Juventus based?', options:['Milan','Rome','Turin','Naples'], answer:'Turin', difficulty:'easy', category:'serie_a' },
    // MEDIUM
    { id:'sa_m1',  question:'Who scored the most goals in a single Serie A season?', options:['Ronaldo','Gonzalo Higuain','Roberto Baggio','Luca Toni'], answer:'Gonzalo Higuain', difficulty:'medium', category:'serie_a', explanation:'Gonzalo Higuain scored a record 36 Serie A goals for Napoli in the 2015-16 season.' },
    { id:'sa_m2',  question:'Which club won 9 consecutive Serie A titles from 2012-2020?', options:['AC Milan','Juventus','Inter Milan','Roma'], answer:'Juventus', difficulty:'medium', category:'serie_a' },
    { id:'sa_m3',  question:'Which Serie A season saw the "Calciopoli" match-fixing scandal?', options:['2004-05','2005-06','2006-07','2003-04'], answer:'2005-06', difficulty:'medium', category:'serie_a', explanation:'The Calciopoli scandal led to Juventus being relegated to Serie B and stripped of titles.' },
    { id:'sa_m4',  question:'When was Serie A founded as a single-group top division?', options:['1929','1898','1934','1920'], answer:'1929', difficulty:'medium', category:'serie_a' },
    { id:'sa_m5',  question:'Which player holds the all-time Serie A scoring record?', options:['Silvio Piola','Roberto Baggio','Giuseppe Meazza','Francesco Totti'], answer:'Silvio Piola', difficulty:'medium', category:'serie_a', explanation:'Silvio Piola scored 274 goals in Serie A across his career.' },
    { id:'sa_m6',  question:'Which club broke Juventus\'s 9-year title run by winning Serie A 2020-21?', options:['Napoli','AC Milan','Inter Milan','Roma'], answer:'Inter Milan', difficulty:'medium', category:'serie_a' },
    { id:'sa_m7',  question:'Who managed Juventus during their 9 consecutive Serie A title wins?', options:['Massimiliano Allegri','Antonio Conte','Marcello Lippi','Carlo Ancelotti'], answer:'Both Allegri and Conte', difficulty:'medium', category:'serie_a', explanation:'Antonio Conte won the first three (2012-14), Allegri won the next six (2015-2020).' },
    { id:'sa_m8',  question:'Roberto Baggio missed the penalty that cost Italy the 1994 World Cup against which team?', options:['Germany','France','Brazil','Argentina'], answer:'Brazil', difficulty:'medium', category:'serie_a' },
    { id:'sa_m9',  question:'Which Serie A club has won the most Coppa Italia titles?', options:['Juventus','Roma','AC Milan','Inter Milan'], answer:'Juventus', difficulty:'medium', category:'serie_a', explanation:'Juventus have won the Coppa Italia a record 15 times.' },
    // HARD
    { id:'sa_h1',  question:'Which Serie A club was declared bankrupt in 2002 and reformed?', options:['Fiorentina','Napoli','Venezia','Brescia'], answer:'Fiorentina', difficulty:'hard', category:'serie_a', explanation:'Fiorentina went bankrupt in 2002 and were reformed, starting from Serie C2.' },
    { id:'sa_h2',  question:'AC Milan won how many consecutive European Cups/Champions Leagues (1989-1990)?', options:['2','3','4','1'], answer:'2', difficulty:'hard', category:'serie_a', explanation:'AC Milan, under Arrigo Sacchi and then Fabio Capello, won back-to-back European Cups in 1989 and 1990.' },
    { id:'sa_h3',  question:'Which season saw Napoli win their first Serie A title with Maradona?', options:['1984-85','1986-87','1985-86','1987-88'], answer:'1986-87', difficulty:'hard', category:'serie_a', explanation:'Napoli won their first Serie A title in 1986-87 with Diego Maradona leading the team.' },
    { id:'sa_h4',  question:'What is the name of the Rome derby between Roma and Lazio?', options:['Derby della Madonnina','Derby del Sole','Derby della Capitale','Derby di Roma'], answer:'Derby della Capitale', difficulty:'hard', category:'serie_a' },
    { id:'sa_h5',  question:'Inter Milan won the treble under which manager in 2009-10?', options:['Roberto Mancini','Jose Mourinho','Massimiliano Allegri','Claudio Ranieri'], answer:'Jose Mourinho', difficulty:'hard', category:'serie_a' },
    { id:'sa_h6',  question:'Which Italian was the first player to win the European Golden Boot?', options:['Franco Causio','Alessandro Del Piero','Luca Toni','Roberto Baggio'], answer:'Luca Toni', difficulty:'hard', category:'serie_a', explanation:'Luca Toni won the Golden Boot in 2005-06 with 31 goals for Fiorentina.' },
  ],

  // ─────────────────────────────────────────────
  //  BUNDESLIGA  (35+ questions)
  // ─────────────────────────────────────────────
  bundesliga: [
    // EASY
    { id:'bl_e1',  question:'Which club has dominated the Bundesliga for most of its history?', options:['Borussia Dortmund','Bayern Munich','Borussia Monchengladbach','Bayer Leverkusen'], answer:'Bayern Munich', difficulty:'easy', category:'bundesliga', explanation:'Bayern Munich have won the Bundesliga over 32 times.' },
    { id:'bl_e2',  question:'Borussia Dortmund\'s famous yellow wall is called?', options:['Sudtribune','Gelbe Wand','Westfalenstadion Terrace','Der Kessel'], answer:'Gelbe Wand', difficulty:'easy', category:'bundesliga', explanation:'The Yellow Wall (Gelbe Wand) is the largest standing terrace in European football.' },
    { id:'bl_e3',  question:'Bayern Munich play at which stadium?', options:['Signal Iduna Park','Allianz Arena','Volksparkstadion','Rhein Energie Stadion'], answer:'Allianz Arena', difficulty:'easy', category:'bundesliga' },
    { id:'bl_e4',  question:'What is "Der Klassiker"?', options:['Bayern vs Schalke','Bayern vs Dortmund','Dortmund vs Schalke','Bayern vs Leverkusen'], answer:'Bayern vs Dortmund', difficulty:'easy', category:'bundesliga' },
    { id:'bl_e5',  question:'In what year was the Bundesliga founded?', options:['1958','1963','1970','1955'], answer:'1963', difficulty:'easy', category:'bundesliga' },
    { id:'bl_e6',  question:'Which Bundesliga club is based in the Ruhr area and known as "Die Knappen"?', options:['Borussia Dortmund','Schalke 04','Bayer Leverkusen','VfL Bochum'], answer:'Schalke 04', difficulty:'easy', category:'bundesliga' },
    { id:'bl_e7',  question:'How many teams compete in the Bundesliga?', options:['16','18','20','22'], answer:'18', difficulty:'easy', category:'bundesliga' },
    { id:'bl_e8',  question:'Which national player is Bundesliga\'s all-time leading scorer?', options:['Robert Lewandowski','Gerd Muller','Jupp Heynckes','Karl-Heinz Rummenigge'], answer:'Gerd Muller', difficulty:'easy', category:'bundesliga', explanation:'Gerd Müller scored 365 Bundesliga goals for Bayern Munich.' },
    { id:'bl_e9',  question:'Bayer Leverkusen are nicknamed what because they\'ve historically finished 2nd?', options:['Neverkusen','Runner-Up Kings','Silver Bayer','Almost Champions'], answer:'Neverkusen', difficulty:'easy', category:'bundesliga', explanation:'Bayer Leverkusen were called "Neverkusen" due to finishing runners-up multiple times — until their 2023-24 unbeaten title win!' },
    { id:'bl_e10', question:'Which manager guided Bayern Munich\'s treble in 2012-13?', options:['Louis van Gaal','Pep Guardiola','Jupp Heynckes','Carlo Ancelotti'], answer:'Jupp Heynckes', difficulty:'easy', category:'bundesliga' },
    // MEDIUM
    { id:'bl_m1',  question:'Which player scored 40 Bundesliga goals in 2020-21?', options:['Erling Haaland','Robert Lewandowski','Thomas Muller','Serge Gnabry'], answer:'Robert Lewandowski', difficulty:'medium', category:'bundesliga', explanation:'Lewandowski scored 41 Bundesliga goals in 2020-21, beating Gerd Müller\'s 49-year-old record of 40.' },
    { id:'bl_m2',  question:'Which was the first Bundesliga champion in 1963-64?', options:['Bayern Munich','1. FC Koln','Borussia Dortmund','Hamburger SV'], answer:'1. FC Koln', difficulty:'medium', category:'bundesliga', explanation:'1. FC Köln were the first-ever Bundesliga champions in 1963-64.' },
    { id:'bl_m3',  question:'Who is the only club never to have been relegated from the Bundesliga?', options:['Bayern Munich','Borussia Dortmund','Bayer Leverkusen','Hamburger SV'], answer:'Bayern Munich', difficulty:'medium', category:'bundesliga', explanation:'Bayern Munich have never been relegated since joining the Bundesliga in 1963.' },
    { id:'bl_m4',  question:'Erling Haaland scored how many Bundesliga goals for Dortmund in the 2020-21 season?', options:['27','32','41','22'], answer:'27', difficulty:'medium', category:'bundesliga' },
    { id:'bl_m5',  question:'How many consecutive Bundesliga titles did Bayern Munich win from 2013 to 2023?', options:['9','10','11','8'], answer:'11', difficulty:'medium', category:'bundesliga', explanation:'Bayern won 11 consecutive Bundesliga titles from 2013 to 2023, ending with Leverkusen\'s historic title in 2024.' },
    { id:'bl_m6',  question:'Which club ended Bayern\'s run of consecutive Bundesliga titles in 2023-24?', options:['Borussia Dortmund','RB Leipzig','Bayer Leverkusen','Borussia Monchengladbach'], answer:'Bayer Leverkusen', difficulty:'medium', category:'bundesliga', explanation:'Bayer Leverkusen won an unbeaten Bundesliga title in 2023-24 under Xabi Alonso.' },
    { id:'bl_m7',  question:'Which manager transformed Dortmund with "Gegenpressing" football from 2008?', options:['Thomas Tuchel','Peter Bosz','Jurgen Klopp','Hans-Joachim Watzke'], answer:'Jurgen Klopp', difficulty:'medium', category:'bundesliga' },
    { id:'bl_m8',  question:'The Bundesliga has what unique policy that most other leagues don\'t?', options:['Salary cap','50+1 ownership rule','Foreign player limit','Single-title winner rule'], answer:'50+1 ownership rule', difficulty:'medium', category:'bundesliga', explanation:'The 50+1 rule means supporters must hold majority voting rights at clubs, preserving fan ownership.' },
    // HARD
    { id:'bl_h1',  question:'Gerd Muller scored how many Bundesliga goals in the 1971-72 season?', options:['38','40','42','36'], answer:'40', difficulty:'hard', category:'bundesliga', explanation:'Gerd Müller\'s record of 40 Bundesliga goals in 1971-72 stood for 49 years until Lewandowski in 2020-21.' },
    { id:'bl_h2',  question:'Which Bundesliga club has the biggest stadium?', options:['Bayern Munich','Borussia Dortmund','Schalke 04','Hamburg SV'], answer:'Borussia Dortmund', difficulty:'hard', category:'bundesliga', explanation:'Signal Iduna Park holds 81,365 fans, making it the largest in Germany.' },
    { id:'bl_h3',  question:'What year did Hamburger SV get relegated, ending their record 55-year stay in the top flight?', options:['2016','2017','2018','2019'], answer:'2018', difficulty:'hard', category:'bundesliga', explanation:'Hamburger SV were relegated in 2017-18, ending their record as the only founder member never relegated.' },
    { id:'bl_h4',  question:'Robert Lewandowski scored exactly how many goals in the 2020-21 season (all comps)?', options:['53','56','58','48'], answer:'48', difficulty:'hard', category:'bundesliga', explanation:'Lewandowski scored 48 goals in all competitions for Bayern in 2020-21.' },
    { id:'bl_h5',  question:'Which Bundesliga player won the 2022 Ballon d\'Or?', options:['Robert Lewandowski','Joshua Kimmich','Thomas Muller','Sadio Mane'], answer:'Robert Lewandowski', difficulty:'hard', category:'bundesliga', explanation:'Lewandowski was awarded the 2021 Ballon d\'Or (given out in 2022 season cycle).' },
  ],

  // ─────────────────────────────────────────────
  //  LIGUE 1  (30+ questions)
  // ─────────────────────────────────────────────
  ligue_1: [
    // EASY
    { id:'l1_e1',  question:'Which club has dominated Ligue 1 in recent years?', options:['Marseille','Lyon','Paris Saint-Germain','Monaco'], answer:'Paris Saint-Germain', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e2',  question:'PSG play at which stadium?', options:['Stade de France','Parc des Princes','Velodrome','Groupama Stadium'], answer:'Parc des Princes', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e3',  question:'Marseille are nicknamed?', options:['Les Parisiens','Les Phocéens','Les Lyonnais','Les Girondins'], answer:'Les Phocéens', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e4',  question:'Which French player joined Real Madrid in 2024?', options:['Karim Benzema','Ousmane Dembele','Kylian Mbappe','Antoine Griezmann'], answer:'Kylian Mbappe', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e5',  question:'How many clubs compete in Ligue 1?', options:['16','18','20','22'], answer:'18', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e6',  question:'Which Ligue 1 club is based in Marseille?', options:['Lyon','Olympique de Marseille','Nice','Bordeaux'], answer:'Olympique de Marseille', difficulty:'easy', category:'ligue_1' },
    { id:'l1_e7',  question:'PSG were taken over by which country\'s sovereign wealth fund in 2011?', options:['Saudi Arabia','UAE','Qatar','Kuwait'], answer:'Qatar', difficulty:'easy', category:'ligue_1', explanation:'QSI (Qatar Sports Investments) bought PSG in 2011 and transformed the club.' },
    { id:'l1_e8',  question:'Which French national legend and World Cup winner came through the PSG academy?', options:['Zinedine Zidane','Thierry Henry','Kylian Mbappe','Karim Benzema'], answer:'Kylian Mbappe', difficulty:'easy', category:'ligue_1' },
    // MEDIUM
    { id:'l1_m1',  question:'PSG signed Neymar from Barcelona for a world record fee of how much?', options:['€150m','€180m','€222m','€200m'], answer:'€222m', difficulty:'medium', category:'ligue_1', explanation:'PSG paid a world-record €222m for Neymar in 2017.' },
    { id:'l1_m2',  question:'Which club beat PSG to the Ligue 1 title in 2016-17?', options:['Lyon','Monaco','Marseille','Nice'], answer:'Monaco', difficulty:'medium', category:'ligue_1', explanation:'Monaco won the 2016-17 Ligue 1 title under Leonardo Jardim, also reaching the UCL semi-finals.' },
    { id:'l1_m3',  question:'Who is Ligue 1\'s all-time top scorer?', options:['Zlatan Ibrahimovic','Delio Onnis','Gunnar Andersson','Carlos Bianchi'], answer:'Delio Onnis', difficulty:'medium', category:'ligue_1', explanation:'Delio Onnis scored 299 goals in the French top flight, the all-time record.' },
    { id:'l1_m4',  question:'Marseille became the first French club to win the Champions League in which year?', options:['1991','1992','1993','1994'], answer:'1993', difficulty:'medium', category:'ligue_1', explanation:'Marseille beat AC Milan 1-0 in the 1992-93 Champions League final.' },
    { id:'l1_m5',  question:'Who won Ligue 1 top scorer (Player of the Year) 7 consecutive seasons?', options:['Zlatan Ibrahimovic','Kylian Mbappe','Cavani','Neymar'], answer:'Kylian Mbappe', difficulty:'medium', category:'ligue_1', explanation:'Mbappe has dominated Ligue 1 scoring in recent seasons.' },
    { id:'l1_m6',  question:'Zlatan Ibrahimovic scored how many Ligue 1 goals during his PSG stint?', options:['113','118','122','103'], answer:'113', difficulty:'medium', category:'ligue_1', explanation:'Ibrahimovic scored 113 league goals in 122 appearances for PSG between 2012-2016.' },
    { id:'l1_m7',  question:'Which Ligue 1 club has a player nicknamed "Le Magnifique"?', options:['Lyon\'s Juninho','PSG\'s Ronaldinho','Monaco\'s Thierry Henry','Marseille\'s Samir Nasri'], answer:'PSG\'s Ronaldinho', difficulty:'medium', category:'ligue_1', explanation:'Ronaldinho was nicknamed "Le Magnifique" during his time at PSG in 2001-03.' },
    // HARD
    { id:'l1_h1',  question:'In what year was the French Football Federation founded?', options:['1904','1919','1918','1898'], answer:'1919', difficulty:'hard', category:'ligue_1' },
    { id:'l1_h2',  question:'Ligue 1 was previously known as?', options:['Division 1','Division Premiere','Championnat de France','French First Division'], answer:'Division 1', difficulty:'hard', category:'ligue_1', explanation:'The competition was called Division 1 from 1932 to 2002.' },
    { id:'l1_h3',  question:'Who scored the goal that won Marseille the 1993 Champions League?', options:['Fabien Barthez','Basile Boli','Didier Deschamps','Rudi Voller'], answer:'Basile Boli', difficulty:'hard', category:'ligue_1', explanation:'Basile Boli headed in the winning goal against AC Milan in the 1993 final.' },
    { id:'l1_h4',  question:'PSG won how many consecutive Ligue 1 titles in 2012-2020?', options:['7','8','6','9'], answer:'7', difficulty:'hard', category:'ligue_1', explanation:'PSG won 7 of 9 possible Ligue 1 titles from 2012 to 2020.' },
    { id:'l1_h5',  question:'Which Ligue 1 club did future Bayern/Arsenal/Chelsea coach Arsene Wenger manage?', options:['Strasbourg','Nancy','Monaco','Nice'], answer:'Monaco', difficulty:'hard', category:'ligue_1', explanation:'Arsene Wenger managed Monaco from 1987 to 1994, winning Ligue 1 in 1987-88.' },
  ],

  // ─────────────────────────────────────────────
  //  PRIMEIRA LIGA  (25+ questions)
  // ─────────────────────────────────────────────
  primeira_liga: [
    { id:'pr_e1',  question:'Which three clubs are known as the "Big Three" of Portuguese football?', options:['Benfica, Sporting, Porto','Benfica, Braga, Porto','Sporting, Braga, Guimaraes','Porto, Benfica, Vitoria'], answer:'Benfica, Sporting, Porto', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_e2',  question:'FC Porto play at which stadium?', options:['Estadio da Luz','Estadio Jose Alvalade','Estadio do Dragao','Estadio Municipal de Braga'], answer:'Estadio do Dragao', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_e3',  question:'Cristiano Ronaldo began his career at which Portuguese club?', options:['Benfica','Porto','Sporting CP','Braga'], answer:'Sporting CP', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_e4',  question:'Which club is nicknamed "The Eagles" in Portugal?', options:['Porto','Benfica','Sporting','Braga'], answer:'Benfica', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_e5',  question:'Where is Benfica based?', options:['Porto','Braga','Lisbon','Setubal'], answer:'Lisbon', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_e6',  question:'Porto\'s stadium is named Estadio do Dragao. What does Dragao mean?', options:['Eagle','Lion','Dragon','Phoenix'], answer:'Dragon', difficulty:'easy', category:'primeira_liga' },
    { id:'pr_m1',  question:'Which Portuguese club won the UEFA Cup/Europa League in 2011?', options:['Benfica','Porto','Sporting','Braga'], answer:'Porto', difficulty:'medium', category:'primeira_liga', explanation:'Porto beat Braga 1-0 in the 2011 Europa League final in Dublin.' },
    { id:'pr_m2',  question:'How many times has Benfica won the European Cup/Champions League?', options:['2','4','1','3'], answer:'2', difficulty:'medium', category:'primeira_liga', explanation:'Benfica won the European Cup in 1961 and 1962, both times beating Barcelona.' },
    { id:'pr_m3',  question:'Who managed Porto to their 2003-04 Champions League win?', options:['Bobby Robson','Jose Mourinho','Andre Villas-Boas','Julen Lopetegui'], answer:'Jose Mourinho', difficulty:'medium', category:'primeira_liga', explanation:'Jose Mourinho\'s Porto beat Monaco 3-0 in the 2004 Champions League final.' },
    { id:'pr_m4',  question:'Who is the all-time top scorer in the Primeira Liga?', options:['Eusebio','Fernando Peyroteo','Cristiano Ronaldo','Pedro Pauleta'], answer:'Fernando Peyroteo', difficulty:'medium', category:'primeira_liga', explanation:'Fernando Peyroteo scored 544 goals in Portugal\'s top flight.' },
    { id:'pr_m5',  question:'Which year did Porto win the Champions League for the first time?', options:['1987','1997','2004','2011'], answer:'1987', difficulty:'medium', category:'primeira_liga', explanation:'Porto first won the European Cup in 1987, beating Bayern Munich.' },
    { id:'pr_h1',  question:'Eusebio was nicknamed what?', options:['The Black Panther','The Black Diamond','The Golden Eagle','The Mozambican Tiger'], answer:'The Black Panther', difficulty:'hard', category:'primeira_liga', explanation:'Eusebio, born in Mozambique, was nicknamed "A Pantera Negra" (The Black Panther) and is Benfica\'s greatest-ever player.' },
    { id:'pr_h2',  question:'Which Portuguese legend was known simply as "O Rei" (The King)?', options:['Eusebio','Luis Figo','Rui Costa','Paulo Futre'], answer:'Eusebio', difficulty:'hard', category:'primeira_liga' },
    { id:'pr_h3',  question:'Portugal\'s national league was founded in which year?', options:['1934','1938','1935','1931'], answer:'1934', difficulty:'hard', category:'primeira_liga' },
    { id:'pr_h4',  question:'Which player was known as "The New Eusebio" and had a celebrated career at Benfica?', options:['Luis Figo','Rui Costa','Joao Felix','Nuno Gomes'], answer:'Rui Costa', difficulty:'hard', category:'primeira_liga' },
  ],

  // ─────────────────────────────────────────────
  //  EREDIVISIE  (25+ questions)
  // ─────────────────────────────────────────────
  eredivisie: [
    { id:'er_e1',  question:'Which Dutch club is known as Ajax?', options:['PSV Eindhoven','AFC Ajax','Feyenoord','AZ Alkmaar'], answer:'AFC Ajax', difficulty:'easy', category:'eredivisie' },
    { id:'er_e2',  question:'Ajax play at which stadium?', options:['De Kuip','Philips Stadion','Johan Cruyff Arena','AFAS Stadion'], answer:'Johan Cruyff Arena', difficulty:'easy', category:'eredivisie' },
    { id:'er_e3',  question:'Which Eredivisie club did Frenkie de Jong play for before Barcelona?', options:['PSV','Feyenoord','Ajax','AZ'], answer:'Ajax', difficulty:'easy', category:'eredivisie' },
    { id:'er_e4',  question:'PSV Eindhoven\'s main sponsor gives them the PSV name. What does it stand for?', options:['Philips Sport Vereniging','Players\' Soccer Village','Professional Soccer Veldhoven','Phillip\'s Soccer Veterans'], answer:'Philips Sport Vereniging', difficulty:'easy', category:'eredivisie' },
    { id:'er_e5',  question:'Feyenoord play at which stadium?', options:['Philips Stadion','Johan Cruyff Arena','De Kuip','AFAS Stadion'], answer:'De Kuip', difficulty:'easy', category:'eredivisie' },
    { id:'er_m1',  question:'Ajax famously reached the UCL semi-finals in which year?', options:['2017','2018','2019','2020'], answer:'2019', difficulty:'medium', category:'eredivisie', explanation:'Ajax beat Real Madrid and Juventus before losing to Tottenham on away goals in the 2018-19 semi-finals.' },
    { id:'er_m2',  question:'Which Ajax manager guided them to the 2019 UCL semi-finals?', options:['Johan Cruyff','Erik ten Hag','Peter Bosz','Louis van Gaal'], answer:'Erik ten Hag', difficulty:'medium', category:'eredivisie' },
    { id:'er_m3',  question:'How many times has Ajax won the Champions League/European Cup?', options:['3','4','5','2'], answer:'4', difficulty:'medium', category:'eredivisie', explanation:'Ajax won the European Cup in 1971, 1972, 1973, and the Champions League in 1995.' },
    { id:'er_m4',  question:'Johan Cruyff turned 14 when he joined Ajax. What iconic move did he invent?', options:['The Panenka','The Cruyff Turn','The Rainbow Flick','The Rabona'], answer:'The Cruyff Turn', difficulty:'medium', category:'eredivisie' },
    { id:'er_m5',  question:'Which Eredivisie club produced the "Total Football" philosophy?', options:['Feyenoord','PSV','Ajax','Twente'], answer:'Ajax', difficulty:'medium', category:'eredivisie', explanation:'Ajax, under Rinus Michels and Johan Cruyff, developed "Total Football" (Totaalvoetbal) in the late 1960s.' },
    { id:'er_m6',  question:'Which Ajax striker scored the winning goal in the 1995 Champions League final?', options:['Jari Litmanen','Patrick Kluivert','Marc Overmars','Clarence Seedorf'], answer:'Patrick Kluivert', difficulty:'medium', category:'eredivisie', explanation:'A 17-year-old Patrick Kluivert scored the winning goal against AC Milan in the 1995 Champions League final.' },
    { id:'er_h1',  question:'How many consecutive Eredivisie titles did Ajax win from 1966 to 1973?', options:['4','5','6','7'], answer:'4', difficulty:'hard', category:'eredivisie', explanation:'Ajax won 4 consecutive Eredivisie titles from 1966 to 1973, and 3 consecutive European Cups (1971-1973).' },
    { id:'er_h2',  question:'The Eredivisie was founded in which year?', options:['1954','1956','1957','1960'], answer:'1956', difficulty:'hard', category:'eredivisie' },
    { id:'er_h3',  question:'Which Eredivisie club defeated AC Milan in the 1970 European Cup final?', options:['PSV','Ajax','Feyenoord','Utrecht'], answer:'Feyenoord', difficulty:'hard', category:'eredivisie', explanation:'Feyenoord beat Celtic in the 1970 European Cup final, becoming the first Dutch club to win the competition.' },
  ],

  // ─────────────────────────────────────────────
  //  BELGIAN PRO LEAGUE  (20+ questions)
  // ─────────────────────────────────────────────
  belgian_pro: [
    { id:'bp_e1',  question:'Which club has won the most Belgian Pro League titles?', options:['Club Brugge','RSC Anderlecht','Standard Liege','Gent'], answer:'RSC Anderlecht', difficulty:'easy', category:'belgian_pro', explanation:'RSC Anderlecht have won the Belgian top division a record 34 times.' },
    { id:'bp_e2',  question:'Club Brugge plays at which stadium?', options:['Constant Vanden Stock','Jan Breydel Stadium','Stade de Sclessin','Ghelamco Arena'], answer:'Jan Breydel Stadium', difficulty:'easy', category:'belgian_pro' },
    { id:'bp_e3',  question:'Which Belgian club is nicknamed "The Purple & White"?', options:['Club Brugge','Anderlecht','Standard Liege','Beerschot'], answer:'Anderlecht', difficulty:'easy', category:'belgian_pro' },
    { id:'bp_e4',  question:'Which Belgian city is Club Brugge based in?', options:['Brussels','Ghent','Bruges','Liege'], answer:'Bruges', difficulty:'easy', category:'belgian_pro' },
    { id:'bp_m1',  question:'Which Belgian club won 10 consecutive league titles in the 1960s and 70s?', options:['Club Brugge','Standard Liege','RSC Anderlecht','Gent'], answer:'RSC Anderlecht', difficulty:'medium', category:'belgian_pro' },
    { id:'bp_m2',  question:'Belgium introduced the "Championship Play-offs" system in which year?', options:['2008','2009','2010','2011'], answer:'2009', difficulty:'medium', category:'belgian_pro', explanation:'The playoff system was introduced in 2009 to determine the Belgian champion among top finishers.' },
    { id:'bp_m3',  question:'Club Brugge reached the Champions League group stage by beating which English club in 2021?', options:['Manchester City','Arsenal','Tottenham','Liverpool'], answer:'Manchester City', difficulty:'medium', category:'belgian_pro', explanation:'Club Brugge drew 1-1 with Man City at the Etihad and qualified on away goals in the 2021 qualifying round.' },
    { id:'bp_h1',  question:'Which Belgium international forward starred for Napoli and Manchester City?', options:['Eden Hazard','Romelu Lukaku','Dries Mertens','Axel Witsel'], answer:'Dries Mertens', difficulty:'hard', category:'belgian_pro', explanation:'Dries Mertens became Napoli\'s all-time record scorer.' },
    { id:'bp_h2',  question:'How many times has Club Brugge appeared in the European Cup/Champions League final?', options:['1','2','3','0'], answer:'1', difficulty:'hard', category:'belgian_pro', explanation:'Club Brugge lost the 1977-78 European Cup final to Liverpool 1-0.' },
    { id:'bp_h3',  question:'Standard Liege\'s ground is called?', options:['Ghelamco Arena','Stade de Sclessin','Den Dreef','Kehrweg'], answer:'Stade de Sclessin', difficulty:'hard', category:'belgian_pro' },
  ],

  // ─────────────────────────────────────────────
  //  MLS  (30+ questions)
  // ─────────────────────────────────────────────
  mls: [
    { id:'mls_e1',  question:'Which MLS team is based in Los Angeles and was founded in 1996?', options:['LA Galaxy','LAFC','Real Salt Lake','Colorado Rapids'], answer:'LA Galaxy', difficulty:'easy', category:'mls' },
    { id:'mls_e2',  question:'What year was Major League Soccer founded?', options:['1993','1996','1990','1998'], answer:'1993', difficulty:'easy', category:'mls', explanation:'MLS was founded in 1993 and launched play in 1996.' },
    { id:'mls_e3',  question:'Which famous player joined Inter Miami in 2023?', options:['Zlatan Ibrahimovic','David Beckham','Lionel Messi','Cristiano Ronaldo'], answer:'Lionel Messi', difficulty:'easy', category:'mls' },
    { id:'mls_e4',  question:'Seattle Sounders play at which stadium?', options:['Lumen Field','Allianz Field','Gillette Stadium','Red Bull Arena'], answer:'Lumen Field', difficulty:'easy', category:'mls' },
    { id:'mls_e5',  question:'Inter Miami\'s colours are?', options:['Blue and gold','Pink and black','Red and white','Green and white'], answer:'Pink and black', difficulty:'easy', category:'mls' },
    { id:'mls_e6',  question:'David Beckham co-owns which MLS franchise?', options:['LA Galaxy','LAFC','Inter Miami','Austin FC'], answer:'Inter Miami', difficulty:'easy', category:'mls' },
    { id:'mls_e7',  question:'Which MLS club has won the most MLS Cup titles?', options:['Seattle Sounders','LA Galaxy','DC United','Columbus Crew'], answer:'LA Galaxy', difficulty:'easy', category:'mls', explanation:'LA Galaxy have won the MLS Cup 5 times (2002, 2005, 2011, 2012, 2014).' },
    { id:'mls_m1',  question:'Who was the first MLS expansion team to win the MLS Cup?', options:['Chicago Fire','Kansas City Wizards','DC United','New England Revolution'], answer:'Chicago Fire', difficulty:'medium', category:'mls', explanation:'Chicago Fire won the MLS Cup in 1998, their debut season.' },
    { id:'mls_m2',  question:'What is the name of the MLS trophy?', options:['Philip F. Anschutz Trophy','MLS Cup','Lamar Hunt Trophy','Western Conference Trophy'], answer:'MLS Cup', difficulty:'medium', category:'mls' },
    { id:'mls_m3',  question:'Which MLS club won the inaugural MLS Cup in 1996?', options:['LA Galaxy','DC United','San Jose Clash','Columbus Crew'], answer:'DC United', difficulty:'medium', category:'mls', explanation:'DC United beat LA Galaxy 3-2 in the inaugural MLS Cup on October 20, 1996.' },
    { id:'mls_m4',  question:'Zlatan Ibrahimovic joined which MLS team and scored 53 goals in 58 games?', options:['LAFC','LA Galaxy','New York City FC','Chicago Fire'], answer:'LA Galaxy', difficulty:'medium', category:'mls' },
    { id:'mls_m5',  question:'Which former Bayern Munich and Liverpool striker played in MLS for New England Revolution?', options:['Michael Ballack','Franck Ribery','Stefan Kiessling','Bastian Schweinsteiger'], answer:'Bastian Schweinsteiger', difficulty:'medium', category:'mls', explanation:'Schweinsteiger played for Chicago Fire from 2017 to 2019.' },
    { id:'mls_m6',  question:'MLS introduced the "Designated Player Rule" (nicknamed after which superstar) in 2007?', options:['Beckham Rule','Zidane Rule','Henry Rule','Ronaldo Rule'], answer:'Beckham Rule', difficulty:'medium', category:'mls', explanation:'The "Beckham Rule" (officially Designated Player Rule) was introduced to allow teams to sign stars above the salary cap.' },
    { id:'mls_h1',  question:'How many teams were in MLS when it launched in 1996?', options:['8','10','12','14'], answer:'10', difficulty:'hard', category:'mls', explanation:'MLS launched with 10 teams in 1996: DC United, NE Revolution, Columbus Crew, Tampa Bay Mutiny, and others.' },
    { id:'mls_h2',  question:'The Supporters\' Shield goes to which team?', options:['Team with most wins','Team finishing first in the regular season','Lowest goals conceded','Most popular franchise'], answer:'Team finishing first in the regular season', difficulty:'hard', category:'mls' },
    { id:'mls_h3',  question:'Which team won back-to-back MLS Cups in 2011 and 2012?', options:['DC United','Seattle Sounders','LA Galaxy','Colorado Rapids'], answer:'LA Galaxy', difficulty:'hard', category:'mls', explanation:'LA Galaxy won back-to-back MLS Cups in 2011 and 2012 with Landon Donovan and David Beckham.' },
  ],

  // ─────────────────────────────────────────────
  //  SÜPER LIG  (25+ questions)
  // ─────────────────────────────────────────────
  super_lig: [
    { id:'sl_e1',  question:'Which Turkish club has won the most Süper Lig titles?', options:['Fenerbahce','Galatasaray','Besiktas','Trabzonspor'], answer:'Galatasaray', difficulty:'easy', category:'super_lig', explanation:'Galatasaray have won the Süper Lig a record 24 times.' },
    { id:'sl_e2',  question:'Which Süper Lig club is based on the Asian side of Istanbul?', options:['Galatasaray','Besiktas','Fenerbahce','Trabzonspor'], answer:'Fenerbahce', difficulty:'easy', category:'super_lig' },
    { id:'sl_e3',  question:'Which year was the Süper Lig founded?', options:['1952','1958','1959','1963'], answer:'1959', difficulty:'easy', category:'super_lig' },
    { id:'sl_e4',  question:'Galatasaray\'s home ground is called?', options:['Sukru Saracoglu Stadium','Vodafone Park','Rams Park','Ataturk Olympic Stadium'], answer:'Rams Park', difficulty:'easy', category:'super_lig' },
    { id:'sl_e5',  question:'Which Portuguese legend played for Fenerbahce at the end of his career?', options:['Deco','Nuno Gomes','Rui Costa','Luis Figo'], answer:'Luis Figo', difficulty:'easy', category:'super_lig' },
    { id:'sl_m1',  question:'Galatasaray won which European trophy in 2000?', options:['UEFA Cup only','Champions League','UEFA Super Cup only','Both UEFA Cup and Super Cup'], answer:'Both UEFA Cup and Super Cup', difficulty:'medium', category:'super_lig', explanation:'Galatasaray beat Arsenal on penalties to win the 2000 UEFA Cup, then beat Real Madrid in the Super Cup.' },
    { id:'sl_m2',  question:'Which Turkish player is the all-time top scorer in Süper Lig?', options:['Hakan Sukur','Tuncay Sanli','Nihat Kahveci','Bulent Korkmaz'], answer:'Hakan Sukur', difficulty:'medium', category:'super_lig' },
    { id:'sl_m3',  question:'Hakan Sukur scored the fastest ever World Cup goal in what time?', options:['10.8 seconds','11.0 seconds','9.9 seconds','12 seconds'], answer:'10.8 seconds', difficulty:'medium', category:'super_lig', explanation:'Hakan Sukur scored after just 10.8 seconds for Turkey vs South Korea in the 2002 World Cup 3rd-place play-off.' },
    { id:'sl_m4',  question:'Which Süper Lig club hired Jose Mourinho as manager in 2023?', options:['Galatasaray','Fenerbahce','Besiktas','Trabzonspor'], answer:'Fenerbahce', difficulty:'medium', category:'super_lig', explanation:'Mourinho was appointed Fenerbahce manager in June 2024.' },
    { id:'sl_m5',  question:'The Istanbul derby between Fenerbahce and Galatasaray is called?', options:['Istanbul Derby','Intercontinental Derby','Kitalararasi Derbi','Bosphorus Derby'], answer:'Kitalararasi Derbi', difficulty:'medium', category:'super_lig', explanation:'It is known as the Kıtalararası Derbi (Intercontinental Derby) as the clubs are from different continents.' },
    { id:'sl_h1',  question:'Which Romanian manager guided Galatasaray to the 2000 UEFA Cup?', options:['Fatih Terim','Mircea Lucescu','Claudio Ranieri','Graeme Souness'], answer:'Fatih Terim', difficulty:'hard', category:'super_lig', explanation:'Fatih Terim, known as "The Emperor", guided Galatasaray to the 2000 UEFA Cup victory.' },
    { id:'sl_h2',  question:'Trabzonspor\'s last Süper Lig title before 2022 was in which year?', options:['1984','1992','1988','1980'], answer:'1984', difficulty:'hard', category:'super_lig', explanation:'Trabzonspor\'s 38-year title drought ended when they won the Süper Lig in 2021-22.' },
    { id:'sl_h3',  question:'Which Romanian manager has won the most Süper Lig titles?', options:['Mircea Lucescu','Fatih Terim','Aykut Kocaman','Ersun Yanal'], answer:'Mircea Lucescu', difficulty:'hard', category:'super_lig', explanation:'Mircea Lucescu won 9 Süper Lig titles with Galatasaray and Besiktas.' },
  ],

  // ─────────────────────────────────────────────
  //  CHAMPIONS LEAGUE  (50+ questions)
  // ─────────────────────────────────────────────
  champions_league: [
    // EASY
    { id:'cl_e1',  question:'Which club has won the Champions League the most times?', options:['Barcelona','AC Milan','Real Madrid','Bayern Munich'], answer:'Real Madrid', difficulty:'easy', category:'champions_league', explanation:'Real Madrid have won the Champions League a record 15 times.' },
    { id:'cl_e2',  question:'Where was the first Champions League final held in 1956?', options:['London','Madrid','Paris','Rome'], answer:'Paris', difficulty:'easy', category:'champions_league', explanation:'The first European Cup final was played in Paris at the Parc des Princes.' },
    { id:'cl_e3',  question:'Who scored the famous bicycle kick in the 2018 UCL final?', options:['Gareth Bale','Karim Benzema','Cristiano Ronaldo','Sadio Mane'], answer:'Gareth Bale', difficulty:'easy', category:'champions_league', explanation:'Gareth Bale\'s bicycle kick against Liverpool in the 2018 final is considered one of the greatest ever.' },
    { id:'cl_e4',  question:'The Champions League anthem is based on a piece by which composer?', options:['Beethoven','Bach','Handel','Mozart'], answer:'Handel', difficulty:'easy', category:'champions_league', explanation:'The anthem is based on George Frideric Handel\'s "Zadok the Priest".' },
    { id:'cl_e5',  question:'In what year was the tournament rebranded from the European Cup to Champions League?', options:['1990','1991','1992','1993'], answer:'1992', difficulty:'easy', category:'champions_league' },
    { id:'cl_e6',  question:'Which club won the Champions League in 2022?', options:['Liverpool','Bayern Munich','Real Madrid','Manchester City'], answer:'Real Madrid', difficulty:'easy', category:'champions_league', explanation:'Real Madrid beat Liverpool 1-0 in the 2022 final in Paris.' },
    { id:'cl_e7',  question:'How many goals did Cristiano Ronaldo score in the 2013-14 Champions League season?', options:['15','17','14','12'], answer:'17', difficulty:'easy', category:'champions_league' },
    { id:'cl_e8',  question:'Which English club won the Champions League in 2019?', options:['Arsenal','Liverpool','Manchester City','Tottenham'], answer:'Liverpool', difficulty:'easy', category:'champions_league', explanation:'Liverpool beat Tottenham 2-0 in the 2019 final in Madrid.' },
    // MEDIUM
    { id:'cl_m1',  question:'Who is the all-time top scorer in the UEFA Champions League?', options:['Lionel Messi','Raul','Cristiano Ronaldo','Robert Lewandowski'], answer:'Cristiano Ronaldo', difficulty:'medium', category:'champions_league', explanation:'Cristiano Ronaldo has scored 140+ Champions League goals, the most in history.' },
    { id:'cl_m2',  question:'Liverpool came back from 3-0 down to win the 2005 UCL final. Who were their opponents?', options:['Juventus','AC Milan','Chelsea','Barcelona'], answer:'AC Milan', difficulty:'medium', category:'champions_league', explanation:'The "Miracle of Istanbul" — Liverpool won on penalties after drawing 3-3 against AC Milan.' },
    { id:'cl_m3',  question:'Which was the first British club to win the European Cup?', options:['Manchester United','Celtic','Liverpool','Nottingham Forest'], answer:'Celtic', difficulty:'medium', category:'champions_league', explanation:'Celtic won the 1967 European Cup, nicknamed the "Lisbon Lions".' },
    { id:'cl_m4',  question:'How many consecutive Champions Leagues did Real Madrid win (2016-2018)?', options:['2','3','4','1'], answer:'3', difficulty:'medium', category:'champions_league', explanation:'Zidane\'s Real Madrid won an unprecedented three consecutive Champions Leagues (2016, 2017, 2018).' },
    { id:'cl_m5',  question:'Which player has won the Champions League the most times (6)?', options:['Cristiano Ronaldo','Paco Gento','Gareth Bale','Karim Benzema'], answer:'Paco Gento', difficulty:'medium', category:'champions_league', explanation:'Paco Gento won the European Cup 6 times with Real Madrid between 1956 and 1966.' },
    { id:'cl_m6',  question:'Manchester United\'s 1999 treble winning squad included which two late-minute final scorers?', options:['Yorke and Cole','Sheringham and Solskjaer','Keane and Stam','Beckham and Scholes'], answer:'Sheringham and Solskjaer', difficulty:'medium', category:'champions_league', explanation:'Teddy Sheringham and Ole Gunnar Solskjaer both scored as subs in the 93rd minute against Bayern Munich.' },
    { id:'cl_m7',  question:'Which player scored the fastest hat-trick in Champions League history?', options:['Robert Lewandowski','Cristiano Ronaldo','Sadio Mane','Bafetimbi Gomis'], answer:'Bafetimbi Gomis', difficulty:'medium', category:'champions_league', explanation:'Bafetimbi Gomis scored a hat-trick in 8 minutes for Lyon vs Dinamo Zagreb in 2011.' },
    { id:'cl_m8',  question:'Who scored in BOTH the 1999 and 2008 Champions League finals for Manchester United?', options:['Andrew Cole','Dwight Yorke','Paul Scholes','Teddy Sheringham'], answer:'Teddy Sheringham', difficulty:'medium', category:'champions_league' },
    { id:'cl_m9',  question:'AC Milan have won the Champions League how many times?', options:['5','6','7','8'], answer:'7', difficulty:'medium', category:'champions_league', explanation:'AC Milan have won the European Cup/Champions League 7 times.' },
    { id:'cl_m10', question:'Which country has produced the most Champions League-winning clubs?', options:['Spain','England','Italy','Germany'], answer:'Spain', difficulty:'medium', category:'champions_league', explanation:'Spanish clubs (Real Madrid, Barcelona, Atletico, Valencia, Sevilla) have won the UCL most times combined.' },
    // HARD
    { id:'cl_h1',  question:'Who scored the last-minute winner for Man United in the 1999 UCL final?', options:['Teddy Sheringham','Ole Gunnar Solskjaer','Peter Schmeichel','Dwight Yorke'], answer:'Ole Gunnar Solskjaer', difficulty:'hard', category:'champions_league', explanation:'Solskjaer prodded home a 93rd-minute winner against Bayern Munich at Camp Nou.' },
    { id:'cl_h2',  question:'Which goalkeeper made the final save in the 2012 UCL final penalty shootout for Chelsea?', options:['Oliver Kahn','Manuel Neuer','Petr Cech','Wojciech Szczesny'], answer:'Petr Cech', difficulty:'hard', category:'champions_league', explanation:'Petr Cech saved Arjen Robben\'s penalty to help Chelsea beat Bayern on penalties in Munich.' },
    { id:'cl_h3',  question:'What record Champions League scoreline was set by Liverpool vs Besiktas?', options:['8-0','10-0','8-1','7-0'], answer:'8-0', difficulty:'hard', category:'champions_league', explanation:'Liverpool beat Besiktas 8-0 in November 2007, the biggest win in Champions League history.' },
    { id:'cl_h4',  question:'Which Dutch club shocked Serie A giants in the 1994-95 Champions League?', options:['Ajax','PSV','Feyenoord','AZ'], answer:'Ajax', difficulty:'hard', category:'champions_league', explanation:'Ajax, with a young squad including Patrick Kluivert and Clarence Seedorf, beat AC Milan in the 1995 final.' },
    { id:'cl_h5',  question:'Who was the first player to score in multiple Champions League finals?', options:['Zinedine Zidane','Raul','Paulo Maldini','Clarence Seedorf'], answer:'Clarence Seedorf', difficulty:'hard', category:'champions_league', explanation:'Clarence Seedorf won the Champions League with Ajax (1995), Real Madrid (1998), and AC Milan (2003, 2007).' },
    { id:'cl_h6',  question:'Which team scored the most goals in a single Champions League campaign?', options:['Real Madrid (2014)','Barcelona (2000)','Juventus (1997)','Bayern Munich (2020)'], answer:'Bayern Munich (2020)', difficulty:'hard', category:'champions_league', explanation:'Bayern Munich scored 43 goals in the 2019-20 campaign, including an 8-2 win over Barcelona.' },
    { id:'cl_h7',  question:'The 2019 UCL semi-finals produced what remarkable comeback?', options:['Liverpool vs Porto','Tottenham vs Man City','Liverpool vs Barcelona 4-0','Barcelona vs Liverpool 4-0'], answer:'Liverpool vs Barcelona 4-0', difficulty:'hard', category:'champions_league', explanation:'Liverpool overturned a 3-0 deficit to beat Barcelona 4-0 in the 2019 semi-final second leg at Anfield.' },
    { id:'cl_h8',  question:'How many times has an Italian club won the Champions League/European Cup?', options:['12','13','11','10'], answer:'12', difficulty:'hard', category:'champions_league', explanation:'Italian clubs have combined 12 UCL/European Cup wins: Milan 7, Juventus 2, Inter 3.' },
    { id:'cl_h9',  question:'Which manager led Bayern Munich to the treble in 2019-20?', options:['Carlo Ancelotti','Niko Kovac','Hansi Flick','Jupp Heynckes'], answer:'Hansi Flick', difficulty:'hard', category:'champions_league', explanation:'Hansi Flick guided Bayern to an unprecedented sextuple in 2019-20.' },
    { id:'cl_h10', question:'Who scored a stunning 40-yard volley for Valencia against Liverpool in the 2002 UCL?', options:['John Carew','Ruben Baraja','Gaizka Mendieta','Mista'], answer:'Gaizka Mendieta', difficulty:'hard', category:'champions_league', explanation:'Gaizka Mendieta scored a spectacular long-range goal against Liverpool in the 2001-02 Champions League.' },
  ],

  // ─────────────────────────────────────────────
  //  PLAYERS  (50+ questions)
  // ─────────────────────────────────────────────
  players: [
    // EASY
    { id:'p_e1',   question:'Lionel Messi was born in which city?', options:['Buenos Aires','Rosario','Cordoba','Mendoza'], answer:'Rosario', difficulty:'easy', category:'players' },
    { id:'p_e2',   question:'Cristiano Ronaldo is from which country?', options:['Spain','Brazil','Portugal','Italy'], answer:'Portugal', difficulty:'easy', category:'players' },
    { id:'p_e3',   question:'Which country did Pele play for?', options:['Argentina','Colombia','Brazil','Chile'], answer:'Brazil', difficulty:'easy', category:'players' },
    { id:'p_e4',   question:'How many Ballon d\'Or awards has Lionel Messi won?', options:['6','7','8','9'], answer:'8', difficulty:'easy', category:'players', explanation:'Messi\'s 8th Ballon d\'Or in 2023 is the all-time record.' },
    { id:'p_e5',   question:'Zlatan Ibrahimovic is from which country?', options:['Denmark','Norway','Finland','Sweden'], answer:'Sweden', difficulty:'easy', category:'players' },
    { id:'p_e6',   question:'Who won the 2022 FIFA World Cup with Argentina?', options:['Cristiano Ronaldo','Kylian Mbappe','Lionel Messi','Neymar'], answer:'Lionel Messi', difficulty:'easy', category:'players' },
    { id:'p_e7',   question:'Erling Haaland plays for which country at international level?', options:['Denmark','Sweden','Norway','Finland'], answer:'Norway', difficulty:'easy', category:'players' },
    { id:'p_e8',   question:'Which club did Thierry Henry play for the longest?', options:['Juventus','Barcelona','Arsenal','Monaco'], answer:'Arsenal', difficulty:'easy', category:'players', explanation:'Henry spent 8 years at Arsenal and is their all-time leading scorer.' },
    { id:'p_e9',   question:'Ronaldinho played for which Brazilian club at the start of his career?', options:['Santos','Flamengo','Gremio','Corinthians'], answer:'Gremio', difficulty:'easy', category:'players' },
    { id:'p_e10',  question:'Kevin De Bruyne plays for which national team?', options:['Netherlands','Germany','Belgium','France'], answer:'Belgium', difficulty:'easy', category:'players' },
    { id:'p_e11',  question:'Jude Bellingham moved from Borussia Dortmund to which club?', options:['PSG','Manchester City','Real Madrid','Bayern Munich'], answer:'Real Madrid', difficulty:'easy', category:'players' },
    { id:'p_e12',  question:'Mohamed Salah represents which country internationally?', options:['Morocco','Egypt','Tunisia','Algeria'], answer:'Egypt', difficulty:'easy', category:'players' },
    // MEDIUM
    { id:'p_m1',   question:'Which club did Ronaldo Nazario NOT play for?', options:['Barcelona','Real Madrid','Milan','Juventus'], answer:'Juventus', difficulty:'medium', category:'players', explanation:'R9 Ronaldo played for Cruzeiro, PSV, Barcelona, Inter Milan, Real Madrid, AC Milan, Corinthians and Brazil NT — never Juventus.' },
    { id:'p_m2',   question:'Zinedine Zidane headbutted who in the 2006 World Cup final?', options:['Thierry Henry','Marco Materazzi','Luca Toni','Francesco Totti'], answer:'Marco Materazzi', difficulty:'medium', category:'players', explanation:'Zidane headbutted Italy\'s Marco Materazzi after alleged insults, earning a red card in his final career match.' },
    { id:'p_m3',   question:'Who was nicknamed "The Divine Ponytail"?', options:['Frank Lampard','Roberto Baggio','Paulo Maldini','Alessandro Del Piero'], answer:'Roberto Baggio', difficulty:'medium', category:'players' },
    { id:'p_m4',   question:'Neymar left Barcelona for PSG in 2017 for how much?', options:['€150m','€200m','€222m','€180m'], answer:'€222m', difficulty:'medium', category:'players', explanation:'Neymar\'s world record transfer to PSG in 2017 was €222 million.' },
    { id:'p_m5',   question:'Paulo Maldini played for only one club in his entire career. Which?', options:['Inter Milan','Juventus','AC Milan','Roma'], answer:'AC Milan', difficulty:'medium', category:'players', explanation:'Paulo Maldini played for AC Milan from 1985 to 2009, winning 7 Serie A titles and 5 Champions Leagues.' },
    { id:'p_m6',   question:'Which player was nicknamed "El Fenomeno" (The Phenomenon)?', options:['Cristiano Ronaldo','Zinedine Zidane','Ronaldo Nazario','Ronaldinho'], answer:'Ronaldo Nazario', difficulty:'medium', category:'players' },
    { id:'p_m7',   question:'How many World Cup goals did Miroslav Klose score?', options:['14','16','15','18'], answer:'16', difficulty:'medium', category:'players', explanation:'Miroslav Klose\'s 16 World Cup goals is the all-time record.' },
    { id:'p_m8',   question:'Thierry Henry famously scored how many goals for Arsenal in all competitions (2003-04)?', options:['32','35','30','28'], answer:'30', difficulty:'medium', category:'players' },
    { id:'p_m9',   question:'Who was the first Black captain of the English national team?', options:['Rio Ferdinand','Ashley Cole','Paul Ince','Sol Campbell'], answer:'Paul Ince', difficulty:'medium', category:'players', explanation:'Paul Ince became England\'s first black captain in 1993.' },
    { id:'p_m10',  question:'Cafu, the legendary Brazil right-back, retired at which club?', options:['Santos','Juventus','AC Milan','Inter Milan'], answer:'AC Milan', difficulty:'medium', category:'players' },
    { id:'p_m11',  question:'Which Brazilian striker scored the goal that won the 1994 World Cup final?', options:['Romario','Bebeto','Roberto Baggio missed the deciding penalty','Mazinho'], answer:'Roberto Baggio missed the deciding penalty', difficulty:'medium', category:'players', explanation:'The 1994 WC final ended 0-0; Roberto Baggio missed the decisive penalty in the shootout to give Brazil the title.' },
    { id:'p_m12',  question:'Who was given the Golden Ball at the 2022 World Cup?', options:['Kylian Mbappe','Lionel Messi','Luka Modric','Emi Martinez'], answer:'Lionel Messi', difficulty:'medium', category:'players' },
    // HARD
    { id:'p_h1',   question:'Who was the first player to score 100 Champions League goals?', options:['Lionel Messi','Cristiano Ronaldo','Raul','Karim Benzema'], answer:'Cristiano Ronaldo', difficulty:'hard', category:'players', explanation:'Ronaldo reached the 100 UCL goal milestone in 2017, the first ever to do so.' },
    { id:'p_h2',   question:'Which player is recorded as having scored the most career goals in history?', options:['Pele','Cristiano Ronaldo','Josef Bican','Romario'], answer:'Josef Bican', difficulty:'hard', category:'players', explanation:'Josef Bican is recognized by the RSSSF as having scored 805 verified goals across his career.' },
    { id:'p_h3',   question:'Diego Maradona scored his "Goal of the Century" against which team in 1986?', options:['Germany','England','Italy','Argentina'], answer:'England', difficulty:'hard', category:'players', explanation:'Maradona\'s solo goal against England in the 1986 World Cup quarter-final was voted Goal of the Century by FIFA.' },
    { id:'p_h4',   question:'Ronaldinho won the Ballon d\'Or in which year?', options:['2004','2005','2003','2006'], answer:'2005', difficulty:'hard', category:'players', explanation:'Ronaldinho won the 2005 Ballon d\'Or after a stunning season for Barcelona.' },
    { id:'p_h5',   question:'Gerd Muller\'s nickname was?', options:['Der Bomber','The Goal Machine','The Beast','Iron Fist'], answer:'Der Bomber', difficulty:'hard', category:'players', explanation:'Gerd Müller was nicknamed "Der Bomber der Nation" (The Bomber of the Nation).' },
    { id:'p_h6',   question:'Luka Modric won the Ballon d\'Or in 2018, ending a 10-year Messi-Ronaldo monopoly. Who was 2nd?', options:['Antoine Griezmann','Cristiano Ronaldo','Lionel Messi','Kylian Mbappe'], answer:'Cristiano Ronaldo', difficulty:'hard', category:'players' },
    { id:'p_h7',   question:'Which midfielder holds the record for the most assists in a single Champions League season?', options:['Cesc Fabregas','Xavi','Lionel Messi','Tomas Rosicky'], answer:'Cesc Fabregas', difficulty:'hard', category:'players', explanation:'Cesc Fabregas set the record with 10 Champions League assists in 2006-07 for Arsenal.' },
    { id:'p_h8',   question:'Pele was born in which Brazilian city?', options:['Rio de Janeiro','Sao Paulo','Tres Coracoes','Salvador'], answer:'Tres Coracoes', difficulty:'hard', category:'players', explanation:'Pele was born in Três Corações, Minas Gerais, Brazil on October 23, 1940.' },
  ],

  // ─────────────────────────────────────────────
  //  MANAGERS  (30+ questions)
  // ─────────────────────────────────────────────
  managers: [
    { id:'mg_e1',  question:'Who managed Manchester United from 1986 to 2013?', options:['Ron Atkinson','Alex Ferguson','David Moyes','Van Gaal'], answer:'Alex Ferguson', difficulty:'easy', category:'managers' },
    { id:'mg_e2',  question:'Pep Guardiola managed which clubs before Manchester City?', options:['Barcelona only','Bayern Munich only','Both Barcelona and Bayern Munich','Real Madrid'], answer:'Both Barcelona and Bayern Munich', difficulty:'easy', category:'managers' },
    { id:'mg_e3',  question:'Jurgen Klopp managed which club before Liverpool?', options:['Bayern Munich','Borussia Dortmund','Schalke','Bayer Leverkusen'], answer:'Borussia Dortmund', difficulty:'easy', category:'managers' },
    { id:'mg_e4',  question:'Which manager won the Champions League with 3 different clubs?', options:['Jose Mourinho','Pep Guardiola','Alex Ferguson','Carlo Ancelotti'], answer:'Carlo Ancelotti', difficulty:'easy', category:'managers', explanation:'Ancelotti won the UCL with AC Milan (twice), Real Madrid (three times).' },
    { id:'mg_e5',  question:'Arsene Wenger managed Arsenal for how many years?', options:['18','20','22','25'], answer:'22', difficulty:'easy', category:'managers', explanation:'Wenger managed Arsenal from October 1996 to May 2018.' },
    { id:'mg_e6',  question:'Jose Mourinho is from which country?', options:['Spain','Italy','Portugal','Brazil'], answer:'Portugal', difficulty:'easy', category:'managers' },
    { id:'mg_e7',  question:'Which manager guided Italy to the 2006 World Cup title?', options:['Marcello Lippi','Giovanni Trapattoni','Fabio Capello','Roberto Mancini'], answer:'Marcello Lippi', difficulty:'easy', category:'managers' },
    { id:'mg_m1',  question:'Who created the concept of "Total Football"?', options:['Rinus Michels','Johan Cruyff','Louis van Gaal','Bert van Marwijk'], answer:'Rinus Michels', difficulty:'medium', category:'managers', explanation:'Rinus Michels developed "Total Football" at Ajax and with the Dutch national team in the 1970s.' },
    { id:'mg_m2',  question:'Which manager guided a 5000-1 outsider to the Premier League title?', options:['Sam Allardyce','Harry Redknapp','Claudio Ranieri','Alan Pardew'], answer:'Claudio Ranieri', difficulty:'medium', category:'managers', explanation:'Claudio Ranieri managed Leicester City to their miraculous 2015-16 Premier League title.' },
    { id:'mg_m3',  question:'Sir Alex Ferguson won the Champions League with Manchester United in which years?', options:['1999 only','1999 and 2008','1994 and 1999','1999 and 2001'], answer:'1999 and 2008', difficulty:'medium', category:'managers' },
    { id:'mg_m4',  question:'Pep Guardiola won an unprecedented sextuple with which club?', options:['Bayern Munich','Manchester City','Barcelona','None'], answer:'Manchester City', difficulty:'medium', category:'managers', explanation:'Man City won all 6 available trophies in 2023 under Pep Guardiola.' },
    { id:'mg_m5',  question:'Which manager famously said "We have a great history, but no trophy yet" before winning the Premier League?', options:['Roberto Mancini','Manuel Pellegrini','Pep Guardiola','Carlo Ancelotti'], answer:'Pep Guardiola', difficulty:'medium', category:'managers' },
    { id:'mg_m6',  question:'Helenio Herrera\'s Inter Milan of the 1960s played what revolutionary tactical system?', options:['Total Football','Catenaccio Grande','Grande Inter','Tiki-taka'], answer:'Catenaccio Grande', difficulty:'medium', category:'managers', explanation:'Herrera\'s "Grande Inter" used catenaccio principles to win 2 European Cups in 1964 and 1965.' },
    { id:'mg_m7',  question:'Which England manager famously called a press conference to resign in 2006?', options:['Sven-Goran Eriksson','Steve McClaren','Peter Taylor','Stuart Pearce'], answer:'Steve McClaren', difficulty:'medium', category:'managers' },
    { id:'mg_h1',  question:'Who was nicknamed "The Godfather of Football"?', options:['Alex Ferguson','Helenio Herrera','Vittorio Pozzo','Herbert Chapman'], answer:'Helenio Herrera', difficulty:'hard', category:'managers' },
    { id:'mg_h2',  question:'Herbert Chapman pioneered which revolutionary tactical formation?', options:['4-4-2','WM formation','4-3-3','Catenaccio'], answer:'WM formation', difficulty:'hard', category:'managers', explanation:'Herbert Chapman introduced the WM (3-2-2-3) formation at Arsenal in the 1920s, revolutionizing the game.' },
    { id:'mg_h3',  question:'Which manager won Italy\'s Serie A title with three different clubs?', options:['Jose Mourinho','Carlo Ancelotti','Giovanni Trapattoni','Fabio Capello'], answer:'Giovanni Trapattoni', difficulty:'hard', category:'managers', explanation:'Trapattoni won Serie A with Juventus, Inter Milan, and Fiorentina.' },
    { id:'mg_h4',  question:'Which manager has won the most top-flight league titles overall?', options:['Alex Ferguson','Pep Guardiola','Giovanni Trapattoni','Mircea Lucescu'], answer:'Pep Guardiola', difficulty:'hard', category:'managers', explanation:'Guardiola has won 11 league titles across Spain, Germany, and England.' },
    { id:'mg_h5',  question:'Brian Clough won back-to-back European Cups with which unfancied club?', options:['Derby County','Leeds United','Nottingham Forest','Ipswich Town'], answer:'Nottingham Forest', difficulty:'hard', category:'managers', explanation:'Brian Clough guided Nottingham Forest to consecutive European Cup wins in 1979 and 1980, a remarkable achievement.' },
  ],

  // ─────────────────────────────────────────────
  //  TROPHIES & RECORDS  (30+ questions)
  // ─────────────────────────────────────────────
  trophies: [
    { id:'tr_e1',  question:'How often is the FIFA World Cup held?', options:['Every 2 years','Every 4 years','Every 3 years','Every 5 years'], answer:'Every 4 years', difficulty:'easy', category:'trophies' },
    { id:'tr_e2',  question:'Which country has won the most World Cup titles?', options:['Germany','Italy','Argentina','Brazil'], answer:'Brazil', difficulty:'easy', category:'trophies' },
    { id:'tr_e3',  question:'The FA Cup is contested in which country?', options:['Scotland','Wales','England','Ireland'], answer:'England', difficulty:'easy', category:'trophies' },
    { id:'tr_e4',  question:'How many times has Brazil won the World Cup?', options:['4','5','6','3'], answer:'5', difficulty:'easy', category:'trophies' },
    { id:'tr_e5',  question:'The Copa Libertadores is which continent\'s equivalent of the Champions League?', options:['Africa','Asia','South America','North America'], answer:'South America', difficulty:'easy', category:'trophies' },
    { id:'tr_e6',  question:'Which trophy is awarded to the top scorer at a World Cup?', options:['Golden Ball','Golden Boot','Golden Glove','Silver Boot'], answer:'Golden Boot', difficulty:'easy', category:'trophies' },
    { id:'tr_e7',  question:'Which trophy is given to the best player at the World Cup?', options:['Golden Boot','Golden Glove','Golden Ball','Silver Ball'], answer:'Golden Ball', difficulty:'easy', category:'trophies' },
    { id:'tr_e8',  question:'Which country won the first ever FIFA World Cup in 1930?', options:['Brazil','Italy','Uruguay','Argentina'], answer:'Uruguay', difficulty:'easy', category:'trophies', explanation:'Uruguay beat Argentina 4-2 in the 1930 World Cup final in Montevideo.' },
    { id:'tr_m1',  question:'Which player holds the record for most World Cup goals (16)?', options:['Ronaldo Nazario','Gerd Muller','Miroslav Klose','Pele'], answer:'Miroslav Klose', difficulty:'medium', category:'trophies', explanation:'Klose surpassed Ronaldo\'s 15 goals by scoring in the 2014 World Cup in Brazil.' },
    { id:'tr_m2',  question:'How many times has Germany won the World Cup?', options:['3','4','5','2'], answer:'4', difficulty:'medium', category:'trophies', explanation:'Germany/West Germany won in 1954, 1974, 1990, and 2014.' },
    { id:'tr_m3',  question:'Which player has the most World Cup appearances?', options:['Grzegorz Lato','Cafu','Lothar Matthaus','Miroslav Klose'], answer:'Lothar Matthaus', difficulty:'medium', category:'trophies', explanation:'Lothar Matthaus made 25 World Cup appearances across 5 tournaments.' },
    { id:'tr_m4',  question:'Which World Cup year produced the "Battle of Santiago", the most violent match in WC history?', options:['1958','1962','1966','1970'], answer:'1962', difficulty:'medium', category:'trophies', explanation:'The Chile vs Italy match in 1962 was so violent, police had to intervene on the pitch twice.' },
    { id:'tr_m5',  question:'Who won the Ballon d\'Or 2019 (the year it wasn\'t awarded was 2020)?', options:['Sadio Mane','Mohamed Salah','Lionel Messi','Virgil van Dijk'], answer:'Lionel Messi', difficulty:'medium', category:'trophies' },
    { id:'tr_m6',  question:'Which club holds the world record for the most league titles in the world?', options:['Real Madrid','Juventus','Lincoln Red Imps','Rangers'], answer:'Lincoln Red Imps', difficulty:'medium', category:'trophies', explanation:'Lincoln Red Imps of Gibraltar hold the record with 27+ consecutive league titles.' },
    { id:'tr_m7',  question:'The African Cup of Nations (AFCON) is held every how many years?', options:['2','4','3','1'], answer:'2', difficulty:'medium', category:'trophies' },
    { id:'tr_h1',  question:'Which player has won the most major international trophies in football history?', options:['Lionel Messi','Ronaldo Nazario','Cafu','Sergio Busquets'], answer:'Cafu', difficulty:'hard', category:'trophies', explanation:'Cafu won 2 World Cups, multiple Copa Americas, Copa Libertadores, and numerous club trophies.' },
    { id:'tr_h2',  question:'Which player scored in every group stage, last 16, quarter-final, semi-final, AND final at the same World Cup?', options:['Ronaldo 2002','Mbappe 2022','Gerd Muller 1974','Just Fontaine 1958'], answer:'Gerd Muller 1974', difficulty:'hard', category:'trophies' },
    { id:'tr_h3',  question:'Just Fontaine scored how many goals in the 1958 World Cup (all-time single tournament record)?', options:['11','13','14','12'], answer:'13', difficulty:'hard', category:'trophies', explanation:'Just Fontaine scored 13 goals in 6 matches at the 1958 World Cup, a record that still stands.' },
    { id:'tr_h4',  question:'Which nation has appeared in the most World Cup finals without winning?', options:['Netherlands','Hungary','Czechoslovakia','Argentina'], answer:'Netherlands', difficulty:'hard', category:'trophies', explanation:'The Netherlands appeared in 3 World Cup finals (1974, 1978, 2010) without ever winning.' },
    { id:'tr_h5',  question:'How many times has Pep Guardiola\'s teams won the treble?', options:['2','3','4','5'], answer:'3', difficulty:'hard', category:'trophies', explanation:'Guardiola won the treble with Barcelona (2009, 2015), and Manchester City (2023).' },
  ],
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getQuestions(
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 10
): Question[] {
  const categoryQuestions = quizData[category] || [];
  const filtered = categoryQuestions.filter(q => q.difficulty === difficulty);
  return shuffleArray(filtered).slice(0, Math.min(count, filtered.length));
}

// Return ALL questions for a category (all difficulties) shuffled
export function getAllQuestions(category: string, count: number = 10): Question[] {
  const all = quizData[category] || [];
  return shuffleArray(all).slice(0, count);
}

export const leagues = [
  { id: 'premier_league',  name: 'Premier League',         country: 'England',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: 'from-purple-600 to-purple-800', badge: '⚽' },
  { id: 'la_liga',         name: 'La Liga',                 country: 'Spain',       flag: '🇪🇸', color: 'from-red-500 to-yellow-500',   badge: '⚽' },
  { id: 'serie_a',         name: 'Serie A',                 country: 'Italy',       flag: '🇮🇹', color: 'from-blue-600 to-green-600',   badge: '⚽' },
  { id: 'bundesliga',      name: 'Bundesliga',              country: 'Germany',     flag: '🇩🇪', color: 'from-red-600 to-yellow-400',   badge: '⚽' },
  { id: 'ligue_1',         name: 'Ligue 1',                 country: 'France',      flag: '🇫🇷', color: 'from-blue-500 to-red-500',     badge: '⚽' },
  { id: 'primeira_liga',   name: 'Primeira Liga',           country: 'Portugal',    flag: '🇵🇹', color: 'from-green-600 to-red-600',    badge: '⚽' },
  { id: 'eredivisie',      name: 'Eredivisie',              country: 'Netherlands', flag: '🇳🇱', color: 'from-orange-500 to-orange-700',badge: '⚽' },
  { id: 'belgian_pro',     name: 'Belgian Pro League',      country: 'Belgium',     flag: '🇧🇪', color: 'from-yellow-500 to-red-700',   badge: '⚽' },
  { id: 'mls',             name: 'Major League Soccer',     country: 'USA',         flag: '🇺🇸', color: 'from-blue-700 to-red-600',     badge: '⚽' },
  { id: 'super_lig',       name: 'Süper Lig',               country: 'Turkey',      flag: '🇹🇷', color: 'from-red-600 to-red-800',      badge: '⚽' },
  { id: 'champions_league',name: 'UEFA Champions League',   country: 'Europe',      flag: '🌍', color: 'from-blue-900 to-yellow-500',  badge: '🏆' },
];

export const popularPlayers = [
  'Lionel Messi', 'Cristiano Ronaldo', 'Erling Haaland', 'Kylian Mbappe',
  'Neymar', 'Kevin De Bruyne', 'Virgil van Dijk', 'Mohamed Salah',
  'Robert Lewandowski', 'Luka Modric', 'Karim Benzema', 'Harry Kane',
  'Vinicius Junior', 'Pedri', 'Gavi', 'Phil Foden', 'Bukayo Saka',
  'Jude Bellingham', 'Rodri', 'Trent Alexander-Arnold',
];
