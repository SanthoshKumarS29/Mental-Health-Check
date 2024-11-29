export const validateField = (name, value) => {
    const errors = {};

    switch(name) {
        case 'name':
            if(!value){
                errors[name] = 'Name Is required';
            }
            break;
        
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!value){
                errors[name] = 'Email is required'
            } else if(!emailRegex.test(value)){
                errors[name] = 'Invalid Email Address'
            }
            break;
        
        case 'password':
            if(!value){
                errors[name] = 'Password is required'
            } else if (value.length < 8){
                errors[name]='Password must be at least 6 characters'
            }
            break;
        
        case 'age':
            if(!value){
                errors[name] = 'Age is required'
            } else if (isNaN(value)){
                errors[name] = 'Number must be required'
            } else if (value.length < 2){
                errors[name] = 'Number must be 2 digits'
            }
            break
        
        default:
            break
    }
    return errors[name]
}