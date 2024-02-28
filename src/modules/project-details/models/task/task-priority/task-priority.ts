export enum TaskPriority {
    HIGH = 2,
    MEDIUM = 1,
    LOW = 0
}

export const taskPriorityLabel = {
    [TaskPriority.LOW]: "LOW",
    [TaskPriority.MEDIUM]: "MEDIUM",
    [TaskPriority.HIGH]: "HIGH"
}