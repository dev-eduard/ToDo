import { useState, useEffect } from 'react';

export default function List() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('ToDoTasks');
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          'A fazer': [],
          Fazendo: [],
          Concluído: [],
        };
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('ToDoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks({ ...tasks, 'A fazer': [...tasks['A fazer'], input.trim()] });
      setInput('');
    }
  };

  const moveTask = (from, to, index) => {
    const moved = tasks[from][index];
    const updated = { ...tasks };
    updated[from].splice(index, 1);
    updated[to].push(moved);
    setTasks(updated);
  };

  const clearCompleted = () => {
    setTasks({ ...tasks, Concluído: [] });
  };

  return (
    <div className='container'>
        <h1 className='text-center'>Lista de tarefas</h1>
      <div className='mb-3 d-flex flex-column flex-md-row'>
        <input
          className='form-control me-md-2 mb-2 mb-md-0'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Digite uma tarefa'/>
        <button
          className='btn btn-primary me-md-2 mb-2 mb-md-0'
          onClick={addTask}
        >
          Adicionar
        </button>
        <button className='btn btn-danger' onClick={clearCompleted}>
          Limpar Concluídos
        </button>
      </div>
      <div className='row'>
        {['A fazer', 'Fazendo', 'Concluído'].map((stage) => (
          <div className='col-12 col-md-4 mb-3' key={stage}>
            <h5 className='text-capitalize'>{stage}</h5>
            <ul className='list-group'>
              {tasks[stage].map((task, i) => (
                <li
                  key={i}
                  className={`list-group-item d-flex justify-content-between align-items-center border`}
                >
                  <span>
                    {task}
                  </span>
                  {stage !== 'Concluído' && (
                    <div>
                      {stage !== 'A fazer' && (
                        <button
                          className='btn btn-sm btn-outline-secondary me-1'
                          onClick={() => moveTask(stage, 'A fazer', i)}
                        >
                          A fazer
                        </button>
                      )}
                      {stage !== 'Fazendo' && (
                        <button
                          className='btn btn-sm btn-outline-secondary me-1'
                          onClick={() => moveTask(stage, 'Fazendo', i)}
                        >
                          Começar
                        </button>
                      )}
                      {stage !== 'Concluído' && (
                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => moveTask(stage, 'Concluído', i)}
                        >
                          Concluir
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
