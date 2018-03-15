// IO.UI v0.1 Alpha Project by Ralph & Lefela4, Copyright IOGame.io

var my_coins,
	owned_skins,
	skins,
	audioUrl,
	track = [];
	
	// Audio Stuff for sound effects.
	audioUrl = "./sounds/";
	track = ['pop.wav', 'purchase.wav', 'denied.wav', 'dundun.wav', 'airhorn.wav'];
	owned_skins = [];
	// Users Skins Needs to come from Server with Buffer.
	my_coins = 234234234234
	// Skins Array for reference
	skins = [];
	
$(document).ready(function() {

// Refresh the Skin List to display skins in store.
refresh_skin_list();

// Add users coin balance to UI
$('.coins-amount').html(my_coins);
	
var ui_open = null,
	ui_page = null,
	active 	= null;
	
	// Check localStorage if user has muted the sound effects.
	if(localStorage.getItem('muted') == 'true'){
		muted = true;
		$('.settings-audio').prop("checked", true);
	}
	else{
		muted = false;
		$('.settings-audio').prop("checked", false);
	}
	
	// When user changes Muted setting this will bind 
	// it to localstorage so it stays muted / unmuted
	// when they refresh
	
    $('.settings-audio').change(function() {
        if(this.checked) {
			muted = true;
            localStorage.setItem('muted', 'true'); // Doesnt accept Boolean ( true / false )
        }
		else{
			muted = false;
			localStorage.setItem('muted', 'false'); // Doesnt accept Boolean ( true / false )
		}
    });
		
	// If Button has the .pop class when clicked it will play a "POP" sound effect.
	$('.pop').on('click', function(){
		if(muted !== true){
			new Audio(audioUrl + track[0]).play();
		}
	});
	
	// If Button has the .cannotpurchase class when clicked it will play a "Nope" sound effect. 
	$('.cannotpurchase').on('click', function(){
		if(muted !== true){
			new Audio(audioUrl + track[2]).play();
		}
	});
	
	// If Button has the .dundun class when clicked it will play a Cool sound effect. 
	$('.dundun').on('click', function(){
		if(muted !== true){
			new Audio(audioUrl + track[4]).play();
		}
	});
	
	// Return to main store page.
	$('.backUI').on('click', function(){
		$('.popup').fadeOut();
		$('#shop_home').fadeIn();
	});
	
	// Close all UI elements.
	$('.closeUI').on('click', function(){
		$('.popup').fadeOut();
	});
	
	// Open the Clan Management UI element.
	$('#clan_management').on('click', function(){
		$('#clan_manager').fadeIn();
	});
		
	// If Settings are open = true
	var settings_open = false;
	
	// Open the Settings tab.
	$('#open-settings').on('click', function(){
		if(settings_open == true){
			// If It's already open close it.
			$('#settings').fadeOut();
			settings_open = false;
		}
		else{
			// If it's closed lets open it.
			$('#settings').fadeIn();
			settings_open = true;
		}		
	});
	
	// Open the main shop element.
	$('.open_shop').on('click', function(){
		if(active !== null){
			active.fadeOut();
		}
		$('#shop_home').fadeIn();
	});
	
	// Open Skins shop.
	$('#open_skins').on('click', function(){
		refresh_skin_list();
		active = $('#shop_skins');
		$('.popup').fadeOut();
		$('#shop_skins').fadeIn();
	});
	
	// Open Users Skin Library.
	$('#open_my_skins').on('click', function(){
		my_skins_list();
		active = $('#owned_skins');
		$('.popup').fadeOut();
		$('#owned_skins').fadeIn();
	});
	
	// Open Leaderboard colors shop.
	$('#open_leaderboard').on('click', function(){
		active = $('#leaderboard_colors');
		$('.popup').fadeOut();
		$('#leaderboard_colors').fadeIn();
	});
	
	// Open Buy Bots Shop.
	$('#buy_bots').on('click', function(){
		active = $('#bot_packages');
		$('.popup').fadeOut();
		$('#bot_packages').fadeIn();
	});	
	
	// Coming soon...
	function close_ui($page){}
	
	function open_ui($page){}
});
	
