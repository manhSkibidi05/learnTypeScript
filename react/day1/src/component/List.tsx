// 3. Khởi tạo component List 

    interface ListProps<T> {
        items : T[],
        renderItem : (item : T) => React.ReactNode
    }

    function List<T>({items  , renderItem} : ListProps<T>) : React.JSX.Element{
        return(
            <div>
                {
                    items.map(item => 
                        <p>{renderItem(item)}</p>
                    )
                }
            </div>
        )
    }

    export default List 