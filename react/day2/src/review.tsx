// Review ngày 2 : 

    // - Câu hỏi tự ôn tập :

    // 1. Khi nào bạn cần khai báo kiểu tường minh cho useState ? Cho ví dụ với state có thể là null . 
    // - Khi dữ liệu state nhận vào là object/array hoặc mang nhiều dữ liệu khác nhau như union 
    // vd : [name , setName] = useState<string | null>(null)

    // 2. Làm thể nào để khai báo state là mảng các object ? cho vd 
    // - Định nghĩa kiểu object bằng interface/type alias sau đó khởi tạo với mảng kiểu object đó
    // vd : 
    // interface Todo{
    //     id : number,
    //     title : string,
    //     completed : boolean
    // }

    // const [todos , setTodos] = useState<Todo[]>([])

    // 3. useEffect có yêu cầu khai báo kiểu gì không ? Giải thích vì sao ? 
    // - useEffect không cần khai báo kiểu gì vì hàm callback của useEffect trả về void hoặc trả về hàm trả về void là hàm cleanup 

    // 4. Tại sao cleanup function trong useEffect phải trả về void ? Nếu bạn muốn dùng async function trong effect bạn phải làm gì ? 
    // - cleanup function phải trả về void vì nó là trả về của hàm callback của useEffect trả về void 
    // - Nếu muốn sử dụng async function trong useEffect bạn cần khởi tạo nó bên trong hàm callback và gọi nó ngay sau đó

    // 5. Khi nào bạn dùng useRef<HTMLInputElement>(null)? Tại sao cần kiểm tra inputRef.current trước khi gọi .focus()?
    // - Khi muốn sử dụng useRef để tham chiếu tới 1 phần tử DOM và ban đầu cần khởi tạo giá trị nó = null
    // - Cần kiểm tra inputRef.current trước vì nó có thể là null và nếu là null gọi focus() gây ra lỗi

    // 6. Sự khác biệt giữa useRef và useState khi bạn muốn lưu giá trị không gây re-render?
    // - useRef lưu trữ giá trị và các giá trị này không trực tiếp thay đổi giao diện -> không cần re-render
    // - useState lưu trữ giá trị và các giá trị này ảnh hưởng và thay đổi trực tiếp đến giao diện nên khi giá trị trong state thay đổi cần re-render  