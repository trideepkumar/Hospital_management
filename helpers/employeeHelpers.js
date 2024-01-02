const isNameValid = (value) => {
    const name = value?.trim()
    if (!name?.length > 0) {
      return false
    }
    return true
  }

  const isEmailValid = (value) => {
    const email = value?.trim()
    if (!email?.length) {
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false
    }
    return true
  }

  const  isyearFoundedValid = (value) =>{
    const yearFound = value?.trim()
    if(!yearFound){
        return false
    }
    if(yearFound>2024){
        return false;
    }
    return true
  }

  const isdescriptionValid = (value)=>{
    const description = value?.trim()
    if(!description){
        return false
    }
    if(description.length <10){
        return false
    }
    return  true
  }

export const validateEmployee = (employee) => {
    console.log(employee.name,employee.email,employee.profileImage,employee.yearFounded,employee.description)
    const errors = {}
    if (!isNameValid(employee.name)) {
      errors.name = "Please enter a valid first name"
    }
    if (!isEmailValid(employee.email)) {
      errors.email = "Please enter a valid email"
    }
    if (!isdescriptionValid(employee.description)) {
        errors.description = "Please enter a valid description"
      }
    const isValid = !Object.keys(errors).length
    return {
      isValid,
      errors,
    }
  }
