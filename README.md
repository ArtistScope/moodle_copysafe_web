moodle_copysafe_web
===================

Moodle module for CopySafe Web encrypted images.

By ArtistScope - http://www.artistscope.com

This copysafeweb plugin is compatible with moodle version 2.5.1

Install instructions
------------------------------

1) Copy the folder named 'copysafeweb' to moodle's module directory that is 'moodle/mod/'.

2) Set write permissions for user "apache". on the copysafewebimage folder.

3) Copy the folder named 'example' to 'moodle/lib/editor/tinymce/plugins'
   Note: The tinymce version may be different in different versions.

4) Paste the code mentioned below to the end of 'moodle/index.php' file
   
    $liburl = new moodle_url('/mod/copysafeweb/jquery.min.js');
    $copyurl = new moodle_url('/mod/copysafeweb/copy.js');
    ?>

    <script src="<?php echo $liburl; ?>" type="text/javascript"></script>
    <script type="text/javascript" src="<?php echo $copyurl; ?>"></script> 
    <?php

5) Also paste the code above to 'moodle/course/index.php' just after the "require_once" files.

6) Go to Site Administration » Notifications - Click to 'Update Moodle database now'.

7) Nominate the settings applied to all CopySafe Web pages.




Mode
---------

Here you can set mode and change it at any time for debugging purposes:

1.	Demo Mode - displays a placeholder image.
2.	Licensed Mode - displays encrypted images and activates the CopySafe Web browser plugin.
3.	Debugging Mode - displays the html used in the object tag in a text area form object.


Select Browsers
--------------------------

If you want to allow all web browsers, then all checkboxes need to be ticked.

This selection enables site owners to control who can access their protected web pages. If a browser is not allowed, then site visitors using that web browser will be redirected to a page explaining that their browser has not been permitted by the site owner. 

Browser selection is commonly used in corporate intranets where all users might be using Internet Explorer only.

 
CopySafe Web Browser Plugin Installation
---------------------------------------------------------------------

Viewing protected images displayed on a web page using a web browser requires a browser plugin. By installing the CopySafe Web browser plugin users can then access the protected pages and view encrypted images

As any visitor loads a web page displaying CopySafe Web encrypted images their browser is checked for the plugin and if it is not found they are redirected to the appropriate download page with further instructions.


Plugin Downloads
-----------------------------

This module includes the download page for the CopySafe Web plugin installers. That page currently links to the ArtistScope download site for the installer, but you are most welcome to download the installer and host it on your own web site. Note that if you are doing this, then you will have to edit the download page to point to the new location of the download file.


Customizing the Download Pages
------------------------------------------------------

Any files found in the CopySafeWeb folder that use "download" in their file name can be safely edited without affecting this module's functions.


Licensing
----------------

This Moodle module is free and as is. However you will need a license to use the CopySafe Web image encryption software. See https://www.artistscope.net/ssl/order/order_web.asp 
