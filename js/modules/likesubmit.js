(function LikeSubmitModule(){
  var featureContainer = document.getElementById('feature-like-journal')

  if (featureContainer) {
    var likeform = featureContainer.querySelector('#like-form')
    var submitIcon = likeform.querySelector('.submit')

    submitIcon.onclick = function(){
      // HTMLFormElement.prototype.requestSubmit helps with applying a form submit event emitter on any element besides button and input
      // It does trigger a submit event (HTMLFormElement.prototype.submit does not)
      likeform.requestSubmit()
    }

    if (typeof window.fetch === 'function') {
      likeform.onsubmit = function(e){
        e.preventDefault()

        submitIcon.onclick = null
        submitIcon.classList.remove('icon-bubble-love-streamline-talk')
        submitIcon.classList.remove('font-big')
        submitIcon.textContent = 'Thanks :)'

        formData = {
          method: likeform.method,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: new URLSearchParams(new FormData(likeform)).toString()
        }
        // send the form
        fetch('/', formData)
          .catch(function(resp, a){
            var interval = null
            var retries = 0

            interval = setInterval(function() {
              if (retries === 10) {
                clearInterval(interval)
              } else {
                retries = retries + 1
                fetch('/', formData)
                  .then(function(){
                    clearInterval(interval)
                  })
              }
            }, 7500)
          })
        
      }
    }
  }

})();