// Ngày 4 : Type Guards & Type Assertion 

    // - type guards và type assertion là những kỹ thuật giúp bạn làm việc an toàn hơn với các kiểu dữ liệu phức tạp , đặc biệt là
    // union types . Đây là bước đệm quan trọng trước khi học cá utility types nâng cao 

    // - Mục tiêu ngày 4 : 
        // + Hiểu và sử dụng được type guards để thu hẹp kiểu (type narrowing)
        // + Biết cách dùng typeof , instanceof , in , và user-defined type guards (is)
        // + Nắm được type assertion (as , !) và biết khi nào nên dùng 
        // + Làm quen với Discrtiminated Unions - mẫu thiết kế mạnh mẽ trong type script
    
// 1. Type Guards là gì ? 
    // - Type Guards là các biểu thức kiểm tra kiểu tại runtime , giúp TypeScript thu hẹp kiểu trong một khối code đảm bảo bạn có thể 
    // truy cập an toàn các thuộc tính hoặc phương thức của kiểu cụ thể . 
    
    // - Vd : Khi bạn có string | number , bạn không thể dùng .toUpperCase() trực tiếp . Nhưng nếu kiểm tra typeof value === 'string'
    // , TypeScript biết trong khối if đó value chắc chắn là string 

// 2. Các loại Type Guards
    // 2.1. typeof : type guard 
    // - Dùng cho các kiểu primitive : string , number , boolean , symbol , undefined , object , function 

        function printLength(input : string | number){
            if(typeof input === 'string'){
                console.log(input.length); // sử dụng được toàn bộ phương thức/thuộc tính của kiểu string 
            }else{
                console.log(input.toFixed(2));  // sử dụng được toàn bộ phương thức/thuộc tính của kiểu number
            }
            console.log(input.toString()) // chỉ dùng được phương thức/thuộc tính của chung 2 kiểu string và number
        }

    // -> typeof : giúp kiểu tra kiểu dữ liệu của 1 biến và kết hợp với if sẽ tạo ra khối code cho phép truy cập an toàn các 
    // thuộc tính và phương thức của kiểu dữ liệu đó  

    // 2.2. instanceof : type guard 
    // - Kiểm tra một object có phải là instance của một class hay không 

        class Dog { item = '' ; id = 1 ; bark(){} }
        class Cat { item = '' ; meow(){} }

        function makeSound(animal : Dog | Cat){
            if(animal instanceof Dog){
                animal.bark();
                animal.id; // thuộc tính riêng 
            }else{
                animal.meow()
            }
            animal.item; // thuộc tính chung
        }

    // -> instanceof : giúp kiểm tra một đối tượng có phải là thể hiện của 1 class không , nếu có đối tượng sẽ có thể sử dụng thuộc tính
    // và phương thức riêng của class này một cách an toàn 

    // 2.3. in : type guard
    // - Kiểm tra một thuộc tính có tồn tại trong object hay không , phù hợp với object literal hoặc interface 

        interface Car {
            name : string,
            drive() : void,
            years : number
        }
        interface Boat {
            name : string,
            sail() : void
        }

        function moveOn(vehicle : Car | Boat){
            if('drive' in vehicle){
                vehicle.drive();
            }else{
                vehicle.sail()
            };
            vehicle.name
        }

    // -> in : Giúp kiểm tra 1 thuộc tính riêng có tồn tại bên trong object hay không , nêu có lúc này object đó có thể sử dụng các thuộc tính
    // bên trong object một cách an toàn 

    // 2.4. User-defined type guards (is) 
    // - Tự viết hàm trả về boolean với cú pháp parameter is type . Đây là cách mạnh mẽ nhất 
    
        interface Fish{ swim() : void}
        interface Bird{ fly() : void}

        function isFish(pet : Fish | Bird) : pet is Fish{
            return (pet as Fish).swim() !== undefined;
        }

        function move(pet : Fish | Bird){
            if(isFish(pet)){
                console.log(pet.swim())
            }else{
                console.log(pet.fly())
            }
        }
    
    // -> sử dụng cú pháp : parameter is type làm kiểu trả về cho hàm kiểm tra , hàm này kiểm tra xem thuộc tính nó có đã tồn tại bên trong
    // object sau đó mới sử dụng thuộc tính đó một cách an toàn 

// 3. Type Assertion 
    
    // - Type Assertion cho phép bạn ép kiểu khi bạn biết chắc chắn hơn TypeScript về kiểu dữ liệu . Có 2 cú pháp : 
        // + value as type -> dùng trong react 
        // + <type>value 

        let someValue1: unknown = "Hello";
        let strLength1: number = (someValue1 as string).length;

        // -> type assertion không ép kiểu như ép kiểu trong ngôn ngữ khác , nó chỉ là cách bạn nói với TypeScript "hãy tin tôi , biến này là kiểu này"
        // Nếu sai có thể gây lỗi runtime 

        // -> type assertion sử dụng khi bạn biết rõ ràng kiểu của 1 biến và bạn sử dụng as như cách nói với TypeScript 
        // là biến này đang mang kiểu này nên có thể truy cập thuộc tính / phương thức 1 cách an toàn 

    // - Non-null assertion operator ! : Dùng để loại bỏ null/undefined khỏi 1 biểu thức 

        let userA : string | null;
        console.log(userA!.toUpperCase()) // nếu user không null
        // -> chỉ dùng khi bạn biết chắn chắn rằng nó không trả về null , nếu không sẽ lỗi 

    // -> Sử dụng type assertion làm cho TypeScript tin rằng 1 biến đang mang kiểu dữ liệu này và nó có thể truy cập
    // thuộc tính/phương thức 1 cách an toàn , điều này phải được đảm bảo khi bạn chắc chắn về dữ liệu đó nếu không gây ra lỗi 

// 4. Discriminated Unions (Tagged Unions)
    
    // - Một pattern rất mạnh : tạo union type cho các object chung một property discriminant : thường là kind hoặc type để phân biệt

    interface Circle {
        type : 'circle',
        radius : number
    }
    interface Square {
        type : 'square',
        sideLength : number
    }
    type Shape = Circle | Square;

    function area(shape : Shape){
        switch(shape.type){
            case "circle" :
                return Math.PI * shape.radius ** 2;
            case "square" :
                return shape.sideLength ** 2;
        }
    }