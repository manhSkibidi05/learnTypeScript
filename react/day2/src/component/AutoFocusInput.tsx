// Bài 3 : Component AutoFocusInput
    // - Tạo một input và tự động focus vào nó khi component mount (dùng useEffect và useRef).
    // - Khi bấm nút "Toggle", focus chuyển sang input khác (hoặc clear input).

    import {useEffect , useRef , useState} from 'react';

    function AutoFocusInput(){
        const firstInputRef = useRef<HTMLInputElement>(null);
        const secondInputRef = useRef<HTMLInputElement>(null);
        const [firstInputFocus , setFirstInputFocus] = useState(true);

        useEffect(() => {
            if(firstInputFocus){
                firstInputRef.current?.focus();
            }else{
                secondInputRef.current?.focus();
            }
        },[firstInputFocus])

        return (
            <>
                <h2>Bài 3 : Tự động focus input</h2>
                <label htmlFor="">Input 1</label>
                <input ref={firstInputRef} type="text" />
                <label htmlFor="">Input 2</label>
                <input ref={secondInputRef} type="text" />
                <button onClick={() => setFirstInputFocus(prev => !prev)}>Toggle</button>
            </>
        )
    }

    export default AutoFocusInput