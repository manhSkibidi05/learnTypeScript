// Bài tập thực hành 

    // 1. Định nghĩa interface Product 

    interface Product{
        id : number,
        name : string,
        price : number,
        description ?: string,
        tags : string[]
    }

    // 2. Tạo mảng products gồm ít nhất 3 sản phẩm 

    let products : Product[] = [
        {
            id : 1,
            name : 'laptop',
            price : 250,
            tags : ['dien tu' , 'apple']
        },
        {
            id : 2,
            name : 'iphone',
            price : 150,
            tags : ['dien tu' , 'apple']
        }
    ];
    products.push({
        id : 3,
        name : 'kinh',
        price : 50,
        description : 'helnah',
        tags : ['dien tu' , 'apple']
    })

    // 3. Kế thừa interface : tạo interface DiscountProduct kế thừa Product thêm thuộc tính discountPercent ,
    //  viết hàm getDiscountPrice trả về giá sau khi giảm

    interface DiscountProduct extends Product{
        discountPercent : number;
    }

    const getDiscountPrice = (product : DiscountProduct) => product.price * (1 - product.discountPercent / 100);

    // 4. Type alias :  Tạo type ProductSummary = Pick<Product, 'id' | 'name' | 'price'> 
    // và viết hàm printSummary(item: ProductSummary): void in ra màn hình.

    type ProductSummary = Pick<Product , 'id' | 'name' | 'price' >;

    const printSummary = (item : ProductSummary) => {
        console.log(item);
    }
    // -> khi type muốn tạo cấu trúc từ interface đã có sử dụng Pick<tên_interface , các thuộc tính muốn kế thừa>

    // 5. Index signature: Định nghĩa interface Settings với index signature [key: string]: string | number.
    //  Tạo object appSettings với vài giá trị như theme: "dark", version: 1.

    interface Settings {
        [key : string] : string | number
    }
    const appSettings : Settings = {
        theme : 'dark',
        version : 1
    }
    // -> Index signature sử dụng khi chưa biết tên thuộc tính và số lượng thuộc tính của đối tượng đó 

    // 6. Thử dùng Intersection : Tạo type A và B , sau đó type C = A & B . khai báo biến kiểu C 
    
    type A = {song : string}
    type B = {artist : string[]}
    type C = A & B;

    const leBao : C = {
        song : 'sau lời từ khước',
        artist : ['lebao' , 'namper'] 
    }

    // 7. Dùng readonly : Tạo interface config với các readonly properties 

    interface Config {
        readonly id : number,
        readonly pass : number | string,
    }

    const configNo1 : Config = {
        id : 10,
        pass : 'ngaiVua123'
    }
    // configNo1.pass = 123456; -> lỗi 