var selectStockName = null;
var accountList = ['https://wa.me/13035985276','https://wa.me/13346052929','https://wa.me/16237778217'];

function inputChange(e) {
    selectStockName = $(e).val()
    //getRelationalStockList($(e).val());
}

function getRelationalStockList(val) {
    
    $(".search-result").show();
    if (val) {
        var input_id = "gupiao";
        val = val.toUpperCase();

        var regex = eval("/^" + val + "/");
        selectStockName = null;

        let list = s.filter((name) => {
            return regex.test(name.c) /*|| regex.test(name.n)*/;
        });
        if (list.length == 1 && (val == list[0].c /*|| val == list[0].n*/)) {
            selectStockName = val;
        }

        $("#stocklist")
            .children()
            .remove();

        let firstTenItems = list.slice(0, Math.min(list.length, 10));

        firstTenItems.forEach((item) => {
            if (regex.test(item.c)) {
                $("#stocklist").append(
                    "<li id=" + item.c + "><span>"
                    +
                    "<font color='red'>" + val + "</font>" + item.c.substring(val.length)
                    +
                    "</span><span>"
                    +
                    item.n.substring(0, 30)
                    +
                    "...</span></li>"
                );
            } else {
                $("#stocklist").append(
                    "<li id=" + item.c + "><span>"
                    +
                    item.c
                    +
                    "</span><span>"
                    +
                    "<font color='red'>" + val + "</font>" + item.n.substring(val.length) 
                    +
                    "...</span></li>"
                );
            }            

            $("#" + item.c).each(function () {
                $("#" + item.c).on("click", function (e) {
                    selectStockName = e.currentTarget.id;
                    $("#gupiao").val(selectStockName);
                    $("#stocklist")
                        .children()
                        .remove();
                    $(".search-result").css("display", "none");

                    checkStock();

                });
            });
        });
    }
}

function checkStock() {
    if (!selectStockName) {
        layer.msg('Please enter the correct stock name ( stock code )')
        $('#gupiao').focus()
        return
    }

    $('.popover.loading').show()
    $('.popover.loading .title').text('AI is intelligently diagnosing ' + selectStockName + '...')
    $('.popover.loading .line div')
        .css('width', '10%')
        .animate({ width: '16%' }, 500, '', function () {
            $('.popover.loading .title').text('Connect to stock exchange database...')
        })
        .animate({ width: '32%' }, 600, '', function () {
            $('.popover.loading .title').text("Scan the institution's research report...")
        })
        .animate({ width: '50%' }, 700, '', function () {
            $('.popover.loading .title').text('Analyze recent fund flow...')
        })
        .animate({ width: '66%' }, 500, '', function () {
            $('.popover.loading .title').text('K-line intelligent comparison and prediction...')
        })
        .animate({ width: '88%' }, 600, '', function () {
            $('.popover.loading .title').text('Research companies and the latest big news...')
        })
        .animate({ width: '100%' }, 800, '', function () {
            $('.popover.loading').hide()
            $("#checkStockCode").html(selectStockName);
            $(".dialogMask").attr("style", "display:block");
            $(".dialog").attr("style", "display:block");

        })
}
function checkAgain() {
    $("#gupiao").val("");
    $("#gupiao").focus();
    $(".dialogMask").attr("style", "display:none");
    $(".dialog").attr("style", "display:none");
}
