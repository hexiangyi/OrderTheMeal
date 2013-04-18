jQuery(
   function(){
           $("#choosePeoplePage").live("pageshow",function(){
		 var userList = ""
		 var tmpId = ""
		 var num = 1;
		 $.each(users,function(i,val){
		     tmpId = "checkbox-p" + num;
		     userList  += '<li><input type="checkbox" name="userCheckBox" id= ' + tmpId + ' class="custom" value="' +  val.name + '"/><label for=' + tmpId +'>'+ val.name + '</label></li>';
		     num += 1;
		 });
		 $("#listPeople").empty();
		 $("#listPeople").append(userList);
		 $("#listPeople").listview('refresh');
	   });

           $("#chooseRestaurantPage").live("pageshow",function(){
	         var restaurantList = ""
		 var tmpId = ""
		 $.each(restaurants,function(i,val){
		     tmpId = "checkbox-r" + i;
		     restaurantList  += '<li><input type="checkbox" name="restCheckBox" id= ' + tmpId + ' class="custom" value="' + val.name +'"/><label for=' + tmpId +'>'+ val.name + '</label></li>';
		 });
		 $("#listRestaurant").empty();
		 $("#listRestaurant").append(restaurantList);
		 $("#listRestaurant").listview('refresh');
	         

	   });

	   $("#choosePackagePage").live("pageshow",function(){
                 var str = ""
		 //genrating all the packages in the restaurants choosed
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
				       str += '<p class="ui-li-aside"><input type="number" id="'+tmpID+'"  value="0" min="0">' 
				       str += '<label for="'+tmpID+'">' + r + '</lable></p>' 
				       
				 });
			      }
			  }
		       });
		   }
		 $("#listPack").empty();
		 $("#listPack").append(str);
		 $("#listPack").listview('refresh');
	   });

           $("#orderPage").live("pageshow",function(){
	          //update the value of three input ui 
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
			var overExpense =  eval(personSum) - eval("12")
			if( eval(overExpense) >  eval(0) ){
			       priceStr = '<p class="ui-li-aside"> <span>' + personSum +'RMB  (over '+overExpense+'RMB)</span></p>'
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
		  //hight light user's expense if its bigger than 12
		  $("#detailsContent").find("span").css('color','red');
		  $("#summary").text(ordNum+' user(s) has ordered; ' + nordNum +' user(s) has not ordered'+';  total expenses: ' + allSum + 'RMB');

		  $("#orderDetailsList").listview('refresh');




	   });

           
	   $("a#chooseRestaurantButton").live("click",function(e){
                   localStorage.removeItem("currentPacks")
	   });
	   $("a#choosePackageButton").live("click",function(e){
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
		        this.href= "javascript:void(0)";
		        
		    }else{
		        //store order info
		        var curPacks = localStorage.getItem("currentPacks");
		        var curUsers = localStorage.getItem("currentUsers");
		        var curOrderDetails = localStorage.getItem("orderDetails");
			if(curPacks != null  && curUsers != null){
			    curPacks = eval('('+curPacks+')');
			    curUsers = eval('('+curUsers+')');
		            curPacks = $.grep(curPacks,function(n,i){
		                  return (n.number > 0)
		            })
			    var str = "{"
			    curStr = ""
			    $.each(curUsers,function(i,val){
				  curStr += '"' + val.name + '":['
				  $.each(curPacks,function(j,val2){
				      curStr += '{"packName":"'+ val2.packName + '",' 
				      curStr += '"price":"'+ val2.price + '",' 
				      curStr += '"number":"'+ val2.number + '",' 
				      curStr += '"restaurant":"'+ val2.restaurant+ '"},' 
				  })
				  curStr += '],'
			    })
			    if(curOrderDetails == null || curOrderDetails =='{}'){
			      //update currentUsers
			      str += curStr
			    }else{
			      str += curStr
			      curOrderDetails = eval('('+curOrderDetails+')');
			      for(var orderUserName in curOrderDetails){
			           var isOld = "Y"
			           $.each(curUsers,function(i,val){
				       if(val.name == orderUserName)isOld = "N"
				   })
				   if(isOld == "Y"){
				      //already existing order without update, so just add them
				      str += '"' + orderUserName + '":['
				      $.each(curOrderDetails[orderUserName],function(j,order){
				        str += '{"packName":"'+order.packName+'",'
				        str += '"price":"'+ order.price + '",' 
				        str += '"number":"'+ order.number + '",' 
				        str += '"restaurant":"'+ order.restaurant+ '"},' 
				      })
				      str += '],'

				   }
			       }
			    }
			    str +="}"
		            localStorage.removeItem("orderDetails");
			    localStorage.setItem("orderDetails",str);
			    localStorage.removeItem("currentUsers");
			    localStorage.removeItem("currentPacks");
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
		  localStorage.removeItem("currentUsers");
	          localStorage.setItem("currentUsers",str);
	   });
	   $("#restBackButton").live("click",function(){
	          var str = "["
		  var rests = $("input[name='restCheckBox']:checked").each(function(){
		       str += '{"name":"' + this.value + '"},';
		  });
		  str += "]"
		  localStorage.removeItem("currentRests");
	          localStorage.setItem("currentRests",str);
	   });
	   $("#packBackButton").live("click",function(){
	          var str = "["
		  $.each($("#listPack").children(),function(e){
		       str += '{"packName":"' + $(this).children().eq(1).text().trim() + '",'
		       str += '"price":"' + $(this).children().eq(2).text().split("RMB")[0].toString() + '",'
		       str += '"number":"' + $(this).children().find("input").val().trim() + '",'
		       str += '"restaurant":"' + $(this).children().find("label").text()+'",'
		       str += '},'
		  });
		  str += "]"
		  localStorage.removeItem("currentPacks");
	          localStorage.setItem("currentPacks",str);
	   });
         

	  
  }
);


