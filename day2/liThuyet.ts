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
    type Ac = {panket : string}
    type Bc = {chicken : string}
    type Cc = Ac & Bc;
    const iShowSpeed : Cc = {
        panket : 'pancake',
        chicken : 'kfc'
    }
    const iis : Cc = {
        panket : 'pancakes',
        chicken : 'kfcs'
    }
    console.log(iShowSpeed.chicken)
    // -> sử dụng & kết hợp các type với nhau tạo ra type mới 

// 8. So sánh interface và type 

// - Câu hỏi tự ôn tập 

    // 1. Interface dùng để làm gì ? cho ví dụ ? 
    // -> Interface dùng để định nghĩa 1 object , tạo bản thiết kế cho object bằng cách thêm các thuộc tính và kiểu của thuộc tính đó
    // -> Ngoài ra interface không chỉ dùng cho object mà còn có thể mô tả : 
        // + kiểu hàm : tạo ra cấu trúc hàm , hàm mang kiểu này sẽ phải tuân theo cấu trúc 
        // + kiểu mảng
        // + class 

    // vd : 
        interface Lego{
            name : string,
            puzzle : number,
            year ?: number // thuộc tính không bắt buộc 
        }
        const legoNo1 : Lego = {
            name : 'son wukong',
            puzzle : 250,
        }

    // 2. Khác biệt chính giữa interface và type là gì ? 
    // -> Khác biệt chính giữa interface và type là :
        // + interface chỉ dùng để xây dựng khuân mẫu cho object , type xây dựng kiểu dữ liệu mới từ những kiểu dữ liệu có sẵn bao gồm object , tuple , union...
        // + interface có thể mở rộng qua declaration merging (khi khai báo interface có cùng tên thì sẽ tự gộp lại) , còn type thì không (phải unique)
        // + interface thường dùng cho các API công khai vì khả năng mở rộng , còn type tiện cho union , tuple , utility types

    // 3. Làm thế nào tạo một interface Admin kế thừa từ User và thêm thuộc tính role : string ? 
    // -> Sử dụng từ khóa extends khi dùng 1 interface kế thừa từ 1 interface khác và sở hữu tất cả thuộc tính của interface này 
    // -> interface có thể extends nhiều interface cùng lúc (dùng dấu phẩy) , có thể extends từ type nếu type đó là object

    // 4. Cho biết readonly khác gì với const ? 
    // -> readonly và const đều tạo ra các giá trị chỉ dùng để đọc và không thay đổi được khác ở đây là readonly dùng cho 1 thuộc
    // tính , const dùng khi khởi tạo biến 
    // -> const ngăn không cho gán lại biến , nhưng nếu biến là object thì có thể thay đổi thuộc tính bên trong 
    // -> readonly ngăn thay đổi trực tiếp thuộc tính sau khi khởi tạo object 

    // 5. Khi nào nên dùng index signature ? 
        // + Dùng khi chưa biết tên thuộc tính 
        // + Dùng khi muốn mô tả đối tượng với key động 
    
    // 6. Viết interface cho hàm có 2 tham số number và trả về number 

    interface Sum{
        (a : number , b : number) : number;
    }
    const tong : Sum = (a , b) => a + b;