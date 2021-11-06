const deleteButtons = document.querySelectorAll('.btn-delete')

deleteButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const id = deleteButtons.dataset.id
    //sweetalert message displays here
    Swal.fire({
      icon: 'question',
      title: 'You really want to delete this one?',
      text: 'Click the button to proceed...',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Kill it',
      denyButtonText: `I regret`
    }).then(result => {
      //confirmed that the restaurant is deleted
      if(result.isComfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          footer: '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Click me to get your reward!</a>'
        })
      } else if(result.isDenied) {
        axios('/')
      }
     //delete the restaurant after getting result
    }).then(result => {
      axios.delete(`/restaurants/${id}`)
        .then(() => window.location = '/')
        .catch(err => console.log(err))
    })
  })
})