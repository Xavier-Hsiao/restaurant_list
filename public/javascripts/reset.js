const resetButton = document.querySelector('.btn-reset')
const formControl = document.querySelectorAll('.form-control')

resetButton.addEventListener('click', function onClickedRest() {
formControl.forEach(input => {
  input.value = ''
  // console.log(input)
  })
  // console.log(formControl)
})




