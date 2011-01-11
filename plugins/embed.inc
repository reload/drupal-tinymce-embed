<?php
// $Id:$

/**
 * Implementation of hook_INCLUDE_plugin().
 */
function embed_embed_plugin() {
  if(module_exists('jquery_ui')){ jquery_ui_add('ui.dialog'); };
  drupal_add_css(drupal_get_path('module', 'embed') . "/plugins/embed/dialog.css");
  
	$plugins['embed'] = array(
    'title' => t('Embed Video or HTML widget'),
    'vendor url' => 'http://www.chilipepperdesign.com/',
	  'icon path' => drupal_get_path('module', 'embed') . '/plugins/embed/img',
    #'icon file' => 'embed.gif',
    'icon title' => t('Embeds Video'),
		//'js file' => 'editor_plugin.js',
    'settings' => array(),
  );
  return $plugins;
}