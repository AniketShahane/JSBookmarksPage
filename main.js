document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('SiteName').value;
  var siteUrl = document.getElementById('SiteUrl').value;
  if(!siteName || !siteUrl){
    alert('Please Fill in the form');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert("Enter a valid URL");
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // initialising an array
    var bookmarks = []
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else {
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to the array
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
  //prevent form from submitting
  e.preventDefault();
  fetchBookmarks();
  document.getElementById('myForm').reset();
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // get output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class = "well">'+
                                    '<h3> <span class="nos">' + name +
                                      '</span><span class = "btn_bookmark"><a class= "btn btn-light butt" style = "margin-right: 5px" target = "_blank" href = "' + url + '">Visit</a>'+
                                      '<a onclick = "deleteBookmark(\''+url+'\')" class= "btn btn-danger butt" href = "#">Delete</a></span>'+
                                    '</h3>' +
                                  '</div>';
  }
}

function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url === url){
      bookmarks.splice(i, 1);
    }
  }
  //reset back the local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}
