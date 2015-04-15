var validation,
    formSending = false

$(function() {
  $form = $('.contact-form')
  validation = $form.validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      tel: {
        required: true
      },
      message: {
        required: true
      }
    },
    messages: {
      name: {
        required: ""
      },
      email: {
        required: "",
        email: ""
      },
      tel: {
        required: ""
      },
      message: {
        required: ""
      }
    },
    errorClass: "invalid",
    validClass: "valid",
    focusInvalid: true,
    onfocusout: function(element) {
      this.element(element)
    },
    submitHandler: function(form) {
      if (formSending != true) {
        $form.addClass('form-sending')
        formSending = true
        sendContactForm()
      }
    }
  })

  function sendContactForm() {
    var $name = $('[name="name"]', $form),
        $email = $('[name="email"]', $form),
        $tel = $('[name="tel"]', $form),
        $message = $('[name="message"]', $form),
        // to = 'info@daanscholten.nl'
        to = 'anoesjsadraee@gmail.com'

    $form.removeClass('form-error')

    // Submit the e-mail to the website owner
    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'RrgEGMPYlBUZsIWLcsp6yA',
        'message': {
          'from_email': 'no-reply@daanscholten.nl',
          'from_name': 'Contactformulier inzendingen',
          'headers': {
            'Reply-To': $email.val()
          },
          'subject': 'Nieuwe contactformulier inzending',
          'text': 'Naam: ' + $name.val() + '\nE-mail: ' + $email.val() + '\nTel: ' + $tel.val() + '\n\nBericht:\n' + $message.val(),
          'to': [
            {
              'email': to,
              'name': 'Daan Scholten',
              'type': 'to'
            }
          ]
        }
      }
    })
    .done(function(response) {
      formSending = false

      if (response[0].status == 'sent') {
        // Success: send thank you e-mail and show on screen
        $.ajax({
          type: 'POST',
          url: 'https://mandrillapp.com/api/1.0/messages/send.json',
          data: {
            'key': 'RrgEGMPYlBUZsIWLcsp6yA',
            'message': {
              'from_email': to,
              'from_name': 'Daan Scholten',
              'headers': {
                'Reply-To': to
              },
              'subject': 'Bedankt voor uw bericht',
              'text': 'Beste ' + $name.val() + ',\n\nBedankt voor uw reactie via het contactformulier op http://www.daanscholten.nl/.\nUw bericht is in goede orde ontvangen. U krijgt van mij zo snel mogelijk een reactie.\n\nMet vriendelijke groet,\nDaan Scholten' ,
              'to': [
                {
                  'email': $email.val(),
                  'name': $name.val(),
                  'type': 'to'
                }
              ]
            }
          }
        })
      
        ds.contactFormPrintResult($form, 'Bedankt voor uw bericht!', 'success')
      }

      else {
        // Fail: show on screen
        formSending = false
        ds.contactFormPrintResult($form, 'Er heeft zich een fout voorgedaan.', 'fail')
      }
    })
    .fail(function(response) {
      // Fail: show on screen
      formSending = false
      ds.contactFormPrintResult($form, 'Er heeft zich een fout voorgedaan.', 'fail')
    })

    return false
  }
}(window.jQuery, window, document))
