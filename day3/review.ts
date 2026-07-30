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