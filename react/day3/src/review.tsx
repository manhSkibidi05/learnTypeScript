// TypeScript : Siêu tập hợp của JavaScript , mọi code của JavaScript đều là code TypeScript và phát triển thêm về hệ thống kiểu tĩnh (static type system)
// giúp việc xác định lỗi luôn trong quá trình viết code 

    // -> Hệ thống kiểu (type system) : 
        // + Tất cả các biến  đều mang kiểu dữ liệu ngoài ra cung cấp các kiểu mới như : tuple -> mảng với phần tử cố định , enum 
        // + Type alias : Khởi tạo kiểu mới dựa trên kiểu có sẵn
        // + interface : Xây dựng cấu trúc kiểu cho object 
        // + union type : Một biến có thể mang nhiểu kiểu khác nhau
        // + Generics : Tạo ra tham số kiểu cho hàm hoặc object giúp cho linh hoạt khi có thể nhiều kiểu dữ liệu khác nhau
        // + Utility types : Biến đổi kiểu có sẵn thành kiểu mới thường là object / function 

    // -> Lợi ích khi dùng TypeScript so với JavaScript : 
        // + Hỗ trợ gợi ý khi viết code 
        // + Xác định lỗi ngay trong quá trình viết code
        // + Dễ dàng đọc code hơn 
        // + Refactor an toàn hơn nhờ rõ hình dạng dữ liệu 

// React : Là thư viện của JavaScript hỗ trợ việc khởi tạo giao diện người dùng (UI) theo kiến trúc component-based có thể là function hoặc class nhận vào props
// và trả về phần tử JSX , mỗi 1 phần trên giao diện là 1 component

    // + Cơ chế tạo và cập nhật giao diện React :   
        // 1. Lần đầu render , react tạo cây ảo (virtual dom) là một bản sao của cây thật
        // 2. khi state hoặc props thay đổi , react tạo ra 1 cây ảo mới
        // 3. react so sánh 2 cây ảo cũ và mới tìm ra những phần tử thay đổi
        // 4. chỉ những phần tử đó mới cập nhật lên cây thật giúp cải thiện hiệu năng tránh việc thao tác với cây thật nhiều 
    
    // + props và phần tử JSX : 
        // - props là object được truyền vào component các dữ liệu của props đều dựa vào cơ chế truyền dữ liệu từ trên xuống , khi đó có thể gây ra hiệu ứng prop drilling
            // -> Hiệu ứng prop drilling khi dữ liệu truyền từ trên xuống qua các component con khác mà không cần sử dụng mà đến 1 component con ở sâu mới sử dụng gây lãng phí
            // -> Giải pháp là quản lý dữ liệu tập trung bằng useReducer + useContext 
        // - Phần tử JSX : cấu trúc giống với cấu trúc 1 phần tử html dạng thẻ nhưng tất cả có thể đóng 
            // -> component luôn trả về phần tử JSX vì JSX tạo ra giao diện vào gắn nó vào DOM 
    
    // -> Với React hiện đại cung cấp các hook : useState , useEffect , useRef... giúp quản lý vòng đời của function component nên không cần class nữa 

// React + TypeScript : Khởi tạo ra file mới .tsx file này chạy react và chạy TypeScript -> giúp viết code react với đầy đủ sức mạnh kiểm tra kiểu 
    // -> TypeScript đưa hệ thống kiểu vào React cho phát triển giao diện , các biến hay function component đều có kiểu và hiện thị lỗi ngay trong quá trình code

    // -> Lợi ích khi sử dụng React + TypeScript tạo giao diện người dùng (UI) : 
        // 1. Tự động hoàn thiện code với gợi ý thông minh 
        // 2. Giúp đọc code dễ dàng hơn 
        // 3. Dễ dàng tái cấu trúc (Refactoring)
        // 4. Phát hiện lỗi sớm ngay trong quá trình code
        // 5. Tích hợp nhiều thư viện khác nhau 

    // -> component với props và JSX : 
        // -> props : cần cấu trúc kiểu object cho props bằng type alias hoặc interface
        // -> function component mang kiểu trả về là 1 JSX có thể để TypeScript tự suy luận hoặc kiểu là React.JSX.Element

    // -> 3 hook cơ bản : useState , useEffect , useRef 
        // + useState : là generics function có thể truyền vào kiểu cho tham số kiểu đối với dữ liệu phức tạp , để TypeScript tự suy luận kiểu với dữ liệu đơn 
        // giản như string , number , boolean ...

        // + useEffect : là hàm nhận tham số đầu là hàm callback trả về void hoặc trả về function clear dọn dẹp và trả về void , hàm callback trên xử lý các side effect không thay đổi trực tiếp lên giao
        // diện như : gọi API bằng async/await , các hàm bất đồng bộ setTimeout... tham số 2 là mảng dependency chứa các phần tử mà hàm callback phụ thuộc khi các
        // phần tử thay đổi thì chạy lại hàm callback hoặc nếu để mảng rỗng chỉ chạy 1 lần thi component mount (gắn vào cây DOM) , khi unmount chạy hàm clear nếu có

        // + useRef : là hàm nhận vào null hoặc giá trị bất kì trả về 1 object có thuộc tính current lưu trữ giá trị đó nên không gây ra re-render khi thay đổi giá 
        // trị đó . Tác dụng có thể tham chiếu tới 1 phần tử DOM hoặc để lưu trữ giá trị có thể thay đổi mà không gây re-render
