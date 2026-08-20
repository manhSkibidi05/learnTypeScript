// Bài 5 : Bonus (tùy chọn): Dùng useEffect để fetch dữ liệu từ API miễn phí (JSONPlaceholder) và 
// hiển thị danh sách todos (chỉ fetch 1 lần). Khai báo interface Todo phù hợp.

    import { useEffect , useState} from "react";

    interface Todo{
        id : number,
        userId : number,
        title : string,
        completed : boolean,
    }


    function FetchData(){
        const [todos , setTodos] = useState<Todo[]>([]);
        const [loading , setLoading] = useState(true);
        const [error , setError] = useState<string | null>(null)

        useEffect(() => {
            async function fetchTodos(){
                try{
                    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
                    if(!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
                    const data : Todo[] = await res.json();
                    setTodos(data);
                }catch(err){
                    setError(err instanceof Error ? err.message : 'Lỗi không xác định')
                }
                finally{
                    setLoading(false);
                }
            }
            fetchTodos();
        }, [])
        
        return(
            <>
                <h2>Bài 5 : Lấy dữ liệu Todo từ API</h2>
                {
                    loading ? 
                    <p>Loading...</p>
                    :
                    <div>
                        {
                            todos.map(todo => 
                                <ul>
                                    <li>userId : {todo.userId}</li>
                                    <li>title : {todo.title}</li>
                                    <input type="checkbox"  checked={todo.completed} />
                                </ul>
                            )
                        }
                    </div>
                }
                {
                    error && <p>Lỗi : {error}</p>
                }
            </>
        )
    }

    export default FetchData