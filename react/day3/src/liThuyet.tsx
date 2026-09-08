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

        
    }