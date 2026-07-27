// Ngày 1 : Làm quen với type script

    // Mục tiêu ngày 1 : 
        // + Hiểu TypeScript là gì , tại sao nên dùng 
        // + Cài đặt và chạy ts trên máy 
        // + Nắm vững các kiểu dữ liệu cơ bản : string , number , boolean , array , tuple , enum , any , void , null , undefined 
        // + Biết cách khai báo kiểu cho biến và hàm đơn giản 
        // + Nhận biết lỗi type và cách TypeScript báo lỗi khi biên dịch 

// 1. TypeScript là gì ? 

    // - TypeScript là một siêu tập hợp (superset) của JavaScript , do microsoft phát triển . Nó thêm hệ thống kiểu tĩnh (static typing) vào js giúp phát hiện 
    // lỗi khi viết code (compile time) thay vì lúc chạy (runtime) . Code typescript được biên dịch (transpile) thành JavaScript thuần để chạy trên trình duyệt
    // hoặc Node.js 

    // - Lợi ích : 
        // + Tránh lỗi undefined , sai kiểu dữ liệu 
        // + Dễ bảo trì , refactor code 
        // + Hỗ trợ các tính nănh ES6+ và decoractor

// 2. Cài đặt môi trường : Vite + React + TypeScript

// 3. Các kiểu dữ liệu cơ bản : ts có các kiểu dữ liệu nguyên thủy tương tự js nhưng được khai báo rõ ràng 

    // + string 
    let fullName : string = 'Phạm thành khang';
    let greeting : string = `hello ${fullName}`;

    // + number 
    let age : number = 25;
    let price : number = 9.1;
    let hex : number = 0xff;

    // + boolean 
    let isActive : boolean = true;
    let isCompleted : boolean = false;

    // + array : 2 cách viết 
    let hobbies : string[] = ['game' , 'code'];
    let numbers : Array<number> = [1 , 3, 5];

    // + tuple : mảng với số lượng cố định và kiểu dữ liệu cố định của phần tử ở vị trí được định nghĩa 
    let person : [string , number] = [fullName , age];
    // [age , fullName] -> lỗi 

    // + enum : tập hợp các hằng số có tên 
    enum Role {
        Admin , 
        User ,
        Guest 
    }
    let myRole : Role = Role.Admin // mặc định Admin = 0 , User = 1 , Guest = 2 

    // + any : tắt kiểm tra kiểu (hạn chế dùng) 
    let something : any = 5 ;
    something = 'hello'; // không sai 

    // + void : thường sử dụng cho hàm không trả về giá trị 
    function sayHello() : void {
        console.log('say hi');
    }

    // + null và undefined : có thể gán cho các kiểu khác nếu strictNullCheck = false (trong tsconfig.json) , nhưng thường nên để strict 
    let maybeNull : string | null = null;
    let maybeUndefined : number | undefined; 

// 4. Typing cho hàm 

    // - khai báo kiểu dữ liệu cho tham số và kiểu dữ liệu trả về 
    function add(a : number , b : number) : number{
        return a + b;
    }

    const multiply = (a : number , b : number) : number => a * b;

    // - tham số tùy chọn ? 
    function greet(name : string , title ?: string) : string {
        return title ? `${title} ${name}` : `Hi , ${name}`;
    }

// 5. Biên dịch và xem lỗi : vite sẽ tự động biên dịch type script khi bạn chạy npm run dev . Nếu viết code sai kiểu vite sẽ hiện hị lỗi trên terminal và trên trình duyệt

