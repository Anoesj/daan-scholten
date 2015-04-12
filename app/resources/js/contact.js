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
    })

    .fail(function(response) {
      ds.contactFormPrintResult($form, 'Er heeft zich een fout voorgedaan.', 'fail')
    })

    return false
  }

}(window.jQuery, window, document))