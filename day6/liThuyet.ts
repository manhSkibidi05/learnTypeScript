// Ngày 6 : Ôn tập và Bài tập lớn 

    // - Mục tiêu ngày 6 : 
        // + Ôn tập và củng cố các kiến thức : 
            // - Kiểu cơ bản , interface/type alias
            // - Generics (function , interface , type alias)
            // - Type Guards & Discriminated Unions
            // - Utility Types 
            // - Mapped Types
        // + Xây dựng hoàn chỉnh một module quản lý task bằng TypeScript thuần
        // + Rèn luyện tư duy tổ chức code , phân chia trách nhiệm rõ ràng 

// - Thiết kế cấu trúc của 1 task 

    enum TaskStatus{
        Todo = 'todo',
        Done = 'done'
    }

    interface Task {
        id : number,
        title : string,
        description ?: string,
        status : TaskStatus,
        createAt : Date
    }

// - Xây dựng cơ sở dữ liệu lưu trữ task và các thao tác cơ bản 

    let Tasks : Task[] = [];

    // + Thêm task mới : 
    function addTask(item : Task) : void{
        Tasks.push(item)
    }

    // + Lấy toàn bộ task : 
    function getAll() : Task[] {
        return Tasks
    }

    // + Lấy task bằng id : 
    function getById(id : number) : Task | undefined{
        return Tasks.find(item => item.id === id)
    }

    // + Cập nhật task :
    function update(id : number , itemUpdated : Partial<Task>) : Task | undefined{
        const index = Tasks.findIndex(val => val.id === id);
        if(index !== -1){
            return Tasks[index] = {...Tasks[index] , ...itemUpdated}
        }
        return undefined
    }

    // + Xóa  task: 
    function removeById(id : number) : Task | undefined{
        const removed = Tasks.find(val => val.id === id);
        if(removed){
            Tasks = Tasks.filter(val => val.id !== id)
            return removed;
        }
        return removed;
    }