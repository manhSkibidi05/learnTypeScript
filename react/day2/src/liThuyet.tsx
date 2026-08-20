// Ngày 2 : Các hook cơ bản với TypeScript 

    // - useState , useEffect , useRef đây là bộ ba hook bạn dùng gần như mỗi ngày khi làm việc với React . TypeScript giúp việc sử dụng các hook này trở nên 
    // an toàn hơn , tránh các lỗi vô tình về kiểu dữ liệu 

    // -> Mục tiêu ngày 2 : 
    // - Biết các sử dụng useState với TypeScript
        // + suy luận kiểu tự động và khai báo tường minh
        // + khai báo state có kiểu union / object / array
        // + xử lí state có thể là null / undefined 

    // - Hiểu cách dùng useEffect với TypeScript 
        // + không cần khai báo kiểu đặc biệt cho effect
        // + chú ý về cleanup function và dependency array
        // + gọi API , đăng kí sự kiện , setInterval 

    // - Sử dụng useRef với TypeScript 
        // + Tham chiếu DOM element 
        // + Lưu trữ giá trị có thể thay đổi mà không gây re-render
        // + khơi tạo ref với null và non-null assertion khi cần

    // - Áp dùng vào bài tập thực hành 

// 1. useState với TypeScript 

    // - useState : là hook do react cung cấp , giúp quản lí dữ liệu cục bộ cho 1 function component 
    // -> useState nhận vào giá trị state ban đầu và trả về mảng gồm state và hàm setState , với các hành động thay đổi state cần gọi hàm setState và truyền vào state mới gây ra re-render component

    // - useState : với TypeScript nó là 1 generic function cần truyền vào kiểu cho hàm hoặc truyền dữ liệu cho hàm và để ts tự suy luận ra kiểu 
    // -> cú pháp : useState<T>(initialState : T | () => T) trả về   [T , Dispatch<SetStateAction<T>>]

    // 1.1. Trường hợp để ts tự suy luận kiểu 

        import {useState} from 'react';

        export function Counter(){
            const [count , setCount] = useState(0);
            const [name , setName] = useState('');
            const [invisible , setInvisible] = useState(true)

            return (
                <>
                    <h1>{name}</h1>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {invisible && <h2>Số đếm : {count}</h2>}
                    <button onClick={() => setCount(count => count + 1)}>Thêm</button>
                    <button onClick={() => setCount(count => count - 1)}>Giảm</button>
                    <button onClick={() => setInvisible(invisible => !invisible)}>Ẩn hiện số đếm</button>
                </>
            )
        }

        // -> Với các kiểu dữ liệu nguyên thủy khi sử dụng useState chỉ cần truyền dữ liệu còn kiểu để cho ts tự suy luận 

    // 1.2. Trường hợp cần khai báo tường minh 

        export function GetUser(){
            interface User{
                id : number,
                name : string
            }
            const [user , setUser] = useState<User | null>({
                id : 1,
                name : 'longer'
            });
            const [status , setStatus] = useState<'loading' | 'success' | 'error'>('loading');

            return(
                <>
                    <h1>Trạng thái hiện tại : {status}</h1>
                    <button onClick={() => setStatus(status)}>Thay đổi trạng thái</button>
                    { user && <h2>username : {user.name}</h2> }
                    <button onClick={() => setUser(prev => prev ? ({...prev , name  : 'mck'}) : null)}>Cập nhật username</button>
                </>
            )
        }

    // -> Với các state mang nhiều kiểu dữ liệu khác nhau hoặc obj/array cần phải khai báo kiểu tường minh cho useState sau đó truyền vào giá trị ban đầu 
    // -> Lưu ý đối với state là obj/array khi cập nhật state cần tạo bản sao mới dựa trên giá trị trước đó

    // - Lưu ý quan trọng : 
        // + union type : khi state có thể nhận nhiều kiểu hãy khai báo union
        // + state là obj/arr : hãy định nghĩa interface/type riêng để có thể tái sử dụng
        // + lazy initialization : nếu giá trị ban đầu cần tính toàn phức tạp bạn có thể truyền 1 hàm
        // + setter nhận function : có thể truyền hàm callback cho setState với tham số prev sẽ được ts suy luận kiểu đúng

