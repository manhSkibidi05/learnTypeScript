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
            

// 2. Generic function 
    // - vd sử dụng generic với mảng 
    function getFirstElement<T> (arr : T[]) : T | undefined {
        return arr.length > 0 ? arr[0] : undefined
    }
    const firstNumber = getFirstElement([ 1, 2, 3]);

// 3. Generic interface
    // - vd sử dụng generic với object 

    interface Repository<T> {
        getById(id : number) : T,
        getAll() : T[]
    }

    interface User {
        id : number,
        name : string
    }

    const userRepo : Repository<User> = {
        getById(id){ return {id  , name : 'number1'}},
        getAll(){ return [{id : 1  , name : 'number1'}] }
    }

// 4. Generic constraints 
    // -> Sử dụng extends để giới hạn kiểu mà generic có thể nhận 

    interface HasLength {
        length : number
    }
    // -> T extends từ HasLength chứa thuộc tính length là 1 number -> T có thể truy cập được thuộc tính này do ràng buộc với HasLength
    function logLength<T extends HasLength> (item : T) : T {
        console.log(item.length);
        return item
    }
    // -> Khi gọi hàm truyền kiểu vào T thì cần truyền vào kiểu có thuộc tính length : number , có thể là array/string hoặc object sở hữu length : number 
    const log = logLength({length : 10})

    // -> Trong generic khi kiểu T extends từ kiểu khác thì lúc này T phải có toàn bộ các thuộc tính và phương thức mà kiểu 
    // của T đã extends , khi truyền kiểu dữ liệu vào T thì dữ liệu đó phải có thuộc tính mà kiểu T đã kế thừa .

    // -> extends trong generic có ý nghĩa là ràng buộc kiểu , T extends từ U thì T phải có cấu trúc chứa tất cả thuộc tính 
    // và phương thức của U . Khi truyền kiểu vào T thì do ràng buộc này mà giới hạn đi số kiểu có thể truyền vào 

// 5. Default type parameter 

    // -> Sử dụng khi bạn không muốn buộc người dùng phải chỉ định kiểu mỗi khi sử dụng generic , lúc này bạn có thể cung cấp
    // 1 kiểu mặc định . Nếu không chỉ định thì TypeScript sẽ sử dụng kiểu mặc định là unknown/any 

    // - Cú pháp : 
    function makePair <T = string> (value : T) : [T , T] {
        return [value , value]
    }

    const pair1 = makePair('hello');
    const pair2 = makePair(1);

    interface HasId {
        id: number;
    }
    function fetchItem<T extends HasId = { id: number }>(id: number): T {
    // giả định lấy dữ liệu
    return { id } as T;
    }
    // Khi dùng:
    const item = fetchItem(1); // T mặc định là { id: number }
    const user = fetchItem<{ id: number; name: string }>(2); // T cụ thể

// 6 . Lưu ý về sử dụng dấu <> trong TypeScript 

    // 1. Dùng trong generic : tham số kiểu 
    // - Đây là trường hợp phổ biến nhất , bạn dùng <> để khai báo 1 hoặc nhiều tham số kiểu cho hàm/class/interface/type alias

    // 2. Dùng trong type Assertion : khẳng định kiểu 
    // - <> sử dụng để ép kiểu , báo cho TypeScript biết bạn biết rõ kiểu dữ liệu hơn nó 

    let someValue: any = 'hello';
    let strLength = (<string>someValue).length;
    // -> cú pháp này ít dùng trong JSX vì dễ gây nhầm lẫn với thẻ HTML , thay vào đó người ta sử dụng cú pháp as 

    let strLength2 = (someValue as string).length;

    // 3. Dùng trong JSX (react)
    // - Khi viết React với TypeScript <> còn được dùng để khai báo kiểu cho props của component trong JSX 

    // const MyComponent = <T,>(props: { data: T }) => { ... };
    // Hoặc
    // function MyComponent<T>(props: { data: T }) { ... }

    // -> Trong trường hợp này , dấu phảy say T để TypeScript hiểu đây là generic function không phải thẻ JSX 

    // 4. Dùng trong khai báo kiểu cho mảng : Array<T> 

    let numbers: Array<number> = [1, 2, 3];
    // Tương đương với:
    let numbers2: number[] = [1, 2, 3];