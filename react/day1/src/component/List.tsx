// 3. Khởi tạo component List với generic types

    // định nghĩa object dành cho props với kiểu T
    interface ListProps<T> {
        // thuộc tính item là mảng các phần tử kiểu T
        items : T[],
        // thuộc tính render là hàm nhận vào phần tử kiểu T và luôn trả về kiểu React.ReactNode : cho phép trả về nhiều kiểu khác nhau string | number | JSX...
        renderItem : (item : T , num : number) => React.ReactNode
    }

    // component list nhận vào kiểu T với props mang kiểu T và trả về phần tử JSX
    function List<T>({items  , renderItem} : ListProps<T>) : React.JSX.Element{
        // trả về phần tử JSX
        return(
            <div>
                {
                    // dựa vào mảng items kiểu T sử dụng map tạo ra mảng phần tử mới với hàm renderItem nhận phần tử kiểu T và trả về 1 trong các kiểu của React.ReactNode
                    items.map(item => 
                        <p>{renderItem(item , 3)}</p>
                    )
                }
            </div>
        )
    }

    export default List 
