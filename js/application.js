jQuery(
   function(){
           alert("start");
	   localStorage.setItem("key0","value0");
           $("#choosePeoplePage").live("pagecreate",function(){
		 var userList = ""
		 var tmpId = ""
		 var num = 1;
		 $.each(users,function(i,val){
		     tmpId = "checkbox-p" + num;
		     userList  += '<li><input type="checkbox" name="userCheckBox" id= ' + tmpId + ' class="custom" value="' +  val.name + '"/><label for=' + tmpId +'>'+ val.name + '</label></li>';
		     num += 1;
		 });
		 $("#listPeople").append(userList);
		//$("#listPeople").listview('refresh');
	   });
	   //doesn't work except orderpage
	   $("#choosePeoplePage").live("pagebeforechange",function(){
	          alert("getUser"); 
		  //      var userName = ["pan","wei"]
		  //localStorage.setItem("n",users);
	          //localStorage.setItem("n",JSON.Stringify("Jack"));//['currentUsers']=JSON.Stringify("userName")
	   });

           $("#chooseRestaurantPage").live("pagecreate",function(){
	         var restaurantList = ""
		 var tmpId = ""
		 $.each(restaurants,function(i,val){
		     tmpId = "checkbox-r" + i;
		     restaurantList  += '<li><input type="checkbox" name="restCheckBox" id= ' + tmpId + ' class="custom" value="' + val.name +'"/><label for=' + tmpId +'>'+ val.name + '</label></li>';
		 });
		 $("#listRestaurant").append(restaurantList);
	         

	   });

	   $("#choosePackagePage").live("pageshow",function(){
		 alert("I am page ChoosePackagePage");
                 var str = ""
		 //str = '<li data-role="fieldcontain"><h2>delicious food - tomatoes</h2><p class="ui-li-aside">3.5 dollar </p><label for="slider"> Slider:</label><input type="range" name="slider2" id="slider" value="1" min="0" max="100" data-highlight="true"></li>'
		 //str = '<li data-role="fieldcontain"><h2>delicious food - tomatoes</h2><p>3RMB</p><input type="number" name="number" id="numberPattern" value="1" class="ui-li-aside" ></li>'
		   var curRests = localStorage.getItem("currentRests");
		   if(curRests != null){
		       curRests = eval('('+curRests+')');
		       $.each(curRests,function(i,val){
		          for(var r in foods){
			      if(r == val.name){
			         $.each(foods[r],function(index,pack){
				       var tmpID = "slider-" + index
				       str += '<li data-role="fieldcontain">'
				       str += '<h2>' + pack.name + '</h2>'
				       str += '<p>' + pack.price + 'RMB</p>'
				       str += '<input type="number" id="'+tmpID+'" class="ul-li-aside" value="0" min="0">' 
				       str += '<label for="'+tmpID+'">' + r + '</lable>' 
				       
				 });
			      }
			  }
		       });
		   }
		 $("#listPack").empty();
		 $("#listPack").append(str);
	   });

           $("#orderPage").live("pageshow",function(){
	           
		   var curUsers = localStorage.getItem("currentUsers");
		   var userStr = ""
		   if(curUsers != null){
		       curUsers = eval('('+curUsers+')');
		       $.each(curUsers,function(i,val){
		         userStr += val.name + '  ';
		       });
		   }
                   $("#people").val(userStr);


		   var curRests = localStorage.getItem("currentRests");
		   var restStr = ""
		   if(curRests != null){
		       curRests = eval('('+curRests+')');
		       $.each(curRests,function(i,val){
		          restStr += val.name + '  ';
		       });
		   }
		   $("#restaurant").val(restStr);

		   var curPacks = localStorage.getItem("currentPacks");
		   var packStr = ""
		   if(curPacks != null){
		       curPacks = eval('('+curPacks+')');
		       curPacks = $.grep(curPacks,function(n,i){
		              return (n.number > 0)
		       })
		       $.each(curPacks,function(i,val){
		          packStr += ''+ val.packName + '('+ val.number+ ')  '+'  ';
		       });
		   }
		   $("#package").val(packStr);
		   
	   });

	   $("#orderDetailPage").live("pageshow",function(){
	          alert("orderDetail page"); 
		  var ordUserInfo = ""
		  var nordUserInfo = ""
		  var orderDetails = localStorage.getItem("orderDetails");
		  var allSum = 0.0
		  var ordNum = "0"
		  var nordNum = "0"
		  var ordStr = ""
		  var nordStr = ""
		  if( orderDetails != null){
		     orderDetails = eval('('+orderDetails +')');
                     for(var userName in orderDetails){
		         var personSum = 0.0
			 ordStr += '<li><h2>'+ userName + '</h2>'
                         $.each(orderDetails[userName],function(i,val){
			      
			    ordStr += '<p>' + val.restaurant  + '   ' + val.packName +'('+val.number+' packs) </p>'
			    personSum = eval(personSum) + eval(val.number) * eval(val.price) 

		          })		 
			if( eval(personSum)  > eval("12")){
			       priceStr = '<p class="ui-li-aside"> <span>' + personSum +'RMB</span></p>'
	    	        }else{
			       priceStr = '<p class="ui-li-aside">' + personSum +'RMB</p>'
		         }
		         ordNum ++
	    	         ordStr += priceStr
			 ordStr += '</li>'
			 allSum = eval(allSum) + eval(personSum)
		       }
		       $.each(users,function(i,val){
		          var hasOrdered = "N"
                          for(var userName in orderDetails){
			       if( userName == val.name)hasOrdered = "Y"
			  } 
                          if(hasOrdered == "N"){
			      nordStr += '<li><h2>'+ val.name + '</h2></li>'
			      nordNum ++
			  }
		       })
		  }
		  $("#orderDetailsList").empty();
		  $("#orderDetailsList").append('<li data-role="list-divider">'+ordNum +'  user(s) has ordered</li>');
		  $("#orderDetailsList").append(ordStr);
		  $("#orderDetailsList").append('<li data-role="list-divider">'+nordNum +'  user(s) has not ordered</li>');
		  $("#orderDetailsList").append(nordStr);
		  $("#detailsContent").find("span").css('color','red');
		  $("#summary").text(ordNum+' user(s) has ordered; ' + nordNum +' user(s) has not ordered'+';  total expenses: ' + allSum + 'RMB');

		  $("#orderDetailsList").listview('refresh');
		  //$(ordStr).appendTo("");

		     /*$.each(users,function(i,val){
		         for(var userName in orderDetails){
			    var tmpUser = $.grep(users,function(n,i){
			         
			    }); 
			 }
		     });*/



	   });



	   $("a#choosePeopleButton").live("click",function(e){
	         alert("you  hit choosePeople button");
	   });
	   $("a#chooseRestaurantButton").live("click",function(e){
	         alert("you  hit chooseRestaurant button");
	   });
	   $("a#choosePackageButton").live("click",function(e){
	          alert("you  hit choosePackage button");
		  if( $("#restaurant").val().trim() == ""){
		       alert("prohibited: you have not choose restaurant");
		       this.href= "javascript:void(0)";
		  }else{
		       this.href="#choosePackagePage";
		  }
	   });
	   $("a#submitButton").live("click",function(e){
	          if( $("#people").val().trim() == "" ||
		      $("#restaurant").val().trim() == ""||
		      $("#package").val().trim() == ""
		    ){
		        alert("your input is not complete");
		        
		    }else{
		        //store order info
		        var curPacks = localStorage.getItem("currentPacks");
		        var curUsers = localStorage.getItem("currentUsers");
			if(curPacks != null  && curUsers != null){
			    curPacks = eval('('+curPacks+')');
			    curUsers = eval('('+curUsers+')');
		            curPacks = $.grep(curPacks,function(n,i){
		                  return (n.number > 0)
		            })
			    alert(curPacks)
			    str = "{"
			    $.each(curUsers,function(i,val){
			          alert(val.name); 
				  str += '"' + val.name + '":['
				  $.each(curPacks,function(j,val2){
				      str += '{"packName":"'+ val2.packName + '",' 
				      str += '"price":"'+ val2.price + '",' 
				      str += '"number":"'+ val2.number + '",' 
				      str += '"restaurant":"'+ val2.restaurant+ '"},' 
				  })
				  str += '],'
			    })
			    str +="}"
			    alert(str)
		            localStorage.removeItem("orderDetails");
			    localStorage.setItem("orderDetails",str);
			    //jump to orderDetail
			    this.href="#orderDetailPage"
			 }
			

		    }
	   });

	   $("#userBackButton").live("click",function(){
	          var str = "["
		  var users = $("input[name='userCheckBox']:checked").each(function(){
		       str += '{"name":"' + this.value + '"},';
		  });
		  str += "]"
		  alert(str);
		  localStorage.removeItem("currentUsers");
	          localStorage.setItem("currentUsers",str);
	   });
	   $("#restBackButton").live("click",function(){
	          var str = "["
		  var rests = $("input[name='restCheckBox']:checked").each(function(){
		       str += '{"name":"' + this.value + '"},';
		  });
		  str += "]"
		  alert(str);
		  localStorage.removeItem("currentRests");
	          localStorage.setItem("currentRests",str);
	   });
	   $("#packBackButton").live("click",function(){
	          var str = "["
		  $.each($("#listPack").children(),function(e){
		       str += '{"packName":"' + $(this).children().eq(0).text() + '",'
		       str += '"price":"' + $(this).children().eq(1).text().split("RMB")[0].toString() + '",'
		       str += '"number":"' + $(this).children().eq(2).val().trim() + '",'
		       str += '"restaurant":"' + $(this).children().eq(3).text() + '"},'
		  });
		  str += "]"
		  alert(str);
		  localStorage.removeItem("currentPacks");
	          localStorage.setItem("currentPacks",str);
		  //alert(eval('('+localStorage.getItem("currentPacks")+')')
	   });
         

	  
  }
);


