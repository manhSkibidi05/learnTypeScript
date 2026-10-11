// Ngày 3 : Events handler & Form với TypeScript 

    // -> Hôm nay bạn sẽ học cách xử lí sự kiện và xây dựng form một cách an toàn với TypeScript , bao gồm Typing event objects , controlled components và submit form

    // - Mục tiêu ngày 3 :
        // + Hiểu và sử dụng đúng Event Types trong React + TypeScript : React.ChangeEvent , React.FormEvent , React.MouseEvent...
        // + Biết cách typing event handlers trong props (callback)
        // + Xây dựng controllerd components với TypeScript : input , textarea , select , checkbox...
        // + Xử lý  form submission an toàn với preventDefault và kiểm tra dữ liệu 
        // + Thực hiện validation cơ bản và hiển thị lỗi 
        // + Nắm được các lưu ý khi làm việc với event target và generic type

// 1. Các Event Types thường dùng 

    // - Khi định nghĩa hàm xử lý khi sự kiện diễn ra với các sự kiện cần tham số event thì cần cung cấp kiểu cho tham số event này dựa trên các sự kiện khác nhau 
    // thì kiểu của event khác nhau 

        // + onChange={(e : React.ChangeEvent<HTML.InputElement>) => ...}
        // + onSubmit={(e: React.FormEvent<HTMLFormElement>) => ...}
        // + onClick={(e: React.MouseEvent<HTMLButtonElement>) => ...}
        // + onFocus={(e: React.FocusEvent<HTMLInputElement>) => ...}

// 2. Typing Event Handlers trong Props

    // - Với các hàm handler được định nghĩa ở component cha muốn truyền xuống component con thông qua props thì ở component con cần định nghĩa kiểu các hàm đó trong
    // interface hoặc type alias rõ ràng 

// 3. Controlled Component 

    // - Với các phần tử giao diện hiện thị dữ liệu dựa vào người dùng nhập ưu tiên sử dụng controlled component các dữ liệu đều được quản lý bởi useState khi gặp 
    // sự kiện thay đổi gọi hàm setState rồi cung cấp giá trị mới sau đó re-render giao diện hiện thị dữ liệu mới 

// 4. Xử lý Form Submission 

    interface FormData {
        username : string,
        email : string
    }

    import { useState } from "react"

    export function Form() : React.JSX.Element {
        const  [data , setData] = useState<FormData>({username : '' , email : ''})

        // Tham số event chỉ cần truyền lúc định nghĩa hàm handle còn khi gọi hàm handle React sẽ tự động truyền vào đối số event này 
        const formSubmit = (e : React.SubmitEvent<HTMLFormElement>) : void => {
            e.preventDefault()
            if(data.email === '' || data.username === ''){
                console.log('thieu du lieu');
            }else{
                console.log('Du lieu da duoc gui di')
            }
        }

        const formChange = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
            // as keyof FormData -> ép kiểu cho giá trị của biến field sao cho TypeScript hiểu rằng biến field là 1 trong các key đã được khởi tạo trước đó 
            // -> khi muốn làm key của 1 object đã khởi tạo sẵn lúc này chỉ tồn tại 2 key trước đó là username và email cần ép kiểu sang keyof FormData và đảm bảo
            // biến đó mang giá trị đúng là username hoặc email 
            const field = e.target.name as keyof FormData
            
            // sau đó với giá trị của biến field muốn giá trị đó làm key của 1 object cần đặt trong dấu [field] lúc này lấy giá trị của field làm key thay vì field string
            setData(prevData => ({...prevData, [field] : e.target.value}))

            // -> Thay đổi dữ liệu của 1 thuộc tính đối tượng với key là string cần ép kiểu sang là keyof interface sau đó mới có thể dùng giá trị key đó cập nhật giá trị 
        }

        return (
            <>
                <form onSubmit={formSubmit}>
                    <label htmlFor="email">Email : </label>
                    <input value={data.email} onChange={formChange} type="email" name="email"  />
                    <label htmlFor="username">UserName : </label>
                    <input value={data.username} onChange={formChange} type="text" name="username"/>
                </form>
            </>
        )
    }