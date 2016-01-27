var contacts = [];

ons.ready(function() {
	document.addEventListener('init', function(event) {
		page = event.target;

		if (page.id === 'all_contacts') {
			ons.myApp.contactListController(page, ons.myApp.createAllListItem, contacts);
		} else if (page.id === 'fav_contacts') {
			ons.myApp.contactListController(page, ons.myApp.createAllListItem, contacts.slice(0, 9));
		} else if (page.id === 'details_contacts') {
			ons.myApp.contactDetailsController(page);
		}
	});
});

document.addEventListener("deviceready", function() {
  var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
  
  navigator.contacts.find(fields, function(_contacts) {
    for (var i = 0; i < _contacts.length; i++) {
      if (_contacts[i].displayName != null && _contacts[i].phoneNumbers != null && _contacts[i].emails != null) {
        contacts.push(_contacts[i]);
      }
    }
    
    contacts.sort(function(a, b) {
        if (a.displayName < b.displayName)
          return -1;
        else if (a.displayName > b.displayName)
          return 1;
        else 
          return 0;
    });
    
    ons.myApp.contactListController(page, ons.myApp.createAllListItem, contacts);
    document.querySelector("ons-progress-bar").style.display = "none";
    
  }, function(e) {
    alert("Error");
  });
  
})
