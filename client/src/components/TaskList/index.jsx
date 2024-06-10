import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";

const TaskList = () => {
  const { loading, error, data } = useQuery(QUERY_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tasks = data.tasks;

  if (!tasks.length) {
    return <h3>No tasks Yet</h3>;
  }

  return (
    <div>
      {tasks.map((task) => {
        // Convert dueDate to a Date object
        const dueDate = new Date(parseInt(task.dueDate));

        return (
          <div key={task._id} className="note">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {task.title} <br />
              <span style={{ fontSize: '1rem' }}>
                this task due on {dueDate.toLocaleDateString()} priority {task.priority}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{task.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
