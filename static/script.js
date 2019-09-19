$(document).ready(function() {
    var searchInputElm = $('#searchInput');
    var searchDropdownElm = $('#searchSuggestionDropdown');
    var searchForm = $('#searchForm');
    searchForm.submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'partial_search':searchInputElm.val()
            }),
            success: function(data) {
                if (data.length > 0) {
                    showGifs(data);
                } else {
                    showNoGifs();
                }
            },
            error: function(data) {
                console.log('Oh no!!!');
            },
        });
    });

    searchInputElm.on('input', function() {
        $.ajax({
            type: 'POST',
            url: '/autocomplete',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'partial_search':searchInputElm.val()
            }),
            success: function(data) {
                updateSuggestionMenu(data);
            },
            error: function(data) {
                hideSuggestionMenu();
            },
        });
    });

    function suggestionDropdownItemClickHandler() {
        // Update search bar's text to the selected text
        searchInputElm.val($(this).text());

        // Submit form with the selected text
        searchForm.submit();
    }

    function updateSuggestionMenu(data) {
        searchDropdownElm.html('');
        data.forEach(function(elm, idx) {
            var elmId = `item-${idx}-${elm}`
            searchDropdownElm.append(`<option
                                        id="${elmId}"
                                        value="${elm}">`);
        });
        //searchDropdownElm.addClass('show');
        data.forEach(function(elm, idx) {
            $(`#item-${idx}-${elm}`).click(suggestionDropdownItemClickHandler);
        });
    }

    function hideSuggestionMenu() {
        //searchDropdownElm.removeClass('show');
        searchDropdownElm.html('');
    }

    function showGifs(tenorJson) {
        var columnContent = '';
        tenorJson.forEach(function(elm, idx) {
            columnContent += `<div class="row">
                            <div class="col-6">
                            <div class="card" style="width: 18rem;">
                            <img src="${elm['media'][0]['gif']['url']}" class="card-img-top" alt="${elm['title']}">
                            </div>
                            </div>
                            </div>`;
        });
        $('#gif-column').html(columnContent);
    }

    function showNoGifs() {
        $('#gif-column').html()
    }
});
