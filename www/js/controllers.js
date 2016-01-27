ons.myApp = {};

ons.myApp.contactListController = function (page, createListItem, myContacts) {
	var list = page.querySelector('ons-list'),
		div = document.createElement('div');
    
  if (myContacts.length == 0) return;
  
	div.innerHTML = createListItem(myContacts[0].displayName, 0, myContacts[0].displayName.charAt(0));
	list.appendChild(div.firstChild);
	for (var i = 1; i < myContacts.length; i++) {
		div.innerHTML = createListItem(myContacts[i].displayName, i, (myContacts[i].displayName.charAt(0) !== myContacts[i - 1].displayName.charAt(0)) ? myContacts[i].displayName.charAt(0) : '');
		list.appendChild(div.firstChild);
	}
}

ons.myApp.contactDetailsController = function (pageDom) {
  var page = document.querySelector('#myNavigator').getCurrentPage();
  var contact = contacts[page.options.index];
	pageDom.querySelector('ons-toolbar .center').innerHTML = contact.displayName;
	pageDom.querySelector('span.phone-number').innerHTML = contact.phoneNumbers[0].value;
	pageDom.querySelector('span.phone-type').innerHTML = contact.phoneNumbers[0].type;
	pageDom.querySelector('span.email-address').innerHTML = contact.emails[0].value;
	pageDom.querySelector('span.email-type').innerHTML = contact.emails[0].type;
  
  pageDom.querySelector('.do-phone-call').addEventListener("click", function() {
    document.location.href = "tel:" + contact.phoneNumbers[0].value;
  });
  pageDom.querySelector('.do-send-email').addEventListener("click", function() {
    document.location.href = "mailto:" + contact.emails[0].value;
  });
}

ons.myApp.showDetail = function(index) {
  document.querySelector('#myNavigator').pushPage('html/details_contact.html', {animation: 'lift', index: index});
}

ons.myApp.createAllListItem = function(name, index, initials) {

    return '<ons-list-item modifier="material" onclick="ons.myApp.showDetail(' + index + ')">' +
          '<div class="list__item__left">' +
             '<span class="contact-initials">' + initials + '</span>' +
          '</div>' +
          '<div class="list__item__center">' +
            '<ons-ripple color="rgba(0, 0, 0, 0.1)"></ons-ripple>' +
            '<img src="images/profile-image-0' + (index % 9 + 1) + '.png" class="list__item__thumbnail">' +
            '<div>' + name + '</div>' +
          '</div>' +
        '</ons-list-item>'
    ;
};

ons.myApp.createFavListItem = function(name, index) {

    return '<ons-list-item modifier="material" onclick="document.querySelector(\'#myNavigator\').pushPage(\'html/details_contact.html\', {animation: \'lift\', person: \'' + name + '\'})">' +
          '<ons-ripple color="rgba(0, 0, 0, 0.1)"></ons-ripple>' +
          '<div class="list__item__left">' +
            '<img src="images/profile-image-0' + (index % 9 + 1) + '.png" class="list__item__thumbnail">' +
          '</div>' +
          '<div class="list__item__center">' +
            name +
          '</div>' +
        '</ons-list-item>'
    ;
};
