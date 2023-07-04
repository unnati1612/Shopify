import * as Yup from 'yup';


export const registerValidation = Yup.object().shape({
    name: Yup.string().trim().min(2,'Too Short').max(20, 'Too Long').required('Required'),
    email: Yup.string().email('invalid email').required('Required'),
    password: Yup.string()
        .min(5, "Too Short").required('Required'),
    confirmPass:Yup.string()
        .oneOf([Yup.ref('password'),null],"Passwords Don't Match").required('Required')
})

export const LoginValidation = Yup.object().shape({
    email: Yup.string().email('invalid email').required('Required'),
    password: Yup.string()
        .min(5, "Too Short").required('Required'),
   
})