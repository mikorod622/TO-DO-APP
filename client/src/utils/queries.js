import { gql } from "@apollo/client";

// retrieve user by username along with its tasks
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            tasks {
                _id
                title
                description
                priority
                dueDate
            }
        }
    }
`;

// retrieve all tasks (not used currently)
export const QUERY_TASKS = gql`
    query getTasks {
        tasks {
            _id
            title
            description
            dueDate
            priority
        }
    }
`;

// retrieve a single task
export const QUERY_SINGLE_TASK = gql`
    query getSingleTask($taskId: ID!) {
        task(taskId: $taskId) {
            _id
            title
            description
            dueDate
            priority
        }
    }
`;
