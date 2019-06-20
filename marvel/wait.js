
/**
* # jQuery plugin for loading animation
* @author {HyoukJoon Lee}
*/
(function ($) {
    $.fn.startWaiting = function (options) {
        var config = { 'opacity': 0.8, 'className': 'bigWaiting', scrollCenter: true, timer: 10000 };
        if (options) jQuery.extend(config, options);
        function setPos(element) {
            if (element._waiting) {
                var pos = $(element).position();
                var width = $(element).outerWidth(),
		            height = $(element).outerHeight(),
		            l = element._loading;

                var screenTop = $(window).scrollTop();
                setPosCenter(element, screenTop, screenTop + $(window).height());
                l.css({ "left": pos.left + 'px',
                    'top': pos.top + 'px',
                    //l.css('margin-top', '-' + height + 'px');
                    'width': width + 'px',
                    'height': height + 'px',
                    'display': 'inline',
                    'z-index': 10000
                });
            }
        }
        function setPosCenter(element, screenTop, screenBottom) {
            if (!element._waiting) return;
            var ele = $(element);
            var elementTop = ele.offset().top;
            var elementBottom = elementTop + ele.height();

            var viewH = (screenBottom < elementBottom ? screenBottom : elementBottom) - (screenTop < elementTop ? elementTop : screenTop);
            var viewCenterTop = (viewH - 32) / 2;
            viewCenterTop += (screenTop > elementTop ? screenTop - elementTop : 0);

            element._loading.css("background-position", "center " + viewCenterTop + "px");
        }
        this.each(function (i) {
            element = this;
            element._waiting = true;
            if (!element._loading) {
                var e = jQuery('<div>');
                $(element).parent().append(element._loading = e);
                e.css('position', 'absolute');
                e.css('opacity', config.opacity);
                e.addClass(config.className);
            }
            setPos(element);
            //  window.setTimeout(function () { setPos(element) }, 1);
            if (!isNaN(config.timer) && config.timer > 0)
                element.timeOutID = window.setTimeout((function () { $(element).stopWaiting(); }), config.timer);
        });
        elements = this;
        if (config.scrollCenter) {
            $(window).scroll(function () {
                var screenTop = $(window).scrollTop();
                var screenBottom = screenTop + $(window).height();
                elements.each(function (i) {
                    setPosCenter(this, screenTop, screenBottom);
                });
            });
        }
        return this;
    };
    $.fn.stopWaiting = function () {
        return this.each(function () {
            element = this;
            if (element._waiting) {
                window.clearTimeout(element.timeOutID);
                element._waiting = false;
                element._loading.remove();
                element._loading = null;
            }
        });
    }
    $(function () {
        $('body').append('<link href="http://nxcache.nexon.net/global/js/jquery-plugin/wait/wait.css" rel="stylesheet" type="text/css" />');
    });
})(jQuery);