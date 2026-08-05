// Ngày 4 :  Câu hỏi tự ôn tập 

    // 1. Type Guard là gì ? Tại sao cần dùng nó ? 
        // - Type Guard là : là các công cụ sử dụng để kiểm tra kiểu dữ liệu của 1 biến , giúp chắc chắn 1 biến mang kiểu dữ liệu nào 
        // và có thể sử dụng an toàn các thuộc tính và phương thức của biến đó
        // -> Cần dùng Type Guard bởi vì cần đảm bảo 1 biến khi sử dụng thuộc tính và phương thức của kiểu dữ liệu này cần đảm bảo 
        // chắc chắn rằng nó thuộc kiểu dữ liệu này .

    // 2. Kể tên 4 cách tạo Type guard và ví dụ 
        // + typeof : dùng khi đứng trước 1 biến sẽ trả về kiểu dữ liệu của biến đó 
        // -> thường sử dụng với các biến mang kiểu dữ liệu nguyên thủy : number , string , boolean , object , function ,..
            // vd : 
            function exp1(value : string | number) : void{
                if(typeof value === 'string'){
                    console.log(value.length)
                }else{
                    console.log(value.toFixed(2))
                }
            }

        // + instanceof : dùng khi đứng sau 1 thể hiện được tạo ra từ 1 class sẽ trả về true/false 
        // -> thường sử dụng với các thể hiện được tạo ra từ class 
            // vd: 
            class Glass {brandName = 'monster' ; action(){}};
            class Wallet {brandName = 'BMV' ; pay(){}};

            function checkStuff(stuff : Glass | Wallet) : void{
                if(stuff instanceof Glass){
                    stuff.action()
                }else{
                    stuff.pay()
                }
            }

        // + in : dùng khi đứng sau 1 thuộc tính (đặt trong dấu ngoặc '') của 1 object sẽ trả về true/false 
        // -> thường sử dụng để kiểm tra xem thuộc tính có phải duy nhất của object này hay không 
            // vd : 
            interface Laptop{
                brand : string,
                price : number,
                flexible : true 
            }
            interface Pc{
                brand : string,
                price : number,
                stable : false
            }
            function checkPrivate(me : Laptop | Pc) : boolean{
                if('flexible' in me){
                    return me.flexible;
                }else{
                    return me.stable
                }
            }

        // + Tự viết hàm kiểm tra 1 biến mang kiểu dữ liệu nào bằng cách kiểm tra các thuộc tính riêng của chúng , hàm trả về cú pháp 
        // là parameter is type 
        // -> thường sử dụng kiểm tra 1 object và tạo ra vùng riêng sử dụng thuộc tính và phường thức object đó 1 cách an toàn 
            // vd : 
            function checkParameter(random : Laptop | Pc) : random is Laptop{
                return (random as Laptop).flexible !== undefined
            } 

            function getValue(random : Laptop | Pc) : void {
                if(checkParameter(random)){
                    random.flexible
                }else{
                    random.stable
                }
            }

    // 3. Viết 1 user-defined type guard isString(value : unknown) : value is string 

        function isString(value : unknown) : value is string{
            return (value as string).length !== undefined
        }
    
    // 4. Type Assertion khác gì với ép kiểu sử dụng trong c++/java ? khi nào bạn nên dùng as ? 

        // - Type Assertion sử dụng trong type script như là cách bạn đang bảo rằnng 1 biến đang mang kiểu dữ liệu này nên có thể sử dụng
        // các thuộc tính và phương thức 1 cách an toàn , nhưng thực tế biến đó có thể mang kiểu dữ liệu khác và có thể gây ra lỗi 
        // -> Với ép kiểu là thực sự 1 biến mang kiểu dữ liệu này được ép hoàn toàn sang kiểu dữ liệu khác, type assertion không ép
        // kiểu mà chỉ cung cấp niềm tin cho type script với 1 biến chưa rõ kiểu dữ liệu

        // - Khi nào nên dùng as : khi người lập trình viên biết rõ kiểu dữ liệu của 1 biến hơn type script 

    // 5. Cho ví dụ về một Discriminated Union và giải thích về cách nó hoạt động ?
        // vd : 
        interface Iphone{
            type : 'smartphone',
            price : number,
            count : number
        }
        interface Ipad{
            type : 'tablet',
            price : number
        }
        type random = Iphone | Ipad;

        function calculateTotalPrice(stuff : random){
            switch(stuff.type){
                case 'smartphone' :
                    return stuff.count * stuff.price;
                case 'tablet' : 
                    return stuff.price
            }
        }
        
        