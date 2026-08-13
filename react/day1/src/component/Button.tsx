// 2. Khởi tạo component button 
    type Variant = 'primary' | 'secondary' | 'danger'

    interface ButtonProps {
        label : string,
        onClick : () => void,
        variant ?: Variant,
        disabled ?: boolean 
    }
    
    function Button({label , onClick , variant = 'primary' , disabled = false} : ButtonProps) : React.JSX.Element {
        const takeClassColor = (color : Variant) => {
            switch(color){
                case "primary":
                    return 'bg-primary';
                case 'danger' :
                    return 'bg-danger';
                case 'secondary':
                    return 'bg-secondary';
                default :
                    return 'bg-primary'
            }
        }

        return <button 
            onClick={onClick} 
            disabled={disabled} 
            className={takeClassColor(variant)}>
                {label}
            </button>
    }

    export default Button