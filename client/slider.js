    $(function () {
        $("#size-slider").slider({
            step: 4,
            min: 4,
            max: 40,
            value: getSize(),
            slide: function (event, ui) {
                setSize(ui.value);
            }
        });

        $(".ui-slider-handle").mouseleave(function () {
            $('.ui-slider-handle').html("");
        })
        $(".ui-slider-handle").mouseenter(function () {
            var value = $("#slider-range").slider("option", "value");
            $('.ui-slider-handle:first').html('<div class="tooltip bottom slider-tip"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + getSize() + '</div></div>');
        })
    });
