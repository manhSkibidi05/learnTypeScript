// 1. Khởi tạo component Profile hiển thị thông tin cá nhân 

    interface ProfileProps {
        name : string,
        email : string,
        avatar ?: string,
        bio ?: string
    }

    function Profile({name , email , avatar , bio} : ProfileProps) : React.JSX.Element{
        return (
            <div>
                <p>My name : {name}</p>
                <p>My email : {email}</p>
                {avatar ? <img src={avatar} /> : <p>No avatar</p>}
                {bio && <p>Tiểu sử : {bio}</p>}
            </div>
        )
    }

    export default Profile