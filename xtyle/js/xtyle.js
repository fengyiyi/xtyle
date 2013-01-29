requirejs.config({
  paths: {
    'text' : '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text.js',
    'modernizr' : '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min',
    'jquery' : '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min',
    'widgets' : '../widgets'
  }
});

require ( [ 'modernizr', 'jquery' ], function ( modernizr, $ ) {

    var xtyle = function () {}; //namespace
    var x = xtyle.prototype;
    x.model = {
        modules : [ 'radio', 'checkbox', 'select' ]
    };//x.model
    x.controller = {
        _loadCss : function ( url ) {
            var link = document.createElement( 'link' );
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        },    
        _input : {
            resizeInput : function () {
                var elem = 'input[xtyle=full]';
                if( $( elem ).length ) {
                    $( elem ).width( $( elem ).parent().width() - ( $( elem ).outerWidth() - $( elem ).width() ) );
                }
            },
            text : {},
            email : {},
            number : {},
            password : {}
        },
        _radio : {
            init : function(){
                // wrap input type radio with spans and hide it
                $('input[type=radio]').each(function(){
                    $(this).css({'position':'absolute','opacity': 0}).wrap('<span id="'+$(this).attr('id')+'" name="'+$(this).attr('name')+'" class="radio" />').wrap('<span />');
                    if( $(this).is(':checked') ) $(this).parent().parent().addClass('active');
                });//each()
                $('span.radio').on('click', function(){
                    x.controller._radio.radioButton("#"+$(this).attr("id"));
                });//on()
            },
            radioButton : function(elem){
               $('span[name='+$(elem).attr('name')+']').removeClass("active");
                if(!$('span'+elem).hasClass('active')){
                    $('span'+elem).addClass('active');
                    $('input'+elem).attr('checked', true);
                }//if
            }
        },
        _checkbox : {
            init : function(){
                // wrap input type checkbox with spans and hide it
                $('input[type=checkbox]').each(function(){
                    $(this).css({'position':'absolute','opacity': 0}).wrap('<span id="'+$(this).attr('id')+'" name="'+$(this).attr('name')+'" class="checkbox" />').wrap('<i class="icon-check" />');
                    if( $(this).is(':checked') ) $(this).parent().parent().addClass('active');
                });//each()
                $('span.checkbox').on('click', function(){
                    x.controller._checkbox.checkBox("#"+$(this).attr("id"));
                });
            },
            checkBox : function(elem){
                if($('span'+elem).hasClass('active')){
                    $('span'+elem).removeClass('active');
                    $('input'+elem).attr('checked', false);
                }else{
                    $('span'+elem).addClass('active');
                    $('input'+elem).attr('checked', true);
                }//if_else
            }
        }
    }//x.controller
    x.view = {
        events : function(){
            //INITIALIZE MODULES
            if($.inArray('radio', x.model.modules) >= 0){
                x.controller._radio.init();
            }//if
            if($.inArray('checkbox', x.model.modules) >= 0){
                
                x.controller._checkbox.init();
            }//if

            //CLICK ON LABELS WITH ATTRIBUTE "FOR"
            $('label').on('click', function(){
                var type = $('input#'+$(this).attr('for')).attr('type');
                switch(type){
                    case 'radio':
                      x.controller._radio.radioButton('#'+$(this).attr('for'));
                      break;
                    case 'checkbox':
                      x.controller._checkbox.checkBox('#'+$(this).attr('for'));
                      break;  
                }//switch
            });

            //INPUT FULL WIDTH
            x.controller._input.resizeInput();
            $(window).resize(function() {
                x.controller._input.resizeInput();
            });
        }()
    };//x.view 

    return x; // RETURN GLOBAL OBJECT   

});