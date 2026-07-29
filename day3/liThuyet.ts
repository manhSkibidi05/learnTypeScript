// Ngày 3 : Generics 

    // -> Một trong những khái niệm mạnh mẽ nhất của TypeScript , giúp viết code linh hoạt , tái sử dụng cao mà vẫn giữ được 
    // an toàn kiểu . Đây là nền tảng quan trọng để bạn sử dụng thành thạo các thư viện như React Query , Redux Toolkit sau này 

    // - Mục tiêu ngày 3 : 
        // + Hiểu rõ Generics là gì và tại sao cần dùng 
        // + Viết được generic function , generic interface , generic class 
        // + Biết cách dùng generic constraints (extends) để giới hạn kiểu 
        // + Bước đầu làm quen với default type parameter trong generics 
        // + Nhận thức được lợi ích của generics trong việc tạo các cấu trúc dữ liệu và hàm tiện ích 

// 1. Generics là gì ? 
    // - Generics cho phép bạn viết một hàm , class , interface có thể hoạt động với nhiều kiểu dữ liệu khác nhau mà vẫn giữ được
    // thông tin về kiểu đó . Nói cách khác nó tạo ra một 'tham số kiểu' (type parameter) bạn có thể truyền vào khi sử dụng 

    // vd : 
    function indentity <T> (arg : T) : T {
        return arg
    }
    const output1 = indentity<string>('heloooo');
    const output2 = indentity<number>(136);
    const output3 = indentity(true);

    // - Tại sao cần generics : 
        // + Khi viết hàm hay interface mà không dùng generic , bạn cần buộc phải chỉ định một kiểu cụ thể (vd : string/number)
        // -> Điều này khiến hàm/interface không dùng được cho các kiểu khác , hoặc nếu dùng any thì gây ra mất an toàn kiểu 

        // vd : vấn đề khi sử dụng kiểu any 
        const checkLegit = (a : any) => a;
        const check1 = checkLegit(10); // -> khi truyền dữ liệu kiểu number vào những biến vẫn mang kiểu any 

        // vd : generic
        const checkLegit2 = <T>(a: T) => a;
        const check2 = checkLegit2(10);  // -> khi truyền dữ liệu kiểu number vào thì biến sẽ hiểu dữ liệu kiểu number

    // - Cú pháp khi sử dụng generic <T> 
    // -> T ở đây là một tham số kiểu (type parameter) . Bạn có thể đặt tên bất kì nhưng có một số quy ước phổ biến : 
        // + T : thường dùng khi có 1 kiểu dữ liệu chính
        // + U , V : dùng cho kiểu phụ thứ 2 và 3
        // + K : cho kiểu khóa 
        // + V : cho kiểu giá trị 
        // + E : cho kiểu phần tử trong một mảng 

        // vd :
        function swap<T , U> (a : T , b : U) {
            return [b , a]
        }
        // -> ở đây T và U chỉ là tên gọi đại diện cho biến mang kiểu dữ liệu bạn truyền vào 
        const doicho = swap(10 , 'goat');

    // - Cách generic giữ thông tin về kiểu : 
        // -> Khi khai báo 1 hàm generic , TypeScript không biết T là gì khi định nghĩa hàm . Nhưng khi bạn gọi hàm , TypeScript sẽ suy
        // luận kiểu thực tế dựa trện đối số bạn truyền vào và thay thế kiểu dữ liệu đó vào T trong toàn bộ hàm 

    // - Tham số kiểu (type parameter) là : 
        // -> Là một biến đứng trong cặp dấu <> , đại diện cho 1 kiểu dữ liệu chưa được xác định tại thời điểm khai báo . 
        // Khi sử dụng generic (gọi hàm , khai báo biên) bạn cung cấp kiểu cụ thể thay thế cho tham số đó . 

        // -> Nó giống như tham số của hàm nhưng ở cấp độ kiểu chứ không phải giá trị 
            // + Tham số hàm : nhận giá trị khi gọi
            // + Tham số kiểu : nhận kiểu dữ liệu khi gọi 

            //vd : hàm generic với tham số kiểu T 
            function logAndReturn<T>(input : T) : T{
                console.log(input);
                return input;
            }

            // khi gọi , T được thay thế = kiểu number
            const num = logAndReturn<number>(10);
            // có thể thay thế T = kiểu khác 
            const index = logAndReturn<string>('goat');
            


