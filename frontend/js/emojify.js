/**
 * Created by Ruslan on 05-May-16.
 */

emojify.setConfig({
  emojify_tag_type : 'div',
  only_crawl_id    : null,
  img_dir          : 'bower_components/emojify.js/dist/images/basic',
  ignored_tags     : {
    'SCRIPT'  : 1,
    'A'       : 1,
    'PRE'     : 1,
    'CODE'    : 1
  }
});

module.exports = emojify;