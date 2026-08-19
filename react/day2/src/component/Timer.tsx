// Bài 2 : Component Timer 
    // + Dùng useEffect để cập nhật thời gian mỗi giây.
    // + Dùng useState để lưu now: Date.
    // + Dùng useRef để lưu interval ID, và clean up khi component unmount.
    // + Hiển thị định dạng HH:MM:SS.

    import {useEffect , useState , useRef} from 'react';

    function Timer(){
        const [now , setNow] = useState(new Date());
        const idInterval = useRef(0);

        const pauseTimer = () => {
            clearInterval(idInterval.current);
        }

        useEffect(() => {
            idInterval.current = window.setInterval(() => {
                setNow(new Date());
            },1000)

            return () => {
                pauseTimer();
            }
        }, [now])

        return (
            <>
                <h2>Bài 2 : Đồng hồ điện tử</h2>
                <p>{now.getHours().toString().padStart(2 , '0')} : {now.getMinutes().toString().padStart(2 , '0')} : {now.getSeconds().toString().padStart(2 , '0')}</p>
                <button onClick={pauseTimer}>Tạm dừng</button>
                <button onClick={() => setNow(new Date())}>Chạy mới</button>
            </>
        )
    }

    export default Timer

