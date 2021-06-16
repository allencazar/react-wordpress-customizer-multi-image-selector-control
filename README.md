# Project Title

Wordpress Customizer Multi Image Upload Custom Control

## Description

* Built in ReactJS. A module that access Wordpress Media Box to upload and select images.
* Selected images are displayed and allowed to be sorted.
* Final value is set as JSON string to an extenal input for Wordpress handling.

## How to use

* Download drag-sort-multi-image-upload-control.js, customizer-control-script-loader.js and drag-sort-multi-image-upload-control.css stored in dist directory
* Add/enqueue the scripts and stylesheet to your custom controller class
```
   public function enqueue() {
		wp_enqueue_style( 'drag-sort-multi-image-upload-control-styles', get_parent_theme_file_uri('/PATH_TO_YOUR/drag-sort-multi-image-upload-control.css'), false, '1.0.0', 'all' );
		wp_enqueue_script( 'drag-sort-multi-image-upload-control-script-loader', get_parent_theme_file_uri('/PATH_TO_YOUR/customizer-control-script-loader.js'), array('jquery'), '1.0.0', true );
		wp_add_inline_script( 'drag-sort-multi-image-upload-control-script-loader', 'const MYSCRIPT = ' . json_encode( array(
			'path' => get_parent_theme_file_uri('/PATH_TO_YOUR/drag-sort-multi-image-upload-control.js'),
			'id' => 'drag-sort-multi-image-upload-control-script',
	   )), 'before' );
	}
```
* Add the following snippet to your custom controller class
```
   public function render_content() {
      $imageControl = new \stdClass();
      $imageControl->setting = $this->id;
      $imageControl->label = esc_html( $this->label );
      $imageControl->selected_ids = json_decode($this->value());
      ?>
         <label for="_customize-input-<?php echo $this->id ?>" class="customize-control-title">
            <?php echo $imageControl->label; ?>
         </label>
         <!-- Input element for storing setting value -->
         <input className="wp-editor-area" id="_customize-input-<?php echo $this->id ?>" type="hidden" <?php $this->link(); ?> />

         <!-- The container to load React component -->
         <div id="wp-drag-sort-multi-image-upload-control"><?php echo(json_encode($imageControl)); ?></div>
      <?php
   }
```

### Deployment Dependencies

* This module requires Wordpress and used in Wordpress Customizer

## Authors

Contributors names and contact info

Allen Cazar 
(https://allencazar.com)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## References
* https://codex.wordpress.org/Javascript_Reference/wp.media
* https://github.com/clauderic/react-sortable-hoc
* https://developer.wordpress.org/themes/customize-api/customizer-objects/


## Acknowledgments

Inspiration, code snippets, etc.
* [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)