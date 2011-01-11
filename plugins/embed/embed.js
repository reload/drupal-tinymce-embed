var instanceId = null;

Drupal.wysiwyg.plugins.embed = {

		invoke: function(data, settings, instanceId) {
			if (data.format == 'html') {
				embed_dialog_open(instanceId);
			}
		},

		  
		
		/*init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			
	
			ed.addCommand('mceEmbed', function() {
				alert('command sent');
				ed.windowManager.open({
					file : url + '/dialog.htm',
					width : 305 + parseInt(ed.getLang('embed.delta_width', 0)),
					height : 250 + parseInt(ed.getLang('embed.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url // Plugin absolute URL
				});
			});

			// Register embed button
			ed.addButton('embed', {
				title : 'embed.desc',
				cmd : 'mceEmbed',
				image : url + '/img/embed.gif'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('embed', n.nodeName == 'IMG');
			});
		},*/

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Embed plugin',
				author : 'Chili Pepper Design',
				authorurl : 'http://www.chilipepperdesign.com',
				infourl : 'http://www.chilipepperdesign.com',
				version : '1.0'
			};
		}
};

/**
 * Open jQuery UI dialog box.
 */
function embed_dialog_open(instance) {
  instanceId = instance;
  $("body").append("<div id='embed_dialog'><textarea style='width:602px;height:400px' name='embedcode'></textarea><input type='submit' id='insert_embed_code_button' value='Insert' onclick='embed_insert()'/></div>");
  $("#embed_dialog").dialog({ modal: true, height: 476, width: 602, title: Drupal.t('Embed this code'), beforeclose: function(event, ui) { embed_dialog_close(); } }).show();
}

/**
 * Close jQuery UI dialog box.
 */
function embed_dialog_close() {
  $("#embed_dialog").remove();
}

function embed_insert(){
  // Get WYSIWYG editor instance.
	
//  console.log(parent);
	
  var instanceId = parent.instanceId;
  
  // Get editor name.
  var editor = parent.Drupal.wysiwyg.instances[instanceId].editor;
 
  markup = $('#embed_dialog > textarea').val();
  
  // Insert tag.
  var $node;
  switch(editor) {
    case "tinymce":
      $node = $(parent.tinyMCE.activeEditor.selection.getNode());
    break;
    
    case "fckeditor":
      var selection = nodepicker_fckeditor_selection(instanceId);
      $node = $(selection.anchorNode.parentNode);
    break;
    
    case "ckeditor":
      var selection = parent.CKEDITOR.instances[instanceId].getSelection();
      if(selection != null) {
        var element = selection.getStartElement();
        $node = $(element.$);
      }
    break;
  }
  
  // Update link if cursor inside anchor tag.
  parent.Drupal.wysiwyg.instances[instanceId].insert('<div class="embeddedcode">'+markup+'</div>');
  
  // Close jQuery UI dialog.
  parent.embed_dialog_close();
}