// Review ngày 1 : Định nghĩa Function component với TypeScript 

// - Câu hỏi ôn tập 

    // 1. Tại sao không nên lạm dụng React.FC ? hãy nêu ít nhất hai lý do 
    // - React.FC : Kiểu trả về dành cho Function Component và luôn có thuộc tính children sẵn trong props 
    // -> Không nên lạm dụng React.FC vì :
        // + có những component không sử dụng tới children gây lãng phí tài nguyên
        // + React.FC không hỗ trợ tốt generic component -> trả nên phức tạp với React.FC
        // + Reacr.FC thường được dùng với default parameter với class component nhưng khi dùng function component chỉ cần
        // thêm default param khi destructuring các thuộc tính của props 
    
    // 2. Khi định nghĩa Props , bạn nên dùng interface hay type ? Vì sao ? 
    // -> Dùng cả interface vào type đều được vì : 
        // + interface có khả năng merging giúp gộp các interface cùng tên lại và khả năng extends từ interface khác 
        // + type với khả năng định nghĩa các kiểu phức tạp union , intersection hoặc các kiểu phức tạp từ utility types
    
    // 3. children trong Props có kiểu gì ? Nêu ít nhất 2 kiểu có thể dùng cho  children 
    // - children trong Props có đa dạng kiểu có thể là number , string , JSX ...
    // -> Kiểu dùng cho children khi định nghĩa interface là :
        // + React.ReactNode -> là kiểu tổng quát nhất cho phép nhận đa dạng kiểu dữ liệu khác nhau : string , number , ReactElement...
        // + React.JSX.Element -> chỉ nhận kiểu là phần tử JSX không nhận string , number...
    // -> nên sử dụng kiểu React.ReactNode trong hầu hết các trường hợp
    
    // 4. Làm thế nào để định nghĩa một Props có callback function nhận vào 1 object trả về void
    // - Định nghĩa 1 thuộc tính mang kiểu hàm trong interface 
    // - vd : 
        interface Bullet{
            id : number,
            name : string
        }
        export interface Props {
            onSelect : (bullet : Bullet) => void
        }
        
    // 5. Khi một Props là isActive ?: boolean , làm thế nào để đặt giá trị mặc định là true 
    // - Để đặt giá trị mặc định của thuộc tính của props cần destructuring giúp phân giải các thuộc tính ra sau đó đặt dấu bằng bên 
    // cạnh gán bằng giá trị mặc định 
    // -> {isActive = true}

    // 6. Giả sử bạn có component <Button size='small' /> . Làm thể nào để giới hạn size chỉ nhận 'small' | 'medium' | 'large'
    // -> Lúc định nghĩa thuộc tính size ở interface của Props component này thì nên đặt kiểu thuộc tính size là literal với
    // 3 lựa chọn trên . Nên khi truyền dữ liệu thì cần phải truyền dữ liệu dựa trên kiểu đã được định nghĩa này 

// - Định nghĩa kiểu thuộc tính là 1 callback function 

    // 1. Định nghĩa function bên trong interface 
    import React from "react"

    interface CircleProps {
        banKinh : number,
        chuVi : (bk : number) => number; // function property : thuộc tính này mang kiểu là 1 hàm 
        hienThi : React.ReactNode;
    }

    // - Giải thích : 
        // + chuVi : Là một thuộc tính của interface nhưng kiểu dữ liệu của nó là một function type 
        // + Cú pháp : (bk : number) => number chỉ ra : 
            // + hàm nhận 1 tham số bk kiểu là number
            // + hàm trả về 1 giá trị kiểu number 
    // -> Bất kì object nào mang kiểu CircleProps thì đều phải có thuộc tính chuVi là một function đúng chữ ký đó

    // - Lưu ý : Tham số bk không bắt buộc phải trùng khi bạn truyền hàm thực tế , chỉ cần truyền đíng kiểu dữ liệu 

    // 2. Gọi function trong component 

    function Circle(props : CircleProps) : React.JSX.Element {
        return (
            <div>
                <p>Bán kính : {props.banKinh}</p>
                <p>Chu vi : {props.chuVi(props.banKinh)}</p>
                <p>Hình : {props.hienThi}</p>
            </div>
        )
    }

    // - Giải thích : 
        // + component Circle nhận vào props có kiểu là CircleProps
        // + bên trong JSX , chúng ta gọi props.chuVi(props.banKinh)
            // - props.chuVi : là hàm đã được truyền từ bên ngoài 
            // - props.banKinh :  được truyền làm đối số 
            // - kết quả được hiện thị ở thẻ p

    // 3. Định nghĩa hàm khi sử dụng component 

    <Circle 
        banKinh={10}
        chuVi={(bk) => bk * Math.PI}
        hienThi='hình tròn'
    ></Circle>

    // - Giải thích : 
        // + Khi sử dụng component , bạn truyền một arrow function cho prop chu vi 
        // + Arrow function : (bk) => bk * Math.PI : 
            // - Nhận tham só bk (sẽ nhận giá trị props.banKinh khi được gọi ở component)
            // - Trả về bk * Math.PI
    // -> Như vậy hàm được định nghĩa tại nơi sử dụng và được truyền xuống component như 1 callback 

    // 4. Tóm tắt luồng hoạt động 
        // + khai báo kiểu cho prop chuVi hàm 1 hàm nhận number và trả về number
        // + khi định nghĩa component bạn gọi hàm đó và cần truyền vào number và trả về number 
        // + khi render lúc này mới định nghĩa hàm dựa trên kiểu đã định nghĩa trước đó vẫn giữ kiểu nhận number và trả về number
        // + React lưu hàm đó vào props.chuVi và khi component chạy truyền hàm đó vào nơi props.chuVi được gọi và thực thi hàm

    // 5. Lợi ích dùng function property 
        // + Linh hoạt : Bạn có thể định nghĩa các hàm với cấu trúc khác nhưng vẫn giữ nguyên kiểu là nhận vào number và trả về number
        // + Tái sử dụng : Khi định nghĩa component chỉ cần gọi hàm mà không cần biết công thức cụ thể 

