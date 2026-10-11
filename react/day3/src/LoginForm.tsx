// Bài 1 : Component LoginForm 
    import { useState } from "react"

    interface FormData {
        email : string,
        password : string
    }

    function LoginForm() : React.JSX.Element {
        const [data , setData] = useState<FormData>({email : '' , password : ''});
        const [error , setError] = useState<FormData>({email : '' , password : ''});

        const validateEmail = (email : string) : boolean => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        const validatePassword = (password : string) : boolean => {
            if(password.length < 6) return false
            return true
        }

        const submitForm = (e : React.SubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            if(data.email === ''){
                setError(prevData =>({...prevData  , email : 'Email không được để trống'})); 
                return
            } 
            if(data.password === ''){
                setError(prevData =>({...prevData , email : '' ,password : 'Password không được để trống'}));
                return
            }
            if(!validateEmail(data.email)){
                setError(prevData =>({...prevData  , email : 'Email nhập sai form' , password : ''}));    
                return         
            }
            if(!validatePassword(data.password)){
                setError(prevData =>({...prevData , password : 'Password phải có tối thiểu 6 kí tự'}));
                return
            }
            setError({email : '' , password : ''});
            console.log(`Dữ liệu hiện tại là : ${data.email} và ${data.password}`);
            
        }

        const changeForm = (e : React.ChangeEvent<HTMLInputElement>) => {
            const keyForm = e.target.name as keyof FormData;
            setData(prevData => ({...prevData , [keyForm] : e.target.value}))
        }

        return(
            <>
                <form onSubmit={submitForm} action="">
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" value={data.email} onChange={changeForm}/>
                    {error.email !== '' && <p>{error.email}</p>}
                    <label htmlFor="password">Password : </label>
                    <input type="password" name="password"  value={data.password} onChange={changeForm}/>
                    {error.password !== '' && <p>{error.password}</p>}
                    <button type="submit">Gửi</button>
                </form>
            </>
        )
    }

    export default LoginForm
