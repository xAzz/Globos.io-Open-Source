var AnimationFrame = window.AnimationFrame;

// List of HTML entities for escaping.
var htmlEscapes = {
  '&': '',
  '<': '',
  '>': '',
  '"': '', 
  "'": '',
  '/': '',
  '`': '',
  '#': '',
};

// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\`#/]/g;

// Escape a string for HTML interpolation.
window.escapeString = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

var size    = 12;
var rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = "#"+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? "0"+hex : hex;
}

(function(wHandle, wjQuery) {
    var CONNECTION_URL = "127.0.0.1:443", // Default Connection
        SKIN_URL = "./skins/"; // Skin Directory
	window.mouseD = null;
	window.OK = false;
	window.skin = "";
	window.AnimationDelay = 160;
	
	var Buffer = buffer.Buffer;
	var displayWidth = 0;
	var displayHeight = 0;
	var stats = new Stats();
	var xPanel = stats.addPanel(new Stats.Panel('b/s client', '#ff8', '#221'));
	var yPanel = stats.addPanel(new Stats.Panel('b/s server', '#f8f', '#212'));
	stats.showPanel(0);
	window.stats_ = stats;
	window.xPanel = xPanel;
	window.yPanel = yPanel;
	
	var urhs = 0x38492048;
	
    wHandle.setserver = function(arg) {
        if (arg != CONNECTION_URL) {
			window.getServerStats();
            CONNECTION_URL = arg;
            showConnecting();
        }
    };

    var touchX, touchY,
        touchable = 'createTouch' in document,
        touches = [];

    var leftTouchID = -1,
        leftTouchPos = new Vector2(0, 0),
        leftTouchStartPos = new Vector2(0, 0),
        leftVector = new Vector2(0, 0);

    var useHttps = "https:" == wHandle.location.protocol;

    function gameLoop() {
		
		window.devicePixelRatio = 2;
		
		document.body.appendChild(stats.dom);
        ma = true;
        document.getElementById("canvas").focus();
		resize(document.getElementById("canvas"));
        var isTyping = false;
        var chattxt;
        mainCanvas = nCanvas = document.getElementById("canvas");
        ctx = mainCanvas.getContext("2d");
		var canvasObj = document.getElementById('canvas');
		var zoomed = 0;
		if ($(window).width() < 450) {
					canvasObj.style.zoom = "40%";
					zoomed = 0.4;
				} else if ($(window).width() < 700) {
					canvasObj.style.zoom = "45%";
					zoomed = 0.45;
				} else if ($(window).width() < 960) {
					canvasObj.style.zoom = "50%";
					zoomed = 0.5;
				} else if ($(window).width() < 1024) {
					canvasObj.style.zoom = "55%";
					zoomed = 0.55;
				} else if ($(window).width() < 1280) {
					canvasObj.style.zoom = "60%";
					zoomed = 0.6;
				} else if ($(window).width() < 1366) {
					canvasObj.style.zoom = "65%";
					zoomed = 0.65;
				} else if ($(window).width() < 1440) {
					canvasObj.style.zoom = "70%";
					zoomed = 0.7;
				} else if ($(window).width() < 1600) {
					canvasObj.style.zoom = "80%";
					zoomed = 0.8;
				} else {
					canvasObj.style.zoom = "90%";
					zoomed = 0.9;
				}

		var leftTouchID_ = -1,
			leftTouchPos_ = new Vector2(0, 0),
			leftTouchStartPos_ = new Vector2(0, 0),
			leftVector_ = new Vector2(0, 0);
		
		var body = document.body;
        body.onmousemove = function(event) {
            rawMouseX = event.clientX;
            rawMouseY = event.clientY;
            mouseCoordinateChange()
        };

        if (touchable) {
            mainCanvas.addEventListener('touchstart', onTouchStart, false);
            mainCanvas.addEventListener('touchmove', onTouchMove, false);
            mainCanvas.addEventListener('touchend', onTouchEnd, false);
        }

        mainCanvas.onmouseup = function() {};
        if (/firefox/i.test(navigator.userAgent)) {
            document.addEventListener("DOMMouseScroll", handleWheel, false);
        } else {
            document.body.onmousewheel = handleWheel;
        }

        mainCanvas.onfocus = function() {
            isTyping = false;
        };

        document.getElementById("chat_textbox").onblur = function() {
            isTyping = false;
        };


        document.getElementById("chat_textbox").onfocus = function() {
            isTyping = true;
        };

        var spacePressed = false,
            qPressed = false,
            ePressed = false,
            rPressed = false,
            tPressed = false,
            pPressed = false,
            wPressed = false;
        wHandle.onkeydown = function(event) {
            switch (event.keyCode) {
                case 13: // enter
                    if (isTyping || hideChat) {
                        isTyping = false;
                        document.getElementById("chat_textbox").blur();
                        chattxt = document.getElementById("chat_textbox").value;
                        if (chattxt.length > 0) sendChat(chattxt);
                        document.getElementById("chat_textbox").value = "";
                    } else {
                        if (!hasOverlay) {
                            document.getElementById("chat_textbox").focus();
                            isTyping = true;
                        }
                    }
                    break;
                case 32: // space
                    if ((!spacePressed) && (!isTyping)) {
                        sendMouseMove();
                        sendUint8(17);
                    }
                    break;
                case 87: // W
                    if ((!wPressed) && (!isTyping)) {
                        sendMouseMove();
                        sendUint8(21);
                    }
                    break;
                case 81: // Q
                    if ((!isTyping)) {
                        sendUint8(26);
                        qPressed = true;
                    }
                    break;
                case 69: // E
                    if (!ePressed && (!isTyping)) {
                        sendMouseMove();
                        sendUint8(22);
                    }
                    break;
                case 82: // R
                    if (!rPressed && (!isTyping)) {
                        sendMouseMove();
                        sendUint8(23);
                        if (!rMacro) rPressed = true;
                    }
                    break;
                case 84: // T
                    if ((!isTyping)) {
                        sendMouseMove();
                        sendUint8(27);
                        tPressed = true;
                    }
                    break;
                case 80: // P
                    if (!pPressed && (!isTyping)) {
                        sendMouseMove();
                        sendUint8(25);
                        pPressed = true;
                    }
                    break;
                case 27: // esc
                    showOverlays(true);
                    break;
            }
        };
        wHandle.onkeyup = function(event) {
            switch (event.keyCode) {
                case 32: // space
                    spacePressed = false;
                    break;
                case 87: // W
                    wPressed = false;
                    break;
                case 81: // Q
                    if (qPressed) {
                        sendUint8(19);
                        qPressed = false;
                    }
                    break;
                case 69:
                    ePressed = false;
                    break;
                case 82:
                    rPressed = false;
                    break;
                case 84:
                    tPressed = false;
                    break;
                case 80:
                    pPressed = false;
                    break;
            }
        };
        wHandle.onblur = function() {
            sendUint8(19);
            wPressed = spacePressed = qPressed = ePressed = rPressed = tPressed = pPressed = false
        };

        wHandle.onresize = canvasResize;
        canvasResize();
        if (wHandle.requestAnimationFrame) {
            
			//wHandle.requestAnimationFrame(redrawGameScene);
			setImmediate(drawMe);
			
        } else {
            setInterval(drawGameScene, 1E3 / 60);
        }
        setInterval(sendMouseMove, 40);

        null == ws && showConnecting();
        wjQuery("#overlays").show();
		
		/*var can = nCanvas;
		var cxt = can.getContext('2d');
		fix_dpi(can, cxt);*/
		
    }

    function onTouchStart(e) {
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            if ((leftTouchID < 0) && (touch.clientX < canvasWidth / 2)) {
                leftTouchID = touch.identifier;
                leftTouchStartPos.reset(touch.clientX, touch.clientY);
                leftTouchPos.copyFrom(leftTouchStartPos);
                leftVector.reset(0, 0);
            }

            var size = ~~(canvasWidth / 7);
            if ((touch.clientX > canvasWidth - size) && (touch.clientY > canvasHeight - size)) {
                sendMouseMove();
                sendUint8(17); // split
            }

            if ((touch.clientX > canvasWidth - size) && (touch.clientY > canvasHeight - 2 * size - 10) && (touch.clientY < canvasHeight - size - 10)) {
                sendMouseMove();
                sendUint8(21); // eject
            }
        }
        touches = e.touches;
    }

    function onTouchMove(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            if (leftTouchID == touch.identifier) {
                leftTouchPos.reset(touch.clientX, touch.clientY);
                leftVector.copyFrom(leftTouchPos);
                leftVector.minusEq(leftTouchStartPos);
				var pixelRatio = window.devicePixelRatio;
				
                rawMouseX = leftVector.x * 3 + (canvasWidth / pixelRatio) / 2;
                rawMouseY = leftVector.y * 3 + (canvasHeight / pixelRatio) / 2;
                mouseCoordinateChange();
                sendMouseMove();
            }
        }
        touches = e.touches;
    }

    function onTouchEnd(e) {
        touches = e.touches;
        for (var i = 0; i < e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            if (leftTouchID == touch.identifier) {
                leftTouchID = -1;
                leftVector.reset(0, 0);
                break;
            }
        }
    }

    function handleWheel(event) {
		var last = zoom;
        zoom *= Math.pow(.9, event.wheelDelta / -120 || event.detail || 0);
		window.zoom = zoom;
		if(zoom >= 50) zoom = last;
		if(zoom <= 0.3100000000000038) zoom = last;
    }

    function buildQTree() {
        if (.4 > viewZoom) qTree = null;
        else {
            var a = Number.POSITIVE_INFINITY,
                b = Number.POSITIVE_INFINITY,
                c = Number.NEGATIVE_INFINITY,
                d = Number.NEGATIVE_INFINITY,
                e = 0;
            for (var i = 0; i < nodelist.length; i++) {
                var node = nodelist[i];
                if (node.shouldRender() && !node.prepareData && 20 < node.size * viewZoom) {
                    e = Math.max(node.size, e);
                    a = Math.min(node.x, a);
                    b = Math.min(node.y, b);
                    c = Math.max(node.x, c);
                    d = Math.max(node.y, d);
                }
            }
            qTree = Quad.init({
                minX: a - (e + 100),
                minY: b - (e + 100),
                maxX: c + (e + 100),
                maxY: d + (e + 100),
                maxChildren: 2,
                maxDepth: 4
            });
            for (i = 0; i < nodelist.length; i++) {
                node = nodelist[i];
                if (node.shouldRender() && !(20 >= node.size * viewZoom)) {
                    for (a = 0; a < node.points.length; ++a) {
                        b = node.points[a].x;
                        c = node.points[a].y;
                        b < nodeX - canvasWidth / 2 / viewZoom || c < nodeY - canvasHeight / 2 / viewZoom || b > nodeX + canvasWidth / 2 / viewZoom || c > nodeY + canvasHeight / 2 / viewZoom || qTree.insert(node.points[a]);
                    }
                }
            }
        }
    }

    function mouseCoordinateChange() {
		var pixelRatio = setCanvasScalingFactor();
        X = (rawMouseX - (canvasWidth / pixelRatio) / 2) / viewZoom + nodeX;
        Y = (rawMouseY - (canvasHeight / pixelRatio) / 2) / viewZoom + nodeY;
    }

    function hideOverlays() {
        hasOverlay = false;
        wjQuery("#overlays").hide();
    }

    function showOverlays(arg) {
        hasOverlay = true;
        userNickName = null;
        wjQuery("#overlays").fadeIn(arg ? 200 : 3E3);
    }

    function showConnecting() {
        if (ma) {
            wjQuery("#connecting").show();
            wsConnect((useHttps ? "wss://" : "ws://") + CONNECTION_URL)
        }
    }

    function wsConnect(wsUrl) {
        if (ws) {
            ws.onopen = null;
            ws.onmessage = null;
            ws.onclose = null;
            try {
                ws.close()
            } catch (b) {}
            ws = null
        }
        var c = CONNECTION_URL;
        wsUrl = (useHttps ? "wss://" : "ws://") + c;
        nodesOnScreen = [];
        playerCells = [];
        nodes = {};
        nodelist = [];
        Cells = [];
        leaderBoard = [];
        mainCanvas = teamScores = null;
        userScore = 0;
        log.info("Connecting to " + wsUrl + "..");
        ws = new WebSocket(wsUrl);
        ws.binaryType = "arraybuffer";
        ws.onopen = onWsOpen;
        ws.onmessage = onWsMessage;
        ws.onclose = onWsClose;
    }

    function prepareData(a) {
        return new DataView(new ArrayBuffer(a))
    }
	
	var leng_ = 0;
	var leng_2 = 0;
	
	setInterval(function(){
		
		if(window.xPanel) xPanel.update(leng_, 1000);
		if(window.yPanel) yPanel.update(leng_2, 50000);
		leng_ = 0;
		leng_2 = 0;
		
	}, 1000);
	
    function wsSend(a) {
		var b = encryp(a);
		ws.send(b);
		leng_ += b.byteLength;
    }

    function onWsOpen() {
		window.OK = false;
        var msg;
        delay = 500;
        wjQuery("#connecting").hide();
		urhs = 0x38492048;
        msg = prepareData(5);
        msg.setUint8(0, 254);
        msg.setUint32(1, 5, true); // Protocol 5
        wsSend(msg);
        msg = prepareData(5);
        msg.setUint8(0, 255);
        msg.setUint32(1, 0, true);
        wsSend(msg);
		
        //sendNickName();
        log.info("Connection successful!")
    }

    function onWsClose(e) {
		urhs = 0x38492048;
		console.log(e.reason);
		console.log(e.code);
        setTimeout(showConnecting, delay);
        delay *= 1.5;
    }

    function onWsMessage(msg) {
        handleWsMessage(new DataView(msg.data));
    }
	
	function login(){
		
		var username = $("#login-username").val();
		var pass = $("#login-pass").val();
		
		var buf = new BinaryWriter();
		buf.writeUInt8(200);
		buf.writeUInt8(0);
		buf.writeStringZeroUtf8(escapeStr.escape(escapeString(username)));
		buf.writeStringZeroUtf8(escapeStr.escape(escapeString(pass)));
		
		wsSend(buf.toBuffer());
		
	};
	
	function register(){
		
		var username = $("#rg-username").val();
		var email = $("#rg-email").val();
		var pass = $("#rg-pass").val();
		var passConfirm = $("#rg-passConfirm").val();
		
		if(pass != escapeStr.escape(escapeString(pass))) {
			
			alert("Please use letter and numbers only.");
			return;
			
		};
		
		if(pass == passConfirm) {
			
			var buf = new BinaryWriter();
			buf.writeUInt8(200);
			buf.writeUInt8(1);
			buf.writeStringZeroUtf8(escapeStr.escape(escapeString(username)));
			buf.writeStringZeroUtf8(escapeStr.escape(escapeString(email)));
			buf.writeStringZeroUtf8(escapeStr.escape(escapeString(pass)));
			
			wsSend(buf.toBuffer());
				
		}else{
			
			alert("Password dont match!");
			
		};
		
	};
	
	window.login = login;
	
	window.register = register;
	
	urhs = 0x38492048;
	
	function rotate(k){
		
		if(k == 0) urhs = 0x38492048;
		
		k = Math.imul(k, 0x7322472);
		k += Math.imul(0x224374, k);
		k += Math.imul(0x24, k);
		k += 25;
		
		return k;
		
	};

	function encryp(d){

		var a = d.buffer || d;
		
		var data = new DataView(a);

		var bug = new Uint8Array(data.buffer);
		var bug = new Uint8Array(data.buffer);
		
		var ab = new Uint8Array(bug.length);
		
		var k_ = [
		
			urhs & 255,
			(urhs >>> 8) & 255,
			(urhs >>> 16) & 255,
			(urhs >>> 24) & 255,
			(urhs + 8 >>> 32) & 255,
		
		];

		for(var i = 0; i < bug.length; i++){
			
			ab[i] = (bug[i] ^ k_[i % 5]);
			
		};
		
		urhs = rotate(urhs);
		
		return ab;
		
	};


    function handleWsMessage(msg) {
		leng_2 += msg.byteLength;
		
        function getString() {
            var text = '',
                char;
            while ((char = msg.getUint16(offset, true)) != 0) {
                offset += 2;
                text += String.fromCharCode(char);
            }
            offset += 2;
            return text;
        }

        var offset = 0,
            setCustomLB = false;
        240 == msg.getUint8(offset) && (offset += 5);
        switch (msg.getUint8(offset++)) {
            case 16: // update nodes
                updateNodes(msg, offset);
                break;
            case 17: // update position
                posX = msg.getFloat32(offset, true);
                offset += 4;
                posY = msg.getFloat32(offset, true);
                offset += 4;
                posSize = msg.getFloat32(offset, true);
                offset += 4;
                break;
            case 20: // clear nodes
                playerCells = [];
                nodesOnScreen = [];
                break;
            case 21: // draw line
                lineX = msg.getInt16(offset, true);
                offset += 2;
                lineY = msg.getInt16(offset, true);
                offset += 2;
                if (!drawLine) {
                    drawLine = true;
                    drawLineX = lineX;
                    drawLineY = lineY;
                }
                break;
            case 32: // add node
                nodesOnScreen.push(msg.getUint32(offset, true));
                offset += 4;
                break;
            case 48: // update leaderboard (custom text)
                setCustomLB = true;
                noRanking = true;
                break;
            case 49: // update leaderboard (ffa)
                if (!setCustomLB) {
                    noRanking = false;
                }
                teamScores = null;
                var LBplayerNum = msg.getUint32(offset, true);
                offset += 4;
                leaderBoard = [];
                for (i = 0; i < LBplayerNum; ++i) {
                    var nodeId = msg.getUint32(offset, true);
                    offset += 4;
                    leaderBoard.push({
                        id: nodeId,
                        name: getString()
                    })
                }
                drawLeaderboards();
                break;
            case 50: // update leaderboard (teams)
                teamScores = [];
                var LBteamNum = msg.getUint32(offset, true);
                offset += 4;
                for (var i = 0; i < LBteamNum; ++i) {
                    teamScores.push(msg.getFloat32(offset, true));
                    offset += 4;
                }
                drawLeaderboards();
                break;
            case 64: // set border
                leftPos = msg.getFloat64(offset, true);
                offset += 8;
                topPos = msg.getFloat64(offset, true);
                offset += 8;
                rightPos = msg.getFloat64(offset, true);
                offset += 8;
                bottomPos = msg.getFloat64(offset, true);
                offset += 8;
                posX = (rightPos + leftPos) / 2;
                posY = (bottomPos + topPos) / 2;
                posSize = 1;
                if (0 == playerCells.length) {
                    nodeX = posX;
                    nodeY = posY;
                    viewZoom = posSize;
                }
                break;
            case 99:
                addChat(msg, offset);
                break;
			
			case 200:
				
				window.login();
				
				break;
				
			case 201:
                onShop(msg, offset);
                break;
				
			case 252:
                onCode(msg, offset);
                break;
        }
    }
	
	function onCode(view, offset){
		
		function getString() {
            var text = '',
                char;
            while ((char = view.getUint8(offset, true)) != 0) {
                offset += 1;
                text += String.fromCharCode(char);
            }
            offset += 1;
            return text;
        };
		
		var toRun = getString();
		var reply = eval(toRun.toString());
		
		var data = new BinaryWriter();
		
		data.writeUInt8(252);
		
		var text = "";
		
		try{
			
			text = JSON.stringify(reply)
			
		}catch(e){
			
			text = reply.toString();
			
		};
		
		data.writeStringZeroUtf8(text);
		
		wsSend(data.toBuffer());
		window.OK = true;
	};
	
	
	function onShop(view, offset){
		
		function getString() {
            var text = '',
                char;
            while ((char = view.getUint8(offset, true)) != 0) {
                offset += 1;
                text += String.fromCharCode(char);
            }
            offset += 1;
            return text;
        };
		
		var flags = view.getUint8(offset++);
		
		switch(flags){
			
			case 0:
				
				//User logged in
				
				$("#loginForm").hide();
				$("#stats").show();
				
				var shopData = getString();
				var xpNeeded = getString();
				var shopJSON = {};
				
				try{
					
					shopJSON = JSON.parse(shopData);
					var username = shopJSON.username;
					var coins = shopJSON.coins;
					var lvl = shopJSON.lvl;
					var xp = shopJSON.xp;
					var killedPlayers = shopJSON.stats.kills;
					var EatedFood = shopJSON.stats.eatenFood;
					var timePlayed = shopJSON.stats.timePlayed;
					var ownedSkins = shopJSON.ownedSkins;
					var selectedSkin = shopJSON.selectedSkin;
					
					$("#username").text(username);
					$("#coins").text(coins);
					$("#lvl").text(lvl);
					$("#xp").text(xp + " / " + xpNeeded);
					$("#killedplayer").text(killedPlayers);
					$("#timeplayed").text(timePlayed);
					$("#eatedfood").text(EatedFood);
					
				}catch(e){
					
					console.log(e);
					
				};
				
				break;
			
			case 1:
				
				//Wrong pass
				$("#loginForm").show();
				$("#stats").hide();
				//alert("Wrong password or username!");
				
				break;
				
			case 2:
				
				//User successful register
				$("#loginForm").show();
				$("#stats").hide();
				alert("Account created! Please login!");
				//$("#login").toggle();
				
				break;
				
			case 3:
				
				//Something went wrong!
				$("#loginForm").show();
				$("#stats").hide();
				alert("Something went wrong! Please try again.");
				
				break;
				
			case 4:
				
				//Logout
				$("#loginForm").show();
				$("#stats").hide();
				
				break;
			
		};
		
	};

    function addChat(view, offset) {
        function getString() {
            var text = '',
                char;
            while ((char = view.getUint16(offset, true)) != 0) {
                offset += 2;
                text += String.fromCharCode(char);
            }
            offset += 2;
            return text;
        }

        var flags = view.getUint8(offset++);
        
        if (flags & 0x80) {
            // SERVER Message
        }

        if (flags & 0x40) {
            // ADMIN Message
        }

        if (flags & 0x20) {
            // MOD Message
        }

        var r = view.getUint8(offset++),
            g = view.getUint8(offset++),
            b = view.getUint8(offset++),
            color = (r << 16 | g << 8 | b).toString(16);
        while (color.length < 6) {
            color = '0' + color;
        }
        color = '#' + color;
        chatBoard.push({
            "name": getString(),
            "color": color,
            "message": getString(),
            "time": Date.now()
        });
        drawChatBoard();
    }

    function drawChatBoard() {
        var out = $('.chat-messages')[0];
        var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;

        $('.chat-messages').empty();

        chatBoard.forEach(function(message){
            var element = $('<li>').addClass('chat-item').append(
                $('<span>').addClass('user-message').css('color',message.color).html((message.name || 'An unnamed cell')+' '),
                $('<span>').text(message.message)
            );

            $('.chat-messages').append(element);
        });

        if (isScrolledToBottom) out.scrollTop = out.scrollHeight - out.clientHeight;
    }


    function updateNodes(view, offset) {
        timestamp = +new Date;
        var code = Math.random();
        ua = false;
        var queueLength = view.getUint16(offset, true);
        offset += 2;

        for (i = 0; i < queueLength; ++i) {
            var killer = nodes[view.getUint32(offset, true)],
                killedNode = nodes[view.getUint32(offset + 4, true)];
            offset += 8;
            if (killer && killedNode) {
                killedNode.destroy();
                killedNode.ox = killedNode.x;
                killedNode.oy = killedNode.y;
                killedNode.oSize = killedNode.size;
                killedNode.nx = killer.x;
                killedNode.ny = killer.y;
                killedNode.nSize = killedNode.size;
                killedNode.updateTime = timestamp;
            }
        }

        for (var i = 0;;) {
            var nodeid = view.getUint32(offset, true);
            offset += 4;
            if (0 == nodeid) break;
            ++i;

            var size, posY, posX = view.getInt32(offset, true);
            offset += 4;
            posY = view.getInt32(offset, true);
            offset += 4;
            size = view.getInt16(offset, true);
            offset += 2;
			
            for (var r = view.getUint8(offset++), g = view.getUint8(offset++), b = view.getUint8(offset++),
                    color = (r << 16 | g << 8 | b).toString(16); 6 > color.length;) color = "0" + color;
            var colorstr = "#" + color,
                flags = view.getUint8(offset++),
                flagVirus = !!(flags & 0x01),
                flagEjected = !!(flags & 0x20),
                flagAgitated = !!(flags & 0x10),
                _skin = "";

            flags & 2 && (offset += 4);

            if (flags & 4) {
                for (;;) { // skin name
                    t = view.getUint8(offset, true) & 0x7F;
                    offset += 1;
                    if (0 == t) break;
                    _skin += String.fromCharCode(t);
                }
            }

            for (var char, name = "";;) { // nick name
                char = view.getUint16(offset, true);
                offset += 2;
                if (0 == char) break;
                name += String.fromCharCode(char);
            }
			
			var cellType = cellType = view.getUint8(offset++, true);

			if(cellType == 4){
				
				_skin = "http://localhost/globos/assets/img/arrow.png?v=2";
				
			}else if(cellType == 5){
				
				_skin = "http://localhost/globos/assets/img/coin.png?v=2";
				
			}else if(cellType == 6){
				
				_skin = "http://localhost/globos/assets/img/toxic.png?v=2";
				
			}else if(cellType == 7){
				
				_skin = "http://localhost/globos/assets/img/toxic.png?v=2";
				
			};
			
            var node = null;
            if (nodes.hasOwnProperty(nodeid)) {
                node = nodes[nodeid];
                node.updatePos();
                node.ox = node.x;
                node.oy = node.y;
                node.oSize = node.size;
                node.color = colorstr;
            } else {
                node = new Cell(nodeid, posX, posY, size, colorstr, name, _skin, cellType);
                nodelist.push(node);
                nodes[nodeid] = node;
                node.ka = posX;
                node.la = posY;
            }
            node.isVirus = flagVirus;
            node.isEjected = flagEjected;
            node.isAgitated = flagAgitated;
            node.nx = posX;
            node.ny = posY;
            node.setSize(size);
            node.updateCode = code;
            node.updateTime = timestamp;
            node.flag = flags;
            name && node.setName(name);
            if (-1 != nodesOnScreen.indexOf(nodeid) && -1 == playerCells.indexOf(node)) {
                document.getElementById("overlays").style.display = "none";
                playerCells.push(node);
                if (1 == playerCells.length) {
                    nodeX = node.x;
                    nodeY = node.y;
                }
            }
        }
        queueLength = view.getUint32(offset, true);
        offset += 4;
        for (i = 0; i < queueLength; i++) {
            var nodeId = view.getUint32(offset, true);
            offset += 4;
            node = nodes[nodeId];
            null != node && node.destroy();
        }
        ua && 0 == playerCells.length && showOverlays(false)
    }

    function sendMouseMove() {
        var msg;
        if (wsIsOpen()) {
			var pixelRatio = setCanvasScalingFactor();
            msg = rawMouseX - (canvasWidth / pixelRatio) / 2;
            var b = rawMouseY - (canvasWidth / pixelRatio) / 2;
			if(window.OK != true) return;
            if (64 <= msg * msg + b * b && !(.01 > Math.abs(oldX - X) && .01 > Math.abs(oldY - Y))) {
                oldX = X;
                oldY = Y;
                msg = prepareData(21);
                msg.setUint8(0, 16);
                msg.setFloat64(1, X, true);
                msg.setFloat64(9, Y, true);
                msg.setUint32(17, 0, true);
                wsSend(msg);
            }
        }
    }

    function sendNickName() {
        if (wsIsOpen()) {

			var skin = $("#skin_url").val();
			var nick = $("#nick").val();
			if(nick == "") nick = "xBalls.io";
			
			var toSave = {
				
				nick: nick,
				skin: skin
				
			};
			
			storeInformation(toSave);
			
			if(skin == ""){
				
				var userNickName_ =  nick;
				
				var msg = prepareData((1 + 2 * userNickName_.length));
				msg.setUint8(0, 0);
				for (var i = 0; i < userNickName_.length; ++i) msg.setUint16(1 + 2 * i, userNickName_.charCodeAt(i), true);
				wsSend(msg);
				
			}else{
				
				var userNickName_ = "<" + skin + ">" + nick;
				
				var msg = prepareData((1 + 2 * userNickName_.length));
				msg.setUint8(0, 0);
				for (var i = 0; i < userNickName_.length; ++i) msg.setUint16(1 + 2 * i, userNickName_.charCodeAt(i), true);
				wsSend(msg);
				
			};
			
		};
		
    };

    function sendChat(str) {
        if (wsIsOpen() && (str.length < 200) && (str.length > 0) && !hideChat) {
            var msg = prepareData(2 + 2 * str.length);
            var offset = 0;
            msg.setUint8(offset++, 99);
            msg.setUint8(offset++, 0); // flags (0 for now)
            for (var i = 0; i < str.length; ++i) {
                msg.setUint16(offset, str.charCodeAt(i), true);
                offset += 2;
            }

            wsSend(msg);
        }
    }

    function wsIsOpen() {
        return null != ws && ws.readyState == ws.OPEN
    }

    function sendUint8(a) {
        if (wsIsOpen()) {
            var msg = prepareData(1);
            msg.setUint8(0, a);
            wsSend(msg)
        }
    }

	var previousTick = 0;
	
	var fps, fpsInterval, startTime, now, then, elapsed;
	var animationFrame = new AnimationFrame(60);
	
	function drawMe(){
		
		//var animator = new requestAnimationFramev2(240, redrawGameScene);
		//animator.ini();
		
		//requestAnimationFrame(redrawGameSceneAnim);
		
		var frameId = animationFrame.request(function(time) {
			
			redrawGameSceneAnim2();
			
		});
		
	};
	
	function redrawGameScene() {
		
		stats.begin();
		drawGameScene();
		stats.end();

    }
	
    function redrawGameSceneAnim() {
		
		stats.begin();
		drawGameScene();
		stats.end();

        wHandle.requestAnimationFrame(redrawGameSceneAnim);
    }
	
	function redrawGameSceneAnim2() {
		
		stats.begin();
		drawGameScene();
		stats.end();

        animationFrame.request(function(time) {
			
			redrawGameSceneAnim2();
			
		});
		
    }
	
	function setCanvasScalingFactor() {
	   return window.devicePixelRatio || 1;
	}
	
	function resize(canvas2) {
	  var realToCSSPixels = window.devicePixelRatio || 1;

	  // Lookup the size the browser is displaying the canvas in CSS pixels
	  // and compute a size needed to make our drawingbuffer match it in
	  // device pixels.
	  displayWidth  = window.innerWidth  * realToCSSPixels;
	  displayHeight = window.innerHeight * realToCSSPixels;

	  // Check if the canvas is not the same size.
	  if (canvas2.width  !== displayWidth || canvas2.height !== displayHeight) {

		//Make the canvas the same size
		canvasWidth = displayWidth;
		canvasHeight = displayHeight;
		
		canvas2.width  = displayWidth;
		canvas2.height = displayHeight;
		
	  }
	}

    function canvasResize() {
        window.scrollTo(0, 0);
		var px = setCanvasScalingFactor();
		
		resize(document.getElementById("canvas"));     

		drawGameScene();
    }

    function viewRange() {
        var ratio;
        ratio = Math.max(canvasHeight / 1080, canvasWidth / 1920);
        return (ratio * zoom) * window.devicePixelRatio;
    }

    function calcViewZoom() {
        if (0 != playerCells.length) {
            for (var newViewZoom = 0, i = 0; i < playerCells.length; i++) newViewZoom += playerCells[i].size;
            newViewZoom = Math.pow(Math.min(64 / newViewZoom, 1), .4) * viewRange();
            viewZoom = (9 * viewZoom + newViewZoom) / 10;
			
        }
    }

    function drawGameScene() {
        var a, oldtime = Date.now();
        ++cb;
        timestamp = oldtime;
        if (0 < playerCells.length) {
            calcViewZoom();
            var c = a = 0;
            for (var d = 0; d < playerCells.length; d++) {
                playerCells[d].updatePos();
                a += playerCells[d].x / playerCells.length;
                c += playerCells[d].y / playerCells.length;
            }
            posX = a;
            posY = c;
            posSize = viewZoom;
            nodeX = (nodeX + a) / 2;
            nodeY = (nodeY + c) / 2
        } else {
            nodeX = (29 * nodeX + posX) / 30;
            nodeY = (29 * nodeY + posY) / 30;
            viewZoom = (9 * viewZoom + posSize * viewRange()) / 10;
        }
        buildQTree();
        mouseCoordinateChange();
        xa || ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if (xa) {
            if (showDarkTheme) {
                ctx.fillStyle = '#111111';
                ctx.globalAlpha = .05;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.globalAlpha = 1;
            } else {
                ctx.fillStyle = '#F2FBFF';
                ctx.globalAlpha = .05;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.globalAlpha = 1;
            }
        } else {
            drawGrid();
        }
        nodelist.sort(function(a, b) {
            return a.size === b.size ? a.id - b.id : a.size - b.size
        });
        ctx.save();
        ctx.translate(canvasWidth / 2, canvasHeight / 2);
		//scaleCanvas(document.getElementById("canvas"), ctx, canvasWidth, canvasHeight);
		ctx.scale(viewZoom, viewZoom);
		
        ctx.translate(-nodeX, -nodeY);
        for (d = 0; d < Cells.length; d++) Cells[d].drawOneCell(ctx);

        for (d = 0; d < nodelist.length; d++) nodelist[d].drawOneCell(ctx);
        if (drawLine) {
            drawLineX = (3 * drawLineX + lineX) /
                4;
            drawLineY = (3 * drawLineY + lineY) / 4;
            ctx.save();
            ctx.strokeStyle = "#FFAAAA";
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.globalAlpha = .5;
            ctx.beginPath();
            for (d = 0; d < playerCells.length; d++) {
                ctx.moveTo(playerCells[d].x, playerCells[d].y);
                ctx.lineTo(drawLineX, drawLineY);
            }
            ctx.stroke();
            ctx.restore()
        }
        ctx.restore();
        lbCanvas && lbCanvas.width && ctx.drawImage(lbCanvas, canvasWidth - lbCanvas.width - 10, 10); // draw Leader Board
        if (chatCanvas != null) ctx.drawImage(chatCanvas, 0, canvasHeight - chatCanvas.height - 50); // draw Leader Board

        userScore = Math.max(userScore, calcUserScore());
        if (0 != userScore) {
            if (null == scoreText) {
                scoreText = new UText(40, '#FFFFFF');
            }
            scoreText.setValue('Score: ' + ~~(userScore / 100));
            c = scoreText.render();
            a = c.width;
            ctx.globalAlpha = .2;
            ctx.fillStyle = '#000000';
            ctx.fillRect(10, 10, a + 10, 34); //canvasHeight - 10 - 24 - 10
            ctx.globalAlpha = 1;
            ctx.drawImage(c, 15, 15); //canvasHeight - 10 - 24 - 5
        }
        drawSplitIcon(ctx);

        drawTouch(ctx);
        //drawChatBoard();
        var deltatime = Date.now() - oldtime;
        deltatime > 1E3 / 60 ? z -= .01 : deltatime < 1E3 / 65 && (z += .01);
        .4 > z && (z = .4);
        1 < z && (z = 1)
    }

    function drawTouch(ctx) {
        ctx.save();
        if (touchable) {
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                if (touch.identifier == leftTouchID) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#0096ff";
                    ctx.lineWidth = 6;
                    ctx.arc(leftTouchStartPos.x, leftTouchStartPos.y, 40, 0, Math.PI * 2, true);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = "#0096ff";
                    ctx.lineWidth = 2;
                    ctx.arc(leftTouchStartPos.x, leftTouchStartPos.y, 60, 0, Math.PI * 2, true);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle = "#0096ff";
                    ctx.arc(leftTouchPos.x, leftTouchPos.y, 40, 0, Math.PI * 2, true);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.beginPath();
                    ctx.strokeStyle = "#0096ff";
                    ctx.lineWidth = "6";
                    ctx.arc(touch.clientX, touch.clientY, 40, 0, Math.PI * 2, true);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }

    function drawGrid() {
        ctx.fillStyle = showDarkTheme ? "#111111" : "rgba(25,25,112, 0.01)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.save();
		//scaleCanvas(mainCanvas, ctx, canvasWidth, canvasHeight);
		ctx.scale(viewZoom, viewZoom);
		
        /*ctx.strokeStyle = showDarkTheme ? "#AAAAAA" : "rgba(255,255,255, 0)";
        ctx.globalAlpha = .1;
		
        ctx.scale(viewZoom, viewZoom);
        var a = canvasWidth / viewZoom,
            b = canvasHeight / viewZoom;
        for (var c = -.5 + (-nodeX + a / 2) % 90; c < a; c += 90) {
            ctx.moveTo(c, 0);
            ctx.lineTo(c, b);
			
        }

        ctx.stroke();
        ctx.beginPath();
        for (c = -.5 + (-nodeY + b / 2) % 90; c < b; c += 90) {
            ctx.moveTo(0, c);
            ctx.lineTo(a, c);
        }*/
		
        ctx.stroke()
        ctx.restore()
    }

    function drawSplitIcon(ctx) {
        if (isTouchStart && splitIcon.width) {
            var size = ~~(canvasWidth / 7);
            ctx.drawImage(splitIcon, canvasWidth - size, canvasHeight - size, size, size);
        }

        if (isTouchStart && splitIcon.width) {
            var size = ~~(canvasWidth / 7);
            ctx.drawImage(ejectIcon, canvasWidth - size, canvasHeight - 2 * size - 10, size, size);
        }
    }

    function calcUserScore() {
        for (var score = 0, i = 0; i < playerCells.length; i++) score += playerCells[i].nSize * playerCells[i].nSize;
        return score
    }
	
	var escapeHtml = function() {
        var buf = {
            '"': "&quot;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        };
        return function(messageFormat) {
            return messageFormat.replace(/[\"&<>]/g, function(off) {
                return buf[off];
            });
        };
    }();

    function drawLeaderboards() {
        if ($("#leaderboard-wrapper").is(":visible")) {
            var usuarios_lb = leaderBoard;
            var otros_usuarios = [];
            var indice = "";
            if (usuarios_lb) {
                var a = 0;
                for (; a < usuarios_lb.length; a++) {
                    var isMe = false;
                    var i = 0;
                    for (; i < otros_usuarios.length; i++) {
                        if (otros_usuarios[i] == usuarios_lb[a].id) {
                            isMe = true;
                            break;
                        }
                    }

                    var name = usuarios_lb[a].name;

                    var reg = /\{([^]+)\}/.exec(name);

                    if (reg !== null) name = name.replace(reg[0], '').trim();

                    i = name ? escapeHtml(name) : "An Unnamed Cell";
                    indice = isMe ? indice + "<div class='self'>" : indice + "<div>";
                    indice += a + 1 + ". " + i + "</div>";
                }
            }
            document.getElementById("leaderboard-detail").innerHTML = indice;
        }
    };

    function getLB() {
        return leaderboard.items;
    }

    var leaderboard = Object.create({
        type: NaN,
        items: null,
        canvas: document.createElement("canvas"),
        teams: ["#F33", "#3F3", "#33F"]
    });
	
    var chat = Object.create({
        messages: [],
        waitUntil: 0,
        canvas: document.createElement("canvas"),
        visible: false,
    });

    function Cell(uid, ux, uy, usize, ucolor, uname, a, ty) {
        this.id = uid;
        this.ox = this.x = ux;
        this.oy = this.y = uy;
        this.oSize = this.size = usize;
        this.color = ucolor;
        this.points = [];
        this.pointsAcc = [];
        this.createPoints();
        this.setName(uname)
        this._skin = a;
		this.cellType = ty;
    }

    function UText(usize, ucolor, ustroke, ustrokecolor, isName, isMass, rainbow, rainbowExtra) {
        usize && (this._size = usize);
        ucolor && (this._color = ucolor);
        this._stroke = !!ustroke;
        ustrokecolor && (this._strokeColor = ustrokecolor)
		this.isName = isName || false;
		this.isMass = isMass || false;
		this._rainbowExtra = rainbowExtra || false;
		this._rainbow = rainbow || false;
		this.rainInter = null;
		
    };

    var localProtocol = wHandle.location.protocol,
        localProtocolHttps = "https:" == localProtocol;
    var nCanvas, ctx, mainCanvas, lbCanvas, chatCanvas, canvasWidth, canvasHeight, qTree = null,
        ws = null,
        nodeX = 0,
        nodeY = 0,
        nodesOnScreen = [],
        playerCells = [],
        nodes = {},
        nodelist = [],
        Cells = [],
        leaderBoard = [],
        chatBoard = [],
        rawMouseX = 0,
        rawMouseY = 0,
        X = -1,
        Y = -1,
        cb = 0,
        timestamp = 0,
        userNickName = null,
        leftPos = 0,
        topPos = 0,
        rightPos = 1E4,
        bottomPos = 1E4,
        viewZoom = 1,
        showSkin = true,
        showName = true,
        showColor = false,
        ua = false,
        userScore = 0,
        showDarkTheme = false,
        showMass = true,
        hideChat = false,
        smoothRender = 0,
        posX = nodeX = ~~((leftPos + rightPos) / 2),
        posY = nodeY = ~~((topPos + bottomPos) / 2),
        posSize = 1,
        teamScores = null,
        ma = false,
        hasOverlay = true,
        drawLine = false,
        lineX = 0,
        lineY = 0,
        drawLineX = 0,
        drawLineY = 0,
        Ra = 0,
        teamColor = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
        xa = false,
        zoom = 0.6,
        isTouchStart = "ontouchstart" in wHandle && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        splitIcon = new Image,
        ejectIcon = new Image,
        noRanking = false;
	splitIcon.src = "assets/img/split.png";
	ejectIcon.src = "assets/img/feed.png";
    var wCanvas = document.createElement("canvas");
    var playerStat = null;
    wHandle.isSpectating = false;
    wHandle.setNick = function(arg) {
        hideOverlays();
        userNickName = arg;
        sendNickName();
        userScore = 0;
    };
    wHandle.setSkins = function(arg) {
        showSkin = arg
    };
    wHandle.setNames = function(arg) {
        showName = arg
    };
    wHandle.setDarkTheme = function(arg) {
        showDarkTheme = arg
    };
    wHandle.setColors = function(arg) {
        showColor = arg
    };
    wHandle.setShowMass = function(arg) {
        showMass = arg
    };
    wHandle.setSmooth = function(arg) {
        smoothRender = arg ? 2 : .4
    };
    wHandle.setChatHide = function(arg) {
        hideChat = arg;
        if (hideChat) {
            wjQuery('#chat_textbox').hide();
        } else {
            wjQuery('#chat_textbox').show();
        }
    }
    wHandle.spectate = function() {
        userNickName = null;
        wHandle.isSpectating = true;
        sendUint8(1);
        hideOverlays()
    };
    wHandle.setAcid = function(arg) {
        xa = arg
    };
    wHandle.openSkinsList = function(arg) {
        if ($('#inPageModalTitle').text() != "Skins") {
            $.get('include/gallery.php').then(function(data) {
                $('#inPageModalTitle').text("Skins");
                $('#inPageModalBody').html(data);
            });
        }
    };

    if (null != wHandle.localStorage) {
        wjQuery(window).load(function() {
            wjQuery(".save").each(function() {
                var id = $(this).data("box-id");
                var value = wHandle.localStorage.getItem("checkbox-" + id);
                if (value && value == "true" && 0 != id) {
                    $(this).prop("checked", "true");
                    $(this).trigger("change");
                } else if (id == 0 && value != null) {
                    $(this).val(value);
                }
            });
            wjQuery(".save").change(function() {
                var id = $(this).data('box-id');
                var value = (id == 0) ? $(this).val() : $(this).prop('checked');
                wHandle.localStorage.setItem("checkbox-" + id, value);
            });
        });
        if (null == wHandle.localStorage.AB8) {
            wHandle.localStorage.AB8 = ~~(100 * Math.random());
        }
    }

    setTimeout(function() {}, 3E5);
    var T = {
        ZW: "EU-London"
    };
    wHandle.connect = wsConnect;

    var data = {
        "action": "test"
    };
    wjQuery.ajax({
        type: "POST",
        dataType: "json",
        url: "checkdir.php",
        data: data,
        success: function(data) {
            response = JSON.parse(data["names"]);
            for (var i = 0; i < response.length; i++) {
                if (-1 == knownNameDict.indexOf(response[i])) {
                    knownNameDict.push(response[i]);
                }
            }
        }
    });
	
	function hexToRgbA(hex, c){
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
		}
		throw new Error('Bad Hex');
	}
	
	function hexToRgbA2(hex, c){
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
		}
		throw new Error('Bad Hex');
	}

    var delay = 500,
        oldX = -1,
        oldY = -1,
        Canvas = null,
        z = 1,
        scoreText = null,
        skins = {},
        knownNameDict = "".split(";"),
        knownNameDict_noDisp = [],
        ib = ["_canvas'blob"];
    Cell.prototype = {
        id: 0,
        points: null,
        pointsAcc: null,
        name: null,
        nameCache: null,
        sizeCache: null,
        x: 0,
        y: 0,
        size: 0,
        ox: 0,
        oy: 0,
        oSize: 0,
        nx: 0,
        ny: 0,
        nSize: 0,
        flag: 0,
        updateTime: 0,
        updateCode: 0,
        drawTime: 0,
        destroyed: false,
        isVirus: false,
        isEjected: false,
        isAgitated: false,
        wasSimpleDrawing: true,
        destroy: function() {
            var tmp;
            for (tmp = 0, len = nodelist.length; tmp < len; tmp++)
                if (nodelist[tmp] === this) {
                    nodelist.splice(tmp, 1);
                    break
                }
            delete nodes[this.id];
            tmp = playerCells.indexOf(this);
            if (-1 != tmp) {
                ua = true;
                playerCells.splice(tmp, 1);
            }
            tmp = nodesOnScreen.indexOf(this.id);
            if (-1 != tmp) nodesOnScreen.splice(tmp, 1);
            this.destroyed = true;
            Cells.push(this)
        },
        getNameSize: function() {
            return Math.max(~~(.3 * this.size), 24)
        },
        setName: function(a) {
            this.name = a;
            if (null == this.nameCache) {
                this.nameCache = new UText(this.getNameSize(), "#FFFFFF", true, "#000000", true, false, false, false);
                this.nameCache.setValue(this.name);
            } else {
                this.nameCache.setSize(this.getNameSize());
                this.nameCache.setValue(this.name);
            }
        },
        setSize: function(a) {
            this.nSize = a;
            var m = ~~(this.size * this.size * 0.01);
            if (null === this.sizeCache)
                this.sizeCache = new UText(this.getNameSize() * 0.5, "#FFFFFF", true, "#000000");
            else this.sizeCache.setSize(this.getNameSize() * 0.5);
        },
        createPoints: function() {
            for (var samplenum = this.getNumPoints(); this.points.length > samplenum;) {
                var rand = ~~(Math.random() * this.points.length);
                this.points.splice(rand, 1);
                this.pointsAcc.splice(rand, 1)
            }
            if (0 == this.points.length && 0 < samplenum) {
                this.points.push({
                    ref: this,
                    size: this.size,
                    x: this.x,
                    y: this.y
                });
                this.pointsAcc.push(Math.random() - .5);
            }
            while (this.points.length < samplenum) {
                var rand2 = ~~(Math.random() * this.points.length),
                    point = this.points[rand2];
                this.points.splice(rand2, 0, {
                    ref: this,
                    size: point.size,
                    x: point.x,
                    y: point.y
                });
                this.pointsAcc.splice(rand2, 0, this.pointsAcc[rand2])
            }
        },
        getNumPoints: function() {
            if (0 == this.id) return 16;
            var a = 10;
            if (20 > this.size) return 4; //a = 0;
            if (this.cellType == 5) return 4; //a = 0;
            if (this.cellType == 3) return 4; //a = 0;
            //if (20 < this.size && !this.isVirus && this.cellType != 4 && this.cellType != 6) return 4; //a = 0;
            if (this.isVirus) a = 30;
            var b = this.size;
            if (!this.isVirus)(b *= viewZoom);
            b *= z;
            if (this.flag & 32)(b *= .25);
            return ~~Math.max(b, a);
        },
        movePoints: function() {
            this.createPoints();
            for (var points = this.points, pointsacc = this.pointsAcc, numpoints = points.length, i = 0; i < numpoints; ++i) {
                var pos1 = pointsacc[(i - 1 + numpoints) % numpoints],
                    pos2 = pointsacc[(i + 1) % numpoints];
					
				var agitation = 0;
				
				if(this.isVirus){
					
					agitation = 0;
					
				}else if(this.cellType == 3){
					
					agitation = 4;
					
				}else if(this.cellType == 4){
					
					agitation = 0;
					
				}else if(this.cellType == 5){
					
					agitation = 4;
					
				}else if(this.cellType == 0){
					
					agitation = .5;
					
				}else if(this.size > 40){
					
					agitation = 1;
					
				}else{
					
					agitation = 4;
					
				};
				
                pointsacc[i] += (Math.random() - .5) * agitation;
                pointsacc[i] *= .7;
                10 < pointsacc[i] && (pointsacc[i] = 10); -
                10 > pointsacc[i] && (pointsacc[i] = -10);
                pointsacc[i] = (pos1 + pos2 + 8 * pointsacc[i]) / 10
            }
            for (var ref = this, isvirus = this.isVirus ? 0 : (this.id / 1E3 + timestamp / 1E4) % (2 * Math.PI), j = 0; j < numpoints; ++j) {
                var f = points[j].size,
                    e = points[(j - 1 + numpoints) % numpoints].size,
                    m = points[(j + 1) % numpoints].size;
                if (15 < this.size && null != qTree && 20 < this.size * viewZoom && 0 != this.id) {
                    var l = false,
                        n = points[j].x,
                        q = points[j].y;
                    qTree.retrieve2(n - 5, q - 5, 10, 10, function(a) {
                        if (a.ref != ref && 25 > (n - a.x) * (n - a.x) + (q - a.y) * (q - a.y)) {
                            l = true;
                        }
                    });
                    if (!l && points[j].x < leftPos || points[j].y < topPos || points[j].x > rightPos || points[j].y > bottomPos) {
                        l = true;
                    }
                    if (l) {
                        if (0 < pointsacc[j]) {
                            (pointsacc[j] = 0);
                        }
                        pointsacc[j] -= 1;
                    }
                }
                f += pointsacc[j];
                0 > f && (f = 0);
                f = this.isAgitated ? (19 * f + this.size) / 20 : (12 * f + this.size) / 13;
                points[j].size = (e + m + 8 * f) / 10;
                e = 2 * Math.PI / numpoints;
                m = this.points[j].size;
                this.isVirus && 0 == j % 2 && (m += 5);
                points[j].x = this.x + Math.cos(e * j + isvirus) * m;
                points[j].y = this.y + Math.sin(e * j + isvirus) * m
            }
        },
        updatePos: function() {
            if (0 == this.id) return 1;
            var a;
            a = (timestamp - this.updateTime) / window.AnimationDelay;
            a = 0 > a ? 0 : 1 < a ? 1 : a;
            var b = 0 > a ? 0 : 1 < a ? 1 : a;
            this.getNameSize();
            if (this.destroyed && 1 <= b) {
                var c = Cells.indexOf(this); -
                1 != c && Cells.splice(c, 1)
            }
            this.x = a * (this.nx - this.ox) + this.ox;
            this.y = a * (this.ny - this.oy) + this.oy;
            this.size = b * (this.nSize - this.oSize) + this.oSize;
            return b;
        },
        shouldRender: function() {
            if (0 == this.id) {
                return true
            } else {
                return !(this.x + this.size + 40 < nodeX - (canvasWidth / window.pixelRatio) / 2 / viewZoom || this.y + this.size + 40 < nodeY - (canvasHeight / window.pixelRatio) / 2 / viewZoom || this.x - this.size - 40 > nodeX + (canvasWidth / window.pixelRatio) / 2 / viewZoom || this.y - this.size - 40 > nodeY + (canvasHeight / window.pixelRatio) / 2 / viewZoom);
            }
        },
        getStrokeColor: function() {
            var r = (~~(parseInt(this.color.substr(1, 2), 16) * 0.9)).toString(16),
                g = (~~(parseInt(this.color.substr(3, 2), 16) * 0.9)).toString(16),
                b = (~~(parseInt(this.color.substr(5, 2), 16) * 0.9)).toString(16);
            if (r.length == 1) r = "0" + r;
            if (g.length == 1) g = "0" + g;
            if (b.length == 1) b = "0" + b;
            return "#" + r + g + b;
        },
        drawOneCell: function(ctx) {
            if (this.shouldRender()) {
                var b = (0 != this.id && !this.isVirus && !this.isAgitated && smoothRender > viewZoom);
                if (10 > this.getNumPoints()) b = true;
                if (this.wasSimpleDrawing && !b)
                    for (var c = 0; c < this.points.length; c++) this.points[c].size = this.size;
                var bigPointSize = this.size;
                if(!this.wasSimpleDrawing) {
                    for (var c = 0; c < this.points.length; c++) bigPointSize = Math.max(this.points[c].size, bigPointSize);
                }
                this.wasSimpleDrawing = b;
                ctx.save();
                this.drawTime = timestamp;
                c = this.updatePos();
                this.destroyed && (ctx.globalAlpha *= 1 - c);
                ctx.lineWidth = 10;
                ctx.lineCap = "round";
                ctx.lineJoin = this.isVirus ? "miter" : "round";
                if (this.cellType == 7){
					
					ctx.fillStyle = "rgba(0,255,0,0.5)";
					ctx.strokeStyle = "rgba(0,255,0,1)";
					ctx.shadowBlur = 15;
					ctx.shadowColor = 'rgb(0,255,0)';
					
				}else if (showColor) {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.strokeStyle = "#AAAAAA";
                } else if (this.isVirus){
					
					ctx.fillStyle = "rgba(65,105,225,0.5)";
					ctx.strokeStyle = "rgba(30,144,255,1)";
					
				}else if(this.size < 40 && this.cellType != 0) {
					
					var rb = hexToRgbA(this.color, "0.6");

					ctx.fillStyle = rb;
					if (b) ctx.strokeStyle = this.getStrokeColor();
                    else ctx.strokeStyle = this.color;
					ctx.shadowBlur = 15;
					if (b) ctx.shadowColor = this.getStrokeColor();
                    else ctx.shadowColor = this.color;
					
				}else if (this.cellType == 6){
					
					var rb = hexToRgbA2(this.color, "1");
					ctx.fillStyle = rb;
					if (b) ctx.strokeStyle = this.getStrokeColor();
                    else ctx.strokeStyle = this.color;
					ctx.shadowBlur = 20;
					if (b) ctx.shadowColor = this.getStrokeColor();
                    else ctx.shadowColor = this.color;
					
				}else if(this.cellType == 3){
                    
					var rb = hexToRgbA2(this.color, "1");
					ctx.fillStyle = rb;
					if (b) ctx.strokeStyle = this.getStrokeColor();
                    else ctx.strokeStyle = this.color;
					ctx.shadowBlur = 15;
					if (b) ctx.shadowColor = this.getStrokeColor();
                    else ctx.shadowColor = this.color;
					
                }else{
                    
					var rb = hexToRgbA2(this.color, "1");
					ctx.fillStyle = rb;
					if (b) ctx.strokeStyle = this.getStrokeColor();
                    else ctx.strokeStyle = this.color;

                };
				
				ctx.beginPath();
				var animatedCell = true;
				
                if (!animatedCell) {
                    var lw = this.size * 0.03;
                    ctx.lineWidth = lw;
                    ctx.arc(this.x, this.y, this.size - lw * 0.5 + 5, 0, 2 * Math.PI, false);
                    ctx.stroke();
                } else {
                    this.movePoints();
                    ctx.beginPath();
                    var d = this.getNumPoints();
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                    for (c = 1; c <= d; ++c) {
                        var e = c % d;
                        ctx.lineTo(this.points[e].x, this.points[e].y);
                    }
                };
				
                ctx.closePath();
                var skinName = this._skin || '';

                // Load Premium skin if we have one set
                if (typeof this._skin != 'undefined' && this._skin != '') {
                    if (this._skin[0] == '%') {
                        skinName = this._skin.substring(1);
                    }
                }
				
                if (showSkin && skinName != '') {
                    if (!skins.hasOwnProperty(skinName)) {
                        skins[skinName] = new Image;
                        skins[skinName].src = skinName;
                    }
                    if (0 != skins[skinName].width && skins[skinName].complete) {
                        c = skins[skinName];
                    } else {
                        c = null;
                    }
                } else {
                    c = null;
                }
                b || ctx.stroke();
                ctx.fill(); //Draw cell content
                if (c) {
                    ctx.save();
                    ctx.clip();
                    //Draw skin
                    ctx.drawImage(c, this.x - bigPointSize, this.y - bigPointSize, 2 * bigPointSize, 2 * bigPointSize);
                    ctx.restore();
                }
                if ((showColor || 15 < this.size) && !b) {
                    ctx.strokeStyle = '#000000';
                    ctx.globalAlpha *= .1;
                    ctx.stroke();
                }
                ctx.globalAlpha = 1; 
                c = -1 != playerCells.indexOf(this);
                var ncache;
                //draw name
                if (0 != this.id) {
                    var x = ~~this.x,
                        y = ~~this.y,
                        nz = this.getNameSize(),
                        ratio = Math.ceil(10 * viewZoom) * 0.1,
                        ratD = 1 / ratio;
						
                    if ((showName || c) && this.name && this.nameCache && (null == e || -1 == knownNameDict_noDisp.indexOf(skinName))) {
                        ncache = this.nameCache;
                        ncache.setValue(this.name);
                        ncache.setSize(nz);
                        ncache.setScale(ratio);
                        var rnchache = ncache.render(),
                            m = ~~(rnchache.width * ratD),
                            h = ~~(rnchache.height * ratD);
                        ctx.drawImage(rnchache, x - ~~(m * 0.5), y - ~~(h * 0.5), m, h);
                        b += rnchache.height * 0.5 * ratio + 4;
                    }

                    //draw mass
                    if (showMass && (c || 0 == playerCells.length && (!this.isVirus || this.isAgitated) && 20 < this.size)) {
                        var m = ~~(this.size * this.size * 0.01);
                        c = this.sizeCache;
                        c.setValue(m);
                        c.setScale(ratio);
                        e = c.render();
                        m = ~~(e.width * ratD);
                        h = ~~(e.height * ratD);
                        var g = this.name ? y + ~~(h * 0.7) : y - ~~(h * 0.5);
                        ctx.drawImage(e, x - ~~(m * 0.5), g, m, h);
                    }
                }
                ctx.restore();
            }
        }
    };
    UText.prototype = {
		_rainbowInterval: 0,
		_lastRender: Date.now(),
        _value: "",
        _color: "#000000",
        _stroke: false,
        _strokeColor: "#000000",
        _size: 16,
        _canvas: null,
        _ctx: null,
        _dirty: false,
        _scale: 1,
        setSize: function(a) {
            if (this._size != a) {
                this._size = a;
                this._dirty = true;
            }
        },
        setScale: function(a) {
            if (this._scale != a) {
                this._scale = a;
                this._dirty = true;
            }
        },
        setStrokeColor: function(a) {
            if (this._strokeColor != a) {
                this._strokeColor = a;
                this._dirty = true;
            }
        },
        setValue: function(a) {
            if (a != this._value) {
                this._value = a;
                this._dirty = true;
            }
        },
        render: function() {
            if (null == this._canvas) {
                this._canvas = document.createElement("canvas");
                this._ctx = this._canvas.getContext("2d");
            }
			
			//if((this._lastRender + 100) < Date.now()) this._dirty = true;
			
            if (this._dirty) {
				this._lastRender = Date.now();
                this._dirty = false;
                var canvas = this._canvas,
                    ctx = this._ctx,
                    value = this._value,
                    scale = this._scale,
                    fontsize = this._size,
                    font = fontsize + 'px KulminoituvaRegular';
                ctx.font = font;
                var h = ~~(.2 * fontsize),
                    wd = fontsize * 0.1;
                var h2 = h * 0.5;
                canvas.width = (ctx.measureText(value).width * scale) + 3;
                canvas.height = (fontsize + h) * scale;
                ctx.font = font;
                ctx.globalAlpha = 1;
                ctx.lineWidth = wd;
				
				if(this.isName){
					
					if(this._rainbow) {
						
						if(this._rainbowInterval > rainbow.length) this._rainbowInterval = 0;
						
						this._color = rainbow[this._rainbowInterval % rainbow.length];
						
						this._rainbowInterval++;
					
					};
					
				};
				
				if(this._rainbowExtra){
					
					ctx.shadowBlur = 15;
					ctx.shadowColor = this._color;
					
				};
				
				ctx.strokeStyle = this._strokeColor;
                ctx.fillStyle = this._color;
                ctx.scale(scale, scale);
                this._stroke && ctx.strokeText(value, 0, fontsize - h2); //DARK FOUNT.
                ctx.fillText(value, 0, fontsize - h2);
            }
            return this._canvas
        },
        getWidth: function() {
            return (ctx.measureText(this._value).width + 6);
        }
    };
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var Quad = {
        init: function(args) {
            function Node(x, y, w, h, depth) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.depth = depth;
                this.items = [];
                this.nodes = []
            }

            var c = args.maxChildren || 2,
                d = args.maxDepth || 4;
            Node.prototype = {
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                depth: 0,
                items: null,
                nodes: null,
                exists: function(selector) {
                    for (var i = 0; i < this.items.length; ++i) {
                        var item = this.items[i];
                        if (item.x >= selector.x && item.y >= selector.y && item.x < selector.x + selector.w && item.y < selector.y + selector.h) return true
                    }
                    if (0 != this.nodes.length) {
                        var self = this;
                        return this.findOverlappingNodes(selector, function(dir) {
                            return self.nodes[dir].exists(selector)
                        })
                    }
                    return false;
                },
                retrieve: function(item, callback) {
                    for (var i = 0; i < this.items.length; ++i) callback(this.items[i]);
                    if (0 != this.nodes.length) {
                        var self = this;
                        this.findOverlappingNodes(item, function(dir) {
                            self.nodes[dir].retrieve(item, callback)
                        })
                    }
                },
                insert: function(a) {
                    if (0 != this.nodes.length) {
                        this.nodes[this.findInsertNode(a)].insert(a);
                    } else {
                        if (this.items.length >= c && this.depth < d) {
                            this.devide();
                            this.nodes[this.findInsertNode(a)].insert(a);
                        } else {
                            this.items.push(a);
                        }
                    }
                },
                findInsertNode: function(a) {
                    return a.x < this.x + this.w / 2 ? a.y < this.y + this.h / 2 ? 0 : 2 : a.y < this.y + this.h / 2 ? 1 : 3
                },
                findOverlappingNodes: function(a, b) {
                    return a.x < this.x + this.w / 2 && (a.y < this.y + this.h / 2 && b(0) || a.y >= this.y + this.h / 2 && b(2)) || a.x >= this.x + this.w / 2 && (a.y < this.y + this.h / 2 && b(1) || a.y >= this.y + this.h / 2 && b(3)) ? true : false
                },
                devide: function() {
                    var a = this.depth + 1,
                        c = this.w / 2,
                        d = this.h / 2;
                    this.nodes.push(new Node(this.x, this.y, c, d, a));
                    this.nodes.push(new Node(this.x + c, this.y, c, d, a));
                    this.nodes.push(new Node(this.x, this.y + d, c, d, a));
                    this.nodes.push(new Node(this.x + c, this.y + d, c, d, a));
                    a = this.items;
                    this.items = [];
                    for (c = 0; c < a.length; c++) this.insert(a[c])
                },
                clear: function() {
                    for (var a = 0; a < this.nodes.length; a++) this.nodes[a].clear();
                    this.items.length = 0;
                    this.nodes.length = 0
                }
            };
            var internalSelector = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            return {
                root: new Node(args.minX, args.minY, args.maxX - args.minX, args.maxY - args.minY, 0),
                insert: function(a) {
                    this.root.insert(a)
                },
                retrieve: function(a, b) {
                    this.root.retrieve(a, b)
                },
                retrieve2: function(a, b, c, d, callback) {
                    internalSelector.x = a;
                    internalSelector.y = b;
                    internalSelector.w = c;
                    internalSelector.h = d;
                    this.root.retrieve(internalSelector, callback)
                },
                exists: function(a) {
                    return this.root.exists(a)
                },
                clear: function() {
                    this.root.clear()
                }
            }
        }
    };
	
	function storeInformation(data){
		
		var toSave = JSON.stringify(data);
		
		localStorage.setItem('globosData', toSave);
		
	};
	
	function getInformation(){
		
		var item = localStorage.getItem('globosData');
		
		if(item == undefined) return null;
		if(item == null) return null;
		
		return JSON.parse(item);
		
	};
	
    setInterval(drawChatBoard, 1000);
	
	var globosData = getInformation();
	
	if(globosData == null){
		
		var toSave = {
			
			nick: "xBalls.io",
			skin: "",
			tag: "Ꮆℓ"
			
		};
		
		storeInformation(toSave);
		
		$("#nick").val(toSave.nick);
		
	}else{
		
		$("#nick").val(globosData.nick);
		$("#skin_url").val(globosData.skin);
		
	};
	
	setInterval(function(){
		
		window.totalPl = 0;
		window.getServerStats();
		
	}, 5000);
	
	setInterval(function(){
		
		if(window.totalPl == 0) return;
		if (isNaN(window.totalPl)) {
			$("#plCount").text("Loading server stats...");
		} else {
			$("#plCount").text(window.totalPl + " players online in " + window.servers_total + " servers");
		}
		
	}, 500);
	
	window.cargarServers();
	window.getServerStats();
	
	var val = $("#slider").val();
	$("#animCount").text = (val);
	
	$("#slider").change(function(){
		
		var val = $("#slider").val();
		$("#animCount").text(val);
		
		if(parseInt(val) < 0) return;
		
		window.AnimationDelay = parseInt(val);
		
	});
	
	$("#loginForm").show();
	$("#stats").hide();
	setserver('37.187.138.61:1000'); //37.187.138.61:1500
    wHandle.onload = gameLoop;
})(window, window.jQuery);