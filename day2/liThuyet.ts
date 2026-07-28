// Ngày 2 : Interface và Type Alias 

    // -> Chủ để cực kỳ quan trọng và thường xuyên sử dụng trong React : Interface và Type Alias . Đây là cách đến bạn định nghĩa 'hình dạng'
    // của dữ liệu , giúp code rõ ràng và an toàn hơn nhiều 

    // - Mục tiêu ngày 2 : 
        // + Hiểu và sử dụng thành thạo interface để định nghĩa cấu trúc object 
        // + Biết cách dùng type alias và phân biệt với interface 
        // + Nắm được các tính năng :optinal properties (?) , readonly , index signatures 
        // + Biết cách kế thừa interface (extends) , intersection type (&) 
        // + Bước đầu biết khi nào nên dùng interface , khi nào nên dùng type 

// 1. Interface - 'Bản thiết kế' dành cho object 
    // - Interface dùng để định nghĩa cấu trúc của một object gồm có những thuộc tính nào mang kiểu dữ liệu gì 

    interface UserNew{
        id : number,
        name : string,
        emails : string,
        isAdmin : boolean
    }

    const user1 : UserNew = {
        id : 1,
        name : 'moy',
        emails : 'manhmoi@gmail.com',
        isAdmin : true
    }
    console.log(user1.emails);
    // -> Khi tạo ra 1 đối tượng dựa trên interface này nếu sai kiểu hoặc thiếu dữ liệu ts sẽ báo lỗi ngay

// 2. Optinal properties (?) 
    // - Khi định nghĩa các thuộc tính trong interface , các thuộc tính nào không bắt buộc có thể thêm dấu ? sau nó 

    interface PostUser{
        idPost : number,
        brandName : string,
        phone ?: string // không bắt buộc
    }
    const postUser1 : PostUser = {
        idPost : 1,
        brandName : 'Báo tuổi trẻ'
    }
    // -> bắt buộc sử dụng đúng tên thuộc tính đã định nghĩa 
    console.log(postUser1.phone); // trả về undefined vì chưa được gán giá trị 
    
// 3. Readonly properties
    // - Khi định nghĩa interface muốn các giá trị không thể chỉnh sửa thì thêm readonly vào trước tên thuộc tính khi định nghĩa 

    interface Handsome{
        readonly idFace : number,
        readonly isFace : boolean
    }
    const tao : Handsome = {
        idFace : 23,
        isFace : true
    }
    console.log(tao.isFace);
    // tao.idFace = 24 -> gây ra lỗi ngay

// 4. Index signatures 
    // - Khi bạn không biết trước tên thuộc tính nhưng biết kiểu của value và key 
    
    interface Dictionary {
        [key : string] : string
    }
    const dict1 : Dictionary = {
        hello : 'Chào',
        bye : 'Tạm biệt'
    }

// 5. Extending interface (kế thừa) 
    // - Interface có thể kế thừa interface khác bằng từ khóa extends 

    interface Animal {
        name : string,
        hobby : string[]
    }

    interface Cat extends Animal{
        action : string,
        street : number
    }
    const catNo1 : Cat = {
        name : 'moy1',
        hobby : ['moew' , 'moew'],
        action : 'bite',
        street : 1
    }
    console.log(catNo1.hobby)
    // -> Khi interface này kế thừa từ interface khác nó sẽ mang tất cả thuộc tính của interface đó 

// 6. Type Alias 
    // - Sử dụng từ khóa Type + tên kiểu mới : dùng để đặt tên cho 1 kiểu dữ liệu mới dựa trên các kiểu đã có sẵn như : object , union , tuple , function...

    type Dog = {
        name : string,
        action : string,
        street : number
    }
    const dogNo1 : Dog = {
        name : 'long',
        action : 'bark',
        street : 2
    }
    console.log(dogNo1.name);

    type ID = number | string;
    const idNo1 : ID = 'kiki1';

    type EventHandler = (event : MouseEvent) => void

// 7. Intersection Types (&) 
    // - Khi muốn kết hợp nhiều type lại với nhau có thể dùng kí tự & tương tự như kế thừa của interface 
    type A = {panket : string}
    type B = {chicken : string}
    type C = A & B;
    const iShowSpeed : C = {
        panket : 'pancake',
        chicken : 'kfc'
    }
    const iis : C = {
        panket : 'pancakes',
        chicken : 'kfcs'
    }
    console.log(iShowSpeed.chicken)
    // -> sử dụng & kết hợp các type với nhau tạo ra type mới 

// 8. So sánh interface và type 

// - Câu hỏi tự ôn tập 

    // 1. Interface dùng để làm gì ? cho ví dụ 
    // -> Interface sử dụng làm bản thiết kế cho 1 object , giúp định nghĩa các thuộc tính và kiểu dữ liệu 

    interface Car {
        brand : string,
        model : string,
        year ?: number
    };
    const ferari : Car = {
        brand : 'ferari',
        model : 'kiki',
        year : 2020
    }

    // 2. Khác biệt chính giữa interface và type là gì ? 
    // -> interface chỉ sử dụng để cấu trúc cho object còn type sử dụng tạo ra 1 kiểu dữ liệu mới dựa trên các 
    // kiểu đã có sẵn không chỉ object còn union , function ...

    // 3. Kế thừa trong interface là gì ?
    // -> Interface sử dụng từ khóa extends để dùng 1 interface kế thừa toàn bộ thuộc tính của 1 interface khác 

    // 4. readonly khác gì const ? 
    // -> readonly và const đều tạo ra hằng số chỉ dùng để đọc và không thay đổi được , khác nhau ở đây là readonly
    // sử dụng cho 1 thuộc tính khi định nghĩa object bằng interface còn const sử dụng để khai báo 1 biến 

    // 5. Khi nào bạn nên dùng index signature ?
    // -> Nên dùng index signatur khi mà dữ liệu chưa biết tên thuộc tính 

    // 6.Viết một interface cho một hàm có 2 tham số number, trả về number, bằng cách sử dụng interface (gợi ý: call signature)
    // .