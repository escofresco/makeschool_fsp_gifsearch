$(document).ready(function() {
    $('#search-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                    'partial_search':$(this).find('input[name="search_input"]').val()
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

    function showGifs(tenorJson) {
        var columnContent = '';
        tenorJson.forEach(function(elm, idx) {
            columnContent += `<div class="row">
                                <div class="col-6">
                                    <div class="card" style="width: 18rem;">
                                      <img src="${elm['media'][0]['gif']['url']}" class="card-img-top" alt="${elm['title']}">
                                    </div>
                                </div>
                             </div>`
        });
        $('#gif-column').html(columnContent);
    }

    function showNoGifs() {
        $('#gif-column').html()
    }
});
