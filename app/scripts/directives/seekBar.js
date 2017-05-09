(function() {
    function seekBar() {
        /**
        * @function calculatePercent
        * @desc Returns the horizontal percent along the seek bar where the event ($event from view) occurred
        * @param {Object} seekBar {event} event
        */
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };

        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: { },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;

                /**
                * @desc Holds the element matching the directive (<seek-bar>) as a jQuery object so jQuery methods can be used on it
                * @type {jQuery.Object}
                */
                var seekBar = $(element);

                /**
                * @function percentString
                * @desc Returns the percent value of the seek bar that should be filled
                * @param {None}
                */
                var percentString = function() {
                    /**
                    * @desc Holds the value of the seek bar; default value is 0 (zero)
                    * @type {Number}
                    */
                    var value = scope.value;

                    /**
                    * @desc Holds the maximum value of the seek bar; default value is 100
                    * @type {Number}
                    */
                    var max = scope.max;

                    /**
                    * @desc Holds the numeric portion of the percentage of the seek bar that should be filled
                    * @type {Number}
                    */
                    var percent = value / max * 100;
                    return percent + "%";
                };

                scope.fillStyle = function() {
                    return {width: percentString()};
                };

                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
            }
        };
    }

    angular
        .module('blocJams')
        .directive('seekBar', seekBar);
})();
