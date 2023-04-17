// Định nghĩa lớp Nhiệm vụ
class Task {
    constructor(id = 0, userName = '', Password = '') {
        this.id = id;
        this.userName = userName;
        this.Password = Password
    }
}

// Khai báo khởi tại mảng nhiệm vụ
var tasks = JSON.parse(sessionStorage.getItem('register')) || 
JSON.parse(sessionStorage.getItem('tasks'))
    // new Task(1, 'user1',"password1"),
    // new Task(2, 'user2',"password2"),
    // new Task(3, 'user3',"password3")
;
// let a = document.getElementsByClassName('taskName')
// let b = document.getElementsByClassName('taskPass')
// let c = new Task();

// let find = tasks.find(e => e.userName == a.value && e.Password == b.value )
// if(find){
//     tasks.push(find)
// }

// Định nghĩa hàm hiển thị nhiệm vụ
function loadTasks() {
    let rows = '';
    for (let t of tasks) {
        rows += `<tr data-id="${t.id}">
                    <td>${t.id}</td>
                    <td>${t.userName}</td>
                    <td>${t.Password} </td>
                    <td>
                        <button class="btnEdit">Edit</button>
                        <button class="btnDel">Delete</button>
                    </td>
                </tr>`;
    }
    $('.list').html(rows);
}


$(document).on('click', '.btnEdit', function() {
    let tr = $(this).parents('tr');
    let id = $(tr).data('id');
    // Tìm task cần sửa
    let _task = tasks.find(t => t.id == id);
    // Đẩy thông tin lên form
    $('.taskId').val(_task.id);
    $('.taskName').val(_task.userName);
    $('.taskPass').val(_task.Password);

})
$(document).on('click', '.btnDel', function() {
    if (confirm('Bạn có muốn xóa task không?')) {
        let tr = $(this).parents('tr');
        let id = $(tr).data('id');
        // Tìm task cần xóa
        let _taskIndex = tasks.findIndex(t => t.id == id);
        // Xóa
        tasks.splice(_taskIndex, 1);
        // Lưu lại local sau khi xóa
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
})
$('.btnSave').click(function() {
    if ($('.taskId').val() != '') {// sửa
        // Lấy id đối tượng cần sửa
        let id = parseInt($('.taskId').val());
        // Tìm và update
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks[i].userName = $('.taskName').val();
                break;
            }
        }
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks[i].Password = $('.taskPass').val();
                break;
            }
        }
    } else { // thêm mới
        // Tạo đối tượng mới
        let newTask = new Task();
        newTask.id = tasks.length + 1;
        newTask.userName = $('.taskName').val();
        newTask.Password = $('.taskPass').val();
        // thêm vào mảng
        tasks.push(newTask);
    }
    $('.taskId').val('');
    $('.taskName').val('');
    $('.taskPass').val('');
    // Lưu lại local sau khi update
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
})
loadTasks();

$('.back').click(function(){
    window.location.href='home.html'
})