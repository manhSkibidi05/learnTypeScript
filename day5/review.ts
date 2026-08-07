// Review ngày 5 : 

    // - Câu hỏi tự ôn tập :

    // 1. Định nghĩa utility types là gì ? Kể tên ít nhất 5 utility types có sẵn của TypeScript và tác dụng của chúng 
    // - utility types : Là các kiểu tiện ích giúp tạo ra 1 kiểu mới dựa trên các kiểu đã có sẵn , giúp tránh lặp lại code không cần thiết
    // và tái sử dụng code có sẵn

    interface Keyboard {
        id : number,
        readonly name : string,
        year ?: number,
        real : boolean
    }
    // + Partial : Sử dụng để tạo ra kiểu mới cho object tất cả các thuộc tính bên trong object đó thành optional (có thể có hoặc không)
        type KeyboardPartial = Partial<Keyboard>
    // + Readonly : Sử dụng để tạo kiểu mới cho object tất cả thuộc tính bên trong object đó thành readonly (chỉ lấy không thể đổi dữ liệu)
        type KeyboardReadonly = Readonly<Keyboard>
    // + Required : Sử dụng để tạo ra kiểu mới cho object tất cả thuộc tính bên trong object đó bắt buộc phải truyền dữ liệu 
        type KeyboardRequired = Required<Keyboard>
    // + Pick : Sử dụng để tạo ra kiểu mới cho object chọn các thuộc tính cần thiết cho kiểu object mới 
        type KeyboardPick = Pick<Keyboard , 'id' | 'real'>
    // + Omit : Sử dụng để tạo kiểu mới cho object chọn các thuộc tính để loại bỏ nó khỏi kiểu object mới 
        type KeyboardOmit = Omit<Keyboard , 'year' | 'name'>
    
    // - Bổ sung :
        // + Utility type không chỉ dùng cho object , Exclude , Extract , NonNullable áp dụng cho union còn ReturnType , Parameters cho hàm

    // 2. Pick và Omit khác nhau như thế nào ?
    // - Pick là chọn các thuộc tính sẽ được sử dụng cho kiểu object mới còn Omit là chọn các thuộc tính sẽ bị loại bỏ cho kiểu object mới

    // 3. Bạn dùng Record khi nào ? Viết một kiểu PageInfo là Record<string, string | number>
    // - Record sử dụng khi tạo ra kiểu của 1 object khi chưa biết trước key và value chỉ cung cấp kiểu cho key và value 
    // -> Record<K , V> thực chất là một mapped type {[P in K] : V} . Nó rất tiện khi bạn muốn tạo một từ điển hoặc map động . 
    // -> Lưu ý : K phải là string | number | symbol

    type PageInfor = Record<string , string | number>
    const pageNo1 : PageInfor = {
        name : 'vui vẻ',
        year : 2026
    }

    // 4. Viết một mapped type Nullable<T> biến tất cả thuộc tính của T thành T | null 

    type Nullable<T> = {
        [K in keyof T] : T[K] | null
    }
    const testNo1 : Nullable<Keyboard> = {
        id : 1,
        name : 'Asus 102',
        real : true
    }

    // 5. Cho biết sự khác nhau giữa Exclude và Extract . Cho ví dụ 
    type Exp = string | number | null | undefined 

    // - Exclude : Sử dụng tạo ra kiểu mới của từ union type có sẵn , chọn các kiểu để loại bỏ khỏi union type mới 
    type ExpExclude = Exclude<Exp , string | null >

    // - Extract : Sử dụng tạo ra kiểu mới từ union type có sẵn , chọn các kiểu để cho vào union type mới
    type ExpExtract = Extract<Exp , null | undefined>

    // 6. Làm thế nào để lấy kiểu tham số đầu tiên của một hàm ? 
    // - Sử dụng Parameter : Là 1 utility type giúp lấy toàn bộ kiểu của tham số trong 1 hàm và trả về 1 tuple 
    // -> tuple trả về 1 mảng cố định kiểu và số lượng được cung cấp ban đầu

    function sumThree(a : number , b : number , c : number) : number{
        return a * b * c;
    }
    type Paramss = Parameters<typeof sumThree>;
    type FirstParam = Paramss[0];