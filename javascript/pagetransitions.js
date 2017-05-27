var PageTransitions = (function() {

	var $main = $( '#pt-main' ),
		$pages = $main.children( 'div.pt-page' ),
		$iterate = $( '#iterateEffects' ),
		animcursor = 1,
		pagesCount = $pages.length,
		current = 0,
		isAnimating = false,
		endCurrPage = false,
		endNextPage = false,
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// support css animations
		support = Modernizr.cssanimations;
	
	function init() {

		$pages.each( function() {
			var $page = $( this );
			$page.data( 'originalClassList', $page.attr( 'class' ) );
		} );

		$pages.eq( current ).addClass( 'pt-page-current' );

		$( '#dl-menu' ).dlmenu( {
			animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
			onLinkClick : function( el, ev ) {
				ev.preventDefault();
				nextPage( el.data( 'animation' ) );
			}
		} );

		$(document).ready(function(){
		    $("button").click(function(){
				if( isAnimating ) {
					return false;
				}
		        var me = $(this);
		        console.log(me.val());
		        
		        switch(me.val()){
		        	case "one":
						nextPage(1);
		        		break;
		        	case "two":
						nextPage(2);
		        		break;
		        	case "three":
						nextPage(3);
		        		break;
		        	case "four":
						nextPage(4);
		        		break;
		        	case "five":
						nextPage(5);
		        		break;
		        	case "six":
						nextPage(6);
		        		break;
		        }
		    }); 
		});
	}

	function nextPage(options ) {
		var animation = (options.animation) ? options.animation : options;

		if( isAnimating ) {
			return false;
		}

		isAnimating = true;

		switch(options){
        	case 1:
        		animation = 2;
				var $currPage = $pages.eq( 1 );
        		var $nextPage = $pages.eq( 0 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
        	case 2:
        		animation = 2;
				var $currPage = $pages.eq( 0 );
        		var $nextPage = $pages.eq( 2 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
        	case 3:
        		animation = 1;
				var $currPage = $pages.eq( 0 );
				var $nextPage = $pages.eq( 1 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
        	case 4:
        		animation = 2;
				var $currPage = $pages.eq( 1 );
        		var $nextPage = $pages.eq( 2 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
        	case 5:
        		animation = 1;
				var $currPage = $pages.eq( 2 );
        		var $nextPage = $pages.eq( 0 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
        	case 6:
        		animation = 1;
				var $currPage = $pages.eq( 2 );
        		var $nextPage = $pages.eq( 1 ).addClass( 'pt-page-current' ),
					outClass = '', inClass = '';
        		break;
	    }

		switch( animation ) {
			case 1:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 2:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;

		}

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}

	}

	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}

	function resetPage( $outpage, $inpage ) {
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
	}

	init();

	return { 
		init : init,
		nextPage : nextPage,
	};

})();