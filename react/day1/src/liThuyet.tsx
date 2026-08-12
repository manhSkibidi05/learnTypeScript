// Giai đoạn 2 : React + TypeScript cơ bản 
    // -> Giai đoạn này bạn sẽ học cách áp dụng tất cả kiến thức TypeScript đã có vào việc xây dựng component React , typing props ,
    // state , events ... Một cách an toàn và chuyên nghiệp

// Ngày 1 : Component & Props với TypeScript 

    // - Mục tiêu ngày 1 : 
        // + Khởi tạo được dự án React + TypeScript 
        // + Hiểu cách typing một functional component (không dùng React.FC một cách mù quáng biết nhược điểm)
        // + Thành thạo việc định nghĩa interface/type alias cho Props bao gồm các trường hợp : 
            // - Props cơ bản (string , number , boolean)
            // - Props là object , array , union type
            // - Props optional (?) và default value
            // - Props children
        // + Biết cách sử dụng destructuring props kết hợp với TypeScript 
        // + Nhận thức lợi ích của TypeScript trong việc phát hiện lỗi thiếu props , sau kiểu ngay khi viết code

// 1. Khởi tạo dự án 
    // - Mở terminal và chạy lệnh : npm create vite@latest tenFolder -- --template react-ts
    // -> Bạn sẽ thấy cấu trúc quen thuộc nhưng các file có đuôi .tsx (thay vì .jsx). Mở App.tsx đây là component React đầu tiên với TypeScript

// 2. Typing Function Component 
    // - Định nghĩa : Function Component là hàm thuần khiết chỉ nhận vào props và trả về phần tử JSX 
        // + props : đối tượng nhận vào các thuộc tính chứa dữ liệu cần thiết được truyền xuống từ phần từ cha 
        // + Phần tử JSX : là các phần tử có cấu trúc thẻ giống thẻ html , các phần tử này nhận các thuộc tính với cấu trúc camelCase 
        // với value nhận vào 1 chuỗi hoặc 1 biểu thức TypeScript đặt trong dấu {} có thể là : function ,number ...
    
    // - Khai báo function component với TypeScript :  function declaration hoặc arrow function 
        // - Cách 1 : Không điển kiểu trả về hoặc kiểu trả về là React.JSX.Element

        import React from "react"

        const Func1 = () : React.JSX.Element => {
            return <div>Hello</div>
        }
        <Func1></Func1>

        function Func2(){
            return <div>Streamer</div>
        }
        <Func2></Func2>
        // -> Kiểu trả về của các function component này là React.JSX.Element : Vì 1 function component luôn phải trả về 1 phần tử JSX của React.
        // -> Bạn có thể không cần chỉ định rõ vì TypeScript có thể tự suy luận kiểu trả về , nhưng nên có để rõ ràng

        // - Cách 2 : Kiểu trả về là React.FC (Functional component)

        const Func3 : React.FC = ()  => {
            return <div>Nà ná nà na</div>
        }
        <Func3></Func3>
        // - React.FC : Giúp tự động định nghĩa kiểu trả về và thêm children vào props (ngay cả khi không sử dụng)
        // -> Hiện nay không khuyến khích sử dụng React.FC vì : 
            // + Luôn ngầm định có children , dễ gây hiểu lầm 
            // + Khó áp dụng với generic component 
            // + Không hỗ trợ tốt default props 
        // -> Khuyên dùng cách 1 với kiểu trả về là JSX element hoặc để cho TypeScript tự suy luận 

// 3. Typing Props 
    // - Props : Là 1 object được truyền vào làm tham số đầu tiên trong 1 function component 
    // -> Cần định nghĩa kiểu của object cho props bằng Type alias hoặc Interface 

    interface GreetProps {
        name : string ,
        age : number
    }
    
    function Greet(props : GreetProps) : React.JSX.Element {
        return (
            <div>
                <h1>Xin chào</h1>
                <p>Tên : {props.name}</p>
                <p>Tuổi : {props.age}</p>
            </div>
        )
    }

    // Khi sử dụng 
    <Greet name='nam' age={20}></Greet>

    // - Children Props : khác với các thuộc tính khác nằm trong prop được truyền dữ liệu bằng các thuộc tính nằm trên thẻ function component
        // -> children props được truyền dữ liệu nằm giữa thẻ đóng và mở của thẻ tạo ra từ function component và dữ liệu mà children có thể nhận bao gồm JSX element , string , number , null , undefined , mảng...
        // -> kiểu dữ liệu mà children nhận khi định nghĩa với interface/type là React.ReactNode là kiểu bao quát cho children (có thể string , number , JSX , null , undefined , boolean , mảng...)

    interface ValiProps {
        name : string,
        password : number,
        children : React.ReactNode
    }
    
    function Vali({name , password , children} : ValiProps) : React.JSX.Element {
        return (
            <div>
                <h1>Dữ liệu vali : </h1>
                <p>Tên : {name}</p>
                <p>Mật khẩu : {password}</p>
                <div>
                    <p>Chi tiết : </p>
                    {children}
                </div>
            </div>
        )
    }

    <Vali name='moy' password={250053} >
        <ul>
            <li>Quần áo</li>
            <li>Giày dép</li>
            <li>Máy tính</li>
        </ul>
    </Vali>

// 4. Props với kiểu phức tạp 
    // - Các thuộc tính trong Props có thể mang nhiều kiểu dữ liệu đa dạng khác nhau : function , array , union , JSX...
    // - Vd : 

    interface CircleProps {
        banKinh : number,
        chuVi : (bk : number) => number ,
        hienThi : React.ReactNode
    }

    function Circle(props : CircleProps) : React.JSX.Element {
        return (
            <div>
                <p>Bán kính : {props.banKinh}</p>
                <p>Chu vi : {props.chuVi(props.banKinh)}</p>
                <p>Hình : {props.hienThi}</p>
            </div>
        )
    }

    // Khi sử dụng 
    <Circle banKinh={10} chuVi={(bk) => bk * Math.PI} hienThi="Hình tròn"></Circle>

// 5. Default Props 
    // - Trong function component , bạn có thể gán giá trị mặc định trực tiếp khi destructuring 

    interface SayHiProps {
        name : string,
        phoneNumber ?: number
    }
    function SayHi({name , phoneNumber = 5678} : SayHiProps){
        return <h1>My nam is {name} . This is my phone number {phoneNumber}</h1>
    }

    <SayHi name='Chắc là không giòn đâu'></SayHi>