// 6. Câu hỏi ôn tập 

    // 1. TypeScript khác JavaScript ở điểm cơ bản nào ? Lợi ích của việc dùng TypeScript ?
        // -> TypeScript khác JavaScript ở việc khai báo 1 biến hay 1 hàm có cung cấp kiểu dữ liệu cụ thể khi khai báo cho biến/hàm đó 
        // -> Mọi code js hợp lệ đều là ts nhưng ts thêm cú pháp kiểu 
        // -> Lợi ích sử dụng ts : 
            // + Phát hiện lỗi sớm 
            // + Khi thay đổi cấu trúc dữ liệu , ts sẽ chỉ ra nơi cần sửa 
            // + Các interface , type alias giúp đồng đội hiểu code nhanh chóng 

    // 2. Khi nào bạn nên dùng any ? Tại sao không nên lạm dụng 
        // -> Nên dùng kiểu any trong các trường hợp rất đặc biệt như : 
            // + Khi chuyển đổi dự án js cũ sang ts chưa thể định nghĩa hết kiểu (biện pháp tạm thời)
            // + Khi làm việc với thư viện bên ngoài không có type definition và bạn không thể tự viết type ngay 
        // -> Không nên lạm dụng kiểu any vì : 
            // + Vô hiệu hóa hoàn toàn sức mạnh của ts
            // + Gây ra lỗi tiềm ẩn , mất an toàn kiểu , đồng đội không thể dựa vào type system để hiểu code
        // -> Khi dữ liệu đầu vào không chắc chắn hãy dùng union type hoặc generic thay vì any 
        // -> Nguyên tắc tránh dùng any càng nhiều càng tốt , buộc phải dùng hãy ghi lí do

    // 3. Khai báo một biến productPrice có thể là number hoặc string và có giá trị mặc định là 0 
        // -> Dùng union type giới hạn kiểu dữ liệu của 1 biến , không dùng any vì chấp nhận nhiều kiểu dữ liệu khác nhau 
        let productPrice : string | number = 0; // kiểu union giới hạn 2 kiểu string hoặc number cho biến này 


    // 4. Viết một hàm getInfo nhận vào name : tring và age ?: number , trả về chuỗi mô tả . Nếu không có tuổi chỉ in tên 
        const getInfo = (name : string , age ?: number) : string => age !== undefined ? `${name} ${age}` : `${name}`;

    // 5. Tuple [string , number] dùng để làm gì ? cho ví dụ 
        // -> Tuple [string , number] dùng để định nghĩa mảng cố định với số phần tử cố định và kiểu dữ liệu cố định 
        // -> Tuple đặc biệt hữu ích khi bạn muốn biểu diễn một cặp giá trị có ý nghĩa khác nhau như toạn độ (x , y) hay sản phẩm số lượng 
        
        let product1 : [string , number] = ['laptop' , 1]; // tên sản phẩm và số lượng
        let product2 : [string , number] = ['iphone' , 2];

    // 6. Enum có tác dụng gì ? cho ví dụ về enum Color với Red , Green , Blue 
        // -> Enum tác dụng định nghĩa tập hợp hằng số có tên giúp mã nguồn dễ đọc hơn và tránh giá trị ma thuật
        // -> Dùng Enum trong trường hợp : 
            // + Khi bạn có tập hợp giá trị cố định , không thay đổi như : trạng thái đơn hàng (pending, shipping ,...) , vai trò người
            // dùng (Admin , User , Guest)
            // + Muốn tránh sai sót do gõ sai chuỗi và dễ dàng refactor 

        enum OrderStatus {
            Pending = 'PENDING',
            Shipped = 'SHIPPED',
            Delivered = 'DELIVERED'
        }
        let status1 : OrderStatus = OrderStatus.Pending;

    // 7 . Union type là gì ? sử dụng khi nào ? 
        // -> Union (kiểu hợp) cho phép một biến có thể nhận một trong nhiều kiểu dữ liệu đã được chỉ định trước đó ký hiệu bằng dấu |

        let id : string | number;
        id = 'abc111';
        id = 12345;
        // id = true; -> sai 

        // -> đặc điểm : TypeScript kiểm tra kiểu và chỉ cho phép truy cập thuộc tính/phương thức chung giữa các kiểu đã định nghĩa trước đó
        // trừ khi bạn dùng type narrowing (thu hẹp kiểu) qua typeof , instanceOf hoặc kiểm tra thuộc tính 
            // + kết hợp với literal types để tạo giá trị cố định 

        // -> khi nào dùng : 
            // + Khi một biến có thể mang nhiều kiểu dữ liệu khác nhau
            // + Khi muốn giới hạn giá trị 1 biến vào 1 tập hợp các literal ('asc' | 'desc')
            // + Khi xử lí dữ liệu từ API không xác định kiểu rõ ràng 

    // 8. Kiểu Object khi sử dụng với TypeScript 

        // 1. object viết thường 
        // - Đại diện cho bất kỳ giá trị nào không phải kiểu nguyên thủy 
        // - Nếu một biến có kiểu object , nó có thể là 1 đối tượng object literal , mảng , hàm hoặc bất kỳ thể hiện nào new Date()...
        // - vd : 
        let obj : object;
        obj = {name : 'Alice'};
        obj = [1 , 2, 3];
        obj = function(){};
        obj = new Date();

        // obj = 'hello' -> sai
        
        // - Khi dùng object bạn không thể truy cập thuộc tính của nó vì TypeScript không biết cấu trúc cụ thể 
        // obj.name -> sai

        // 2. Object viết hoa 
            // - có chấp nhận giá trị nguyên thủy 
            // - mơ hồ khi truy cập thuộc tính bên trong 
            // - tránh dùng

        // 3. {} 
            // - có chấp nhận giá trị nguyên thủy 
            // - không biết thuộc tính bên  trong
            // - dùng khi generic mở rộng -> hiếm khi dùng 

    // -> Trong thực tế sử dụng đối tượng 
        // + Khi viết 1 hàm nhận đối tượng nhưng không quan trong bên trong có gì 
        function logObject(obj: object) {
            console.log(JSON.stringify(obj));
        }

        // + Kết hợp type narrowing để kiểm tra thêm : 
        function isPlainObject(value: unknown): value is object {
            return typeof value === 'object' && value !== null;
        }

        // + Nếu càn đối tượng với thuộc tính cụ thể , hãy dùng interface hoặc type alias thay vì object 
        interface User {
            name: string;
            age: number;
        }
        // -> Trong hầu hết trường hợp bạn dùng các kiểu cụ thể hơn (interface , type) để có tính an toàn và hỗ trợ từ IDE