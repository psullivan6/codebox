(function( $ ) {
	
	$('.cdbx').each(function(){
		
		var blacklist = [
			'cdbx',
			'color',
			'd-in-block'
		],
		$this = $(this),
		cls = $this.attr('class').split(/\s+/),
		names = '',
		i;
		
		for (i = 0; i < blacklist.length; i++) {
			
			if ($.inArray(blacklist[i], cls) > -1){
				
				cls.splice($.inArray(blacklist[i], cls), 1);
				
			}
			
		}
		
		$.each(cls, function(k, v){
			
			names = (k > 0) ? names + ' .' + v : '.' + v;
			
		});
		
		$this.prepend('<input class="cdbx-code" type="text" value="' + names + '" size="' + names.length + '" onclick="this.select();">');
		
	});
	
}( jQuery ));