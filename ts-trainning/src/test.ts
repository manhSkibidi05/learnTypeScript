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

    export function handlePerson(person : Admin | Customer){
        if('role' in person){
            person.manage()
        }else{
            person.purchase()
        }
    }
    
    // 3. User-defined type guard : Tạo interface Car (có drive()) và Bicycle (có pedal()). 
    // Viết hàm isCar(vehicle: any): vehicle is Car. Sau đó viết hàm useVehicle(vehicle: Car | Bicycle) dùng isCar.

    interface Car{
        brandName : string,
        drive() : void
    };
    interface Bicycle{
        brandName : string,
        pedal() : void
    }
    function isCar(vehicle : any) : vehicle is Car{
        return 'drive' in vehicle
    }
    export function useVehicle(vehicle : Car | Bicycle){
        if(isCar(vehicle)){
            vehicle.drive()
        }else{
            vehicle.pedal()
        }
    }

    // 4. Type Assertion : Khai báo một biến unknownValue: unknown = "TypeScript". Dùng type assertion để truy cập .length và in ra.

    const unknownValue : unknown = 'TypeScript';
    console.log((unknownValue as string).length)

    // 5. Discriminated Union : Tạo discriminated union cho các thông báo 

    export interface SuccessMessage{ type : 'success' , text : string};
    export interface ErrorMessage{ type : 'error' , text : string , code : number};
    export interface WarningMessage{ type : 'warning' , text : string};

    export function handleMessage(mgs : SuccessMessage | ErrorMessage | WarningMessage) : string{
        switch(mgs.type){
            case 'success' :
                return `Thành công : ${mgs.text}`;
            case 'error' :
                return `Lỗi : ${mgs.text} (code : ${mgs.code})`;
            case 'warning' :
                return `Cảnh báo : ${mgs.text}`;
            default : 
                return '';
        }
    }

    // 6. Kết hợp : Viết hàm getLength(target: string | number | { length: number }) dùng type guard để trả về length

    export function getLength(target : string | number | {length : number}){
        if(typeof target === 'string'){
            return target.length;
        }

        if(typeof target !== 'number' && 'length' in target){
            return target.length;
        }

        return target.toString().length;
    }

    // - Toán tử in sử dụng trong bài trên : in toán tử chỉ hoạt động với object (mảng, hàm...) . Nếu cố gắng dùng in trên 1 giá trị kiểu
    // nguyên thủy như number , string...Bạn sẽ gặp lỗi trong runtime
    // -> Vì tham số target có thể là kiểu number nên bắt buộc chặn kiểu number sau đó mới kiểm tra thuộc tính length trong object 

// Bài tập thực hành ngày 5: 

    // 1. Partial và Required : Cho interface Config có host: string, port: number, secure: boolean.
    //  Tạo một hàm updateConfig(current: Config, updates: Partial<Config>): Config trả về object mới merge từ current và updates.

    export interface Config {
        host : string,
        port : number,
        secure : boolean
    }

    export function updateConfig(current : Config , updates : Partial<Config> ) : Config{
        return {
            ...current,
            ...updates
        }
    }

    // 2. Pick và Omit : Cho interface Employee có id, name, position, salary, department.
    // Tạo type EmployeeSummary = Pick<Employee, 'id' | 'name' | 'position'>. 
    // Tạo type ConfidentialEmployee = Omit<Employee, 'salary'>. Viết hàm getEmployeeSummary

    interface Employee{
        id : number,
        name : string,
        position : number,
        salary : number,
        department : string
    }

    type EmployeeSummary = Pick<Employee , 'id' | 'name' | 'position'>;
    type ConfidentialEmployee = Omit<Employee , 'salary'>;

    export function getEmployeeSummary(emp : Employee) : EmployeeSummary  {
        return {
            id : emp.id,
            name : emp.name,
            position : emp.position
        };
    }

    export const employeeConfidential : ConfidentialEmployee = {
        id : 1,
        name : 'fak',
        position : 103,
        department : 'bv phương đông'
    }

    // 3. Record : Tạo một const rolePermissions: Record<string, string[]> trong đó key là role ('admin', 'editor', 'viewer'), 
    // value là mảng các quyền tương ứng. Viết hàm hasPermission(role: string, permission: string): boolean.

    const rolePermission : Record<string , string[]> = {
        admin : ['create' , 'read' , 'update' , 'delete'],
        editor : ['read' , 'update'],
        viewer : ['read']
    };

    export function hasPermission(role : string , permission : string) : boolean{
        const permissions = rolePermission[role];
        return permissions ? permissions.includes(permission) : false
    }
    
    // 4. ReturnType và Parameters : cho hàm function createUser(name: string, age: number, isAdmin: boolean) { return { name, age, isAdmin };}. 
    // Dùng ReturnType và Parameters để tạo type UserFromCreate và CreateUserParams. Khai báo biến với các type đó.

    function createUser(name : string , age : number , isAdmin : boolean){
        return {
            name,
            age,
            isAdmin
        }
    }

    type UserFromCreate = ReturnType<typeof createUser>;
    type UserFromParams = Parameters<typeof createUser>;

    const userNo1 : UserFromCreate = {
        name : 'mixi',
        age : 10,
        isAdmin : true
    }

    const arrUserNo1 : UserFromParams = [userNo1.name , userNo1.age , userNo1.isAdmin];
    console.log(arrUserNo1);

    // 5. Mapped Type tự tạo : Viết một mapped type ReadonlyPartial<T> kết hợp vừa readonly vừa optional.
    //  Áp dụng cho interface Book (title, author, year).

    interface Book {
        title : string,
        author : string,
        year : number
    }

    type ReadonlyPartial<T> = {
        readonly [K in keyof T ] ?: T[K]
    }

    const bookNo1 : ReadonlyPartial<Book> = {
        title : 'Những người khốn khổ',
        author : 'victor'
    }
    console.log(bookNo1);

    // 6.Kết hợp : Cho union type type Event = 'click' | 'scroll' | 'mousemove';. Dùng Exclude để tạo type ExcludeClick,
    //  và dùng Extract để tạo type ExtractScrollOrMouse. Viết hàm handleEvent(event: ExcludeClick).

    type Event = 'click' | 'scroll' | 'mousemove';

    type ExcludeClick = Exclude<Event , 'scroll' | 'mousemove'>;
    type ExtractScrollOrMouse = Extract<Event , 'scroll' | 'mousemove' >;

    export function handleEvent(event : ExcludeClick | ExtractScrollOrMouse){
        if(event === 'click'){
            console.log(`on${event}`)
        }else{
            console.log(`on${event}`)
        }
    }