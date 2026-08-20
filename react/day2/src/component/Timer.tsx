// Bài 2 : Component Timer 
    // + Dùng useEffect để cập nhật thời gian mỗi giây.
    // + Dùng useState để lưu now: Date.
    // + Dùng useRef để lưu interval ID, và clean up khi component unmount.
    // + Hiển thị định dạng HH:MM:SS.

    import {useEffect , useState , useRef} from 'react';

    function Timer(){
        const [now , setNow] = useState(new Date());
        const idInterval = useRef<number | null>(null);
        const [isRunning , setIsRunning] = useState(true)
        
        useEffect(() => {
            if(isRunning){
                idInterval.current = window.setInterval(() => {
                    setNow(new Date());
                },1000)
            }else{
                if(idInterval.current !== null) clearInterval(idInterval.current);
            }
            
            return () => {
                if(idInterval.current !== null) clearInterval(idInterval.current);
            }
        }, [isRunning])

        return (
            <>
                <h2>Bài 2 : Đồng hồ điện tử</h2>
                <p>{now.getHours().toString().padStart(2 , '0')} : {now.getMinutes().toString().padStart(2 , '0')} : {now.getSeconds().toString().padStart(2 , '0')}</p>
                <button onClick={() => setIsRunning(false)}>Tạm dừng</button>
                <button onClick={() => setIsRunning(true)}>Tiếp tục</button>
                <button onClick={() => setNow(new Date())}>Chạy mới</button>
            </>
        )
    }

    export default Timer

