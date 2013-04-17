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

           
	  
  }
);


