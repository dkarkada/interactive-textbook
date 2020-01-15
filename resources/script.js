$(document).ready(() => {
    $('.flashcards-container').each(function(){
        $fc = $(this).children();
        var i = $fc.length;
        $fc.each(function(){
            $(this).css('z-index', i);
            i--;
        })
        $fc.first().css('opacity', '1');
    });

    (function ( $ ) { 
        $.fn.sectiontoggle = function(action) {
            if (action === 'toggle') {
                if (this.hasClass('hidden')) {
                    action = 'expand';
                } else {
                    action = 'collapse';
                }
            }
            if (action === 'expand') {
                $sectiontext = this.children('.sectiontext');
                $sectiontext.each(function(){
                    $(this).css('maxHeight', $(this).prop('scrollHeight') + 'px');
                });
                this.removeClass('hidden');
            }
            if (action === 'collapse') {
                this.children('.sectiontext').css('maxHeight', '20px');
                this.addClass('hidden');
            }
            return this;
        };
    }( jQuery ));

    $('.barbox').on('click', event => {
        $(event.currentTarget).parent().sectiontoggle('toggle');
    });

    $('.levelbutton').on('click', event => {
        $this = $(event.currentTarget);
        $this.siblings('.selected').removeClass('selected');
        $this.addClass('selected');
        if ($this.children().hasClass('easy')) {
            $('section').filter('.easy').sectiontoggle('expand');
            $('section').filter('.medium, .hard').sectiontoggle('collapse');
        }
        if ($this.children().hasClass('medium')) {
            $('section').filter('.easy, .medium').sectiontoggle('expand');
            $('section').filter('.hard').sectiontoggle('collapse');
        }
        if ($this.children().hasClass('hard')) {
            $('section').sectiontoggle('expand');
        }
    });

    $('.flashcard div').on('click', event => {
        $fc = $(event.currentTarget).closest('.flashcard');
        if ($fc.hasClass('show-ans')) {
            $fc.animate({
                left: '+400px',
                opacity: '0'
            }, function(){
                $next = $(this).next();
                $parent = $(this).parent();
                $(this).remove();
                if ($next.length === 0) {
                    $parent.slideUp();
                }
            });
            if ($fc.next().length){
                $fc.next().animate({opacity: '1'});
            }
        } else {
            $fc.children('.cover').fadeOut();
            $fc.addClass('show-ans');
        }
    })

});

$(window).on("load", () => {
    $showntext = $('section').filter(':not(.hidden)').children('.sectiontext');
    $showntext.each(function(){
        $(this).css("maxHeight", $(this).prop('scrollHeight') + "px");
    });
});