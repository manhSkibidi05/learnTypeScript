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

    // - useEffect là hook do react tạo sẵn , sử dụng useEffect để xử lí các side effect (hiệu ứng phụ) , hiệu ứng phụ là các thao tác không làm thay đổi giao diện
    // - useEffect nhận vào 1 hàm xử lí hiệu ứng phụ có thể trả về hàm cleanup hoặc void , nhận vào 1 mảng dependency chứa các phần tử mà useEffect phụ thuộc 
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

   