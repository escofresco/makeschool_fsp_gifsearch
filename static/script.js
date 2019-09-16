$(document).ready(function() {
    $('#search-form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).find('input[name="search_input"]'),
            success: function(data) {
                showGifs(data);
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
                                      <video src="${elm['media'][0]['mp4']['url']}" class="card-img-top" alt="${elm['title']}">
                                    </div>
                                </div>
                             </div>`
        });
        $('#gif-column').html(columnContent);
    }
});
