import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import TaskList from "../components/TaskList/index";
import TaskForm from "../components/TaskForm/index";

const Home = () => {
  const profile = Auth.getProfile();
  const username = profile?.data?.username;

  // Ensure that `username` is defined before making the query
  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { username },
    skip: !username, // Skip the query if `username` is undefined
  });

  // Handle possible errors
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tasks = data?.tasks || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="content"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TaskForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
