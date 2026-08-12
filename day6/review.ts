// Review ngày 6 : 

// - Câu hỏi ôn tập : 

    // 1. Kiểu dữ liệu cơ bản nào trong TypeScript khác với JavaScript 
        // + tuple : mảng với số lượng phần tử cố định , kiểu dữ liệu của các phần tử cố định 
        // + mảng : mảng trong TypeScript chỉ nhận 1 kiểu dữ liệu cho các phần tử trong mảng khác với JavaScript 
        // + enum : tạo ra kiểu mặc định , khi biến chỉ bao gồm các giá trị nhất định và chỉ thay đổi giá trị nằm trong giá trị được quy định
        // + union : kiểu cho phép 1 biến có thể nhận 1 trong nhiều kiểu quy định cách nhau bởi dấu |
        // + literal : kiểu cho phép nhận 1 chuỗi cố định làm kiểu 
        // + undefined/null : kiểu này cho biến có thể nhận null/undefined làm dữ liệu 
        // + void : sử dụng làm kiểu trả về cho 1 hàm với trường hợp hàm không trả về gì 
        // + never : Đại diện cho tập hợp rỗng các giá trị - không có giá trị nào kiểu never -> sử dụng với các hàm chỉ trả về lỗi/ hàm lặp vô tận
        // + unknown : Kiểu an toàn dành cho các giá trị chưa biết kiểu , nó buộc bạn phải kiểm tra kiểu trước khi sử dụng 
        // + any : kiểu có thể là bất kì kiểu nào , không nên dùng làm mất tính chất của TypeScript
        // -> so sánh unknown vs any : any tắt toàn bộ kiểm tra kiểu có thể truy cập bất kì thuộc tính nào mà không báo lỗi , unknown không cho
        // phép thao tác trực tiếp bắt buộc phải kiểm tra hoặc ép kiểu mới sử dụng được thuộc tính .

    // 2. Interface và Type alias khác nhau thế nào ? Khi nào bạn dùng cái nào  
        // + interface : định nghĩa 1 object với các thuộc tính và kiểu dữ liệu của thuộc tính đó 
        // -> Đặc điểm : 
            // + 1 có thể kế thừa nhiều interface khác nhau
            // + có thể merge (gộp) các interface khi khởi tạo với cùng tên 
            // + các thuộc tính có thể có thêm các đặc điểm như : readonly , optional
        // -> Dùng khi nào :
            // + Interface : mở rộng tự nhiên (extends) , có thể merge -> phù hợp để định nghĩa API , thư viện , hoặc khi cần mở rộng 

        // + type alias : định nghĩa kiểu dữ liệu mới dựa trên các kiểu đã có sẵn vd : object , union , function...
        // -> Đặc điểm : 
            // + có thể sử dụng toán tử & đối với các type mang kiểu union để tạo ra type mới
            // + type alias là duy nhất chi khởi tạo 1 lần với 1 tên 
            // + có thể khởi tạo nhanh kiểu object trong các hàm với tham số truyền vào là 1 object 
        // -> Dùng khi nào :
            // + Type : linh hoạt hơn , có thể tạo union , tuple , intersection , mapped types , conditional types -> phù hợp với khi cần 
            // kết hợp nhiều kiểu , tạo utility types hoặc mô tả các kiểu phức tạp 

        // -> Trong React thường sử dụng interface cho Props (vì có thể extends khi cần) , nhưng type cũng được sử dụng rộng rãi . Không có
        // quy tắc cứng nhắc , nhưng hãy chọn sao cho code dễ đọc và dễ mở rộng 

    // 3. Generics là gì ? khi nào cần sử dụng nó ? 
        // - Generics là : kĩ thuật để định nghĩa các object/function/array với kiểu dữ liệu dựa vào kiểu do người dùng truyền vào
        // khi khởi tạo các object/function/array đó mà không làm mất kiểu
        // - Cú pháp : tenBien<T> 
            // -> T đóng vai trò là tham số kiểu nó sẽ dựa vào kiểu dữ liệu truyền vào sau đó 
        // - Dùng khi nào : 
            // + khi có thể tái sử dụng function/object/array với nhiều kiểu dữ liệu khác nhau thay vì phải định nghĩa lại
            // + khi xây dựng cấu trúc dữ liệu tổng quát 
            // + khi chưa biết trước kiểu dữ liệu truyền vào và không làm mất kiểu 

    // 4. Tại sao update(id : number , updateData : Partial<T>) lại dùng Partial ? 
        // - Partial là : utility type kiểu tiện ích đã được định nghĩa sẵn , sử dụng với kiểu 1 object định nghĩa tất cả các thuộc tính
        // trong object đó thành optional (có thể có hoặc không)
        // -> Tạo sao hàm update trên lại dùng Partial : Vì khi cập nhật 1 dữ liệu kiểu object có thể chỉ thay đổi một vài trường nhất
        // định nên sử dụng Partial thì cho phép không cần truyền vào toàn bộ trường mà kiểu object đó đang sở hữu 

    // 5. Type guard là gì ? các loại type guard thường sử dụng là ?
        // - Type Guard là : kĩ thuật xác định kiểu dữ liệu cho 1 biến chưa xác định kiểu dữ liệu để tạo ra 1 vùng cho phép sử dụng thuộc
        // tính và phương thức của kiểu đó 1 cách an toàn
        // - Các loại type guard là :
            // + typeof +tenBien : trả về kiểu dữ liệu cho 1 biến -> sử dụng khi cần xác định kiểu dựa trên dữ liệu truyền vào
            // + theHien+ instanceof +class : trả về true/false -> sử dụng khi cần xác định 1 thế hiện có phải được khởi tạo từ class này không
            // + thuocTinh+ in +object : trả về true/false -> sử dụng khi cần xác định 1 thuộc tính có nằm trong object không 
            // + Tự định nghĩa hàm với kiểu trả về là : parameter is type -> sử dụng khi cần cấu trúc linh hoạt 

    // 6. Làm thể nào để tạo mapped type chỉ lấy các thuộc tính có kiểu string từ Task 

        type OnlyTaskString<T> = {
            [K in keyof T as T[K] extends string ? K : never ] : T[K]
        }
        // -> Giải thích cấu trúc của type trên : 
            // + [K in keyof T] : duyệt toàn bộ key (tên thuộc tính) bên trong 1 object 
            // + từ khóa as : khi dùng bên trong cấu trúc type as giúp đổi tên key 
            // + T[K] extends string : biểu thức này giúp kiểu dữ liệu của K nó có phải tập con của string hoặc chính string hay không trả về true/false
            // + as T[K] extends ? K : never : tổng quát biểu thức này sẽ đổi tên dựa vào kiểm tra kiểu dữ liệu của K , nếu true
            // giữ nguyên tên khóa K nếu false nhận never và khi K = never -> loại bỏ thuộc tính này  
    // 7. Cách lấy kiểu từ parameter của 1 hàm và kiểu của trả về từ 1 hàm 
        
        function greet(name : string , age : number , phoneNumber : number) : string{
            return `Hello , my name is ${name} . I am ${age} years old . My phone number is ${phoneNumber}`;
        }

        type ParameterGreet = Parameters<typeof greet>;
        type ReturnTypeGreet = ReturnType<typeof greet>;

// - Bài tập thực hành : 

    