// 2. useEffect với TypeScript 

    // - Side effect (hiệu ứng phụ) : Là các tính toán tạo ra các giá trị và các giá trị này chúng có thể dẫn đến thay đổi UI nhưng không trực tiếp tạo ra UI 
    // vd : gọi API , đăng kí sự kiện , cập nhật state...

    // - useEffect sinh ra để xử lý các side effect bao gồm việc cập nhật state dẫn đến re-render 
    // -> useEffect không phân biệt side effect có ảnh hưởng tới UI hay không mà nó chỉ đảm bảo code trong hàm callback chạy sau khi React đã commit UI ra màn hình
    // -> khi khởi tạo useEffect cần quan tâm đến kiểm soát dependency array tránh lặp vô hạn và xử lí cleanup đúng cách tránh rò rỉ bộ nhớ 

    // -> useEffect giúp quản lí vòng đời của function component , khi component được mount chạy hàm xử lí của useEffect chạy nếu các phần tử trong mảng dependency thay
    // đổi hàm cleanup sẽ chạy nếu có và chạy lại hàm xử lí của useEffect , khi component unmount chạy cleanup lần cuối .
    // - Khi sử dụng useEffect với TypeScript : hàm callback trả về void và mảng dependency là tuple , cần chú ý với kiểu trả về của hàm xử lí bên trong hàm callback
    // hàm cleanup trả về void

        import {useEffect} from 'react'
        export function GetTimer(){
            useEffect(() => {
                const timer = setTimeout(() => {
                    console.log('100h')
                } , 1000);

                return () => {
                    clearTimeout(timer)
                }
            }, [])
        }

        export function GetAPI(){
            interface User{
                id : number,
                name : string
            }
            useEffect(() => {
                async function fetchData(){
                    const res = await fetch('/api/users');
                    const data : User[] = await res.json();
                    console.log(data)
                }
                fetchData();
            }, [])
        }
    
        // - Lưu ý quan trọng : 
            // + không dùng async trực tiếp trong useEffect
            // + cleanup phải là 1 function hoặc không có
            // + dependency array là 1 tuple hoặc 1 mảng các phần tử ổn định , nên đặt là 1 mảng rỗng nếu muốn useEffect chạy 1 lần


// 3. useRef với TypeScript 
    // - useRef có hai công dụng chính : 
        // + Lưu trữ một giá trị có thể thay đổi nhưng không gây ra re-render
        // + Tham chiếu đến một phần tử DOM 
    // -> Trong TypeScript useRef có các overload phức tạp hơn 

    // - Sử dụng với TypeScript : 
        // + Khi dùng với DOM element : Nên khai báo kiểu của phần tử và khởi tạo nó bằng null 

        import {useRef} from 'react';

        export function FocusInput(){
            const inputRef = useRef<HTMLInputElement>(null);

            useEffect(() => {
                inputRef.current?.focus();
            }, []);

            const handleClick = () => {
                console.log(inputRef.current?.value);
            }

            return(
                <div>
                    <input ref={inputRef} type="text" />
                    <button onClick={handleClick}>Lấy dữ liệu input</button>
                </div>
            )
        }

        // -> Giải thích : 
            // + useRef<HTMLInputElement>(null) : khởi tạo phần tử với kiểu là input element | null với giá trị khởi tạo = null 
            // + thuộc tính ref của thẻ input sẽ chứa phần tử này -> lúc này thẻ input đó đang được inputRef tham chiếu tới 
            // + để truy cập phần tử inputRef tham chiếu tới cần dùng thuộc tính current và kiểm tra null ?. trước khi sử dụng thuộc tính/phương thức 

        // + Khi dùng để lưu trữ giá trị không gây re-render 

        export function RenderCounter(){
            const [count , setCount] = useState(0);
            const renderCount = useRef(0);

            useEffect(() => {
                renderCount.current +=1;
            });

            return(
                <div>
                    <h1>Số đếm : {count}</h1>
                    <p>Số lần render : {renderCount.current}</p>
                    <button onClick={() => setCount(count + 1)}>Tăng đếm</button>
                </div>
            )
        }

        // -> Giải thích : 
            // + useRef là 1 object chứa thuộc tính current nơi chứa dữ liệu 
            // + khi thay đổi giá trị của current không re-render vì giá trị ref không phải state
            // + sử dụng useEffect với không truyền vào dependency thì lúc này mỗi lần render chạy lại callback của useEffect 
        
    // - Lưu ý khi sử dụng useRef : 
        // + Không dùng ref thay thế cho state nếu giá trị cần hiển thị lên UI và phải re-render thay đổi
        // + Dùng với TypeScript cần khai báo kiểu rõ ràng 
        // + Với ref dùng cho tham chiếu tới phần tử DOM luôn khởi tạo giá trị ban đầu = null và kiểm tra null trc khi truy cập
        // + useRef trả về object giống nhau qua mỗi lần render vậy bạn có thể dùng nó đánh giá trị trước và sau
        
// - Tổng kết và yêu cầu : 
    // + Với useState : hàm setState nhận tham số đầu vào là 1 hàm callback để tính toán giá trị dựa trên giá trị trước đó để trả về giá trị mới 
    // + Với useEffect : Dependency array phải đúng nếu muốn chạy 1 lần khi component mount dùng [] , nếu muốn phụ thuộc biến nào hãy liệt kê biến đó
    // + Với useRef : Khi tham chiếu tới 1 phần tử DOM cần khởi tạo null giá trị ban đầu và kiểm tra null khi sử dụng thuộc tính/phương thức
    // + Lấy dữ liệu API : Định nghĩa interface ngoài function component và chuẩn form đối với dữ liệu trả về 