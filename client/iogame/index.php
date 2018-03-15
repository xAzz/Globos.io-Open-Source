<!DOCTYPE html>
<html>
    <head>
		<meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" /> 
        <meta charset="UTF-8">
		<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
		
		<!-- Scripts -->
		<script src="assets/js/jquery.js"></script>
		<script src="./js/io.ui.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/alertify.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/str.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/rng.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/setImmediate.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/AnimationFrame.min.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/requestAnimationFramev2.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/buffer.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/BinaryWriter.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/vector.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/log.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/stats.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/core.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/main_out.js?v=<?php echo time(); ?>"></script>
		
		<link rel="stylesheet" href="./css/io-design.css?v=<?php echo time(); ?>"> 
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		
	</head>
	
	<body>
		<div id="overlays" class="mainWrapper dark">
			<div class="io-col-33 io-col">
				<div class="box-dark">
					<div class="header">
						Login
					</div>
					<div class="content controls">
						<center>
							Login to save your progress and unlock new skins
						</center>
						<button id="open_my_skins" class="blue small">Change Skin</button>
					</div>
				</div>
				<div class="box-dark">
					<div class="header">
						Clans Queue
					</div>
					<div class="content">
						<div class="clans-list">
							<table class="clan-war-table" style="width:100%">
								<tr>
									<td>[ƬψƬ] Team Youtube</td>
									<td>
										5v5
									</td> 
									<td>
										<button class="green small dundun">Challenge</button>
									</td> 
								</tr>
								<tr>
									<td>[ƝƁƘ] Nebulous</td>
									<td>
										5v5
									</td> 
									<td>
										<button class="green small dundun">Challenge</button>
									</td> 
								</tr>
								<tr>
									<td>[ΔǤƘ] Agar Kings</td>
									<td>
										5v5
									</td> 
									<td>
										<button class="green small dundun">Challenge</button>
									</td> 
								</tr>
								<tr>
									<td>[ᗩǤ] Arcade Go</td>
									<td>
										5v5
									</td> 
									<td>
										<button class="green small dundun">Challenge</button>
									</td> 
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="io-col-33 io-col">
				<div class="box-dark">
					<div class="nick-holder">
						<input id="nick" type="text" placeholder="Nickname">
					</div>
					<div class="io-col-80 io-col">
						<div class="io-button-left">
							<button class="default pop" onclick="setNick(document.getElementById('nick').value); return false;">Play as Guest</button>
						</div>
					</div>
					<div class="io-col-20 io-col">
						<div class="io-button-right">
							<button id="open-settings" class="settings pop"><i class="fa fa-cog" aria-hidden="true"></i></button>
						</div>
					</div>
					<div class="io-col-50 io-col">
						<div class="io-button-left">
							<button class="blue pop">Login</button>
						</div>
					</div>
					<div class="io-col-50 io-col">
						<div class="io-button-right">
							<button class="green open_shop pop">Shop</button>
						</div>
					</div>
					<div id="settings">
						<table class="settings-table" style="width:100%">
							<tr>
								<td><label for="mute">Mute Sound Effects</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-audio" id="mute" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="player_names">Show Player Names</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-player_names" id="player_names" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="colors">No Colors</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-colors" id="colors" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="colors">No Colors</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-colors" id="colors" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="colors">No Colors</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-colors" id="colors" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="colors">No Colors</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-colors" id="colors" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
							<tr>
								<td><label for="colors">No Colors</label></td>
								<td class="opt">
									<label class="switch">
										<input class="pop settings-colors" id="colors" type="checkbox">
										<span class="slider round"></span>
									</label>
								</td> 
							</tr>
						</table>
					</div>
				</div>
				<div class="box-dark">
					<div class="header">
						Clan Dashboard
					</div>
					<div class="content">
						<table class="clan-war-table" style="width:100%">	
							<tr>
								<td>Clan Name</td>
								<td>Members</td>
								<td>Role</td>
							</tr>
							<tr>
								<td>[AGK] AgarKings</td>
								<td>
									5/25
								</td> 
								<td>
									Leader
								</td> 
							</tr>
						</table>
						<div class="padding-8px">
							<button id="clan_management" class="blue pop">Manage Clan</button>
						</div>
						<!-- If user is not already in a clan -->
						<div class="io-col-30">
							<div class="padding-8px">
								<input type="text" maxlength="3" placeholder="Tag">
							</div>
						</div>
						<div class="io-col-70">
							<div class="padding-8px">
								<input type="text" maxlength="20" placeholder="Clan Name">
							</div>
						</div>
						<div class="padding-8px">
							<button class="blue pop">Create Clan ( 100 Points )</button>
						</div>
					</div>
				</div>
			</div>
			<div class="io-col-33 io-col">
				<div class="box-dark">
					<div class="header">
						Servers List
					</div>
					<div class="content">
						<div id="servers-list" class="servers-list">
							<table class="clan-war-table" style="width:100%">
								<tr>
									<td>Free For All #1</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Free For All #2</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Free For All #3</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Team Mode #1</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Team Mode #2</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Instant Merge #1</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Instant Merge #2</td>
									<td>
										0/50
									</td> 
								</tr>
								<tr>
									<td>Ultra Splits #1</td>
									<td>
										0/50
									</td> 
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="box-dark">
					<div class="header">
						Clan Dashboard
					</div>
					<div class="content">
						<div class="padding-8px">
							<button class="default pop">Disband Clan</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--- Shop Menu Pop up --->
		<div class="popup dark" id="shop_home">
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Shop Menu</div>
			<div class="main-container">
				<div class="content">
					<div class="io-col-33 io-col">
						<div id="open_skins" class="shop-category skins">
							<div class="category-name">
								<div class="c">Buy Skins</div>
							</div>
						</div>
					</div>
					<div class="io-col-33 io-col">
						<div id="buy_bots" class="shop-category bots">
							<div class="category-name">
								<div class="c">Bot Packages</div>
							</div>
						</div>
					</div>
					<div class="io-col-33 io-col">
						<div id="open_leaderboard" class="shop-category coming-soon">
							<div class="category-name">
								<div class="c">Leaderboard Colors</div>
							</div>
						</div>
					</div>
					<div class="io-col-33 io-col">
						<div class="shop-category xp">
							<div class="category-name">
								<div class="c">XP Boost</div>
							</div>
						</div>
					</div>
					<div class="io-col-33 io-col">
						<div class="shop-category coming-soon">
							<div class="category-name">
								<div class="c">Mass Boost</div>
							</div>
						</div>
					</div>
					<div class="io-col-33 io-col">
						<div class="shop-category coins">
							<div class="category-name">
								<div class="c">Get Coins</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--- Owned Skins Popup --->
		<div class="popup dark" id="owned_skins">
			<button class="backUI pop"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Change your Skin</div>
			<div class="main-container">
				<div class="content skin-content">
					<div class="skin-container">
						<div id="my_skins_list"></div>
					</div>
				</div>
			</div>
		</div>
		<!--- Shop Skins Pop up --->
		<div class="popup dark" id="shop_skins">
			<button class="backUI pop"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Skins Shop</div>
			<div class="main-container">
				<div class="content skin-content">
					<div class="skin-container">
						<div id="skins_list"></div>
					</div>
				</div>
				<div class="coin-container">
					<div class="content">
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-coins">
									<span class="coins-amount">0</span> Coins <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-points">
									0 Points <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--- Bots Shop Pop up --->
		<div class="popup dark" id="bot_packages">
			<button class="backUI pop"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Bots Packages</div>
			<div class="main-container">
				<div class="content skin-content">
					<div class="skin-container">
						<div id="bot-sales"></div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">15 Bots for 25 Minutes</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">2000 Coins</button> <button class="purchaseThis">Buy Now</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">25 Bots for 25 Minutes</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">3000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">25 Bots for 2 Hours</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">6000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">50 Bots for 1 Hour</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">10,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">75 Bots for 1 Hour</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">12,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">75 Bots for 2 Hours</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">15,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">100 Bots for 2 Hours</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">100 Bots for 4 Hours</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">34,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle">100 Bots for 12 Hours</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">50,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
					</div>
				</div>
				<div class="coin-container">
					<div class="content">
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-coins">
									<span class="coins-amount">0</span> Coins <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-points">
									0 Points <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--- Bots Shop Pop up --->
		<div class="popup dark" id="leaderboard_colors">
			<button class="backUI pop"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Leaderboard Colors</div>
			<div class="main-container">
				<div class="content skin-content">
					<div class="skin-container">
						<div id="bot-sales"></div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="red">Red</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="orange">Orange</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="pink">Pink</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="blue">Blue</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="green">Green</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">20,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="rainbow">Rainbow</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">50,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="red-shdw">Red Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">30,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="orange-shdw">Orange Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">30,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="pink-shdw">Pink Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">30,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="blue-shdw">Blue Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">30,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="green-shdw">Green Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">30,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
						<div class="skin-holder shop-list">
							<div class="io-col-70 text-align-left"><div class="shopTitle"><span class="rainbow-shdw">Rainbow Glowing</span> Leaderboard Name</div></div>
							<div class="io-col-30 text-align-right"><button class="pricing">80,000 Coins</button> <button class="purchaseCant">Can't Afford</button></div>
						</div>
					</div>
				</div>
				<div class="coin-container">
					<div class="content">
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-coins">
									<span class="coins-amount">0</span> Coins <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
						<div class="io-col-50">
							<div class="padding-8px">
								<div class="my-points">
									0 Points <button class="getmore"><i class="fa fa-plus" aria-hidden="true"></i></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--- Clan Management Popup --->
		<div class="popup dark" id="clan_manager">
			<button class="closeUI pop"><i class="fa fa-times" aria-hidden="true"></i></button>
			<div class="header">Clan Management <small>(beta)</small></div>
			<div class="main-container">
				<div class="content skin-content">
					<table class="clan-war-table" style="width:100%">	
						<tr>
							<td><center><label for="joining">Members use clan logo skin</label></center></td>
							<td>
								<center>
									<label class="switch">
										<input class="pop clan-joining" id="joining" type="checkbox">
										<span class="slider round"></span>
									</label>
								</center>
							</td>
						</tr>
						<tr>
							<td><center><label for="invite-only">Invite Only</label></center></td>
							<td>
								<center>
									<label class="switch">
										<input class="pop clan-invite" id="invite-only" type="checkbox">
										<span class="slider round"></span>
									</label>
								</center>
							</td>
						</tr>
					</table>
					<div class="clans-list">
						<table class="clan-war-table" style="width:100%">
							<tr>
								<td>Username</td>
								<td>Role</td>
								<td>Actions</td>
							</tr>
							<tr>
								<td>Ralph</td>
								<td>
									Leader
								</td> 
								<td>
									No Actions
								</td> 
							</tr>
							<tr>
								<td>Lefela4</td>
								<td>
									Member
								</td> 
								<td>
									<button class="default small inline">Kick User</button> <button class="green small inline">Promote User</button>
								</td> 
							</tr>
							<tr>
								<td>Kushy</td>
								<td>
									Member
								</td> 
								<td>
									<button class="default small inline">Kick User</button> <button class="green small inline">Promote User</button>
								</td> 
							</tr>
						</table>
					</div>
				</div>
				<div class="coin-container">
					<div class="content">
						<div class="io-col-50">
							<div class="padding-8px">
								<button class="green">Save Settings</button>
							</div>
						</div>
						<div class="io-col-50">
							<div class="padding-8px">
								<button class="default">Disband Clan</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<canvas id="canvas"></canvas>
		
		<div id="leaderboard-wrapper">
			<h2>Leaderboard</h2>
			<div id="leaderboard-detail"></div>
		</div>
		<div id="chat">
			<div class="chat-content">
				<div class="chat-messages">
				</div>
			</div>
		<input id="chat_textbox" maxlength="200" placeholder="Press enter to chat...">
		</div>
		
	</body>
	
</html>