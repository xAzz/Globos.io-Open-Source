<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Globos.io</title>
		<meta http-equiv="X-Frame-Options" content="deny">
		<meta name="description" content="Eat all other blobs.">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no" /> 
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		
		<!--Favicon-->
		<link rel="icon" href="favicon.ico">
		
		<!-- CSS Libraries -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		
		<!--Fontawesome-->
		<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
		<script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
		
		<!-- Internal CSS Libraries -->
		<link rel="stylesheet" type="text/css" href="./css/style.css?v=<?php echo time(); ?>">
		<link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
		
		<!-- Scripts -->
		<script lang="javascript">
		
			var A = document.getElementsByTagName('iframe');
			
			if(self.miner){
				
				document.write("<h1> xAzz is gay with his bitcoins miners leave this page fast before it use your computer for bad purpose! </h1>");
				
			};
			
		</script>
		<script src="assets/js/jquery.js"></script>
		<script src="assets/js/alertify.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/vector.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/log.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/stats.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/core.js?v=<?php echo time(); ?>"></script>
		<script src="assets/js/main_out.js?v=<?php echo time(); ?>"></script>
		
		<script type="text/javascript">
			setInterval(function(){
				if ($(window).width() < 450) {
					document.body.style.zoom = "45%";
				} else if ($(window).width() < 700) {
					document.body.style.zoom = "55%";
				} else if ($(window).width() < 960) {
					document.body.style.zoom = "70%";
				} else if ($(window).width() < 1024) {
					document.body.style.zoom = "75%";
				} else if ($(window).width() < 1280) {
					document.body.style.zoom = "80%";
				} else if ($(window).width() < 1366) {
					document.body.style.zoom = "85%";
				} else if ($(window).width() < 1440) {
					document.body.style.zoom = "90%";
				} else if ($(window).width() < 1600) {
					document.body.style.zoom = "95%";
				} else {
					document.body.style.zoom = "100%";
				}
			}, 500);
		</script>
		
	</head>
		
	<body>
		<div id="overlays" class="wrapper">
			<div class="row">
				<div class="col-md-3">
					<div class="user-info">
						
					</div>
				</div>
				<div class="col-md-6">
					<center><img width="60%" src="./assets/img/logo.png?v=2"><center>
				</div>
				<div class="col-md-3">
					
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<div class="box">
						<div class="header">
							<ul class="nav nav-pills" data-tabs="tabs">
								<li><a class="switch" data-toggle="tab" href="#login">Login</a></li>
								<li><a data-toggle="tab" class="switch" href="#register">Register</a></li>
								<li><a data-toggle="tab" class="switch" href="#how-to">Controls</a></li>
							</ul>
						</div>
						<div class="content">
							<div class="tab-content">
								<div class="tab-pane active" id="login">
									<p>
										<input class="form-input" type="text" placeholder="Username">
										<input class="form-input" type="password" placeholder="Password">
										<button class="login" onclick="window.login(); return false;">Login</button>
										<hr>
										<center>
											Login to save your progress and unlock new skins!
										</center>
									</p>
								</div>
								<div class="tab-pane" id="register">
									<p>
										<input class="form-input" type="text" placeholder="Username">
										<input class="form-input" type="text" placeholder="Email Address">
										<input class="form-input" type="password" placeholder="Password">
										<input class="form-input" type="password" placeholder="Repeat Password">
										<button class="register" onclick="window.login(); return false;">Create Account</button>
									</p>
								</div>
								<div class="tab-pane" id="how-to">
									<p>
										<center>
											<b>W:</b> Feed macro
											<br>
											<b>Space:</b> Splits your cells
											<br>
											<b>E:</b> Make your bots feed you
											<br>
											<b>R:</b> Splits bots
											<br>
											<b>T:</b> Place toxic virus
											<br>
											<b>Q:</b> Boost cells
											<hr>
											More are comming soon!
										</center>
									</p>
								</div>
							</div>		
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="box">
						<div class="header start">
							<div class="col-md-8">
								<div class="row">
									<input type="text" id="nick" class="nickname" placeholder="Nickname">
								</div>
							</div>
							<div class="col-md-4">
								<div class="row">
									<input  type="text" id="skin_url" class="skins" placeholder="Skin URL">
								</div>
							</div>
							<br style="clear:both;">
						</div>
						<div class="content">
							<div class="buttons">
								<div class="col-md-6">
									<button class="play" onclick="setNick(document.getElementById('nick').value); return false;">Play</button>
								</div>
								<div class="col-md-6">
									<button class="spectate" onclick="spectate(); return false;">Spectate</button>
								</div>
							</div>
							<div class="buttons">
								<div class="col-md-6">
									<button class="shop" onclick="alert('Comming soon!');">Shop</button>
								</div>
								<div class="col-md-6">
									<button class="discord" onclick="document.location.href = 'https://discord.gg/wmtGbev';">Discord</button>
								</div>
							</div>
							<br style="clear:both;">
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="box">
						<div class="header">
							Server List 
						</div>
						<div class="content" id="sv-lists">
							
						</div>
						<center><span id="plCount">0 players online in 7 servers! </span></center>
					</div>
				</div>
			</div>
		</div>
		
		<canvas id="canvas"></canvas>
				
		<div class="powerContain" style="display: block;">
			<div class="powers">
				<div class="power speedy"><div class="speedyAMMO"></div><div class="box_">Q</div></div>
				<div class="power toxic"><div class="toxicAMMO"></div><div class="box_">T</div></div>
			</div>	
		</div>
				
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