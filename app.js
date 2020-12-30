const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
}

addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    // name属性addのvalueを取得
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});

// 削除機能
// タスクリストをクリックして、もしdeleteクラスであれば削除する。
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')){
      console.log(e.target.parentElement)
      e.target.parentElement.remove();
  }
});