var validation
$(function() {

  $form = $('.contact-form')
  validation = $form.validate({
    debug: true,
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
      sendContactForm()
    }
  })

  function sendContactForm() {
    var $name = $('[name="name"]', $form),
        $email = $('[name="email"]', $form),
        $tel = $('[name="tel"]', $form),
        $message = $('[name="message"]', $form)

    $.ajax({
      type: 'POST',
      url: 'https://mandrillapp.com/api/1.0/messages/send.json',
      data: {
        'key': 'RrgEGMPYlBUZsIWLcsp6yA',
        'message': {
          'from_email': $email.val(),
          'from_name': $name.val(),
          'headers': {
            'Reply-To': $email.val()
          },
          'subject': 'Website contactformulier inzending',
          'text': 'Naam: ' + $name.val() + '\nE-mail: ' + $email.val() + '\nTel: ' + $tel.val() + '\n\nBericht:\n' + $message.val(),
          'to': [
            {
              'email': 'info@daanscholten.nl',
              'name': 'Daan Scholten',
              'type': 'to'
            }
          ]
        }
      }
    })
    
    .done(function(response) {
      ds.contactFormPrintResult($form, 'Bedankt voor uw bericht!', 'success')
      $name.val('')
      $email.val('')
      $tel.val('')
      $message.val('')

      $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': 'RrgEGMPYlBUZsIWLcsp6yA',
          'message': {
            'from_email': 'info@daanscholten.nl',
            'from_name': 'Daan Scholten',
            'headers': {
              'Reply-To': 'info@daanscholten.nl'
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
    })

    .fail(function(response) {
      ds.contactFormPrintResult($form, 'Er heeft zich een fout voorgedaan.', 'fail')
    })

    return false
  }

}(window.jQuery, window, document))