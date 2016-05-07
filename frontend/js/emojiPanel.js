/**
 * Created by Ruslan on 07-May-16.
 */
'use strict';

var Component = require('./component');
var emojiPanelTEmplateFunction = require('../templates/emojilist.hbs');
var emojify = require('./emojify');

class EmojiPanel extends Component {
  constructor(options) {
    super(options);

    this._el.addEventListener('click', this._onEmojiClick.bind(this));

    this._fillWithEmoji();
  }

  get hidden() {
    return this._el.classList.contains('js-hidden');
  }

  putPanelNearButton(buttonLeft, buttonTop) {
    this._el.style.left = buttonLeft - 160 + 'px';
    this._el.style.top = buttonTop - 205 + 'px';
  }

  _fillWithEmoji() {
    var namedEmojiString = ':bowtie:,:smile:,:laughing:,:blush:,:smiley:,:relaxed:,:smirk:,:heart_eyes:,:kissing_heart:,:kissing_closed_eyes:,:flushed:,:relieved:,:satisfied:,:grin:,:wink:,:stuck_out_tongue_winking_eye:,:stuck_out_tongue_closed_eyes:,:grinning:,:kissing:,:kissing_smiling_eyes:,:stuck_out_tongue:,:sleeping:,:worried:,:frowning:,:anguished:,:open_mouth:,:grimacing:,:confused:,:hushed:,:expressionless:,:unamused:,:sweat_smile:,:sweat:,:weary:,:pensive:,:disappointed:,:confounded:,:fearful:,:cold_sweat:,:persevere:,:cry:,:sob:,:joy:,:astonished:,:scream:,:neckbeard:,:tired_face:,:angry:,:rage:,:triumph:,:sleepy:,:yum:,:mask:,:sunglasses:,:dizzy_face:,:imp:,:smiling_imp:,:neutral_face:,:no_mouth:,:innocent:,:alien:,:yellow_heart:,:blue_heart:,:purple_heart:,:heart:,:green_heart:,:broken_heart:,:heartbeat:,:heartpulse:,:two_hearts:,:revolving_hearts:,:cupid:,:sparkling_heart:,:sparkles:,:star:,:star2:,:dizzy:,:boom:,:collision:,:anger:,:exclamation:,:question:,:grey_exclamation:,:grey_question:,:zzz:,:dash:,:sweat_drops:,:notes:,:musical_note:,:fire:,:hankey:,:poop:,:shit:,:+1:,:thumbsup:,:-1:,:thumbsdown:,:ok_hand:,:punch:,:facepunch:,:fist:,:v:,:wave:,:hand:,:open_hands:,:point_up:,:point_down:,:point_left:,:point_right:,:raised_hands:,:pray:,:point_up_2:,:clap:,:muscle:,:metal:,:walking:,:runner:,:running:,:couple:,:family:,:two_men_holding_hands:,:two_women_holding_hands:,:dancer:,:dancers:,:ok_woman:,:no_good:,:information_desk_person:,:raised_hand:,:bride_with_veil:,:person_with_pouting_face:,:person_frowning:,:bow:,:couplekiss:,:couple_with_heart:,:massage:,:haircut:,:nail_care:,:boy:,:girl:,:woman:,:man:,:baby:,:older_woman:,:older_man:,:person_with_blond_hair:,:man_with_gua_pi_mao:,:man_with_turban:,:construction_worker:,:cop:,:angel:,:princess:,:smiley_cat:,:smile_cat:,:heart_eyes_cat:,:kissing_cat:,:smirk_cat:,:scream_cat:,:crying_cat_face:,:joy_cat:,:pouting_cat:,:japanese_ogre:,:japanese_goblin:,:see_no_evil:,:hear_no_evil:,:speak_no_evil:,:guardsman:,:skull:,:feet:,:lips:,:kiss:,:droplet:,:ear:,:eyes:,:nose:,:tongue:,:love_letter:,:bust_in_silhouette:,:busts_in_silhouette:,:speech_balloon:,:thought_balloon:,:feelsgood:,:finnadie:,:goberserk:,:godmode:,:hurtrealbad:,:rage1:,:rage2:,:rage3:,:rage4:,:suspect:,:trollface:';

    this._el.innerHTML = emojiPanelTEmplateFunction({
      emojis: namedEmojiString.split(',')
    });

    emojify.run(this._el);
  }

  _onEmojiClick(event) {
    var emojiContiner = event.target.closest('[data-selector="emoji-container"]');

    if (!emojiContiner) {
      return;
    }

    var emojiName = emojiContiner.dataset.emojiName;

    this._trigger('emojiSelected', emojiName);
  }
}


module.exports = EmojiPanel;