// Ngày 5 : Utility Types & Advanced Types 

    // - Bước ngoặt để bạn làm chủ hệ thống kiểu của TypeScript ,  viết code ngắn gọn , chuyên nghiệp và tận dụng tối đa sức mạnh
    // của TypeScript . Những kiến thức này cực kỳ hữu ích khi bạn xây dựng các ứng dụng React + TypeScript phức tạp sau này

    // - Mục tiêu ngày 5 : 
        // + Hiểu và sử dụng các utility types có sẵn : Partial , Required , Readonly , Pick  , Omit , Record , Exclude , Extract , 
        // NonNullable , ReturnType , Parameters
        // + Bước đầu làm quen với Mapped Types và cách tự tạo utility type
        // + Nhận biết và áp dụng Conditional Types cơ bản 
        // + Biết cách kết hợp các utility types để giải quyết các tình huống thực tế 

// 1. Các Utility Types thông dụng 

    // - Utility Types trong TypeScript là một tập hợp các kiểu dữ liệu dựng sẵn giúp bạn biến đổi hoặc thao tác trên các kiểu khác một
    // cách linh hoạt . Thay vì phải tự định nghĩa lại các kiểu tương tự bạn có thể sử dụng chúng để tạo ra kiểu mới từ kiểu hiện có 
    // một cách nhanh chóng , chính xác và ít code hơn .

    // - Mục đích chính : 
        // + Giảm trùng lặp code khi cần các biến thể của 1 kiểu dữ liệu đã được định nghĩa trước đó
        // + Tăng tính an toàn - các phép biến đổi vẫn được TypeScript kiểm tra kiểu 
        // + Hỗ trợ lập trình generic , giúp dễ dàng thích nghi với nhiều tình huống
    // -> Utility Types như là các hàm biến đổi kiểu chúng làm việc với kiểu dữ liệu để tạo ra kiểu dữ liệu mới, chúng giúp bạn : 
        // + Tránh viết lại các định nghĩa kiểu giốg nhau
        // + Dễ dàng điều chỉnh theo nhu cầu cụ thể 
        // + Giữ cho code ngắn gọn dễ bảo trì 
    
    // 1.1. Các Utility Types biến đổi thuộc tính đối tượng 

        // - Partial<T>
            // + Định nghĩa : Biến tất cả các thuộc tính của kiểu T thành optional (có thể có hoặc không)
            // + Khi dùng : 
                // + Khi bạn muốn cập nhật một phần của đối tượng 
                // + Khởi tạo đối tượng với giá trị mặc định rồi gán giá trị sau
            // + vd :
            interface User {
                name : string,
                age : number,
                email : string
            } 
            type NewUser = Partial<User>
            // -> Tạo ra đối tượng mới với các thuộc tính kiểu optional không bắt buộc phải truyền dữ liệu 

        // - Required<T>
            // + Định nghĩa : Ngược lại với Partial biến tất cả thuộc tính của kiểu T thành bắt buộc 
            // + Khi dùng : Với một interface có optional nhưng trong hoàn cảnh cụ thể thì bạn muốn đầy đủ các thuộc tính 
            // + vd : 
            function startServer(config : Required<NewUser>){
                console.log(config.name , config.age , config.email)
                // chắc chắn phải tồn tại các thuộc tính này
            }
            // -> Tạo ra đối tượng mới với các thuộc tính bắt buộc phải truyền dữ liệu 

        // - Readonly<T> 
            // + Định nghĩa : Biến tất cả thuộc tính của kiểu T thành chỉ đọc không thể gán lại dữ liệu sau khi khởi tạo 
            // + Khi dùng : Bảo vệ dữ liệu khỏi bị thay đổi ngoài ý muốn , vd : cấu hình , state trong redux , dữ liệu truyền vào component
            // + vd :
            const userNo1 : Readonly<User> = {
                name : 'phùng thanh nộ',
                age : 38,
                email : 'dochet1989'
            }
            // userNo1.name = 'dùng thanh nộ' -> lỗi 

    // 1.2. Các Utility Types chọn/nhóm thuộc tính 
            
        // - Pick<T , K>
            // + Định nghĩa : Tạo ra kiểu mới bằng cách chọn một tập hợp các thuộc tính K từ kiểu T
            // + Khi dùng : Khi bạn chỉ cần một vài trường dữ liệu từ 1 đối tượng lớn 
            // + vd : 
            interface TodoItem{
                id : number,
                title : string,
                completed : boolean,
                note : string,
                date : number
            }
            type RemovedItem = Pick<TodoItem , 'id' | 'date' >;

        // - Omit<T , K>
            // + Định nghĩa : Ngược lại với Pick , tạo ra kiểu mới bằng cách loại bỏ các thuộc tính K từ kiểu T 
            // + Khi dùng : Khi bạn muốn dùng lại 1 interface nhưng cần bỏ đi những trường không cần thiết hoặc nhạy cảm (password)
            // + vd :
            type UpdatedItem = Omit<TodoItem , 'note' | 'date'>

    // 1.3. Các Utility Types thao tác với Union Types 

        // - Exclude<T, U>
            // + Định nghĩa : Loại bỏ khỏi T những kiểu mà có thể gán được cho U , U chứa các kiểu cần loại bỏ 
            // + Khi dùng : Loại bỏ một số kiểu trong union type , vd : loại bỏ null/undefined
            // + vd : 
            type T0 = number | string | null | undefined | (() => void);

            type NumberString = Exclude<T0 , null | undefined | Function >;
            // -> loại bỏ các kiểu không cần thiết

        // - Extract<T , U> 
            // + Định nghĩa : Trích xuất từ T những kiểu mà có thể gán được cho U , U chứa các kiểu cần sử dụng 
            // + Khi dùng : Lấy ra các kiểu con cụ thể từ union type
            // + vd : 
            type OnlyNum = Extract<T0 , number >
            // -> chỉ lấy các kiểu cần thiết 

        // - NonNullable<T> 
            // + Định nghĩa : Loại bỏ kiểu null và undefined khỏi kiểu T 
            // + Khi dùng : Đảm bảo giá trị không bao giờ là null/undefined , thường dùng sau khi kiểm tra truly
            // + vd : 
            type NotNull = NonNullable<T0>
            // -> loại bỏ kiểu null và undefined

    // 1.4. Các Utility Types lấy kiểu từ hàm/class 

        // - ReturnType<T> 
            // + Định nghĩa : Trả về kiểu của giá trị trả về từ một hàm type T 
            // + Khi dùng : Khi bạn muốn định nghĩa kiểu của 1 biến sẽ là kiểu trả về từ 1 hàm , tránh khai báo thủ công 
            // + vd : 
            function getData(){
                return { id : 404 , name : 'dùng thanh nộ' , active : true}
            }

            type Data = ReturnType<typeof getData>
            // -> lấy kiểu từ dữ liệu trả về của hàm cần sử dụng typeof + địa chỉ hàm 

        // - Parameter<T> 
            // + Định nghĩa : Trả về một tuple chứa kiểu của các tham số hàm T 
            // + Khi dùng : Khi cần tái sử dụng kiểu dữ liệu của các tham số của 1 hàm 
            // + vd : 
            function updateActive(item : Partial<Data> , note : String){
                item.active = false;
                return item
            }
            type Params = Parameters<typeof updateActive>;
            // -> Lấy kiểu từ tham số nhận vào của hàm cần sử dụng typeof + địa chỉ hàm 
            const nba : Params = [
                {
                    id : 101,
                },
                'bóng rổ'
            ];
            // -> Parameters trả về kiểu tuple là một mảng cố định số lượng phần tử và kiểu dữ liệu do ban đầu định nghĩa 

        // - InstanceType<T> 
            // + Định nghĩa : Trả về kiểu của 1 đối tượng được tạo ra bởi 1 constructor funcion type T 
            // + Khi dùng : Khi bạn có một class và muốn lấy kiểu instance của nó 
            // + vd : 
            class Woman{
                name : string;
                age : number;
                constructor(name : string , age : number){
                    this.name = name;
                    this.age = age;
                }
            }
            type WomanInstance = InstanceType<typeof Woman>
            
        // - ConstructorParameters<T> 
            // + Định nghĩa : Trả về tuple kiểu tham số của constructor function type 
            // + Khi dùng : Tương tự như Parameters nhưng dành cho class constructor , hữu ích khi viết factory 
            // + vd : 
            type WomanParams = ConstructorParameters<typeof Woman>

    // 1.5. Utility Types thao tác với chuỗi (Template Literal Types)
        
        // + Uppercase<S> : Chuyển chuỗi S thành chữ in hoa
        // + Lowercase<S> : Chuyển chuỗi S thành chữ thường 
        // + Capitalize<S> : Viết hoa chữ cái đầu tiên 
        // + Uncapitalize<S> : Viết thường chữ cái đầu tiên 

        // - Khi dùng : Thường kết hợp với template literal types để tạo ra các kiểu biến đổi chuỗi mạnh mẽ 
        // - vd : 
        type Method = 'get' | 'post';
        type MethodUpper = Uppercase<Method>;
        type EventName = `on${Capitalize<Method>}`;

    // 1.6. Utility Types đặc biệt : Record<K , T>
        // + Định nghĩa : Tạo ra một object type với các key thuộc kiểu K và value thuộc kiểu T 
        // + Khi dùng : Xây dựng một map/dictionary nhanh chóng mà không cần chỉ mục cứng 
        
        // + vd : 
        type PageInfo = Record<'home' | 'about' | 'contact' , {title : string}>

// 2. Mapped Types 
    