/**
 * HOOKS
 */

/**
 * Implements hook_field_widget_form().
 */
function og_field_widget_form(form, form_state, field, instance, langcode, items, delta, element) {
  try {
    //console.log(field);
    //console.log(instance);
    switch (instance.widget.type) {
      case 'og_complex':
        // Just forward this widget to the entity reference module.
        entityreference_field_widget_form(form, form_state, field, instance, langcode, items, delta, element);
        break;
      default:
        console.log('og_field_widget_form - unknown widget type (' + instance.widget.type + ')');
        return;
        break;
    }
  }
  catch (error) { console.log('og_field_widget_form - ' + error); }
}

/**
 * Implements hook_assemble_form_state_into_field().
 */
function og_assemble_form_state_into_field(entity_type, bundle,
  form_state_value, field, instance, langcode, delta, field_key) {
  try {
    // Just forward this field's assembly to the entity reference module.
    return entityreference_assemble_form_state_into_field(entity_type, bundle,
      form_state_value, field, instance, langcode, delta, field_key);
  }
  catch (error) { console.log('entityreference_assemble_form_state_into_field - ' + error); }
}
 
/**
 * SERVICES
 */
function og_user_groups(uid, options) {
  try {
    options.method = 'GET';
    options.path = 'user/' + uid + '/groups.json';
    options.service = 'user';
    options.resource = 'groups';
    Drupal.services.call(options);
  }
  catch (error) { console.log('og_user_groups - ' + error); }
}
/**
 * Services og_user_join
 */
 
function og_user_groups_join(options) {
  try {
      options.method = 'POST';
    options.path = 'og/join.json';
     options.service = 'join';
    options.resource = 'og';
    console.log('join');
    Drupal.services.call(options);
  }
  catch (error) { console.log('og_user_groups_join - ' + error); }
  }
  /**
   * hook_field_formatter_view
   * for og_subscribe_link
   */
   
 function og_ui_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) 
  {
  //dpm(entity);
     try {
    var element = {};
    var user_id=Drupal.user.uid;
        var entity_id=entity.vid;
// args for join
    $.each(items, function(delta, item) {
    var join_leave={uid:user_id,gid:entity_id};
      var joinargs={
                           data:JSON.stringify(join_leave),
                      success:function(result){
                     // console.log(result);
                      if(result.id)
                      {
                      alert('You Succesfully Subscribed this Group');}
                      else if(result=='Already Subscribed'){
                      alert(result);
                      }
                  }
         };
        var title = item.title ? item.title : item.url
       // console.log('title is::::'+title);
        element[delta] = {
          markup: theme(
            'button',
            { text: 'Subscribe', attributes:{onclick:og_user_groups_join(joinargs)}}
          )
        };
    });
    return element;
  }
  catch (error) { console.log('og_ui_field_formatter_view - ' + error); }
}
