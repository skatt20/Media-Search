const dis = this
dis.base_url = document.getElementById('input_base_url').value

// $(document).ready(() => {

//     $('#searchForm').on('submit', function(e) {
//         e.preventDefault();
//         let query = $('#query').val();
//         let type = $('#type').val();

//         $.ajax({
//             url: base_url + 'ci_search_media/search_pixabay',
//             method: 'GET',
//             data: {
//                 query: query,
//                 type: type
//             },
//             success: function(response) {
//                 let results = $('#results');
//                 results.empty();

//                 if (response.hits && response.hits.length > 0) {
//                     response.hits.forEach(function(hit) {
//                         if (type === 'image') {
//                             results.append('<div class="col-md-4"><img src="' + hit.webformatURL + '" class="img-fluid" /></div>');
//                         } else if (type === 'video') {
//                             let video = hit.videos.tiny.url;
//                             results.append('<div class="col-md-4"><video controls><source src="' + video + '" type="video/mp4"></video></div>');
//                         }
//                     });
//                 } else {
//                     results.append('<p>No results found</p>');
//                 }
//             },
//             error: function(error) {
//                 console.log(error);
//                 $('#results').html('<p>An error occurred while searching. Please try again.</p>');
//             }
//         });
//     });

// })
$(document).ready(function() {
    let searchType = 'all';
    let lastQuery = ''; // Store last search query

    // Handle tab switching
    $('#searchTabs .nav-link').on('click', function(e) {
        e.preventDefault();
        $('#searchTabs .nav-link').removeClass('active');
        $(this).addClass('active');
        searchType = $(this).data('type');

        // If there's no active search, clear results when switching tabs
        if (!lastQuery) {
            $('#searchResults').html('<p>Search results will appear here...</p>');
        } else {
            // Trigger search again to filter based on the selected tab
            $('#searchForm1').trigger('submit');
        }
    });

    $('#searchForm1').on('submit', function(e) {
        e.preventDefault();
        let query = $('#searchInput').val().trim();

        if (!query) {
            $('#searchResults').html('<p>Oops! Looks like you forgot to enter something. Try typing a search term above.</p>');
            return;
        }

        lastQuery = query; // Store the last searched query
        let apiKey = '44956824-171f2932fe1c34d9695051b0c';
        let urls = [];

        // Fetch images if 'all' or 'image' is selected
        if (searchType === 'all' || searchType === 'image') {
            urls.push(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`);
        }
        
        // Fetch videos if 'all' or 'video' is selected
        if (searchType === 'all' || searchType === 'video') {
            urls.push(`https://pixabay.com/api/videos/?key=${apiKey}&q=${encodeURIComponent(query)}`);
        }

        // Reset search results before making a new request
        let results = $('#searchResults');
        results.html('<p>Loading results...</p>');
        let searchResults = ''; // Clear previous results

        let requests = urls.map(url => $.ajax({ url, method: 'GET' }));

        Promise.all(requests).then(responses => {
            let hasResults = false;
            searchResults = ''; // Ensure results are cleared before adding new ones
            
            responses.forEach(response => {
                if (response.hits && response.hits.length > 0) {
                    response.hits.forEach(hit => {
                        if ((searchType === 'all' || searchType === 'image') && hit.webformatURL) {
                            searchResults += `<div class="col-md-4"><img src="${hit.webformatURL}" class="img-fluid" /></div>`;
                        } 
                        if ((searchType === 'all' || searchType === 'video') && hit.videos) {
                            let videoUrl = hit.videos.tiny.url;
                            searchResults += `<div class="col-md-4"><video controls><source src="${videoUrl}" type="video/mp4"></video></div>`;
                        }
                    });
                    hasResults = true;
                }
            });

            results.html(hasResults ? searchResults : '<p>No results found</p>');
        }).catch(error => {
            console.log(error);
            results.html('<p>An error occurred while searching. Please try again.</p>');
        });
    });
});


