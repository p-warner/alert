# alert
Drupal Campus Alert system that uses the Omnialert RSS feed to display messages.

Using Omnialert campus alert system this module will use Drupal's Block system to make an alert block available for all Content Types. The alert block is visually hidden and is only displayed when an Omnialert is issued. Once issues the block will add a message to the top of a page with an appropriate title, description, and link for more information about the emergency. E.g. Snow closing message will display on all pages on a website when Administration issues an Omnialert.

The block uses the standard Drupal Cache API and is Varnish friendly. The block will display even when pages are served through Varnish. 