// Purchase function for skins
function purchase(skin_id, skin_cost){
	var cost = skin_cost;
	var id = skin_id;

	if(canAfford(cost)){
		if(owned_skins.indexOf(skin_id) >= 0){
			console.log('Already own this skin.');
			
			if(muted !== true){
				// Play audio because user purchased this item.
				new Audio(audioUrl + track[2]).play();
			}
		}
		else{
			// Send Buffer to Server to check if user can afford this skin.
			
			// Buffer();
			
			// If User can afford to purchase, Add the Skin to their Owned list.
			owned_skins.push(skin_id);
			
			// Update Users Visual Balance.			
			update_user_balance(skin_cost);
			
			// Play Cool sound effect if Sound effects not muted in Settings.
			if(muted !== true){
				new Audio(audioUrl + track[1]).play();
			}
		}

	}
	else{
		// Play audio because user cannot afford.
		new Audio(audioUrl + track[2]).play();
	}
}

// Update users UI balance.
function update_user_balance(cost){
	take_coins = cost;
	
	new_balance = my_coins - take_coins;
	
	$('.coins-amount').html(new_balance);
	
	my_coins = new_balance;
	
	refresh_skin_list();
	
}	

// Simple Function to check if user can afford an item.
function canAfford(price){
	if(price > my_coins){
		return false;
	}
	else{
		return true;
	}
}

// Load Users Owned Skins List.

function my_skins_list(){
	$('#my_skins_list').html(' ');
	
	// Get all owned skins.
	
	owned_skins.forEach(function(data) {
		
		// Get Skin Image and Skin Name
		this_skin = skins[data];
		
		url = './shop/skins/';
		url += this_skin;
		url += '.png';
		
		// Add Skin to List.
		$('#my_skins_list').append('<div class="io-col-20"><div class="skin-holder"><img class="skin-image" src="' + url + '"><button onclick="ChangeSkin(\'' + url + '\', \'' + this_skin + '\')" skin_id="1" class="green small pop">Use this skin</button></div></div>');
	});
	
}

// Change Users Current Skin.

function ChangeSkin(skin_link, skin_name){
	// Check if user owns this skin.
	
	// Get Users Owned Skins from server via Buffer.
	// Add Users Owned Skins to array
	// users_skins_server = buffer.response;
	
	// if(users_skins_server.contains(skin_name)){
		
		console.log('ChangeSkin Function');
		// Change Skin stuff.
	
	// }

}

// Refresh shop skin list and add skins into skins array.
function refresh_skin_list(){
	$('#skins_list').html(' ');
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var object = JSON.parse(this.responseText);
			
			var ob = object;
			
			Object.keys(ob).forEach(function(key) {
				
				// Add Skins to skins array for referencing later.
				skins[ob[key].skin_id] = ob[key].skin_name;
				
				var price,
					display_price,
					button_text,
					button_color,
					color;
					
				if(ob[key].skin_price == 0){
					// If Cost is 0
					price = 0;
					display_price = 'FREE';
					color = '#588820';
				}else{
					// If Cost is not 0
					price = ob[key].skin_price;
					display_price = ob[key].skin_price + ' Coins';
					color = '#886220';
				}
								
				if(price > my_coins){
					// If User Cannot afford this skin
					button_text = 'Cannot Afford';
					button_color = '#d71a1a';
				}else{
					// If User Can afford this skin
					button_text = 'Buy this Skin';
					button_color = '#386bc0';
				}
				
				$('#skins_list').append('<div class="io-col-20"><div class="skin-holder"><div style="background-color:' + color + '" class="skin-price">' + display_price + '</div><img class="skin-image" src="' + ob[key].skin_url + '"><button onclick="purchase(' + ob[key].skin_id + ', ' + price + ')" skin_id="1" skin_cost="' + price + '" style="background-color: ' + button_color + '" class="buySkin purchase">' + button_text + '</button></div></div>');
			});
			
		}
	};
		
	xmlhttp.open("GET", "../iogame/shop/skin_list.json", true);
	xmlhttp.send();
}

