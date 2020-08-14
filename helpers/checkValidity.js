const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const checkValidity = (value, validator) => {
  // All fields are required by default
  if(!value) return false
  
  if(validator === 'email') {
    return emailRegex.test(value)
  }

  return true;
}