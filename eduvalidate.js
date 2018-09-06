/******************************/
/***** GLOBAL VARIABLES  *****/
/***** FOR CSS AND TEXT  *****/
/******************************/

// Notification message to be shown to user when validation fails
$notificationEduValidation = 'Your email address should be on educational domain such as .edu, .ac, or .sch.co.uk';

// CSS style
$myStyle= '<style>.eduValidationTooltipText {color:white;padding:5px 10px 5px 10px;position: relative;background:#333;border: 4px solid #c2e1f5;}.eduValidationTooltipText:after, .eduValidationTooltipText:before {bottom: 100%;left: 25%;border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}.eduValidationTooltipText:after {border-color: rgba(97, 51, 68, 0);border-bottom-color: #613344;border-width: 10px;margin-left: -10px;}.eduValidationTooltipText:before {border-color: rgba(194, 225, 245, 0);border-bottom-color: #c2e1f5;border-width: 16px;margin-left: -16px;}</style>';

// Adding css style dynamically to head of html
$('head').append($myStyle);

/******************************/
/***** REGISTER PAGE FORM *****/
/******************************/

//submit button is disabled by default
$(":input[name='edd_register_submit']").attr('disabled',true);

// adding tooltip to email input
$( "#edd-user-email" ).after('<div class="eduValidationTooltip"><span class="eduValidationTooltipText">'+$notificationEduValidation+'</span></div>');

// hiding tooltip by default
$( ".eduValidationTooltip" ).hide();

 $( document ).on( "change", '#edd-user-email',function() {
    // default value for .edu,.ac, .sch.co.uk validation
    $domainCheckPassed = 0;

    // getting email value in the form
    var emailValue = $('#edd-user-email').val();

    // split the email text according to dot
    $emailParts = emailValue.split('.');

    // $emailParts[$emailParts.length-1] is the last part of the email after the last dot
    if (($emailParts[$emailParts.length-1] == 'edu')||($emailParts[$emailParts.length-1] == 'ac'))
        {
            $domainCheckPassed = 1;
        }  else if ( $emailParts.length>3)
        // we are checking whether the domain has multiple dots in the domain as we will check whether the end part is equal to .sch.co.uk or not
              {
                if ('.'+$emailParts[$emailParts.length-3]+'.'+$emailParts[$emailParts.length-2]+'.'+$emailParts[$emailParts.length-1] == '.sch.co.uk')
                {
                  $domainCheckPassed = 1;
                }
              }
    // if it can't validate the above rules , it will prevent the form to be sent and it will show the notification below to the user.
    if (!$domainCheckPassed)
        {
        $(":input[name='edd_register_submit']").attr('disabled',true);
        $( ".eduValidationTooltip" ).show();
      }else {
        $( ".eduValidationTooltip" ).hide();
        $(":input[name='edd_register_submit']").attr('disabled',false);
      }

  });

/***********************************/
/***** FOR CHECKOUT PAGE FORMS *****/
/***********************************/

// form is loaded by ajax,so we are waiting ajax to be completed
  $( document ).ajaxComplete(function( event, request, settings ) {
      //submit button is disabled by default
        $(":input[name='edd-purchase']").attr('disabled',true);

        // adding tooltip to email input
        $( "#edd-email" ).after('<div class="eduValidationTooltip"><span class="eduValidationTooltipText">'+$notificationEduValidation+'</span></div>');

        // hiding tooltip by default
        $( ".eduValidationTooltip" ).hide();

  });

$( document ).on( "focus", "input[name!='edd_email']", function() {


      // default value for .edu,.ac, .sch.co.uk validation
      $domainCheckPassed = 0;

      // getting email value in the form
      var emailValue = $("input[name='edd_email']").val();

      if (emailValue != '') {

      // split the email text according to dot
      $emailParts = emailValue.split('.');

      // $emailParts[$emailParts.length-1] is the last part of the email after the last dot
      if (($emailParts[$emailParts.length-1] == 'edu')||($emailParts[$emailParts.length-1] == 'ac'))
          {
              $domainCheckPassed = 1;
          }  else if ( $emailParts.length>3)
          // we are checking whether the domain has multiple dots on the domain as we will check whether the end part is equal to .sch.co.uk or not
                {
                  if ('.'+$emailParts[$emailParts.length-3]+'.'+$emailParts[$emailParts.length-2]+'.'+$emailParts[$emailParts.length-1] == '.sch.co.uk')
                  {
                    $domainCheckPassed = 1;
                  }
                }
      // if it can't validate the above rules , it will put the cursor to the email input text after giving notification
      if (!$domainCheckPassed)
          {
          $(":input[name='edd-purchase']").attr('disabled',true);
          $( ".eduValidationTooltip" ).show();
        }else {
          $( ".eduValidationTooltip" ).hide();
            $(":input[name='edd-purchase']").attr('disabled',false);
        }
          }
    });
