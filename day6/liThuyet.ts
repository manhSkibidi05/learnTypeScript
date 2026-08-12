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

// - Xây dựng cơ sở dữ liệu lưu trữ task và các thao tác cơ bản với dữ liệu 

    const Tasks : Task[] = [];

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
    function removeById(id : number) : boolean{
        const index = Tasks.findIndex(val => val.id === id);
        if(index !== -1){
            Tasks.splice(index , 1);
            return true;
        }
        return false;
    }

// - Các hàm tiện ích 

    // + hàm kiểm tra status của task có Done hay không 
    function isTaskDone(task : Task) : boolean {
        return task.status === TaskStatus.Done
    }

    // + Discriminated union cho filter theo trạng thái 
    type FilterCriterion = 
        { kind : 'status' ; value : TaskStatus }
        | { kind : 'search' ; query : string }

    function filterTasks(tasks : Task[] , criterion : FilterCriterion) : Task[] {
        switch(criterion.kind){
            case 'status' : 
                return tasks.filter(task => task.status === criterion.value);
            case 'search' : 
                return tasks.filter(task => task.title.includes(criterion.query));
        }
    }