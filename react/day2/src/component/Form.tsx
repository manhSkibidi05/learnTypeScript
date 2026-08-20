// Bài 4 : Kết hợp useState với object 
    // - Tạo form với name, email. Dùng một state object { name, email } và hàm cập nhật chung.

    import { useState } from "react";

    function Form(){
        interface User{
            name : string,
            email : string
        }

        const [user , setUser] = useState<User>({
            name : '',
            email : ''
        });

        function updateForm(data : Partial<User>) : void{
            setUser(prev => ({...prev , ...data}))
        }

        return(
            <>
                <h2>Bài 4 : Hiện thị user và cập nhật</h2>
                <p>name : {user.name.trim() === '' ? 'rỗng' : user.name} </p>
                <p>email : {user.email.trim() === '' ? 'rỗng' : user.email}</p>
                <label htmlFor="">Name</label>
                <input onChange={(e) => updateForm({name : e.target.value})} type="text" />
                <label htmlFor="">Email</label>
                <input onChange={(e) => updateForm({email : e.target.value})} type="text" />
            </>
        )
    }

    export default Form;