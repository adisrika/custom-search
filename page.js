$('ul').click(function (e) {
    console.log(e.target.innerText);
    start = e.target.innerText;
    onClickofGo(e, start);
    e.preventDefault();
});

var onClickofGo = function (e, start) {
    $('.getData').button('loading');
    var api = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyA2qFe8kBT3ZZ7eYa6rTcq82YWsu8QVf1Y&q=' + $('.query').val() + '&cx=' + $("input:radio[name=cx]:checked").val() + '&callback=getData',
        addScript = '';
    if (start) {
        api += '&start=' + start;
    }
    addScript = '<script src="' + api + '" />';
    $('head').append(addScript);
};

$('.getData').click(onClickofGo);
$(document).keypress(function (e) {
    if (e.which == 13) {
        onClickofGo(e);
        e.preventDefault();
    }
});

function getData(results) {
    var request = (results.queries.request)[0],
        totalResults = request.totalResults,
        currentPage = request.startIndex,
        outputHTML = '',
        items = results.items,
        pages = Math.floor(totalResults / 10);

    if (pages > 10) {
        pages = 10;
    }
    console.log(currentPage);
    console.log(results);

    outputHTML = '<ul class="unstyled">';
    for (var i = 0; i < request.count; i++) {
        outputHTML += '<li><h4><a href="' + items[i].link + '">' + items[i].htmlTitle + '</a></h4><cite>' + items[i].htmlFormattedUrl + '</cite><p>' + items[i].htmlSnippet + '</p></li>';
    }
    outputHTML += '</ul>';
    $('.content').html(outputHTML);

    if (pages) {
        var liClass;
        outputHTML = '';
        for (i = 1, liClass = ''; i <= pages; i++, liClass = '') {
            if (i == currentPage) liClass = 'class="active"';
            outputHTML += '<li ' + liClass + '><a href="#">' + i + '</a></li>';
        }

        $('.pagination ul').html(outputHTML);
    }
    $('.getData').button('reset');
}
