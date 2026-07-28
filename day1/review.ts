// Bài tập thực hành 

    // 1. Khai báo các biến với đầy đủ các kiểu đã học : string , number , boolean , array (2 cách) , tuple
    // enum , any , void , null và undefined 

    const brand : string = 'sneaker';
    const years : number = 1999;
    const isOpen : boolean = true;

    const colors : string[] = ['red' , 'blue' , 'green' , 'white'];
    const sizes : Array<number> = [36 , 37 , 38 , 39 , 40];

    const shoe1 : [number , string] = [1 , 'nike jordan'];

    enum Role{
        Host = 'host',
        Customer = 'customer',
        Employee = 'employee'
    }
    const host1 : Role = Role.Host;

    let cleaner : any = 'hammer';
    cleaner = true;

    const openBrand : () => void = () => { console.log(`${brand} + ${years}`) };
    function closeBrand(state : boolean) {
        return state ? !state : state
    }

    const canBeNull : number | null = 1;
    const canBeUndefined : string | undefined = undefined;

    // 2. Viết hàm nhận chiều dài rộng trả về diện tích hcn 

    const caculateArea = (width : number , height : number) => width * height;
    
    // 3. Viết hàm nhận tên đầu và cuối nếu không có tên đầu hiện thị tên cuối 

    const getFullName = (lastName : string , firstName ?: string) => firstName ? `${firstName} ${lastName}` : lastName;

    // 4. Cố tình gán sai kiểu cho biến để hiểu cách ts báo lỗi 

    let randomNumber: number = 10;
    // randomNumber = '12' -> lỗi báo ngay

// Review ngày 1 : 

    // 1. TypeScript là gì ? ưu và nhược điểm so với js ? 
    // - TypeScript là superset của js , nó quy định các kiểu dữ liệu rõ ràng , ngôn ngữ biên dịch tĩnh , giúp phát hiện lỗi ngay 
    // lúc viết code mà chưa cần chạy.

    // - Ưu điểm là : 
        // + Viết code rõ ràng , dễ đọc và người khác đọc có thể hiểu 
        // + IDE hỗ trợ gợi ý khi viết 
        // + Dễ bảo trì dự án lớn , refactor an toàn , hỗ trợ các tính năng ES6+

    // - Nhược điểm là : 
        // + Code viết dài hơn khi viết bằng ts khi so với js
        // + Cần thêm thời gian học type system , cấu hình ban đầu 

    // 2. Các kiểu dữ liệu mới khi sử dụng ts 

        // + tuple : mảng với số lượng cố định và kiểu cố định , có thể chứa dữ liệu hỗ hợp 
        // -> sử dụng khi trả về dữ liệu cố định 

        // + enum : định nghĩa tập hợp các giá trị mặc định có liên quan tới nhau 
        // -> sử dụng khi tập các giá trị mặc định như Role , ..

        // + any : kiểu dữ liệu có thể nhận bất kì dữ liệu nào 
        // -> không nên sử dụng 

        // + void : kiểu dữ liệu dành cho hàm không trả về gì hoặc trả về undefined 
        // -> dùng khi hàm không trả về giá trị nào 

        // + Các kiểu còn lại : never(hàm không bao giờ kết thúc) , unknown (an toàn hơn any) , union (|) , intersection (&) , 
        // literal type ('red' | 'blue') -> sẽ học

    // 3. Các dấu sử dụng trong ts khác gì với js , vd : firstName ?: string , string | undefined 

        // 3.1. Optional parameter (?) 
            // - trong type script dấu ? sau tên tham số trong 1 hàm hoặc thuộc tính trong interface cho biết tham số có thể không
            // được truyền 
            // -> về bản chất ts tự thêm | undefined vào kiểu của tham số đó

        // 3.2. Union type (|)
            // - cung cấp các kiểu giá trị được phép cho 1 phần tử string | null , number | undefined 
            // -> null sử dụng gán rỗng 1 cách có chủ đích cho 1 phần tử , undefined thường dùng cho giá trị chưa được gán gì 
            // -> khi dùng string | undefined bạn không thể dùng trực tiếp phương thức của string như toUpperCase() mà chưa loại bỏ 
            // undefined . 

        // 3.3. So sánh việc sử dụng 2 cách trên 
            // - Cách 1 thường sử dụng cho tham số của hàm / thuộc tính trong interface 
            // -> cần kiểm tra dữ liệu đó khi sử dụng vì có thể là undefined 

            interface User {
                name: string;
                ages?: number;          // có thể thiếu
                email: string | null;  // phải có, nhưng có thể là null
            }
    
    // 4. Câu hỏi mở rộng 
        // 1.Khi nào bạn nên dùng null và khi nào nên dùng undefined trong dự án thực tế?
        // 2.Nếu một hàm có tham số data: string | null, làm thế nào để gọi an toàn data.toUpperCase()?
        // 3.Thử khai báo một tuple [string, number, boolean] và gán giá trị sai thứ tự xem TypeScript báo lỗi như thế nào.