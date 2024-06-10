import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";

const TaskForm = () => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        priority: '',
        dueDate: ''
    });

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const profile = Auth.getProfile();
        if (profile?.data?.username) {
            setUsername(profile.data.username);
        }
    }, []);

    const [addTask, { error }] = useMutation(ADD_TASK, {
        refetchQueries: username ? [{ query: QUERY_USER, variables: { username } }] : [],
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            console.error("Username is not defined");
            return;
        }

        try {
            await addTask({
                variables: { 
                    title: todo.title,
                    description: todo.description,
                    dueDate: todo.dueDate,
                    priority: todo.priority,
                },
            });

            // Clear form fields after successful submission
            setTodo({
                title: '',
                description: '',
                dueDate: '',
                priority: ''
            });
        } catch (err) {
            console.error("Error adding task:", err);
            if (err.graphQLErrors) {
                console.error("GraphQL Errors:", err.graphQLErrors);
            }
            if (err.networkError) {
                console.error("Network Error:", err.networkError);
            }
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    value={todo.title}
                    onChange={e => setTodo({ ...todo, title: e.target.value })} 
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    placeholder="Description" 
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Priority</label>
                <select 
                    className="form-control" 
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                >
                    <option value="">Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Date</label>
                <input 
                    type="date" 
                    className="form-control" 
                    value={todo.dueDate}
                    onChange={e => setTodo({ ...todo, dueDate: e.target.value })} 
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
            {error && <div className="alert alert-danger mt-3">Submission failed. Please try again.</div>}
        </form>
    );
};

export default TaskForm;
