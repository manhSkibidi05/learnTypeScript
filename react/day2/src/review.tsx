// Review ngày 2 : 

    // - Câu hỏi tự ôn tập :

    // 1. Khi nào bạn cần khai báo kiểu tường minh cho useState ? Cho ví dụ với state có thể là null . 
    // - Khi TypeScript không thể suy luận ra kiểu dựa trên dữ liệu khởi tạo ban đầu (null/undefined) hoặc muốn giới hạn dữ liệu đầu vào  
    // -> Khi khởi tạo với dữ liệu null/undefined bạn bắt buộc phải khai báo kiểu vì TypeScript lúc này chưa biết kiểu thật sự của state
    // vd : [name , setName] = useState<string | null>(null)

    // 2. Làm thể nào để khai báo state là mảng các object ? cho vd 
    // - Định nghĩa kiểu object bằng interface/type alias sau đó khởi tạo với mảng kiểu object đó
    // -> Lưu ý khi cập nhật state mảng phải tạo bản sao mới dựa trên giá trị trước đó . vd : setTodos(prev => [...prev, newTodo])
    // vd : 
    // interface Todo{
    //     id : number,
    //     title : string,
    //     completed : boolean
    // }
    // const [todos , setTodos] = useState<Todo[]>([])

    // 3. useEffect có yêu cầu khai báo kiểu gì không ? Giải thích vì sao ? 
    // - useEffect không cần khai báo kiểu gì vì hàm callback của useEffect trả về void hoặc trả về hàm trả về void là hàm cleanup 
    // -> useEffect nhận 2 tham số gồm 
        // + effect : EffectCallback -> là 1 hàm trả về void hoặc trả về hàm cleanup cũng trả về void
        // + deps : DependencyList -> mảng có thể rỗng 

    // 4. Tại sao cleanup function trong useEffect phải trả về void ? Nếu bạn muốn dùng async function trong effect bạn phải làm gì ? 
    // - cleanup function là hàm được react gọi khi component unmount hoặc trước khi effect chạy lại 
    // -> Nó trả về void vì react không cần thiết nhận giá trị trả về của hàm này 
    // - Nếu muốn sử dụng async function trong useEffect bạn cần khởi tạo nó bên trong hàm callback và gọi nó ngay sau đó

    // 5. Khi nào bạn dùng useRef<HTMLInputElement>(null)? Tại sao cần kiểm tra inputRef.current trước khi gọi .focus()?
    // - Khi muốn sử dụng useRef để tham chiếu tới 1 phần tử DOM và ban đầu cần khởi tạo giá trị nó = null
    // - Cần kiểm tra inputRef.current trước vì nó có thể là null và nếu là null gọi focus() gây ra lỗi
    // -> Bổ sung : 
        // + useRef<HTMLInputElement>(null) : trả về object với thuộc tính current nhận giá trị ban đầu = null . Khi gán cho 1 thẻ input thuộc tính ref={inputRef}
        // React sẽ gán phần tử DOM thực tế vào thuộc tính current sau khi component được mount

    // 6. Sự khác biệt giữa useRef và useState khi bạn muốn lưu giá trị không gây re-render?
    // - useRef lưu trữ giá trị và các giá trị này không trực tiếp thay đổi giao diện -> không cần re-render
    // -> useRef thường dùng để lưu các giá trị mutable mà bạn cần truy cập và thay đổi mà không muốn re-render , vd : timeoutId , tham chiếu DOM...

    // - useState lưu trữ giá trị và các giá trị này ảnh hưởng và thay đổi trực tiếp đến giao diện nên khi giá trị trong state thay đổi cần re-render  
    
    // -> Lưu ý : Không nên đọc/ghi ref.current trong quá trình render vì nó có thể gây ra hành vi không nhất quán . Chỉ nên đọc ghi dữ liệu của ref.current
    // ở event handlers hoặc effects