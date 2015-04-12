$(function() {

  $form = $('.contact-form')
  $form.validate({
    debug: true,
    submitHandler: function(form) {
      sendContactForm()
    }
  })

  function sendContactForm() {
    var $name = $('input[name="name"]', $form),
        $email = $('input[name="e-mail"]', $form),
        $tel = $('input[name="tel"]', $form),
        $message = $('input[name="message"]', $form)

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
              'email': 'anoesjsadraee@gmail.com',
              'name': 'Anoesj Sadraee',
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