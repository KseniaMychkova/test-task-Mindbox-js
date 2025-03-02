import { useState, useEffect } from 'react'
import style from './style.module.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Сделать тестовое задание', completed: false },
    { id: 2, task: 'Пройти собеседование', completed: false },
    { id: 3, task: 'Просмотреть вакансии', completed: false },
    { id: 4, task: 'Повторить теорию', completed: true }]);
  const [flag, setFlag] = useState(false);
  const [countActiveTasks, setCountActiveTasks] = useState(0);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setCountActiveTasks(tasks.filter(el => !el.completed).length);
  }, [tasks]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  function openList() {
    setFlag(!flag)
  };

  function showFilterList(e) {
    if (e.target.id === 'all') {
      setFilteredTasks(tasks);
    } else if (e.target.id === 'act') {
      setFilteredTasks(tasks.filter(el => !el.completed));
    } else if (e.target.id === 'compl') {
      setFilteredTasks(tasks.filter(el => el.completed));
    }
  };

  function clearCompletedTasks() {
    setTasks(tasks.filter(el => el.completed === false))
  };

  function toggleCompletion(id) {
    setTasks(tasks.map(el =>
      el.id === id ? { ...el, completed: !el.completed } : el
    ));
  };

  return (
    <>
      <section className={style.container}>
        <h1>Todos</h1>
        <div className={style.wrapperList}>
          <button onClick={openList} className={style.dropDownList}><p>{flag ? 'ᐱ' : 'ᐯ'}</p><p>Что необходимо сделать</p></button>
          {flag ? <div className={style.list}>
            <ul>
              {filteredTasks.map(el => <li key={el.id}><span
                className={style.checkbox}
                onClick={() => toggleCompletion(el.id)}
              >
                {el.completed ? '✓' : '◯'}
              </span><span style={el.completed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{el.task}</span></li>)}
            </ul>
          </div> : null}
        </div>
        <div className={style.statusBar}>
          <p className={style.leftTasks}>Осталось задач:{countActiveTasks}</p>
          <div className={style.sortCompleted} onClick={showFilterList}>
            <button className={style.all} id='all'>Все</button>
            <button className={style.active} id='act'>Активные</button>
            <button className={style.completed} id='compl'>Выполненные</button>
          </div>
          <button className={style.clearCompleted} onClick={clearCompletedTasks}>Очистить выполненные</button>
        </div>
      </section>
    </>
  )
}

export default App
