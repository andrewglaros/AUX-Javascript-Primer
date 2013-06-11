/* std Ajax xhr function */
function getHTTPObject() {

	var xhr;

	if (window.XMLHttpRequest) {  // check for support

		xhr = new XMLHttpRequest();  //if it's supported, use it because it's better

	} else if (window.ActiveXObject) {  // check for the IE 6 Ajax}

			xhr = new ActiveXObject("msxm12.XMLHTTP");  // save it to the xhr variable
		
		}	

	return xhr;  // spit out the correct one so we can use it

}  // close function getHTTPObject



/* define Ajax call */
function ajaxCall(dataUrl, outputElement, callback) {

	/* use function to get the correct Ajax object based on support */
	var request = getHTTPObject();

	outputElement.innerHTML = "Loading";

	request.onreadystatechange = function() {
        
        // check to see if the Ajax call went through
        if ( request.readyState === 4 && request.status === 200 ) {
            
            // save the ajax response to a variable
            var contacts = JSON.parse(request.responseText);
            
            // make sure the callback is indeed a function before executing it
            if(typeof callback === "function"){
            
                callback(contacts);
            
            } // end check
    
        } // end ajax status check
    
    } // end onreadystatechange

	request.open("GET", dataUrl, true);
	request.send(null);

} // close function



(function(){


		/* define the DOM elements and common variables needed */
		var searchForm = document.getElementById("search-form"),
			searchField = document.getElementById("q"),
			getAllButton = document.getElementById("get-all"),
			target = document.getElementById("output");


		/* define address book methods */
		var addr = {


				search : function(event) {

					// set output element
					var output = document.getElementById("output");

					// start the ajax call
					ajaxCall('data/contacts.json', output, function (data){

							// save input value, contacts length and i to variables
							var searchValue = searchField.value,
							addrBook = data.addressBook,
							count = addrBook.length,
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
										var obj = addrBook[i],
											isItFound = obj.name.indexOf(searchValue);

										// anything other than -1 means we found a match
										if(isItFound !== -1) {

												target.innerHTML += '<p>' + obj.name + ', <a href="mailto:' + obj.email + '">'+ obj.email +'</a></p>';

										} // end if
									
									} // end for 
							
							} // end count check

					}); // end ajax call

				}, // close function



				getAllContacts : function (){

					// set the output element
					var output = document.getElementById("output");

					// start ajax call
					ajaxCall('data/contacts.json', output, function (data) {
            
            				var addrBook = data.addressBook,
            					count = addrBook.length,
				            	i;
				            
				            // clear target area
				            target.innerHTML = "";
				            
				            // check the count
				            if(count > 0){
				            
				                // loop through the contacts
				                for(i = 0; i < count; i = i + 1) {
				                
				                    // look through the name value to see if it contains the search term
				                    var obj = addrBook[i];
				                    
				                    target.innerHTML += '<p>' + obj.name + ' - <a href="mailto:' + obj.email + '">'+ obj.email +'</a></p>';
				                    
				                } // end for loop

				            } // end count

				    }); // end ajax call
		        
		        },

		        setActiveSection : function(){
		        
		            // add a class of "active" the wrapping div
		            this.parentNode.setAttribute("class", "active");
		        },

		        removeActiveSection : function(){
		        
		            // remove the class from the wrapping div
		            this.parentNode.removeAttribute("class");
		        }

		} // end addr object
		

		// activate auto complete on keyUp
	    searchField.addEventListener("keyup", addr.search, false);
	    
	    // set active section on focus of the form field
	    searchField.addEventListener("focus", addr.setActiveSection, false);
	    
	    // remove active section on blur of the form field
	    searchField.addEventListener("blur", addr.removeActiveSection, false);
	    
	    // get all contacts when you click the button
	    getAllButton.addEventListener("click", addr.getAllContacts, false);
	    
	    // add hover class on mouse over of the form field
	    searchForm.addEventListener("mouseover", addr.addHoverClass, false);
	    
	     // remove hover class on mouse out of the form field
	    searchForm.addEventListener("mouseout", addr.removeHoverClass, false);
	    
	    // activate search on form submit
	    searchForm.addEventListener("submit", addr.search, false);



})();  // end annonymous function


