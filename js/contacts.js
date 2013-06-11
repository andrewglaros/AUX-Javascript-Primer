(function () {



		var contacts = {
			"addressBook" : [
				{
					"name": "andrew",
					"email": "andrew@example.com",
				},
				{
					"name": "emily",
					"email": "emily@example.com",
				},
				{
					"name": "arthur",
					"email": "arthur@example.com",
				},
				{
					"name": "lonny",
					"email": "lonny@example.com",
				},
				{
					"name": "sean",
					"email": "sean@example.com",
				}
			]
		};




		/* define the DOM elements and common variables needed */
		var searchForm = document.getElementById("search-form"),
			searchField = document.getElementById("search"),
			getAllButton = document.getElementById("get-all"),
			count = contacts.addressBook.length,
			target = document.getElementById("output");




		/* define address book methods */
		var addr = {



				search : function(event) {

					// save input value, contacts length and i to variables
					var searchValue = searchField.value,
					i;

					// stop default behavior
					event.preventDefault();

					// clear target area in case list is populated
					target.innerHTML = "";


					// check the count
					if(count > 0 && searchValue !== "") {

							// loop through the contacts
							for(i = 0; i < count; i = i + 1) {

								// look through name value to see if it contacts the search term
								var obj = contacts.addressBook[i],
									isItFound = obj.name.indexOf(searchValue);

								// anything other than -1 means we found a match
								if(isItFound !== -1) {

										target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">'+ obj.email +'</a></p>';

								} // end if
							
							} // end for 
					
					} // end if
				},


				getAllContacts : function (){
            
		            var i;
		            
		            // clear target area
		            target.innerHTML = "";
		            
		            // check the count
		            if(count > 0){
		            
		                // loop through the contacts
		                for(i = 0; i < count; i = i + 1) {
		                
		                    // look through the name value to see if it contains the search term
		                    var obj = contacts.addressBook[i];
		                    
		                    target.innerHTML += '<p>' + obj.name + ' - <a href="mailto:' + obj.email + '">'+ obj.email +'</a></p>';
		                    
		                } // end for loop
		            } // end count
		        },

		        setActiveSection : function(){
		        
		            // add a class of "active" the wrapping div
		            this.parentNode.setAttribute("class", "active");
		        },

		        removeActiveSection : function(){
		        
		            // remove the class from the wrapping div
		            this.parentNode.removeAttribute("class");
		        },

		} // end addr object
		

		// activate auto complete on keyUp
	    searchField.addEventListener("keyup", addr.search, false);
	    
	    // set active section on focus of the form field
	    searchField.addEventListener("focus", addr.setActiveSection, false);
	    
	    // remove active section on blur of the form field
	    searchField.addEventListener("blur", addr.removeActiveSection, false);
	    
	    // get all contacts when you click the button
	    getAllButton.addEventListener("click", addr.getAllContacts, false);
	    
	    // activate search on form submit
	    searchForm.addEventListener("submit", addr.search, false);



})();  // end annonymous function


