let count : number = 5;
count = 10;
console.log(count)

export const sayHi = (name : string , anyNum : number) : string => `${name} + ${anyNum}`

export const caculateArea = (width : number , height : number) => width * height;

export default interface Product{
    id : number,
    name : string,
    price : number,
    description ?: string,
    tags : string[]
}

// Bài tập thực hành ngày 3 : 

    // Bài 1 : Generic function: Viết hàm mergeArrays<T>(arr1: T[], arr2: T[]): T[] trả về mảng mới nối hai mảng.

    function mergeArrs<T>(arr1 : T[] , arr2 : T[]) : T[] {
        const arr = [...arr1 , ...arr2]
        return arr
    }
    export const mergeTests = mergeArrs<number>([1,2,3] , [4,5,6]);

    // Bài 2 : Generic interface: Định nghĩa Dictionary<T> với index signature [key: string]: T. 
    // Tạo một biến wordMeanings: Dictionary<string> và thêm vài từ.

    interface Dictionary<T>{
        [key : string] : T
    }

    const wordMeanings : Dictionary<string> = {
        id : 'xx1',
        name : 'cối xay gió',
    }
    console.log(wordMeanings);

    // Bài 3 : Generic class: Xây dựng lớp Queue<T> với các phương thức enqueue(item: T), dequeue(): T | undefined, size(): number. 
    // Khởi tạo một queue chứa chuỗi và thao tác.

    class Queue<T> {
        private items : T[] = [];

        enqueue(item : T) : void {
            this.items.push(item);
        }

        dequeue() : T | undefined {
            return this.items.shift();
        }

        size() : number {
            return this.items.length
        }

        isEmpty() : boolean {
            return this.size() === 0
        }
    }   

    const foodQueue = new Queue<string>();
    foodQueue.enqueue('bún bò huế');
    foodQueue.enqueue('phở');
    foodQueue.enqueue('bánh mì ramram');
    foodQueue.dequeue();
    console.log(foodQueue.size());

    // Bài 4 : Generic constraints:
    //  Viết hàm findById<T extends { id: number }>(items: T[], id: number): T | undefined trả về phần tử có id tương ứng.

    function findById <T extends {id : number}>(items : T[] , id : number) : T | undefined {
        const result = items.find(item => item.id === id);
        return result
    }
    const foods = [
        {
            id : 1,
            name : 'bún bò huế'
        },
        {
            id : 2,
            name : 'phở'
        },
        {
            id : 3,
            name : 'bánh mì ramram'
        }
    ]
    export const findFood = findById(foods , 3);

    // Bài 5 : Default type: Tạo type PaginatedResponse<T = any> = { items: T[]; total: number; page: number }. 
    // Khai báo biến kiểu PaginatedResponse (không chỉ định T) và kiểu PaginatedResponse<string>.

    type PaginatedReponse<T = any> = {
        items : T[],
        total : number,
        page : number
    }

    export const response1 : PaginatedReponse = {
        items : [1 , 3, 5, 7, 9],
        total : 5,
        page : 1
    }

    export const response2 : PaginatedReponse<string> = {
        items : ['bánh mì ram ram' , 'bún chả'],
        total : 2,
        page : 1
    }

    // Bài 6 : Kết hợp: Viết hàm mapArray<T, U>(arr: T[], callback: (item: T) => U): U[] chuyển đổi mảng.

    function mapArray<T , U> (arr : T[] , callback : (item : T) => U) :U[]{
        return arr.map(callback)
    }
    export const arrFood = mapArray(['0' , '3' , '2' , '6'] , (item) => Number(item));

// Bài tập thực hành ngày 4 : 

    // 1 . Type Guard với typeof: Viết hàm formatValue(value: string | number): string – 
    // nếu là string thì trả về chuỗi in hoa, nếu là number thì trả về chuỗi định dạng có 2 số thập phân.

    export function formatValue(value : string | number){
        if(typeof value === 'string'){
            return value.toUpperCase();
        }else{
            return value.toFixed(2)
        }
    }

    // 2. Type Guard với in : Cho 2 interface Admin ({ role : string ; manage() : void }) và Customer ({ name : string 
    // , purchase() : void }) . Viết hàm handlePerson (person : Admin | Customer) dùng in để gọi phương thức phù hợp

    interface Admin {
        role : string,
        manage() : void
    }

    interface Customer {
        name : string,
        purchase() : void
    }

    function handlePerson(person : Admin | Customer){
        
    }