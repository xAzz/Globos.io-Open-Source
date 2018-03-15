window.servers_total = 7;
window.totalPl = 0;

function getServerStats() {
	window.totalPl = 0; //Reset
	
	///Na servers
	/*
	$.getJSON("http://52.255.61.224:2000/", function(stats) {
		if(!stats) {
			
			$(".status-FFA-1").text("OFFLINE");
			
		}else{

			window.totalPl += parseInt(stats.current_players);
			$(".status-FFA-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
     });
	 
	$.getJSON("http://52.255.61.224:2020/", function(stats) {
		if(!stats) {
			
			$(".status-UltraSplits-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-UltraSplits-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2040/", function(stats) {
		if(!stats) {
			
			$(".status-Crazy-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Crazy-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2030/", function(stats) {
		if(!stats) {
			
			$(".status-Selffeed-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Selffeed-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2050/", function(stats) {
		if(!stats) {
			
			$(".status-Instant-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Instant-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2010/", function(stats) {
		if(!stats) {
			
			$(".status-Bots-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Bots-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2060/", function(stats) {
		if(!stats) {
			
			$(".status-UltraSplits1vs1-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-UltraSplits1vs1-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://52.255.61.224:2070/", function(stats) {
		if(!stats) {
			
			$(".status-Powersups-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Powersups-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });*/
	
	///EU servers
	$.getJSON("http://37.187.138.61:2000/", function(stats) {
		if(!stats) {
			
			$(".status-FFA-1").text("OFFLINE");
			
		}else{

			window.totalPl += parseInt(stats.current_players);
			$(".status-FFA-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
     });
	 
	$.getJSON("http://37.187.138.61:2020/", function(stats) {
		if(!stats) {
			
			$(".status-UltraSplits-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-UltraSplits-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2040/", function(stats) {
		if(!stats) {
			
			$(".status-Crazy-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Crazy-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2030/", function(stats) {
		if(!stats) {
			
			$(".status-Selffeed-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Selffeed-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2050/", function(stats) {
		if(!stats) {
			
			$(".status-Instant-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Instant-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2010/", function(stats) {
		if(!stats) {
			
			$(".status-Bots-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Bots-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2060/", function(stats) {
		if(!stats) {
			
			$(".status-UltraSplits1vs1-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-UltraSplits1vs1-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
	
	$.getJSON("http://37.187.138.61:2070/", function(stats) {
		if(!stats) {
			
			$(".status-Powersups-1").text("OFFLINE");
			
		}else{
			
			window.totalPl += parseInt(stats.current_players);
			$(".status-Powersups-1").text(stats.current_players + " / " + stats.max_players);
			
		};
        
    });
   
};

window.getServerStats = getServerStats;

function cargarServers() {
    var url = './gameservers.json?v=' + Date.now();
    var loadGameservers = function(response) {
        var gameslistdiv = "";
        $.each(response.gameservers, function(region, modes) {
            var regiondiv = "<table class=\"clan-war-table\" style='width:100%'>";
			regiondiv += "<tbody>";
            $.each(modes, function(mode, instances) {
                $.each(instances, function(id, websocket) {
                    var instancediv = "";
                    instancediv += "<tr id=\"" + mode + "\" onclick=\"connector('" + websocket + "', '" + region + "', '" + mode + "', '" + id + "');return false;\">";
                    instancediv += "<td> " + mode + " #" + id + " </td>";
                    instancediv += `<td id="svPlCount" class=\"server-status-players status-${mode}-${id}\" style="float: right;"></td>`;
                    instancediv += "</tr>";
                    regiondiv += instancediv;
                });
            });
			regiondiv += "</tbody>";
            regiondiv += "</table>";
            gameslistdiv += regiondiv;
        });
		$("#servers-list").html("");
        $("#servers-list").append(gameslistdiv);
    };
    $.ajax({
        dataType: "json",
        url: url,
        success: loadGameservers
    });
}

function connector(ip, region, modo, id){
	
    setserver(ip);
	getServerStats();
	
}

window.cargarServers = cargarServers;

setTimeout(function(){

	getServerStats();
	
	$("#loginForm").show();
	$("#stats").hide();
	
}, 500);