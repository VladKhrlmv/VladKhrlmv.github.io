/* SET RANDOM LOADER COLORS FOR DEMO PURPOSES */	
var demoColorArray = ['red','blue','green','yellow','purple','gray'];
var colorIndex = Math.floor(Math.random()*demoColorArray.length);
setSkin(demoColorArray[colorIndex]);

var yes = true;

// этапы в прогресс-баре
var s1 = ['Собираю данные из интернета','Читаю Википедию','Смотрю паблики во ВКонтакте'];

var s20 = ['Обучаю нейросеть','Анализирую увиденное','Выделяю важное'];

var s40 = ['Готовлю технический анализ','Думаю о будущем','Осознаю важность момента'];

var s60 = ['Постулирую неведомое','Инкапсулирую полиморфизм','Кристаллизую суть'];

var s80 = ['Тыкаю пальцем в небо','Формализую данность как класс','Удаляю противоречия и вношу ясность'];

var result = ['Сначала крипта подрастет, потом обвалится. Потом снова подрастет, потом снова обвалится.','Можно закупать, хотя лучше сначала продать, но если важнее купить, то можно и не продавать','По всем показателям рецессия будет следовать за отскоком, но это вряд ли отразится на текущей ситуации, поэтому необходимо обратить внимание на волатильность.'];

 
// генератор случайных чисел в диапазоне от минимального до максимального

function randz(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}  

 
// готовим итоговые значения

var s1_final = s1[randz(0,2)];

var s20_final = s20[randz(0,2)];

var s40_final = s40[randz(0,2)];

var s60_final = s60[randz(0,2)];

var s80_final = s80[randz(0,2)];

var percent_final = randz(60,99);

var result_final = result[randz(0,2)];



/* RANDOM LARGE IMAGES FOR DEMO PURPOSES */	
var demoImgArray = ['http://www.hdwallpapers.in/walls/halloween_2013-wide.jpg', 'http://www.hdwallpapers.in/walls/2013_print_tech_lamborghini_aventador-wide.jpg', 'http://www.hdwallpapers.in/walls/ama_dablam_himalaya_mountains-wide.jpg', 'http://www.hdwallpapers.in/walls/arrow_tv_series-wide.jpg', 'http://www.hdwallpapers.in/walls/anna_in_frozen-wide.jpg', 'http://www.hdwallpapers.in/walls/frozen_elsa-wide.jpg', 'http://www.hdwallpapers.in/walls/shraddha_kapoor-wide.jpg', 'http://www.hdwallpapers.in/walls/sahara_force_india_f1_team-HD.jpg', 'http://www.hdwallpapers.in/walls/lake_sunset-wide.jpg', 'http://www.hdwallpapers.in/walls/2013_movie_cloudy_with_a_chance_of_meatballs_2-wide.jpg', 'http://www.hdwallpapers.in/walls/bates_motel_2013_tv_series-wide.jpg', 'http://www.hdwallpapers.in/walls/krrish_3_movie-wide.jpg', 'http://www.hdwallpapers.in/walls/universe_door-wide.jpg', 'http://www.hdwallpapers.in/walls/night_rider-HD.jpg', 'http://www.hdwallpapers.in/walls/tide_and_waves-wide.jpg', 'http://www.hdwallpapers.in/walls/2014_lamborghini_veneno_roadster-wide.jpg', 'http://www.hdwallpapers.in/walls/peeta_katniss_the_hunger_games_catching_fire-wide.jpg', 'http://www.hdwallpapers.in/walls/captain_america_the_winter_soldier-wide.jpg', 'http://www.hdwallpapers.in/walls/puppeteer_ps3_game-wide.jpg', 'http://www.hdwallpapers.in/walls/lunar_space_galaxy-HD.jpg', 'http://www.hdwallpapers.in/walls/2013_wheelsandmore_lamborghini_aventador-wide.jpg', 'http://www.hdwallpapers.in/walls/destiny_2014_game-wide.jpg', 'http://www.hdwallpapers.in/walls/sunset_at_laguna_beach-wide.jpg'];

// Stripes interval
var stripesAnim;
var calcPercent;

$progress = $('.progress-bar');
$percent = $('.percentage');
$stripes = $('.progress-stripes');
$stripes.text('////////////////////////');

/* CHANGE LOADER SKIN */
$('.skin').click(function(){
    var whichColor = $(this).attr('id');
    setSkin(whichColor);
});

// Call function to load array of images
function launch() {
    preload(demoImgArray);
}


// Call function to animate stripes
stripesAnimate(); 


/*** FUNCTIONS ***/

/* LOADING */
function preload(imgArray) {
    $('button').prop('disabled', true);
    var increment = Math.floor(100 / imgArray.length);
    var i = 0;
    while (i < 300) {
        $progress.animate({
            width: "+=" + 0.3 + "%"
        }, 100);
        i = i+1;
        
    }

 
    calcPercent = setInterval(function() {
        
        //loop through the items
        $percent.text(Math.floor(($progress.width() / $('.loader').width()) * 100) + '%');

        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 1) {
            $('span').text(s1_final);
        } 
      
        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 20) {
            $('span').text(s20_final);
        } 
      
       
        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 40) {
            $('span').text(s40_final);
        } 
      
        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 60) {
            $('span').text(s60_final);
        }
      
        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 80) {
            $('span').text(s80_final);
        }
      
        if (Math.floor(($progress.width() / $('.loader').width()) * 100)  == 100) {
            yes = false;
            $('span').text('Примерная точность прогноза: ' + percent_final + '%');
            $('p').text(result_final);
        }
    });
}

/* STRIPES ANIMATION */
function stripesAnimate() {
    animating();
    stripesAnim = setInterval(animating, 2500);
}

function animating() {
    $stripes.animate({
        marginLeft: "-=30px"
    }, 2500, "linear").append('/');
} 

function setSkin(skin){
    $('.loader').attr('class', 'loader '+skin);
    $('span').hasClass('loaded') ? $('span').attr('class', 'loaded '+skin) : $('span').attr('class', skin);
}