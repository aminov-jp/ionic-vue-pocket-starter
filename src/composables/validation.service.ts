export function inputValidation() {
  const validateEmail = (inputText: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (inputText.match(regex)) {
      return true;
    } else {
      return false;
    }
  };
  const validatePassword = (inputText: string, confirmText:string) => {
    if(inputText!==confirmText){
      return false;
    }
    if(inputText.length < 7 ){
      return false;
    }
    return true;
  }
  return {
    validateEmail,
    validatePassword
  };

}