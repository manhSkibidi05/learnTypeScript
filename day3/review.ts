// Review ngày 2 - 3 : 

    // - interface : Sử dụng để làm bản thiết kế cho 1 object , định nghĩa 1 object thêm các thuộc tính và kiểu của thuộc tính 
    // - một số lưu ý khi sử dụng interface : 
        // + thêm readonly vào các thuộc tính nếu thuộc tính đó chỉ để đọc không thay đổi 
        interface Review{
            readonly id : string
        }

        // + 1 interface có thể kế thừa nhiều interface khác và sở hữu các thuộc tính của interface đó bằng extends
        interface Interview extends Review{
            name : string,
            numberPhone ?: number
        }
        const In1 : Interview = {
            id : '1',
            name : 'adu',
            checkOut : false
        }

        // + interface có thể sử dụng để mô tả 1 hàm : nhận vào giá trị nào và trả về giá trị nào 
        interface Tripple {
            (a: number, b: number, c: number): number
        }
        const tripple1: Tripple = (a, b, c) => a * b * c

        // + index signature sử dụng khi chưa biết tên thuộc tính và số lượng thuộc tính của 1 đối tượng 
        interface Know {
            [id : string] : string | number
        }
        const noOne : Know = {
            ma : '123',
            so : 123
        }
    
    // - type : Sử dụng để định nghĩa kiểu dữ liệu mới dựa trên các kiểu đã có sẵn union , tuple , object...
    // - một số lưu ý khi sử dụng type : 
        // + sao chép thuộc tính của interface 
        type ReviewCopy = Pick<Review, 'id' >

        // + có thể kết hợp các type lại với nhau tạo ra type mới 
        type YourName = {
            name : string
        }
        type YourNameReview = ReviewCopy & YourName;
        const along : YourNameReview = {
            id : 'ko',
            name : 'mck'
        }

    // -> Điểm khác nhau quan trọng giữa interface và type là interface có thể khởi tạo interface đã định nghĩa trước đó thêm thuộc
    // tính mới vào thì lúc này interface sẽ gộp lại các thuộc tính cũ và mới , type thì chỉ được khởi tạo duy nhất 1 lần 

    interface Interview {
        checkOut : boolean
    }
    const hotel : Interview = {
        id : 'hotelCard',
        name : 'beaty and beats',
        checkOut : true
    }

    // type YourName = {} -> lỗi 

    // - generics : Là cấu trúc sử dụng để cho phép các function/interface không cố định nhận vào kiểu dữ liệu ban đầu mà
    // dựa vào khi gọi và truyền vào kiểu dữ liệu đó 

    // -> generics giúp giải quyết vấn đề của TypeScript khi định nghĩa hàm/interface đều phải cố định 1 kiểu dữ liệu nên 
    // khiến việc tái sử dụng lại với kiểu dữ liệu khác là không thể 

    // - Cấu trúc khi định nghĩa hàm generic: 
        function checkOut<T> (a : T ) : T {
            return a
        }
        const test1 = checkOut<number>(1);
        const test2 = checkOut<string>('alo');

    // - T ở đây là 1 tham số kiểu : Ban đầu khi định nghĩa T chỉ là tham số nhận kiểu dữ liệu chưa mang kiểu nào
    // -> khi hàm được gọi truyền vào T là 1 kiểu dữ liệu , lúc này hàm sẽ thay thể toàn bộ T với kiểu được truyền vào này 

    // - Quy ước của tham số kiểu : T (1 kiểu duy nhất) , U (kiểu phụ t2) , V (kiểu phụ t3) , I (kiểu cho phần tử mảng)...

    // -> generics giúp hàm/interface hoạt động với nhiều kiểu dữ liệu khác nhau mà vẫn dữ được kiểu dữ liệu đó
    
// - Câu hỏi tự ôn tập :

    // 1. Generics là gì ? Tại sao nên dùng generics thay vì any 
        // - Generics là công cụ giúp khi khởi tạo các interface/function/type không cố định với kiểu dữ liệu mà có thể thay đổi kiểu dữ liệu
        // phụ thuộc dữ liệu do người dùng truyền vào 
        // - Kiểu any là kiểu cho phép nhận các kiểu dữ liệu khác nhau nhưng không nên dùng any vì any gây ra mất kiểu dữ liệu 
        // - Trong khi đó generics sử dụng tham số kiểu , kiểu sẽ thay đổi phụ thuộc tham số kiểu truyền vào và không gây ra mất kiểu
        
        // -> Bổ sung : 
            // + Generic giúp tạo ra các cấu trúc dữ liệu và hàm tái sử  dụng cao mà vẫn đảm bảo an toàn về kiểu . vd : Array<T> , Promise<T>..
            // + Khi dùng generic , TypeScript vẫn kiểu tra được các phương thức/thuộc tính của kiểu thực tế bên trong hàm . Với any mọi thứ đều hộp đen
            // + Ngoài ra generic còn có thể ràng buộc (extends) để giới hạn kiểu được phép truyền vào , giúp kiểm soát chặt chẽ hơn

    // 2. Viết một generic function wrapInArray<T>(value : T) : T[];

        function wrapInArray<T>(value : T) : T[]{
            return [value]
        }
        const wrap1 = wrapInArray<string>('khoai');

    // 3. Cho biết sự khác biệt giữa function indentity<T>(arg : T) : T và function indentity(arg : any) : any
        // + Khi truyền kiểu dữ liệu vào tham số kiểu T lúc này hàm sẽ trả về là kiểu number
        // + Khi truyền dữ liệu vào hàm kiểu any nhưng hàm vẫn trả về dữ liệu kiểu any
        // -> sử dụng any gây ra mất kiểu dữ liệu 
        function indentity1<T> (arg : T) : T {return arg};
        function indentity2(arg : any) : any {return arg};

        const i1 = indentity1(10).toString();
        const i2 = indentity2(10); // không hiển thị gợi ý và không cảnh bảo lỗi khi sử dụng phương thức sai 

    // 4. Làm thế nào để đảm bảo một generic type có thuộc tínhh id ? 
        // - Sử dụng generic constraints : Giúp ràng buộc kiểu dữ liệu truyền vào 
        // -> Khi tham số kiểu có ràng buộc thì bắt buộc kiểu dữ liệu truyền vào cần có toàn bộ thuộc tính và phương thức của ràng buộc đó

        function getItem <T extends {id : number}> (item : T ) : T {
            return item
        }

        // - Bổ sung : 
            // + Có thể ràng buộc với interface / type điều này giúp tái sử dụng ràng buộc thay vì định nghĩa trực tiếp type inline
            // + Bạn có thể dùng generic constraints để truy cập thuộc tính kiểu : <T , K extends keyof T>

    // 5. Viết một generic interface KeyValuePair<K , V> với key : K và value : V 

        interface KeyValuePair<K ,V> {
            key : K,
            value : V
        }
    
    // 6. Khi nào bạn nên dùng generic class ?
        // -> Sử dụng generic class khi định nghĩa 1 cấu trúc dữ liệu với nhiều thuộc tính và phương thức khác nhau 

        // - Bổ sung : 
            // + Nên dùng generic class khi muốn tạo ra một khuôn mẫu cho một tập hợp đối tượng có cùng hành vi nhưng khác nhau về
            // kiểu dữ liệu mà chúng xử lí . Vd : Stack<T> , Queue<T> , LinkedList<T>...

            // + Các phương thức bên trong class sẽ biết rõ kiểu dữ liệu và đảm bảo tính nhất quán 

            // + Có thể kết hợp generic class với constraints để giới hạn kiểu , vd : class Repository <T extends Entity>


