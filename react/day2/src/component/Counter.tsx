// Bài 1 : Component Counter 
    // State count: number, step: number.
    // Có nút tăng/giảm theo step.
    // Có input nhập step (parse number, nếu rỗng hoặc không hợp lệ thì giữ nguyên step cũ).

    import { useState } from "react";

    function Counter(){
        const [count , setCount] = useState(0);
        const [step , setStep] = useState(1);

        const changeStep = (value : string) => {
            if(value.trim() === '' || isNaN(parseInt(value))) return step;
            return parseInt(value)
        }

        return(
            <>
                <h2>Bài 1 : Counter</h2>
                <p>Số lần đếm : {count}</p>
                <input onChange={(e) => setStep(changeStep(e.target.value))} type="text" />
                <p>Số bước nhảy : {step}</p>
                <button onClick={() => setCount(prev => prev + step)}>Tăng đếm</button>
                <button onClick={() => setCount(prev => prev - step)}>Giảm đếm</button>
            </>
        )
    }

    export default Counter