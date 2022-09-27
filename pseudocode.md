Main Screen:  INDEX
    Title 
    image of the theater
    seach bar with icon button
    onclick get the API data and populates to page 2(AKA Search Results)


Search Results Page: MOVIE.HTML
    Title button to go back to Main Screen
    Show cards to display poster and title 
        USE FOR LOOP
        Limit results to 12
        Cards should be the same size regardless of items returned
        Image with button linked  to results.html load API for reviews and movie data
        Title underneath linked  to results.html load API for reviews and movie data
        Button:  Add to my watchlist 
            if watchList.length < 24 append to watchList cards
            else return modal:  "Your watch list is full!"
    Watch List Button: on click go to watchlist.html and get watchlist from localStorage

Results Page: results.HTML
    Title button to go back to Main Screen
    Watch List Button: on click go to watchlist.html and get watchlist from localStorage
    Use API for reviews and movie data to load onto the page
        Title
        <container>
            Reviews Rating
            Synopsis
            Motion Picture Association Rating
    Display Movie Poster <container>
    Button:  Add to my watchlist 
            if watchList.length < 24 append to watchList cards
            else return modal:  "Your watch list is full!"

Watch List Page: watchlist.html
    Title button to go back to Main Screen
    Limit watchlist to 24
     Display Movie Poster <container>
     Display movie title
     Click remove from watch list




